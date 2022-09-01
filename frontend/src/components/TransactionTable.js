import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './RewardCalc.css';

const TransactionsTable = (props) => {
    const colDefs = [
        { field: 'orderDate', headerName: 'Order placed on', width: 250 },        
        {
            field: 'fullName',
            headerName: 'Name',
            description: 'This column has a value getter and is not sortable.',
            width: 200,
            valueGetter: (params) =>
              `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'orderTotal', headerName: 'Total cost of Order', width: 200 },
        { field: 'bonus', headerName: 'Points received on Order', width: 200 },
    ]

    const monthlyRewardsCols = [
        { field: 'month', headerName: 'Reward Month', width: 250 },
        { field: 'bonus', headerName: 'Reward Points', width: 130 },
    ]
    
    return ( 
        <div className="title-style">
            <h3 style={{textAlign: 'left' }} >Transactions:</h3>
            <div style={{ height: 300, width: '100%', }} className="centered">
                <DataGrid
                    rows={props.transactions}
                    columns={colDefs}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <h3 style={{textAlign: 'left' }} >Total Reward points:</h3>
            <div style={{ height: 300, width: '100%', }} className="centered">
                <DataGrid
                    rows={props.monthlyRewards}
                    columns={monthlyRewardsCols}
                    pageSize={5}
                    rowsPerPageOptions={[5]}

                />
            </div>
        </div>
    )
}

export default TransactionsTable;