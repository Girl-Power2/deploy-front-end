import { createSlice } from "@reduxjs/toolkit";

export const services = createSlice({
  name: "services",
  initialState: {
    service: [],
  },
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
    addService: (state, action) => {
      state.service.push(action.payload);
    },
    updateService: (state, action) => {
      state.service = state.service.map((ser,i) => {

        if (ser.service_id == action.payload.id) {
          ser.service = action.payload.service;
          ser.price_per_hour = action.payload.price_per_hour;
        }
        return ser
      });
      
    },
     deleteService:(state,action)=>{
    state.service = state.service.filter((ser) => {
      return ser.service_id !== action.payload;
    });

  }
  },
 
});

export const { setService, updateService,addService,deleteService } = services.actions;
export default services.reducer;
