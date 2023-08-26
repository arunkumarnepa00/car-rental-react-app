const getUserInfo=async(userId)=>{
    try {
        const  response=await fetch(`http://localhost:7701/api/v1/user/getInfo/${userId}`,{
            method:"GET",
            // headers:{
            //     'Content-Type':"application/json"
            // }
           });
        const data=response.json();
        console.log(data)
        return data;
    } catch (error) {
       console.log(error);   
    }
}


export {getUserInfo};