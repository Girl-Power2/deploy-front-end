import React from 'react'

import { NavLink, Outlet } from 'react-router-dom';
import Info from "../../../components/provider_info/Info"
import Service from '../../../components/provider_info/service';
import AddSchedule from '../../../components/provider_info/AddSchedule';


const ProviderMain = () => {
  return (
    
<div style={{height:"100vh"}}>
    <Info/>
    <Service/>
    <AddSchedule/>
    <Outlet/>
    </div>
 

  )
}

export default ProviderMain

