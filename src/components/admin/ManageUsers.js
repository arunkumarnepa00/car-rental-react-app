import { useEffect, useState } from "react";
import { getAllUsers } from "./apihelper/adminCalls";
import {useSelector } from 'react-redux';


export const ManageUsers=()=>{

    //user id
    const userId=useSelector(state=>state.user.userId);

    //loading products
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const [loading,setLoading]=useState(false);
    const [users,setUsers]=useState();
    useEffect(()=>{
       setLoading(true)
        const getInfo=async(userId)=>{
           const data=await getAllUsers(userId);
           if(data.err){
            setLoading(false);
            setError(data.err);
           }else{
            setLoading(false);
            setSuccess('users loaded')
            setUsers(data.msg);
            setTimeout(() => {
                setSuccess('');
            }, 5000);
           }
        }
        getInfo(userId);
    },[userId])


    return(
        <div className="mt-2 w-100">
        <h1 className="font-bold text-xl text-center">Manage Users</h1>

        <div className="w-100 flex justify-center mt-2">
            {error && 
                <div className="bg-red-400 p-2 text-center text-white rounded w-fit ">
                <p>{error}</p>
                </div>
            }
            {success && 
                <div className="bg-green-400 p-2 text-center text-white rounded w-fit">
                <p>{success}</p>
                </div>
            }
            {loading &&
                <div  class="bg-zinc-700 p-2 text-center text-white rounded flex">
                 <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-3 ...">
                    <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                    Loading...
                </div>
            }
        </div>

        <div className="mt-5 flex flex-wrap justify-center">
                {
                  users && users.length>0 && users.map((i,index)=>{
                    return (
                      <div key={index}>1</div>
                    )
                  })
                }
               </div>
        </div>
    )
} 