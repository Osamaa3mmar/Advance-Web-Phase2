import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CurrentUserContext=createContext();





export const CurrentUserContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const getUser=async()=>{
try {
            const token = localStorage.getItem('token');
            
            
            const query = `query Me {
                me {
                    id
                    username
                    type
                    uid
                }
            }`;
            
            const response = await axios.post("http://localhost:4001/graphql", {
                query
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.errors) {
                localStorage.removeItem('token'); 
                return;
            }
            
            const userData = response.data.data.me;
            
            const formattedUser = {
                id: userData.id,
                username: userData.username,
                role: userData.type, 
                uid: userData.uid
            };
            localStorage.setItem("currentUser",JSON.stringify(formattedUser));
            setUser(formattedUser);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
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