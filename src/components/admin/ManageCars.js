import { useState } from "react";
import { Card } from "../core/Card";
import {createProduct} from './apihelper/adminCalls';

//redux
import {getUserId} from '../../redux/userSlice';
import {useSelector } from 'react-redux';

export const ManageCars=()=>{
    
    //user id
    const temp=useSelector(getUserId);
    const userId=temp.payload.user.userId;

    //for showing and closing product form
    const [showAddForm,setShowAddForm]=useState(false);
    const handleAdd=(e)=>{
        setShowAddForm(true);
    }
    const handleClose=(e)=>{
        setShowAddForm(false);
    }

    const [form,setForm]=useState({
        title:'',
        description:'',
        mileage:0,
        age:0,
        pricePerHour:0,
        pricePerDay:0,
        gstTax:0,
        location:'', 
        productPoster:'',
        //productAdditionalPosters:[],
        numberOfPieces:0,
        numberOfPiecesAvailable:0,
        available:true
    })
    console.log(form);


    const handleChange=(e)=>{
        if((e.target.id==='productPoster' || e.target.id==='productAdditionalPosters') &&  e.target.files.length>0){
            const reader = new FileReader();
            const previewTag=document.getElementById('mainPoster');
            const temp1=e.target.files[0];
            // console.log(temp1.filename)
            reader.readAsDataURL(temp1);
            reader.onload=()=>{
            // console.log(reader.result);
              previewTag.src=reader.result;
              setShowClosePreview(true)
            }
            setForm({...form,[e.target.id]:e.target.files[0]})
        }else{
            setForm({...form,[e.target.id]:e.target.value})
        }
      
    }
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in form) {
                const element = form[key];
                if(key==='available'){
                    if(element==='YES') formData.append(key,true)
                    else formData.append(key,false)
                }else{
                    formData.append(key,element);
                } 
            }
            console.log(formData);
            const data=await createProduct(formData,userId);
            if(data && data.err){
                setSuccess('');
                setError(data.err);
            }else{
                setForm({
                    title:'',
                    description:'',
                    mileage:0,
                    age:0,
                    pricePerHour:0,
                    pricePerDay:0,
                    gstTax:0,
                    location:'', 
                    productPoster:'',
                    //productAdditionalPosters:[],
                    numberOfPieces:0,
                    numberOfPiecesAvailable:0,
                    available:true
                  })
                setError('');
                setSuccess(`${data.msg.title} is created`);
                setTimeout(() => {
                    setSuccess('');
                }, 8000);
            }

        } catch (error) {
            console.log(error)
        }
    }

    //for showing and closing product poster preview
    const [showClosePreview,setShowClosePreview]=useState(false);
    //console.log(showClosePreview)
    const handleClosePreview=()=>{  
        setShowClosePreview(false);
        const previewTag1=document.getElementById('mainPoster');
        previewTag1.src='';
        setForm({...form,productPoster:''});
    }

    return(
        <div className="mt-2">
               <h1 className="font-bold text-xl text-center">Manage Cars</h1>

               <div className="w-100 flex justify-center">
                    {error && 
                    <div className="bg-red-400 p-2 text-center text-white rounded w-fit ">
                    <p>{error}</p>
                    </div>}
                    {success && 
                    <div className="bg-green-400 p-2 text-center text-white rounded w-fit">
                    <p>{success}</p>
                    </div>}
                </div>

               <button className="p-2 bg-lime-600 text-white rounded" onClick={(e)=>{
                handleAdd(e)
               }}>Add Item</button>
               <div className={showAddForm?'float-right mr-5 bg-black rounded-full p-1 cursor-pointer':'hidden'}  onClick={(e)=>{
                    handleClose(e)
                    }}>
                <svg width="10px" height="10px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21.32L21 3.32001" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3.32001L21 21.32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
               {showAddForm && <div className="flex flex-col p-5 w-2/3 gap-1">
               
                  <label for="title" className="font-bold">Title</label>
                  <input  id="title" placeholder="Mahindra XUV 500" className="border-2 border-slate-300 rounded p-1" 
                  value={form.title} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="description" className="font-bold">Description</label>
                  <input  id="description" placeholder="Brand New 2022 Model" className="border-2  border-slate-300 rounded  p-1"
                  value={form.description} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="mileage" className="font-bold">Mileage</label>
                  <input  id="mileage" placeholder="50 km/hr" className="border-2  border-slate-300 rounded  p-1"
                  value={form.mileage} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="age" className="font-bold">Age</label>
                  <input  id="age" placeholder="5" className="border-2  border-slate-300 rounded  p-1"
                  value={form.age} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="pricePerHour" className="font-bold">Price/Hr</label>
                  <input  id="pricePerHour" placeholder="100" className="border-2  border-slate-300 rounded  p-1"
                  value={form.pricePerHour} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="pricePerDay" className="font-bold">Price/Day</label>
                  <input  id="pricePerDay" placeholder="500" className="border-2  border-slate-300 rounded  p-1"
                  value={form.pricePerDay} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="gstTax" className="font-bold">Gst Tax (in %)</label>
                  <input  id="gstTax" placeholder="12" className="border-2 border-slate-300 rounded  p-1"
                  value={form.gstTax} onChange={(e)=>{
                    handleChange(e)
                  }}/>
                  <label for="location" className="font-bold">Location</label>
                  <select  id="location" className="border-2 border-slate-300 rounded  p-1" 
                  value={form.location} onChange={(e)=>{
                    handleChange(e)
                  }}>
                  <option></option>
                    <option>Hyderabad</option>
                    <option>Bangalore</option>
                   </select>
                    <label for="numberOfPieces" className="font-bold">Number Of Pieces</label>
                    <input  id="numberOfPieces" placeholder="12" className="border-2 border-slate-300 rounded  p-1"  
                    value={form.numberOfPieces} onChange={(e)=>{
                        handleChange(e)
                      }}/>
                    <label for="numberOfPiecesAvailable" className="font-bold">Available Pieces</label>
                    <input  id="numberOfPiecesAvailable" placeholder="10" className="border-2 border-slate-300 rounded  p-1"
                    value={form.numberOfPiecesAvailable} onChange={(e)=>{
                        handleChange(e)
                      }}/>
                    <label for="available" className="font-bold">Avaiable</label>
                    <select  id="available" className="border-2 border-slate-300 rounded  p-1"
                    value={form.available} onChange={(e)=>{
                        handleChange(e)
                      }}>
                    <option></option>
                    <option>YES</option>
                    <option>NO</option>
                  </select>
                    <div className="my-2">
                        <div className="flex items-center space-x-6 ">
                            <span className="font-bold">Main Poster</span>
                            <input type="file" id="productPoster"  onChange={(e)=>{
                                handleChange(e)
                            }}/>
                        </div>
                        <div className={showClosePreview?'float-right mr-5  rounded-full p-1':'hidden'}  onClick={(e)=>{
                            handleClosePreview(e)
                            }}>
                        <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                        <img src="" alt="poster" id="mainPoster" className={form.productPoster?'':'hidden'}/>
                    </div>
                    {/* <div className="mt-2">
                    <div className="flex items-center space-x-6 ">
                            <span className="font-bold">Additional Posters</span>
                            <input type="file" id="productPoster" onChange={(e)=>{
                                handleChange(e)
                            }}/>
                        </div>
                    </div> */}
                    <button className="rounded bg-lime-600 text-white p-2 mt-3 font-semibold"
                    onClick={(e)=>handleSubmit(e)}>Submit</button>
               </div>}
               <div className="mt-5 flex flex-wrap">
                <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
                <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
                <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
                <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
                <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
               </div>
          </div>
    )
}