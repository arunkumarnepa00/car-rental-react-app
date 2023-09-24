import {useSelector } from 'react-redux';
import { Outlet,useNavigate } from 'react-router-dom';


export const AuthPageAccessCheck=()=>{
    const userId=useSelector(state=>state.user.userId);
    const navigate=useNavigate();

    return(
        <>
          {userId?navigate('/'):<Outlet/>}
        </>
    )
}