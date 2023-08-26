import { Navbar } from "../core/Navbar";
import { Footer } from "../core/Footer";
import { useState } from "react";

import { DashboardHelper } from "./DashboardHelper";

export const AdminDashboard=()=>{

    const [menuItem,setmenuItem]=useState(1)
    return(
       <>
       <Navbar/>
    
        <div className="grid grid-cols-4 gap-4 h-fit">
            <div className="bg-gray-200 p-2 list-none">
                <li className="border-b-2 border-slate-400  font-bold p-2 cursor-pointer"
                onClick={(e)=>{
                    setmenuItem(1)
                }}>Manage Cars</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer"
                 onClick={(e)=>{
                    setmenuItem(2)
                }}>Manage Users</li>
                <li className="border-b-2  border-slate-400 font-bold p-2 cursor-pointer">Push Notifications</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Offers</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Security</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Site Traffic</li>
            </div>
            <div className="col-span-3">
                 <div>
                    <DashboardHelper item={menuItem}/>
                 </div>
            </div>
        </div>
    
       <Footer/>
       </>

    )
}