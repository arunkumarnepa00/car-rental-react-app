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

    const [rentals,setRentals]=useState({});
    const [loading,setLoading]=useState(false);
    //console.log(rentals);
    useEffect(()=>{
      setLoading(true)
      const getInfo=async(userId,filter)=>{
        const data=await getUserRentals(userId,filter);
        if(data.err){
          setLoading(false);
        }else{
           setRentals(data.msg);
           setLoading(false);
        }
      }
      getInfo(userId,filter);
    },[userId,filter])
    return(
    <>
        <Navbar/>
        <div className="w-100 flex justify-center">
          {
          loading &&
          <div  className="bg-zinc-700 p-2 text-white rounded flex mt-2">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-3 ...">
              <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              Loading...
          </div>
          }
        </div>
        {Object.keys(rentals) && <div className="mt-5 w-100 flex justify-center font-bold">
          No Rentals to Display
          </div>}
        <div className="flex flex-wrap justify-center m-5 gap-2 mb-20">
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
      <div className="fixed bottom-0 left-0 right-0">
      <Footer/>
      </div>
    </>
    )
}