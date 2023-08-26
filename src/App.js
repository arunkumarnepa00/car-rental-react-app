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
import {Rentals}  from './components/rentals/Rentals'
import { PrivateRoutes } from './components/admin/PrivateRoutes';

function App() {
  return (
     <Router>
     <Routes>
       <Route path="/" element={<Base/>}/>
       <Route path="/signin" element={<Signin/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/admin" element={<PrivateRoutes/>}>
         <Route path="dashboard" element={<AdminDashboard/>}/>
       </Route>
       <Route path="/user/rentals/:userId" element={<Rentals/>}/>
     </Routes>
   </Router>
  );
}

export default App;
