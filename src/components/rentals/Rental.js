import { Navbar } from "../core/Navbar";
import { Footer } from "../core/Footer";
import { useParams } from "react-router-dom";
import {getRental} from './apihelper/rentalDbcalls';
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';



export const Rental=()=>{
    const {rentalId}=useParams();
    const {filter}=useParams();

    const [rental,setRental]=useState();
  
    const getDateInFormat=(unformattedDate)=>{
        const date=new Date(unformattedDate);
        
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    }
    const getNewDate=(dbDate)=>{
        const date=new Date(dbDate);
        return date;
    }

 
    
    useEffect(()=>{
        const getInfo=async(rentalId)=>{
            const data=await getRental(rentalId);
            if(data.err){

            }else{
                setRental(data.msg);
            }
        }
        getInfo(rentalId)
    },[rentalId])

    

    return(
       <>
       <Navbar/>
    
        {rental && Object.keys(rental).length>0 &&
        <div className="mt-5 lg:grid lg:grid-cols-3 lg:gap-2 mb-20">
        
        
            <div className="flex flex-col items-center">
                <img src={`data:${rental['product'].productPoster.contentType};base64,${Buffer.from(rental['product'].productPoster.data).toString('base64')}`} alt="Product"  width='500px' height='500px'/>
                <p className={`p-2  ${filter!=='failed'?'bg-lime-500':'bg-red-500'} rounded text-white`}>{filter!=='failed'?'Booked':'Failed'}</p>
            </div> 
            <div className="lg:col-span-2 m-5 sm:m-0">
                <h1 className="text-4xl font-bold">{rental['product'].title}</h1>
                <p className="text-xl">{rental['product'].description}</p>
                
                <p className="flex my-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>&nbsp;{rental['product'].location}
                </p>
                
                <div className="">
                <div className="text-black mt-5 space-y-2">
                    <h1 className="text-xl font-semibold">Features</h1>
                    <p>Mileage: {rental['product'].mileage} kmpl</p>
                    <p>Kilometers Travelled: {rental['product'].age} Kms</p>
                </div>
                <div className="mt-2">
                   <h1 className="text-xl font-semibold">Booking Details</h1>
                   <p>Date of Booking: {getDateInFormat(rental['dateOfbooking'])}</p>
                   <p>Start Date: {getDateInFormat(rental['rentalStartDate'])}</p>
                   <p>Collection Time: {rental['rentalStartTime']}:00 hrs</p>
                   <p>Return Date: {
                   rental['rentalcategory']==='days'?
                   getDateInFormat(getNewDate(getNewDate(rental['rentalStartDate']).getTime()+rental['rentalDuration']*60*60*24*1000))
                   :getDateInFormat(rental['rentalStartDate'])
                   }
                   </p>
                   <p>Return Time: {
                    rental['rentalcategory']==='days'
                    ?`${rental['rentalStartTime']}`
                    :rental['rentalStartTime']+rental['rentalDuration']
                    }:00 hrs</p>
                </div>
                {
                    filter!=='failed' &&     <div className="mt-2">
                    <h1 className="text-xl font-semibold">Payment Details</h1>
                    <p>Total Paid (plus GST): {rental['totalCost']}</p>
                    <p>Order(Booking) ID: {rental['orderId']}</p>
                    <p>Payment(Transaction) ID: {rental['paymentId']}</p>
                </div>
                }
                </div>
            </div> 
         </div>
        }

      <div className="fixed bottom-0 left-0 right-0">
        <Footer/>
      </div>
       </>
    )
}