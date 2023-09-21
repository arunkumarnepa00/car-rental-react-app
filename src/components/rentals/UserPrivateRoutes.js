import {useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authentication from '../auth/apihelper/authentication';

export const UserPrivateRoutes=()=>{
    //console.log("inside user private routes");

    const userId=authentication();
    //const userId=useSelector(state=>state.user.userId);   
    //console.log(userId)

    //console.log("after userid fetch");
    

    return(
       <div>
       {(userId)?<Outlet />:''}
       </div>
    )
}