import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Main/Home";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Chat from "./pages/Chat/Chat";
import { ToastContainer, Zoom } from "react-toastify";
import { CurrentUserContextProvider } from "./Context/CurrentUserContext";

export default function App() {
  return (
    <div className=" bg-[#1e1e1e] min-h-[100dvh] p-0 m-0 border-box">
     <Routes>
      <Route path="/" element={<AuthLayout/>}>
      <Route path="" element={<Login/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      </Route>

      <Route path="/main" element={<CurrentUserContextProvider><MainLayout/></CurrentUserContextProvider>}>
      <Route path="" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="tasks" element={<Tasks/>}/>
      <Route path="chat" element={<Chat/>}/>
      
      </Route>
      </Routes>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Zoom}
limit={2}
/> 
    </div>
  )
}
