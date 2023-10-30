import { Navbar } from "../core/Navbar";
import { Footer } from "../core/Footer";
import { useState } from "react";

import { DashboardHelper } from "./DashboardHelper";

export const AdminDashboard=()=>{

    const [menuItem,setmenuItem]=useState(1)

    const [showAM,setShowAM]=useState(false)
    
    return(
       <>
       <Navbar/>
       <button className={!showAM?"m-2":'hidden'} onClick={()=>{
         setShowAM(true);
         document.body.style.overflow='hidden';
       }}>
       <svg fill="#000000" width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z" fill-rule="evenodd"/>
        </svg>
       </button>
       
        <div className={showAM?"bg-gray-100 bg-transparent-200 p-2 list-none w-3/5 sm:w-1/4  h-full z-10 absolute left-0":"hidden"}>
                <div className='float-right'  
                onClick={(e)=>{
                    setShowAM(false);
                    document.body.style.overflow='unset';
                }}>
                    <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <li className="border-b-2 border-slate-400  font-bold p-2 cursor-pointer"
                onClick={(e)=>{
                    setmenuItem(1)
                }}>Manage Cars</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer"
                 onClick={(e)=>{
                    setmenuItem(2)
                }}>Manage Users</li>
                <li className="border-b-2  border-slate-400 font-bold p-2 cursor-pointer">Manage Bookings</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Site Traffic</li>
        </div>
        <div className="w-100">
            <DashboardHelper item={menuItem}/>
        </div>
        {/* <div className="sm:grid sm:grid-cols-4 sm:gap-4 h-fit ">
           <div className={showAM?"bg-gray-200 p-2 list-none":"hidden"}>
                <li className="border-b-2 border-slate-400  font-bold p-2 cursor-pointer"
                onClick={(e)=>{
                    setmenuItem(1)
                }}>Manage Cars</li>
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer"
                 onClick={(e)=>{
                    setmenuItem(2)
                }}>Manage Users</li>
                <li className="border-b-2  border-slate-400 font-bold p-2 cursor-pointer">Manage Bookings</li>
                // <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Offers</li>
                // <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Security</li> 
                <li className="border-b-2  border-slate-400  font-bold p-2 cursor-pointer">Site Traffic</li>
            </div>
            <div className="sm:col-span-3 mx-5 sm:mx-0">
                 <div>
                    <DashboardHelper item={menuItem}/>
                 </div>
            </div>
        </div> */}
    
       <Footer/>
       </>

    )
}