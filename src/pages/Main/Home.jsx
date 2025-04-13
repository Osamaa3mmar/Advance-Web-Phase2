import AdminDashboard from "../../component/AdminDashboard/AdminDashboard";
import UserDashboard from "../../component/UserDashboard/UserDashboard";

export default function Home() {
  let currStu=JSON.parse(localStorage.getItem("currentUser"))

  if (currStu.role=="admin")
  return (
    <AdminDashboard/>
    )
    else
    return(<UserDashboard/>)
}
