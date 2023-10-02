import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../core/apihelper/coreDbCalls";
import { Navbar } from "../core/Navbar";
import { Footer } from "../core/Footer";
import { Buffer } from "buffer";
import { updateDp ,updateUserDetails} from "./apihelper/profileDbcalls";

export const Profile=()=>{
    const {userId}=useParams();
    //console.log(userId);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('')

    const [showEditForm,setShowEditForm]=useState(false);

    const [form,setForm]=useState({
        firstName:'',
        lastName:'',
        email:'',
        mobile:'',
        addresses:{
          country:'',
          addressType:'',
          addressLine:'',
          city:'',
          state:'',
          zip:''
        }
    })

    const [dp,setDp]=useState();
    const reader = new FileReader();
    //handle all input changes
    const handleChange= (e)=>{
        
        if(e.target.id==='dp' &&  e.target.files.length>0){
            const temp1=e.target.files[0];
            setDp(temp1);
            setTimeout(()=>{
                console.log("inside previre load")
                const previewTag=document.getElementById('preview');
                reader.readAsDataURL(temp1);
                reader.onload=()=>{
                  console.log(reader.result);
                  previewTag.src=reader.result;
                 }
            },2000)
        }
        else if(e.target.id==='country' || e.target.id==='addressType'||e.target.id==='addressLine'
        || e.target.id==='city' || e.target.id==='state' || e.target.id==='zip' ){
          let field=e.target.id;
          let value=e.target.value;
          setForm({...form,addresses:{...form.addresses,[field]:value}})
        }
        else{
          let field=e.target.id;
          setForm({...form,[field]:e.target.value})
        }
    }
    

    //handle dp change
    const handleDp=async(e)=>{
        setLoading(true)
      e.preventDefault();
      const Dpform=new FormData();
      Dpform.append('dp',dp)
      const data=await updateDp(Dpform,userId);
      console.log(data)
      if (data.err){
        setLoading(false)
        setError(data.err)
      }else{
        setLoading(false)
        setSuccess(data.msg)
      }
    }

    //handle fields change
    const handleFieldsChange=async(e)=>{
      setLoading(true)
      e.preventDefault();
      const data=await updateUserDetails(form,userId);
      console.log(data)
      if (data.err){
        setLoading(false)
        setError(data.err)
      }else{
        setShowEditForm(false)
        setLoading(false)
        //console.log(data)
        setSuccess(data.msg)
        setTimeout(() => {
            setSuccess('');
        }, 5000);
        setForm({
            firstName:data.user.firstName,
            lastName:data.user.lastName,
            email:data.user.email,
            mobile:data.user.mobile,
            addresses:{
              country:data.user.addresses[0].country,
              addressType:data.user.addresses[0].addressType,
              addressLine:data.user.addresses[0].addressLine,
              city:data.user.addresses[0].city,
              state:data.user.addresses[0].state,
              zip:data.user.addresses[0].zip
            }
        })
      }
    }


    //user loading
    const [user,setUser]=useState();
    // console.log(user)
    useEffect(()=>{
        setLoading(true)
        const getInfo=async(userId)=>{
            const data = await getUserInfo(userId);
            console.log(data)
            if(data.err){
                setLoading(false)
                setError(data.err)
            }else{
                setLoading(false)
                setUser(data.user)
                setForm({
                    firstName:data.user.firstName,
                    lastName:data.user.lastName,
                    email:data.user.email,
                    mobile:data.user.mobile,
                    addresses:{
                      country:data.user.addresses[0].country,
                      addressType:data.user.addresses[0].addressType,
                      addressLine:data.user.addresses[0].addressLine,
                      city:data.user.addresses[0].city,
                      state:data.user.addresses[0].state,
                      zip:data.user.addresses[0].zip
                    } 
                })
            }
        }
        getInfo(userId);
    },[userId])


    return (
        <>
          <Navbar/>
          <div className="w-100 flex justify-center mt-2">
          {error && 
            <div className="bg-red-400 p-2 text-center text-white rounded w-fit">
                <p>{error}</p>
            </div>
          }
           {success &&  
            <div className="bg-green-400 p-2 text-center text-white rounded w-fit">
             <p>{success}</p>
            </div>
          }
          {
          loading &&
          <div  className="p-2 text-black rounded flex mt-2">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-3 ...">
              <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              Loading...
          </div>
          }
          </div> 
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 m-5 mb-20">
            <div className="mx-5 sm:mx-0">
                <h1 className="font-bold text-2xl">Profile</h1> 
                {dp?
                <img src={user?`data:${user.dp.contentType};base64,${Buffer.from(user.dp.data).toString('base64')}`:''}
                alt='user-dp' style={{width:'250px',height:'200px'}} className="my-4" id='preview'/>
                :<img src={user?`data:${user.dp.contentType};base64,${Buffer.from(user.dp.data).toString('base64')}`:''}
                alt='user-dp' style={{width:'250px',height:'200px'}} className="my-4"/>
                }
                <label htmlFor="dp" className=" my-2  cursor-pointer inline-flex my-auto">
                <svg width="20px" height="25px" viewBox="-2.56 0 89.725 89.725" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group_11" data-name="Group 11" transform="translate(-1020.3 -668.175)">
                        <path id="Path_53" data-name="Path 53" d="M1066.1,682.8l-34.8,34.8a3.858,3.858,0,0,0-1.1,2.2l-.8,10.1a2.488,2.488,0,0,0,2.8,2.8l9.8-.8a3.857,3.857,0,0,0,2.2-1.1l35-35a3.041,3.041,0,0,0,.3-4.3l-9.1-9.1A3.052,3.052,0,0,0,1066.1,682.8Z" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4"/>
                        <path id="Path_54" data-name="Path 54" d="M1079.6,690.2l-7.8-7.8a3.684,3.684,0,0,1,0-5.3l5.8-5.8a3.684,3.684,0,0,1,5.3,0l7.8,7.8a3.684,3.684,0,0,1,0,5.3l-5.8,5.8A3.869,3.869,0,0,1,1079.6,690.2Z" fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
                        <path id="Path_55" data-name="Path 55" d="M1098.6,755.9h-72a4.268,4.268,0,0,1-4.3-4.3v-3.3a4.268,4.268,0,0,1,4.3-4.3h72a4.268,4.268,0,0,1,4.3,4.3v3.3A4.268,4.268,0,0,1,1098.6,755.9Z" fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
                        <path id="Path_56" data-name="Path 56" d="M1103.5,739.8" fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
                    </g>
                </svg>
                </label>
                <input type='file' id='dp'  className="sr-only" onChange={(e)=>{
                    handleChange(e)
                }}/>
                <button className="p-2 bg-black text-white border hover:bg-white hover:text-black rounded  mx-4 "
                onClick={(e)=>{
                    handleDp(e)
                }}>
                    Update
                </button>
            </div>
        
            <div className="sm:col-span-2 space-y-12 mx-5 sm:mx-0">
                <div>
                    {/* <button className="bg-blue-700 p-2 text-white rounded">Change Password</button> */}
                    <div className="my-4">
                        <p className="font-semibold text-xl">Details :</p>
                        <p>First Name   : {form.firstName}</p>
                        <p>Last Name    : {form.lastName}</p>
                        <p>Email ID     : {form.email}</p>
                        <p>Mobile       : {form.mobile}</p>
                        <p className="font-semibold text-xl">Address :</p>
                        <p>country: {form.addresses.country}</p>
                        <p>addressType: {form.addresses.addressType}</p>
                        <p>addressLine: {form.addresses.addressLine}</p>
                        <p>city: {form.addresses.city}</p>
                        <p>state: {form.addresses.state}</p>
                        <p>zip: {form.addresses.zip}</p>
                        <button className="mt-2 p-2 bg-black text-white rounded" onClick={()=>{
                            setShowEditForm(true)
                        }}>Edit Details</button>
                    </div>
                </div>
                <hr/>
                <div className={showEditForm?'float-right mr-5 bg-black rounded-full p-1 cursor-pointer':'hidden'}  onClick={(e)=>{
                    setShowEditForm(false)
                    }}>
                <svg width="10px" height="10px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21.32L21 3.32001" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3.32001L21 21.32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
                <div className={showEditForm?``:`hidden`}>
                <div className='border-b border-gray-900/10 pb-12'>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                        First name *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="john"
                        minLength={3}
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.firstName}
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="doe"
                        minLength={3}
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.lastName}
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address *
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="example@domain.com"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.email}
                        readOnly
                        />
                    </div>
                    </div>
                    <div className="sm:col-span-3">
                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                        Mobile *
                    </label>
                    <div className="mt-2">
                        <input
                        id="mobile"
                        name="mobile"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="9000000009"
                        minLength={10}
                        maxLength={10}
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.mobile}
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-lg font-bold leading-7 text-gray-900">Personal Information</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country *
                    </label>
                    <div className="mt-2">
                        <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.country}
                        >
                        <option>Select</option>
                        <option>India</option>
                        </select>
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="addressType" className="block text-sm font-medium leading-6 text-gray-900">
                        Address type *
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        name="addressType"
                        id="addressType"
                        placeholder="home"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.addressType}
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="addressLine" className="block text-sm font-medium leading-6 text-gray-900">
                        Address *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="addressLine"
                        id="addressLine"
                        autoComplete="street-address"
                        placeholder="D No:123, M G Avenue"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.addressLine}
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Mumbai"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.city}
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Maharastra"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.state}
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code *
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="zip"
                        id="zip"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="123456"
                        onChange={(e)=>{
                            handleChange(e)
                        }}
                        value={form.addresses.zip}
                        />
                    </div>
                    </div>
                </div>
                </div>
                <button className="mt-2 p-2 bg-blue-700 text-white rounded" onClick={(e)=>{
                    handleFieldsChange(e)
                }}>Update</button>
                </div>
            </div> 
          </div>
          <div className="fixed bottom-0 left-0 right-0">
            <Footer/>
          </div>
        </>
    )
}