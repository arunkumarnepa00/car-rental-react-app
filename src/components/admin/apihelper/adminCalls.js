const createProduct=async(form,userId)=>{
    console.log(form)
    try {
        const  response=await fetch(`http://localhost:7701/api/v1/admin/${userId}/create/product`,{
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

export {createProduct};