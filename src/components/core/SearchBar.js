import { useState } from "react";
import { searchProducts } from './apihelper/coreDbCalls';
import { Card } from "./Card";

export const SearchBar=()=>{

    //search
    const [searchForm,setSearchForm]=useState({
        location:'',
        rentalCategory:'',
        time:1
    })
    const handleChange=(e)=>{
        setSearchForm({...searchForm,[e.target.id]:e.target.value})
    }
    
    //close search bar
    const [showSearchResults,setShowSearchResults]=useState('');
    const handleCloseSeachResults=()=>{
        setProducts('');
        setShowSearchResults(false);
    }


    const [products,setProducts]=useState();
    const handleSearch=async(e)=>{
        e.preventDefault();
        const data=await searchProducts(searchForm);
        if(data.err){

        }else{
            setProducts(data.msg)
            setShowSearchResults(true);
        }
    }
    //console.log(products);
    

    return(
    <>
        <div className='p-2 flex flex-col space-y-2 sm:space-y-0 mx-5 sm:mx-0 sm:flex sm:flex-row sm:justify-center sm:space-x-6 py-6'>

            <select type='dropdown' name="location" id="location" className='' value={searchForm.location} 
                onChange={(e)=>{
                    handleChange(e)
                }}>
                    <option className='' value="">Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
            </select>
            <select type='dropdown' name="RentalCategory" id="rentalCategory" className='' value={searchForm.rentalCategory}
                onChange={(e)=>{
                    handleChange(e)
                }}>
                    <option value="">Type</option>
                    <option value="hours">Hourly</option>
                    <option value="days">Daily</option>
            </select>
            <input type="number" id="time" name="time" step="1" placeholder="hrs/days" className='' value={searchForm.time} min='1'
                onChange={(e)=>{
                    handleChange(e)
                }}/>
            <button className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600'
                onClick={(e)=>{
                    handleSearch(e)
                }}>
                    SEARCH
            </button>
        </div>
     
        <div className="mt-4 bg-lime-500 flex flex-wrap  justify-center gap-x-2">
        <div className={showSearchResults?'absolute right-0 p-2':'hidden'}  onClick={()=>{
              handleCloseSeachResults();
            }}>
              <svg width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.32L21 3.32001" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M3 3.32001L21 21.32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </div>
        {
            products && products.length>0 && products.map((i,index)=>{
               return <Card poster={i.productPoster} carname={i.title} price={i.pricePerDay} carAge={i.age} mileage={i.mileage} location={i.location} 
               key={index} source='home' id={i._id}/>
            })
        }
        </div>
    </>
    )
}