import { createSlice } from "@reduxjs/toolkit";

export const schedule = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    BookedCounter:0
  },
  reducers: {
    setSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    setBookedCounter: (state, action) => {
      state.BookedCounter = action.payload;
    },
    addSchedule: (state, action) => {
      state.schedule.push(action.payload);
    },
    deleteSchedule: (state, action) => {
      state.schedule = state.schedule.filter((sched) => {
        return sched.schedule_id !== action.payload;
      });
      
    },
    updateSchedule: (state, action) => {
      state.schedule= state.schedule.map((sched ,i) => {
         if (schedule.schedule_id == action.payload.schedule_id) {
          sched.is_booked = action.payload.is_booked;
          
         }
         return sched
       });
     },
  },
});

export const { setSchedule, addSchedule, deleteSchedule,updateSchedule,setBookedCounter } = schedule.actions;
export default schedule.reducer;
