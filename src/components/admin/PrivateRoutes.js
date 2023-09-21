
import {useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


export const PrivateRoutes=()=>{

    const userId=useSelector(state=>state.user.userId);
    const userRole=useSelector(state=>state.role.role);
    // const userRole=temp1.payload.role.role;
    // const userId=temp1.payload.user.userId;
    //console.log(userRole)
   
    return(
       <div>
       {(userRole==='1' && userId)?<Outlet />:''}
       </div>
    )
}