import jwt_decode from "jwt-decode";


const authentication=()=>{

    if(localStorage.getItem('token')!==null){
        const decoded = jwt_decode(localStorage.getItem('token'));
        const date=new Date();
        console.log(decoded.exp)
        console.log(date.getTime()/1000)
        if(decoded.exp >= date.getTime()/1000){
            return decoded._id;
        }else{
            return 'expired';
        }
        
    }
    return null;
}

export default authentication;