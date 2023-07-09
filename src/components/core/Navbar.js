import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export const Navbar=()=>{

  const [emenu,setEMenu]=useState(false);
  // console.log(emenu);
  const handleMenu=()=>{
      setEMenu(true);
  }
  const handleClose=()=>{
    setEMenu(false);
  }
  const navigate = useNavigate();

    return(
        <>
          <div className="w-100 bg-black list-none flex justify-between px-2 items-center py-3">
            <div className="flex sm:space-x-4">
              <li className="m-1 bg-white rounded py-1 hover:cursor-pointer" onClick={()=>{
                navigate('/')
              }}>
                <img src={require('../../assets/logo.png')} width='50px'/>
              </li>
              <h1 className="text-white font-semibold text-lg my-auto">Car Rentals</h1>
            </div>
            <div className={emenu?'hidden':'sm:hidden'} onClick={()=>{
              handleMenu();
            }}>
             <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>
            </div>
            <div className={emenu?'':'hidden'} onClick={()=>{
              handleClose();
            }}>
              <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.32L21 3.32001" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M3 3.32001L21 21.32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* normal menu */}
            <div className='flex sm:space-x-4 hidden sm:flex'>
              <li className="rounded-md bg-white hover:bg-black text-black hover:text-white py-1 px-2 font-semibold text-lg cursor-pointer"
              onClick={()=>{
                navigate('/signin');
              }}>login</li>
              <li className="rounded-md bg-black hover:bg-white text-white hover:text-black py-1 px-2 font-semibold text-lg cursor-pointer"
              onClick={()=>{
                navigate('/signup');
              }}>signup</li>
            </div>
          </div> 
          
          {/* mobile view menu */}
          <div className={emenu?'w-100 bg-black list-none sm:hidden py-2 px-4 flex flex-col justify-center':'hidden'}>
                <li className="rounded-md bg-black w-fit hover:bg-white text-white hover:text-black py-1 px-2 font-semibold cursor-pointer"
                onClick={()=>{
                  navigate('/signin');
                }}>login</li>
                <li className="rounded-md bg-black w-fit hover:bg-white text-white hover:text-black py-1 px-2 font-semibold cursor-pointer"
                onClick={()=>{
                  navigate('/signup');
                }}>signup</li>
          </div>
        </>
    )
}