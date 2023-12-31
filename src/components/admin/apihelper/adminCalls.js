const createProduct=async(form,userId)=>{
    console.log(form)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/create/product`,{
            method:"POST",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            },
            body:form
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}

const deleteProduct=async(productId,userId)=>{
    //console.log(productId,userId)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/delete/product/${productId}`,{
            method:"DELETE",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            }
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}

const updateProduct=async(form,userId,productId)=>{
    console.log(form)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/update/product/${productId}`,{
            method:"PUT",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            },
            body:form
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
} 


const getAllUsers=async(userId)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/users`,{
            method:"GET",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            }
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}
const getSearchUsers=async(userId,searchStr)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/search/users/${searchStr}`,{
            method:"GET",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            }
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}

const getAllRentals=async(userId,searchStr)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/${userId}/rentals`,{
            method:"GET",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            }
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}


export {createProduct,deleteProduct,updateProduct,getAllUsers,getSearchUsers,getAllRentals};