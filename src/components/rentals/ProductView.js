import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "./apihelper/rentalDbcalls";
import {Navbar} from '../core/Navbar';
import { Footer } from '../core/Footer';
import { Buffer } from "buffer";
import { createOrder } from "./apihelper/rentalDbcalls";
import { getUserDetailsPayment } from "./apihelper/rentalDbcalls";

//redux
// import {useSelector } from 'react-redux';

export const ProductView=()=>{

    let today=new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
 
    const {userId} = useParams();
    const [user,setUser]=useState({});
    //const userId=useSelector(state=>state.user.userId);
    //const userId=temp.payload.user.userId;

    const { productId } = useParams();
    const [product,setProduct]=useState({});

    let img='';
    if(product && Object.keys(product).length>0){
         img=`data:${product.productPoster.contentType};base64,${Buffer.from(product.productPoster.data).toString('base64')}`
    }

    //price calculation
    const [pricing,setPricing]=useState({
        category:'days',
        time:1,
        rentTime:9,
        rentDate:today
    })
    const [payable,setPayable]=useState({
        finalprice:0,
        gstCalc:0,
        totalPayable:0
    })
    const handleChange=(e)=>{
        
        //if start time is night 9 pm its taken as day trip
        if(e.target.id==='rentTime' && e.target.value==='21'){
            console.log('.......here.....')
            setPricing({...pricing,category:'days',time:1})
        }else{
            setPricing({...pricing,[e.target.id]:e.target.value})
        }
      
        if(e.target.id==='category'){
            if(e.target.value==='days'){
                setPayable({
                    finalprice:product.pricePerDay*pricing.time,
                    gstCalc:(product.pricePerDay*pricing.time)*(product.gstTax/100),
                    totalPayable:(product.pricePerDay*pricing.time)+(product.pricePerDay*pricing.time)*(product.gstTax/100)
                })
            }else{
                setPayable({
                    finalprice:product.pricePerHour*pricing.time,
                    gstCalc:(product.pricePerHour*pricing.time)*(product.gstTax/100),
                    totalPayable:(product.pricePerHour*pricing.time)+(product.pricePerHour*pricing.time)*(product.gstTax/100)
                })
            }        
        }
        else if(e.target.id==='time'){
            if(pricing.category==='days'){
                setPayable({
                    finalprice:product.pricePerDay*e.target.value,
                    gstCalc:(product.pricePerDay*e.target.value)*(product.gstTax/100),
                    totalPayable:(product.pricePerDay*e.target.value)+(product.pricePerDay*e.target.value)*(product.gstTax/100)
                })
            }else{
                setPayable({
                    finalprice:product.pricePerHour*e.target.value,
                    gstCalc:(product.pricePerHour*e.target.value)*(product.gstTax/100),
                    totalPayable:(product.pricePerHour*e.target.value)+(product.pricePerHour*e.target.value)*(product.gstTax/100)
                })
            }  
        }
    }
    //console.log(payable)


      //checkout visibility
      //const [checkout,setCheckout] =useState(false);
  
      const handleCheckout=async()=>{
         
          const data=await createOrder({
            totalBill:payable.totalPayable,
            tax:payable.gstCalc,
            bill:payable.finalprice,
            userId:userId,
            productId:productId,
            rentCategory:pricing.category,
            rentStartDate:pricing.rentDate,
            rentStartTime:pricing.rentTime,
            rentDuration:pricing.time
        })
          if(data.err){

          }else{
            const options = {
                "key": process.env.REACT_APP_RAZORPAY_CLIENT_ID, // Enter the Key ID generated from the Dashboard
                "amount":parseInt(payable.totalPayable), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Car Rental", //your business name
                "description": "Booking Transaction",
                "image": require('../../assets/logo.png'),
                "order_id": data.msg.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/razorpay/capture`,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": `${user.firstName} ${user.lastName}`, //your customer's name
                    "email": `${user.email}`, 
                    "contact": `${user.mobile}`  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let rzp1 = new window.Razorpay(options);
            rzp1.open();
          }
      }
    //   const handleCloseCheckout=()=>{
    //       setCheckout(false);
    //   }

   

    //loading product
    useEffect(()=>{
        const getInfo=async(prodId)=>{
            const data=await getProduct(prodId);
            if(data.err){

            }else{
               setProduct(data.msg)

               setPayable({
                finalprice:data.msg.pricePerDay,
                gstCalc:(data.msg.pricePerDay)*(data.msg.gstTax/100),
                totalPayable: (data.msg.pricePerDay) + (data.msg.pricePerDay)*(data.msg.gstTax/100)
               })
            }
        }
        getInfo(productId);
        
        const getInfo2=async(userId)=>{
            const data=await getUserDetailsPayment(userId)
            if(data.err){

            }else{
                //console.log(data)
                setUser(data.user)
            }
        }
        getInfo2(userId)

    },[productId,userId])
    //console.log(user)
    
    //console.log(window)

    return (
        <>
        <Navbar/>
        <div className="relative">
        {/* <div className={checkout?'absolute left-2/3 top-8 z-10 rounded-full':'hidden'}  onClick={()=>{
              handleCloseCheckout();
            }}>
              <svg width="15px" height="15px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </div> */}
        {/* {checkout && <Checkout productId={product._id} price={payable.totalPayable}/>} */}
        </div>
        <div className="mt-5 lg:grid lg:grid-cols-3 lg:gap-2 mb-10">
            <div className="flex flex-col items-center">
                <img src={img} alt="Product"  width='500px' height='500px'/>
                <button className="bg-black text-white font-semibold mt-5 p-2 rounded w-1/3 hover:bg-lime-500"
                onClick={()=>{
                    handleCheckout()
                }}>Book Now</button>
            </div>
            <div className="m-5 lg:m-0 lg:col-span-2">
                <h1 className="text-4xl font-bold">{product.title}</h1>
                <p className="text-xl">{product.description}</p>
                
                <p className="flex my-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>&nbsp;{product.location}
                </p>
                
                <div className="">
                <div className="text-black mt-5 space-y-2">
                    <h1 className="text-xl font-semibold">Features</h1>
                    <p>Mileage: {product.mileage} kmpl</p>
                    <p>Kilometers Travelled: {product.age} Kms</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-semibold">Pricing</h1>
                    <div className="mt-2 space-x-2">
                    
                    <div className="flex flex-col lg:inline">
                    <label htmlFor="rentDate">Date: </label>
                    <input type="date" id="rentDate" min={today} value={pricing.rentDate} onChange={(e)=>{
                        handleChange(e);
                    }}/>
                    <label htmlFor="rentTime">Time: </label>
                    <select type='dropdown' name="rentTime" id="rentTime" onChange={(e)=>{
                        handleChange(e);
                    }}>
                    <option value="9">09:00 AM</option>
                     <option value="10">10:00 AM</option>
                     <option value="11">11:00 AM</option>
                     <option value="12">12:00 PM</option>
                     <option value="13">01:00 PM</option>
                     <option value="14">02:00 PM</option>
                     <option value="15">03:00 PM</option>
                     <option value="16">04:00 PM</option>
                     <option value="17">05:00 PM</option>
                     <option value="18">06:00 PM</option>
                     <option value="19">07:00 PM</option>
                     <option value="20">08:00 PM</option>
                     <option value="21">09:00 PM</option>
                    </select>
                    <label htmlFor="category">Category: </label>
                    <select type='dropdown' name="category" id="category" className='' value={pricing.category}
                        onChange={(e)=>{
                            handleChange(e)
                        }}>
                            <option value="hours">Hourly</option>
                            <option value="days">Daily</option>
                    </select>
                    <label htmlFor="time">Duration: </label>
                    <input type="number" id="time" name="time" step="1" placeholder="Duration" className='' value={pricing.time} min='0'
                    max={pricing.category==='hours'?21-`${pricing.rentTime}`:7}
                     onChange={(e)=>{
                            handleChange(e)
                        }}/>
                    </div>
                    </div>
                    <div className="spcae-y-2 mt-2">
                        <p>Price = Rs.{pricing.category==='hours'?product.pricePerHour:product.pricePerDay}</p>
                        <p>Duration = {pricing.time} {pricing.category==='hours'?'hr(s)':'day(s)'}</p>
                        <p>Final Price = Rs.{payable.finalprice}</p>
                        <p>GST = {product.gstTax} %</p>
                        <p>GST Calculated = Rs.{payable.gstCalc} </p>
                        <p>Total Payable = Rs.{payable.totalPayable}</p>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
    )
}


