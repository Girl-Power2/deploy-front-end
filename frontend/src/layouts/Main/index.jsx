import {Outlet} from "react-router-dom"
import Navbar from "../../components/Navbar/index"

import React from 'react'

export default function Main(){
    return(
        <div>
            <header><Navbar/></header>
            <main>
            <Outlet/>
            </main>
        </div>
    )
}
