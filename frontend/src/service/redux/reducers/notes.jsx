import { createSlice } from "@reduxjs/toolkit";

export const notes =createSlice({
    name:"notes" ,
    initialState:{
        notes:[]
    },
    reducers:{
        setNotes: (state, action) => {
            state.notes = action.payload;
          },
          addNotes: (state, action) => {
           state.notes.push(action.payload);

          },
          updateNotes: (state, action) => {
           state.notes= state.notes.map((data,i) => {
              if (data.provider_note_id == action.payload.id) {
           data.note = action.payload.note
         
               
              }
              return data
            });
           
          },
          deleteNotesById: (state, action) => {
            state.notes=state.notes.filter(data => 
         data.provider_note_id !== action.payload
            
            
            )
          },
    }
})



export const {
    setNotes,addNotes,updateNotes,deleteNotesById
}=notes.actions

export default notes.reducer