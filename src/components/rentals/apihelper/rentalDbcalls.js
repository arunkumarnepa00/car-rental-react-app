const getProduct=async(productId)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${productId}`,{
            method:"GET",
            // headers:{
            //     'Content-Type':"application/json"
            // }
           });
        const data=response.json();
        //console.log(data)
        return data;
    } catch (error) {
       console.log(error);   
    }
}


const createOrder=async(details)=>{
   try {
    const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/${details.product_id}/razorpay/checkout`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(details)
           });
        const data=response.json();
        //console.log(data)
        return data;
   } catch (error) {
      console.log(error);
   }
}

const getUserRentals=async(userId,filter)=>{
  try {
   const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/rentals/${filter}`,{
      method:"GET"
     });
      const data=response.json();
      //console.log(data)
      return data;
  } catch (error) {
   console.log(error);
  }
}

const getRental=async(rentalId)=>{
   try {
      const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/rentals/${rentalId}`,{
         method:"GET"
      });
      const data=response.json();
      //console.log(data)
      return data;
      
   } catch (error) {
      console.log(error);
   }
}


const getUserDetailsPayment=async(userId)=>{
   try {
      const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getInfoPC/${userId}`,{
         method:"GET"
      });
      const data=response.json();
      //console.log(data)
      return data;
      
   } catch (error) {
      console.log(error);
   }
}

export {getProduct,createOrder,getUserRentals,getRental,getUserDetailsPayment}