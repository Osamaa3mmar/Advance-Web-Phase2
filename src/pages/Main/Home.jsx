import AdminDashboard from "../../component/AdminDashboard/AdminDashboard";
import UserDashboard from "../../component/UserDashboard/UserDashboard";
import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

export default function Home() {
  const {user}=useContext(CurrentUserContext);
  
  
  
  return (
    <>
    {user?user.role=="admin"?
    <AdminDashboard/>
      
      :
      <UserDashboard/>:null}
      </>
    )
    
}
