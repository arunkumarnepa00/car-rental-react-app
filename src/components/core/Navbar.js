import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';


//redux
import {useDispatch } from 'react-redux';
import {setUserId} from '../../redux/userSlice';
import {setRole} from '../../redux/roleSlice';

import { UserNavBar } from './UserNavBar';

import authentication from '../auth/apihelper/authentication';

export const Navbar=()=>{
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const [userId,setNavUserId]=useState();
  const [userRole,setUserRole]=useState();
  //const userId=useSelector(state=>state.user.userId);
  //const userId=temp.payload.user.userId;
  //console.log(userId);

  
  //const userRole=useSelector(state=>state.role);
  //const userRole=temp1.payload.role.role;
  //console.log(temp1);



  //-----for mobile view navbar open and close--------//
  const [emenu,setEMenu]=useState(false);
  //console.log(emenu);
  const handleMenu=()=>{
      setEMenu(true);
  }
  const handleClose=()=>{
    setEMenu(false);
  }
  //-----for mobile view navbar open and close--------//


  const setProperties=(user,role)=>{
    if(user==='expired' && localStorage.getItem('token')){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      dispatch(setUserId({userId:user}));
      navigate('/signin');
    }
    if(user!==null){
      dispatch(setUserId({userId:user}));
      dispatch(setRole({role:role}));
    }
    setUserRole(role);
    setNavUserId(user);
  }
  useEffect(()=>{
    //console.log('---------------------')
    const user=authentication();
    const role=localStorage.getItem('role');
    setProperties(user,role);
    //console.log('navbar useeffect');
  })

  //console.log(userRole);

    return(
        <>
          <div className="w-100 bg-black list-none flex justify-between px-2 items-center py-3">
            <div className="flex sm:space-x-4">
              <li className="m-1 bg-white rounded py-1 hover:cursor-pointer" onClick={()=>{
                navigate('/')
              }}>
                <img src={require('../../assets/logo.png')} width='50px' alt="logo"/>
              </li>
              <h1 className="text-white font-semibold text-xl my-auto">Car Rentals</h1>
            </div>
            {/* ------------------------------------------ */}
            {/* mobile view */}
            {/* mobile view hamburger menu */}
            <div className={emenu?'hidden':'sm:hidden'} onClick={()=>{
              handleMenu();
            }}>
             <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>
            </div>
            {/* mobile view close button */}
            <div className={emenu?'sm:hidden':'hidden'}  onClick={()=>{
              handleClose();
            }}>
              <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.32L21 3.32001" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M3 3.32001L21 21.32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* mobile view ends */}
            {/* ------------------------------------ */}
            {/* normal menu starts*/}
            {
              !userId &&  
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
            }{
              userId  &&
              <div className='flex sm:space-x-4 hidden sm:flex items-center'>
                 <li className='text-white cursor-pointer font-medium hover:text-lg'
                 onClick={()=>{
                  navigate(`/`)
                }}>
                   Home
                </li>
                <li className='text-white cursor-pointer font-medium hover:text-lg' 
                 onClick={()=>{
                  navigate(`/explore/products`)
                }}>
                   Explore
                </li>
                <li className='text-white cursor-pointer font-medium hover:text-lg' 
                 onClick={()=>{
                  navigate(`/user/${userId}/myrentals/dashboard`)
                }}>
                   MyRentals
                </li>
                {userRole==='1' && <li className='text-white cursor-pointer font-medium hover:text-lg' 
                  onClick={()=>{
                    navigate('/admin/dashboard')
                  }}>
                   Admin
                </li>}
                {userId && <UserNavBar userId={userId} />}
                <li className="rounded-md bg-white hover:bg-black text-black hover:text-white py-1 px-2 font-semibold text-lg cursor-pointer"
                  onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    dispatch(setRole({role:0}));
                    dispatch(setUserId({setUserId:''}));
                    console.log('........logging off........');
                    console.log('........redirecting........');
                    navigate('/');
                  }}>logout</li>
              </div>
            }
            {/* normal menu ends*/}
           
          </div> 
          
          {/* mobile view menu starts*/}
          {userId && 
            <div className='absolute top-[-10px] right-12   sm:hidden'>
              <UserNavBar userId={userId} />
            </div>
          }
          <div className={emenu?'w-100 bg-black list-none sm:hidden py-2 px-4 flex flex-col justify-center':'hidden'}>
          {
              !userId && 
              <div>
              <li className="rounded-md text-lg bg-black w-fit hover:bg-white text-white hover:text-black py-1 px-2 font-semibold cursor-pointer"
                onClick={()=>{
                  navigate('/signin');
                }}>Login</li>
                <li className="rounded-md text-lg bg-black w-fit hover:bg-white text-white hover:text-black py-1 px-2 font-semibold cursor-pointer"
                onClick={()=>{
                  navigate('/signup');
                }}>Signup</li>
                </div>
            }
            {
              userId  &&
              <div>
                <li className='text-white py-1 px-2 cursor-pointer font-medium'
                 onClick={()=>{
                  navigate(`/`)
                }}>
                   Home
                </li>
                <li className='text-white py-1 px-2 cursor-pointer font-medium' 
                 onClick={()=>{
                  navigate(`/explore/products`)
                }}>
                   Explore
                </li>
                <li className='text-white py-1 px-2 cursor-pointer font-medium'
                 onClick={()=>{
                  navigate(`/user/${userId}/myrentals/dashboard`)
                }}>
                   MyRentals
                </li>
                {userRole==='1' && <li className='text-white py-1 px-2 cursor-pointer font-medium' 
                  onClick={()=>{
                    navigate('/admin/dashboard')
                  }}>
                   Admin
                </li>}
                <li className="text-white py-1 px-2 font-medium cursor-pointer"
                  onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    dispatch(setRole({role:0}));
                    dispatch(setUserId({setUserId:''}));
                    navigate('/')
                  }}>logout</li>
              </div>
            }
          </div>
          {/* mobile view menu ends*/}
        </>
    )
}