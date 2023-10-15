import { createSlice } from "@reduxjs/toolkit";
 

export const info=createSlice({
  name:"info",
initialState:{
   info:[]
},
reducers:{
  setInfo:(state,action)=>{
state.info=action.payload
  },
updateImage:(state,action)=>{
  state.info=state.info.map((Pinfo,i)=>{
if(Pinfo.provider_info_id==action.payload.id){
  Pinfo.img=action.payload
}
return Pinfo
  })
},
updateBio:(state,action)=>{
  state.info=state.info.map((Pinfo,i)=>{
if(Pinfo.provider_info_id==action.payload.id){
  Pinfo.bio=action.payload.bio
}
return Pinfo
  })
},
updateQualifications:(state,action)=>{
  state.info=state.info.map((Pinfo,i)=>{
if(Pinfo.provider_info_id==action.payload.id){

  Pinfo.qualifications=action.payload

}
return Pinfo
  })
},
updateInfo:(state,action)=>{
  state.info=state.info.map((Pinfo,i)=>{
if(Pinfo.provider_info_id==action.payload.id){
  Pinfo.bio=action.payload.bio
  Pinfo.qualifications=action.payload.qualifications
  Pinfo.img=action.payload.img

}
return Pinfo
  })
},
setImage:(state,action)=>{
  state.image=action.payload
},
}
})






export const { setInfo,updateInfo,updateQualifications,updateBio,updateImage } =
  info.actions;
export default info.reducer;