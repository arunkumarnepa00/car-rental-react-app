const registerUser=async (form)=>{
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`,{
            method:"POST",
            headers:{
                //'Content-Type':"multipart/form-data"
               // 'Content-Type':"application/json"
            },
            body:form
           });
        const data=response.json();
        return data;

        //    .then(response=>response.json())
        //    .then((response)=>{
        //      console.log(response);
        //       return response;
        //    })
        //    .catch((err)=>{
        //        console.log(err);
        //        return err;
        //    })
        
    } catch (error) {
       console.log(error);   
    }
}

const loginUser=async(form)=>{
    console.log(JSON.stringify(form))
    try {
        const  response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signin`,{
            method:"POST",
            headers:{
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


export {registerUser,loginUser};