import { createContext, useEffect, useState } from "react";


export const CurrentUserContext=createContext();





export const CurrentUserContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const getUser=()=>{
        const temp=JSON.parse(localStorage.getItem("currentUser"));
        setUser(temp);
    }


    useEffect(()=>{
        getUser();
    },[]);
    return (
        <CurrentUserContext.Provider value={{user}}>
        {children}

        </CurrentUserContext.Provider>
    )
}


export default CurrentUserContextProvider;