import { useState } from "react";
import { Footer } from "../core/Footer";
import { Navbar } from "../core/Navbar";
import { loginUser } from "./apihelper/authcalls";
import { useNavigate } from "react-router-dom";

//redux
// import { useDispatch } from 'react-redux';
// import {setUserId} from '../../redux/userSlice';
// import { setRole } from "../../redux/roleSlice";

export const Signin = () => {

  //const dispatch = useDispatch();


  const [form,setForm]=useState({
    email:'',
    password:''
  })
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const handleChange=(e)=>{
    const field=e.target.id;
    const value=e.target.value;
    setForm({...form,[field]:value});
  }
  // console.log(form)

  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault();
    const data=await loginUser(form);
    if(data.err){
      setLoading(false);
       setError(data.err);
    }else{
      setLoading(false);
      setError(false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role",data.user.role);
   
      //dispatch(setUserId({userId:data.user._id}));
      //dispatch(setRole({role:data.user.role}));
      
       navigate('/');
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-100 flex justify-center mt-5">
      {error && 
        <div className="bg-red-400 p-2 text-center text-white rounded w-fit">
        <p>{error}</p>
        </div>
      }
      {
        loading &&
        <div  class="bg-zinc-700 p-2 text-center text-white rounded flex">
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-3 ...">
            <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            Loading...
        </div>
      }
      </div>
      <form className="m-5 p-5">
        <div className="space-y-12">
          <div className="pb-6">
            <h2 className="text-xl font-bold leading-7 text-gray-900">
              Enter Details
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address *
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>{
                      handleChange(e);
                    }}
                    value={form.email}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>{
                      handleChange(e);
                    }}
                    value={form.password}
                  />
                  <p className="text-blue-800 text-sm mt-2">Forgot Password</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e)=>{
                handleSubmit(e);
              }}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <Footer />
     
    </>
  );
};
