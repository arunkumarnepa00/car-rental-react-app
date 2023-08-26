import {useEffect,useState} from 'react';

import { getUserInfo } from './apihelper/coreDbCalls';
import { Buffer } from 'buffer';

export const UserNavBar=(props)=>{

    const userId=props.userId;

    const [user,setUser]=useState({});
    console.log(user);
    useEffect(()=>{
        const getuserDetails=async()=>{
        const data=await getUserInfo(userId);
        if(data.err){
            //setError(data.err);
        }else{
            setUser(data.user);
        }
    }
    getuserDetails();

    },[userId]) 
    
    let img;
    if(Object.keys(user).length>0){
        //const imgTag=document.getElementById('user-dp');
        console.log(user.dp)
        img=`data:${user.dp.contentType};base64,${Buffer.from(user.dp.data).toString('base64')}`
    } 
    console.log(img)
    return (
    <>
     <li className=''>
        <img src={img || require('../../assets/EmptyProfileDp.jpg')}
        alt='user-profile' id="user-dp" className='rounded-full' width="50px" height="50px"/>
      </li>
    </>
    )
}
