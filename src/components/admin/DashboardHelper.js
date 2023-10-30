import { ManageCars } from "./ManageCars";
import { ManageUsers } from "./ManageUsers";

export const DashboardHelper=(props)=>{

   const menuItem=props.item;
   console.log(menuItem)
    return(
       <div>
          {menuItem===1 && <ManageCars/>}
          {menuItem===2 && <ManageUsers/>}
      </div>
   )
}