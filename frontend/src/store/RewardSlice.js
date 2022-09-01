import { createSlice } from '@reduxjs/toolkit'


export const RewardSlice = createSlice({
  name: 'knowYourPoints',
  initialState: {
    value: 0,
    isLoading:false,
    selectedDate:null,
    transactions:[],
    showTable:false
  },
  reducers: {
    dateChange: (state,action) => {
      state.selectedDate = action.selectedDate
    },
  },
})

export default RewardSlice.reducer