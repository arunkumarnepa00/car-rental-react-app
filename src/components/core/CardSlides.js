// import { useState } from "react";
import { Card } from "./Card";


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
    //         setCur1(temp+2);
    //         setCur1(temp+3);
    //         setCur1(temp+4);
    //     }   
    // }
    // const handleClickRight=()=>{
    //     if(curr1>0){
    //         let temp=curr1;
    //         setCur1(temp-1);
    //         setCur1(temp-2);
    //         setCur1(temp-3);
    //         setCur1(temp-4);
    //     } 
    // }
    return(
        <>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>
            <Card carname="Honda" price="18" carAge="1500" mileage="45" location="hyderabad"/>

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