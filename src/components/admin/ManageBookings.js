import { useEffect, useState } from "react";
import { getAllRentals } from "./apihelper/adminCalls";
import {useSelector } from 'react-redux';
//import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

export const ManageBookings=()=>{

    //user id
    const userId=useSelector(state=>state.user.userId);


    const navigate=useNavigate();

    //loading products
    const [error,setError]=useState('');
    //const [success,setSuccess]=useState('');
    const [loading,setLoading]=useState(false);
    const [rentals,setRentals]=useState();
    useEffect(()=>{
       setLoading(true)
        const getInfo=async(userId)=>{
           const data=await getAllRentals(userId);
           if(data.err){
            setLoading(false);
            setError(data.err);
           }else{
            setLoading(false);
            setRentals(data.msg);
           }
        }
        getInfo(userId);
    },[userId])
   
   // console.log(rentals)
    return(
        <div className="mt-2 w-100">
        <h1 className="font-bold text-xl text-center">Manage Bookings</h1>

        <div className="w-100 flex justify-center mt-2">
            {error && 
                <div className="bg-red-400 p-2 text-center text-white rounded w-fit ">
                <p>{error}</p>
                </div>
            }
            {/* {success && 
                <div className="bg-green-400 p-2 text-center text-white rounded w-fit">
                <p>{success}</p>
                </div>
            } */}
            {loading &&
                <div  className="bg-zinc-700 p-2 text-center text-white rounded flex">
                 <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-3 ...">
                    <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                    Loading...
                </div>
            }
        </div>

        <div className="mt-5 flex flex-col justify-center items-center lg:w-3/4  sm:mx-auto mx-3">
        <div className="w-full space-x-3 flex px-3 py-2 bg-lime-200 font-semibold "> 
            <p className="w-5">Sno</p>
            <p className="w-56 sm:w-60">Booking Id</p>
            <p className="w-60 hidden sm:inline-flex">Email</p>
            <p className="w-20 hidden sm:inline-flex">Payment</p>
        </div>
                {
                  rentals && rentals.length>0 && rentals.map((rental,index)=>{
                    return (
                      <div key={index} className="w-full">
                        <div className="flex items-center space-x-3 border border-zinc-200 px-3 py-1 rounded">
                            <p className="w-5">{index+1}</p>
                            <p className="w-56 sm:w-60">{rental.orderId}</p>
                            <p className="w-60 hidden sm:inline-flex">{rental.user.email}</p>
                            <p className="w-20  text-center hidden sm:inline-flex">{rental.paymentStatus?'✅':'❌'}</p>
                            <div className="w-16 sm:w-60 flex sm:ps-20">
                                <button className="border rounded  bg-gray-100 sm:bg-gray-700 px-2 py-1 text-white
                                hover:bg-gray-800 flex" onClick={()=>{
                                    const filter=rental.paymentStatus?'booked':'failed';
                                    navigate(`/user/rentals/${filter}/${rental._id}`)
                                }}>👁️<span className="hidden sm:flex">&nbsp;View</span></button>
                                <button className="ms-1 border rounded bg-red-100 sm:bg-red-600 px-2 py-1 text-white
                                hover:bg-red-700 flex">🗑️<span className="hidden sm:flex">&nbsp;Delete</span></button> 
                            </div>
                        </div>  
                      </div>
                    )
                  })
                }
               </div>
        </div>
    )
} 