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

function App() {
  return (
     <Router>
     <Routes>
       <Route exact path="/" element={<Base/>}/>
       <Route path="/signin" element={<Signin/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/admin" element={<PrivateRoutes/>}>
         <Route path="dashboard" element={<AdminDashboard/>}/>
       </Route>
       <Route path="/user/:userId/myrentals" element={<UserPrivateRoutes/>}>
         <Route path="dashboard" element={<Myrentals/>}/>
       </Route>
       <Route path="/user/rentals" element={<UserPrivateRoutes/>}>
         <Route path=":rentalId" element={<Rental/>}/>
       </Route>
      <Route path="/user/:userId/product" element={<UserPrivateRoutes/>}>
         <Route path=":productId" element={<ProductView/>}/>
      </Route>
     </Routes>
   </Router>
  );
}

export default App;
