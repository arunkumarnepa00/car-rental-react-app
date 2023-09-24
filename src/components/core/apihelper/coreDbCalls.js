const getUserInfo=async(userId)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getInfo/${userId}`,{
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

const getAllProducts=async()=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`,{
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
const getAllProductsHome=async()=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/home`,{
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

const searchProducts=async(form)=>{
    console.log(form)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/products?location=${form.location}&rentalCategory=${form.rentalCategory}&time=${form.time}`,{
            method:"GET"
           });
        const data=response.json();
        return data;
    } catch (error) {
       console.log(error);   
    }
}

export {getUserInfo,getAllProducts,searchProducts,getAllProductsHome};