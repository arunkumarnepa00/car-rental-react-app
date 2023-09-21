import { useState,useEffect } from "react";
import { Card } from "./Card";
import { getAllProducts } from "./apihelper/coreDbCalls";

//redux
//import {useSelector } from 'react-redux';

export const CardSlides=()=>{
  
    // const [curr1,setCur1]=useState('0');
    // const [curr2,setCur2]=useState('1');
    // const [curr3,setCur3]=useState('2');
    // const [curr4,setCur4]=useState('3');
    // const [maxCardCount,setMaxCC]=useState(0);

    // const handleClickLeft=()=>{
    //     if(curr1<maxCardCount){
    //         let temp=curr1;
    //         setCur1(temp+1);
    //         setCur2(temp+2);
    //         setCur3(temp+3);
    //         setCur4(temp+4);
    //     }   
    // }
    // const handleClickRight=()=>{
    //     if(curr1>0){
    //         let temp=curr1;
    //         setCur1(temp-1);
    //         setCur2(temp-2);
    //         setCur3(temp-3);
    //         setCur4(temp-4);
    //     } 
    // }
    
    const [products,setProducts]=useState();

    //user id
    //const userId=useSelector(state=>state.user.userId);
    //console.log(products)

    useEffect(()=>{
        const getInfo=async()=>{
          const data=await getAllProducts();
          if(data.err){

          }else{
            setProducts(data.msg)
            // setMaxCC(data.msg.length)
          }
        }
        getInfo();
    },[])
    //console.log(products);

    return(
        <>

        
        {
            products && products.length>0 && products.map((i,index)=>{
               return <Card poster={i.productPoster} carname={i.title} price={i.pricePerDay} carAge={i.age} mileage={i.mileage} location={i.location} 
               key={index} source='home' id={i._id}/>
            })
        }
        
            {/* <div className="w-100">
                <button onClick={handleClickLeft()}>Left</button>
                    <Card card one/> 
                    <Card card two/>
                    <Card card three/>
                    <Card card four/>
                <button onClick={handleClickRight()}>Right</button>
            </div> */}
        </>
       
    )
}