import {getRole} from '../../redux/roleSlice';
import {useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


export const PrivateRoutes=()=>{

    const temp1=useSelector(getRole);
    const userRole=temp1.payload.role.role;
    const userId=temp1.payload.user.userId;
    //console.log(userRole)
    return(
       <div>
       {(userRole && userId)?<Outlet />:''}
       </div>
    )
}