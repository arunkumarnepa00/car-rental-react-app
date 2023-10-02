const updateDp=async(form,userId)=>{
    //console.log(form)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/update/dp`,{
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

const updateUserDetails=async(form,userId)=>{
    console.log(form)
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/update/details`,{
            method:"POST",
            headers:{
                //'Content-Type':"multipart/form-data"
               'Content-Type':"application/json"
            },
            body:JSON.stringify(form)
           });
        const data=response.json();
        return data; 
    } catch (error) {
       console.log(error);   
    }
}

export {updateDp,updateUserDetails}