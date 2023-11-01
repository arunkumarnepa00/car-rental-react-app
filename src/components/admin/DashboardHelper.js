import { ManageCars } from "./ManageCars";
import { ManageUsers } from "./ManageUsers";
import { ManageBookings } from "./ManageBookings";

export const DashboardHelper=(props)=>{

   const menuItem=props.item;
   // console.log(menuItem)
    return(
       <div>
          {menuItem===1 && <ManageCars/>}
          {menuItem===2 && <ManageUsers/>}
          {menuItem===3 && <ManageBookings/>}
      </div>
   )
}