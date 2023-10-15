import { configureStore } from "@reduxjs/toolkit";
import  authReducer from "./reducers/auth"
import infoReducer from "./reducers/provider_info"
import servicesReducer from "./reducers/services"
import reviewReducer from "./reducers/reviews";

import scheduleReducer from "./reducers/schedule";

import historyReducer from "./reducers/history"
import orderReducer from "./reducers/order"
import notesReducer from "./reducers/notes"

export default configureStore({
  reducer: {
   auth:authReducer,
   info:infoReducer,
   services:servicesReducer,
   reviews:reviewReducer ,

   schedule:scheduleReducer,

  history:historyReducer,
 orders:orderReducer,
 notes:notesReducer
  },
});
