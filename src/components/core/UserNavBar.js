import {useEffect,useState} from 'react';
import { getUserInfo } from './apihelper/coreDbCalls';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

export const UserNavBar=(props)=>{

    const userId=props.userId;
    const navigate=useNavigate();

    const [user,setUser]=useState({});
    //console.log(user);
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
        //console.log(user.dp)
        img=`data:${user.dp.contentType};base64,${Buffer.from(user.dp.data).toString('base64')}`
    } 
    //console.log(img)

    return (
    <div className=''>
     <li className='cursor-pointer'>
        <img src={img || require('../../assets/EmptyProfileDp.jpg')}
        alt='user-profile' id="user-dp" className='rounded-full' style={{width:'35px',height:'35px'}}
        onClick={()=>{
            navigate(`/user/${userId}/profile`)
        }}/>
      </li>
    </div>
    )
}
