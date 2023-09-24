import { useParams } from "react-router-dom"
import { Footer } from "../core/Footer"
import { Navbar } from "../core/Navbar"
import { useEffect, useState } from "react";
import { getUserRentals } from "./apihelper/rentalDbcalls";
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";


export const RentalCategoryWise=()=>{

    const navigate=useNavigate();

    const {userId}=useParams();
    const {filter}=useParams();
    //console.log(userId)

    const [rentals,setRentals]=useState();
    console.log(rentals);
    useEffect(()=>{
      const getInfo=async(userId,filter)=>{
        const data=await getUserRentals(userId,filter);
        if(data.err){
            
        }else{
           setRentals(data.msg);
        }
      }
      getInfo(userId,filter);
    },[userId,filter])
    return(
    <>
        <Navbar/>
         <div className="flex flex-wrap m-5 gap-2">
        {
        rentals && rentals.length>0 && rentals.map((item,index)=>{
          const bookingDate=new Date(item.dateOfbooking);
          return (
          <div key={index}>
            <div className="card w-76 bg-base-100 shadow-xl hover:shadow-2xl">
                <figure>
                <img src={`data:${item.product.productPoster.contentType};base64,${Buffer.from(item.product.productPoster.data).toString('base64')}`} 
                  alt='product-poster' style={{width:'180px',height:'100px'}} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{filter==='failed'?'FAILED BOOKING':'BOOKED'}</h2>
                    <p>Booking Date: {bookingDate.getDate()}-{bookingDate.getMonth()+1}-{bookingDate.getFullYear()}</p>
                    <p>Booking Time: {bookingDate.getHours()}:{bookingDate.getMinutes()}</p>
                    <p>Total Bill: Rs.{item.totalCost}/-</p>

                    <div className="card-actions justify-end">
                    <button className={`btn ${filter!=='failed'?'bg-lime-500':'bg-red-500'} text-white`}  onClick={()=>{
                         navigate(`/user/rentals/${filter}/${item._id}`)
                         }}>View Info</button>
                    </div>
                </div>
            </div>
          </div>
          )
        })
      }
      </div>
      <Footer/>
    </>
    )
}