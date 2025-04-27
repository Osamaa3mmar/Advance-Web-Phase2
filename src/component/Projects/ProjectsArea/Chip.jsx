import { useEffect, useState } from 'react'
import style from './style.module.css'
import { toast } from 'react-toastify';
export default function Chip({stu}) {
  const [user,setUser]=useState(null);
  const getUser=()=>{
    const users=JSON.parse(localStorage.getItem("users"));
    if(!users){
      setUser(null);
      toast.error("you must go step by step in the app please clear local Storage and go step by step in the app !");
    }
    else{
      const current=users.find((u)=>{
        return u.id==stu;
      })
      setUser(current);
      
    }
  }
  useEffect(()=>{
    getUser();
  },[])
  return (
    <div className={" bg-[#ffffff44] rounded-2xl py-1 px-2 capitalize "+style.chipBorder}>
      {user?.username}
    </div>
  )
}
