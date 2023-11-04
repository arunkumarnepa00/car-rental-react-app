// import {useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authentication from '../auth/apihelper/authentication';
import { useNavigate } from 'react-router-dom';

export const UserPrivateRoutes=()=>{
    //console.log("inside user private routes");

    const userId=authentication();
   
    const navigate=useNavigate();


    //const userId=useSelector(state=>state.user.userId);   
    //console.log(userId)
    //console.log("after userid fetch");
    
    return(
       <div>
       {!(userId==='expired' || userId===null)?<Outlet />:navigate('/signin')} 
       </div>
       //:''  ===>  :navigate('/signin')
    )
}