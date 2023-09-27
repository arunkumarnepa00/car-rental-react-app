import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { useState,useEffect } from "react";
import { Card } from "./Card";
import { getAllProducts } from "./apihelper/coreDbCalls";
import { SearchBar } from "./SearchBar";

export const Explore=()=>{

    const [products,setProducts]=useState();
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        setLoading(true);
        const getInfo=async()=>{
          const data=await getAllProducts();
          if(data.err){

          }else{
            setProducts(data.msg)
            setLoading(false)
          }
        }
        getInfo();
    },[])

    return(
        <>
          <Navbar/>
          <div className="w-100 flex justify-center">
          {
          loading &&
          <div  className="bg-zinc-700 p-2 text-white rounded flex mt-2">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-3 ...">
              <path d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              Loading...
          </div>
          }
          </div>
          <SearchBar/>
          <hr/>
         <div className="flex flex-wrap justify-center mt-5">
          {
              products && products.length>0 && products.map((i,index)=>{
                return <Card poster={i.productPoster} carname={i.title} price={i.pricePerDay} carAge={i.age} mileage={i.mileage} location={i.location} 
                key={index} source='home' id={i._id}/>
              })
          }
          </div>
          <Footer/>
        </>
    )
}