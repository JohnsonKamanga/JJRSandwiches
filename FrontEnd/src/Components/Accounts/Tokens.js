import { useState } from "react";

export function deleteToken(){

    sessionStorage.clear();
}

export default function useToken(){

    const getToken = ()=>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken)=>{

        sessionStorage.setItem('token',JSON.stringify(userToken));
        setToken(userToken);
    
    }

    return {
        setToken: saveToken,
        token
    }
    
}