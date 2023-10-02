import './App.css';
//router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//components
import { Base } from './components/core/Base';
import { Signin } from './components/auth/Signin';
import { Signup } from './components/auth/Signup';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {Rental}  from './components/rentals/Rental';
import { Myrentals } from './components/rentals/Myrentals';
import { PrivateRoutes } from './components/admin/PrivateRoutes';
import { ProductView } from './components/rentals/ProductView';
import { UserPrivateRoutes } from './components/rentals/UserPrivateRoutes';
import { Explore } from './components/core/Explore';
import { AuthPageAccessCheck } from './components/auth/AuthPageAccessCheck';
import { RentalCategoryWise } from './components/rentals/RentalCategoryWise';
import { Profile } from './components/profile/Profile';

function App() {
  return (
     <Router>
     <Routes>
       <Route exact path="/" element={<Base/>}/>
       <Route  path="/signin" element={<AuthPageAccessCheck/>}>
        <Route path="" element={<Signin/>}/>
       </Route>
       <Route  path="/signup" element={<AuthPageAccessCheck/>}>
        <Route path="" element={<Signup/>}/>
       </Route>
       <Route path="/admin" element={<PrivateRoutes/>}>
         <Route path="dashboard" element={<AdminDashboard/>}/>
       </Route>
       <Route path="/explore/products" element={<Explore/>}/>
       <Route path="/user/:userId/myrentals" element={<UserPrivateRoutes/>}>
         <Route path="dashboard" element={<Myrentals/>}/>
       </Route>
       <Route path="/user/:userId/rentals" element={<UserPrivateRoutes/>}>
         <Route path=":filter" element={<RentalCategoryWise/>}/>
       </Route>
       <Route path="/user/rentals" element={<UserPrivateRoutes/>}>
         <Route path=":filter/:rentalId" element={<Rental/>}/>
       </Route>
      <Route path="/user/:userId/product" element={<UserPrivateRoutes/>}>
         <Route path=":productId" element={<ProductView/>}/>
      </Route>
      <Route path="/user/:userId/profile" element={<UserPrivateRoutes/>}>
         <Route path="" element={<Profile/>}/>
      </Route>
     </Routes>
   </Router>
  );
}

export default App;
