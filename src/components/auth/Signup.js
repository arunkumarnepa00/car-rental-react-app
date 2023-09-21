import { Footer } from "../core/Footer"
import { Navbar } from "../core/Navbar"
import { UserCircleIcon } from '@heroicons/react/24/solid';
import {useState} from "react";
import { registerUser } from "./apihelper/authcalls";
// import { getStorage,ref,uploadBytes } from "firebase/storage";
// import FirebaseApp from "../../firebase";

export const Signup=()=>{

  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  // const storage = getStorage(FirebaseApp);


  const [form,setForm]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    dp:'',
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
  //console.log(form);
  const reader = new FileReader();

  const handleChange= (e)=>{
    const previewTag=document.getElementById('preview');
    if(e.target.id==='dp' &&  e.target.files.length>0){
      const temp1=e.target.files[0];
      //console.log(temp1.filename)
      reader.readAsDataURL(temp1);
      reader.onload=()=>{
        console.log(reader.result);
        previewTag.src=reader.result;
        // const storageRef = ref(storage, `DP/${temp1}`);
        // uploadBytes(storageRef, reader.result).then((snapshot) => {
        //   console.log('Uploaded a blob or file!');
        // });
      }
      setForm({...form,dp:temp1});
    }
    else if(e.target.id==='country' || e.target.id==='addressType'||e.target.id==='addressLine'
    || e.target.id==='city' || e.target.id==='state' || e.target.id==='zip' ){
      let field=e.target.id;
      let value=e.target.value;
      // form.addresses[field]=value;
      setForm({...form,addresses:{...form.addresses,[field]:value}})
    }
    else{
      let field=e.target.id;
      setForm({...form,[field]:e.target.value})
    }
  }

  const handleSubmit=async (e)=>{
   
    try {
      e.preventDefault();
      const formData = new FormData();
      console.log(formData)
      for (const key in form) {
        if(key!=='addresses'){
          const element = form[key];
          formData.append(key,element);
        }
      }
      let add1=JSON.stringify(form.addresses);
      formData.append("addresses",add1);

      const data= await registerUser(formData);
     //console.log(data)
      if(data && data.err){
        setSuccess('');
         setError(data.err);
        }else{
          setForm({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            dp:'',
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
          setError('');
         setSuccess(`user ${data.msg.firstName} is created. Please login`);
        }
    }catch (error) {
      console.log(error)
    }
  }

  return(
        <>
    <Navbar/>
    <form className='m-5 p-5'>

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

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-bold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be stored securely.
          </p>

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
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="example@domain.com"
                  minLength={10}
                  maxLength={10}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  value={form.mobile}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="password"
                  id="password"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="h12#Er"
                  minLength={5}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  value={form.password}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="h12#Er"
                  minLength={5}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  value={form.confirmPassword}
                />
              </div>
            </div>
            


          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-bold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo *
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {!form.dp && <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />}
                <div className={`rounded-full flex justify-center content-center   overflow-hidden ${form.dp? 'flex':'hidden'}`} style={{width:"50px",height:"50px"}}>
                  <img src="" alt="preview" id="preview" width="50px" height="50px" className="object-cover"/>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <label htmlFor="dp" className="">upload</label>
                  <input id="dp" name="dp" type="file" className="sr-only" onChange={(e)=>[
                    handleChange(e)
                  ]}
                  />
                </button>
                
              </div>
            </div>

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
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button> */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={(e)=>{
          handleSubmit(e);
        }}
        >
          Submit
        </button>
      </div>

    
    </form>
   
            <Footer/>
        </>
    )
}