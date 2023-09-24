//import { Footer } from "../core/Footer"
import { Navbar } from "../core/Navbar";
import { useNavigate, useParams} from "react-router-dom";

export const Myrentals=()=>{

const navigate=useNavigate();
const {userId}=useParams();

return(
    <>
    <Navbar/>
    <div className="flex flex-wrap gap-4 m-5">
    <div className="card w-56 bg-lime-400 text-white">
      <div className="card-body">
        <h2 className="card-title">UpComing Bookings</h2>
        <p>See all your upcoming rentals</p>
        <div className="card-actions justify-end">
          <button className="btn-sm font-bold point-cursor border rounded"
          onClick={()=>{
            navigate(`/user/${userId}/rentals/upcoming`)
          }}>CHECK</button>
        </div>
      </div>
    </div>
    <div className="card w-56 bg-zinc-400 text-white">
      <div className="card-body">
        <h2 className="card-title">Completed Bookings</h2>
        <p>See all your previous rentals</p>
        <div className="card-actions justify-end">
          <button className="btn-sm font-bold point-cursor border rounded"
           onClick={()=>{
            navigate(`/user/${userId}/rentals/completed`)
          }}>CHECK</button>
        </div>
      </div>
    </div>
    <div className="card w-56 bg-red-400 text-white">
      <div className="card-body">
        <h2 className="card-title">Failed Bookings</h2>
        <p>See all your upcoming rentals</p>
        <div className="card-actions justify-end">
          <button className="btn-sm font-bold point-cursor border rounded"
           onClick={()=>{
            navigate(`/user/${userId}/rentals/failed`)
          }}>CHECK</button>
        </div>
      </div>
    </div>
    </div>
    </>
)
}