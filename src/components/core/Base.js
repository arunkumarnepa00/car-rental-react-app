import {Navbar} from './Navbar';
import { Footer } from './Footer';
import offerPoster from '../../assets/offer-poster.jpg';
import { CardSlides } from './CardSlides';
import { SearchBar } from './SearchBar';
import { useNavigate } from 'react-router-dom';


export const Base=()=>{

    const navigate=useNavigate();

    return(
        <>
        <Navbar/>
        <div className='w-100 flex justify-center mx-5 sm:mx-0'>
            <div className='text-center mt-5 w-fit bg-blue-200 p-2 sm:p-5 bg-cover rounded sm:flex sm:items-center sm:justify-center relative'
            style={{backgroundImage:`url(${offerPoster})`}} >
                <img src={require('../../assets/offer-ribbon.png')} width="50px" height="50px" className='absolute -left-5 -top-4' alt="offer-ribbon"/>
                <p className='text-black font-bold sm:text-xl text-xs '>**Mega Offer** </p>
                <p className='text-black font-bold sm:text-xl text-xs'> &nbsp;&nbsp; Flat 5% discount on all cars. Hurry up💜💜</p>
            </div>
        </div>
        
        <div className="flex items-center w-100 justify-center mt-5 sm:mt-1" >
          <img src={require('../../assets/poster-2.png')} width="32%" height="40%" className='' alt="poster-1"/>
          <img src={require('../../assets/audi-A3.png')} width="50%" height="50%" className='' alt="poster-2"/>
        </div>

        <SearchBar/>
        
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
            <img src={require('../../assets/poster-8.webp')} alt="poster-3"/>
        </div>
        <div className='mt-20 mb-5 w-full'>  
            <p className='text-lg sm:text-2xl font-semibold text-center font-sans'>Pick  your favourite car.
            Offer ends soon⏳</p> 
            {/* flex justify-center items-center */}
            <div className='mt-5 flex flex-wrap justify-center'>
                <CardSlides/>
            </div>
            <div className='w-100 mr-5 mb-20'>
              <button className='btn-sm text-white bg-black font-medium my-2 rounded float-right'
              onClick={()=>{
                navigate('/explore/products')
              }}>View all</button>
            </div>
        </div>

        <Footer/>
        </>
    )
}