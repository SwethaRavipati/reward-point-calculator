import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import TransactionTable from "./TransactionTable"
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import fetchData from "../api/data";



const initialState = {
    value: 0,
    isLoading: false,
    selectedDate: null,
    transactions: [],
    showTable: false,
    monthlyRewards: []
};

const RewardCalc = (props) => {
    const [state, setState] = React.useState(initialState);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const getTableData = () => {
        let transactionsToDisplay = [];
        let startDateNew = new Date(startDate);
        let endDate = new Date(startDateNew.setMonth(startDateNew.getMonth() + 3));

        // Fetching the data through API:
        fetchData().then(response => {        
            let completeTransactions = response.filter(item => {
                var date = new Date(item.orderDate);

                return (date >= startDate && date <= endDate);
            });
        
            completeTransactions.forEach(tran => {
                const bonusForTran = calculatePointsForMoneySpent(tran.orderTotal)
                transactionsToDisplay.push({
                    id: tran.orderId,
                    bonus: bonusForTran,
                    firstName: tran.firstName,
                    lastName: tran.lastName,
                    orderDate: tran.orderDate,
                    orderTotal: "$" + tran.orderTotal
                })
            })
            let monthlyRewards = getMonthWiseRewards(3, transactionsToDisplay, endDate);
            setState({ ...state, showTable: true, transactions: transactionsToDisplay, monthlyRewards: monthlyRewards })
        });
    }
    const getMonthWiseRewards = (noOfMonths, transactions, reportEndDate) => {

        let montlyData = [];
        var stDate = new Date(startDate);
        var lastDayOfMonth = new Date(stDate.getFullYear(), stDate.getMonth() + 1, 0);
        montlyData.push(calculateSum(transactions, stDate, lastDayOfMonth))
        let counter = noOfMonths;
        if (stDate.getDate() === 1)
            counter = counter - 1;
        let date1 = new Date(lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1));
        for (let i = 1; i <= counter; i++) {
            if (i > 1)
                date1 = new Date(date1.setMonth(date1.getMonth() + 1));
            
            let date2 = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
            let currentDate = new Date();
            if (date2 > currentDate) {
                montlyData.push(calculateSum(transactions, date1, currentDate))
                return montlyData;
            }
            if (date2 > reportEndDate)
                montlyData.push(calculateSum(transactions, date1, reportEndDate))
            else
                montlyData.push(calculateSum(transactions, date1, date2))

        }
        return montlyData;
    }
    const calculateSum = (transactions, stDate, endDate) => {
    
        let temp = transactions.filter(item => {
            var date = new Date(item.orderDate);
            return (date >= stDate && date <= endDate);
        });
        let sum = 0;
        temp.forEach(x => {
            sum = sum + x.bonus;
        });
        return {
            id:Math.random(),
            month: monthNames[stDate.getMonth()],
            bonus: sum
        }
    }
    function calculatePointsForMoneySpent(totalCost) {
        let bonus = 0;
        if (totalCost > 50 && totalCost <= 100) {
            bonus = totalCost - 50;
        }
        else if (totalCost > 100) {
            bonus = 50 + ((totalCost - 100) * 2);
        }
        return bonus;
    }
    return (
        <Fragment>
                <h1>Welcome!</h1>
                <h3>Please select a date to know your points </h3>
            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={startDate}
                        disableFuture
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <h1> </h1>
                <Button onClick={() => dispatch(getTableData)} variant="contained">Calculate reward points</Button>
                <h1> </h1>
            {state.showTable &&
                <Fragment>
                    <TransactionTable
                        transactions={state.transactions}
                        monthlyRewards = {state.monthlyRewards} 
                        className = "transaction"
                        />
                {/* {
                    monthlyRewards
                } */}
                </Fragment>
            }
        </Fragment>
    )
}

export default RewardCalc;