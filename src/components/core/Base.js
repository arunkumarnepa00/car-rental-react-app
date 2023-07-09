import {Navbar} from './Navbar';
import { Footer } from './Footer';
import { Card } from './Card';

import offerPoster from '../../assets/offer-poster.jpg';

export const Base=()=>{
    return(
        <>
        <Navbar/>
        <div className='w-100 flex justify-center mx-5 sm:mx-0'>
            <div className='text-center mt-5 w-fit bg-blue-200 p-2 sm:p-5 bg-cover rounded sm:flex sm:items-center sm:justify-center'
            style={{backgroundImage:`url(${offerPoster})`}} >
                <p className='text-black font-bold sm:text-xl text-xs'>**Mega Offer** </p>
                <p className='text-black font-bold sm:text-xl text-xs'> &nbsp;&nbsp; Flat 5% discount on all cars. Hurry up💜💜</p>
            </div>
        </div>
        
        <div className="flex items-center w-100 justify-center mt-5 sm:mt-1" >
          <img src={require('../../assets/poster-2.png')} width="32%" height="40%" className=''/>
          <img src={require('../../assets/poster-6.jpg')} width="50%" height="50%" className=''/>
        </div>

        <div className='p-2 flex flex-col space-y-2 sm:space-y-0 mx-5 sm:mx-0 sm:flex sm:flex-row sm:justify-center sm:space-x-6 py-6
           '>
            <select type='dropdown' name="location" id="location" className=''>
                <option className='' value="">Location
                </option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
            </select>
            <select type='dropdown' name="RentalCategory" id="RentalCategory" className=''>
                <option value="">Type</option>
                <option value="hours">Hourly</option>
                <option value="days">Daily</option>
            </select>
            <input type="number" id="time" name="time" step="1" placeholder="hrs/days" className=''/>
            <button className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600'>
                SEARCH
            </button>
        </div>
        <div className='border-t-1 mt-10 font-sans'>
             <p className='text-xl sm:text-2xl font-semibold text-center'>Effordable prices</p>
             <div className='flex flex-col items-center sm:flex-row justify-center sm:space-x-20 mt-5 mx-5 sm:mx-0 text-sm sm:text-base'>
                <div className='p-5 bg-black text-white list-[square] rounded space-y-2 sm:px-8 my-4 sm:my-0 w-[200px] sm:w-fit'>
                    <li className='list-none text-center font-semibold sm:text-xl'>Hourly</li>
                    <li>Rs.100/Hour <span className='text-xs'>(starting)</span></li>
                    <li>Original DL</li>
                    <li>Govt ID Proof</li>
                    <li>Residentail Proof</li>
                    <li>Rs.50/each extra hr</li>
                    <li className='line-through'>Petrol Return</li>
                    <li className='line-through'>Trail Rides</li>
                </div>
                <div className='p-5 bg-black text-white list-[square] rounded space-y-2 sm:px-8 mb-20 sm:mb-0 w-[200px] sm:w-fit'>
                    <li className='list-none text-center font-semibold text-xl'>Daily</li>
                    <li>Rs.1200/Day <span className='text-xs'>(starting)</span></li>
                    <li>Original DL</li>
                    <li>Govt ID Proof</li>
                    <li>Residentail Proof</li>
                    <li>Rs.100/each extra hr</li>
                    <li className='line-through'>Petrol Return</li>
                    <li className='line-through'>Trail Rides</li>
                </div>
             </div>
            
        </div>
        <div className='w-100 mt-5'>
            <img src={require('../../assets/poster-8.webp')}/>
        </div>
        <div className='mt-20 mx-5 sm:mx-0'>  
        <p className='text-xl sm:text-2xl font-semibold text-center font-sans'>Pick  your favourite car.
        Offer ends soon⏳</p> 
            <div className='flex flex-wrap justify-center items-center mt-5 '>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <p className='text-blue-800 font-medium text-end '>View all </p>
            </div>
        </div>
        <Footer/>
        </>
    )
}