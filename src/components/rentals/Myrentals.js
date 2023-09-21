import { useParams } from "react-router-dom"
import { Footer } from "../core/Footer"
import { Navbar } from "../core/Navbar"
import { useEffect, useState } from "react";
import { getUserRentals } from "./apihelper/rentalDbcalls";
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";


export const Myrentals=()=>{

  const navigate=useNavigate();

  const {userId}=useParams();
  //console.log(userId)
  const [rentals,setRentals]=useState();
  console.log(rentals);
  useEffect(()=>{
    const getInfo=async(userId)=>{
      const data=await getUserRentals(userId);
      if(data.err){
          
      }else{
         setRentals(data.msg);
      }
    }
    getInfo(userId);
  },[userId])

  // let img='';
  // if(product && Object.keys(product).length>0){
  //      img=`data:${product.productPoster.contentType};base64,${Buffer.from(product.productPoster.data).toString('base64')}`
  // }

return(
    <>
    <Navbar/>
    <div className="">
      {
        rentals && rentals.length>0 && rentals.map((item,index)=>{
          const bookingDate=new Date(item.dateOfbooking);
          return (
            //<h1>Hi</h1>
          <div key={index}>
              <div className="m-5 mx-20 border rounded shadow hover:shadow-2xl my-5 mx-4 flex justify-between h-[100px]">
              <img src={`data:${item.product.productPoster.contentType};base64,${Buffer.from(item.product.productPoster.data).toString('base64')}`} 
                  alt='product-poster' />
                 {/* <div>
                  <img src={`data:${item.product.productPoster.contentType};base64,${Buffer.from(item.product.productPoster.data).toString('base64')}`} 
                  alt='product-poster' height='50px' width="150px"/>
                 </div> */}
                <div className="my-2">
                 <p className="p-1 bg-lime-700 text-white rounded text-center">Booked</p>
                 <p>Booking Date: {bookingDate.getDate()}-{bookingDate.getMonth()}-{bookingDate.getFullYear()}</p>
                 <p>Booking Time: {bookingDate.getHours()}.{bookingDate.getMinutes()}.{bookingDate.getSeconds()}</p>
                </div>
                <div className="my-auto">
                   <p>Total Paid: Rs.{item.totalCost}/-</p>
                </div>
                <div className="my-auto m-2">
                <button className="p-1 bg-orange-700 text-white rounded hover:bg-red-600"
                onClick={()=>{
                  navigate(`/user/rentals/${item._id}`)
                }}
                >View Full Details</button>
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