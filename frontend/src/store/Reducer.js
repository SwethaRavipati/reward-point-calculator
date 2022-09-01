import { configureStore } from '@reduxjs/toolkit'
import RewardSlice from "./RewardSlice"


export default configureStore({
    reducer: {
        knowYourPoints: RewardSlice,
    },
})