import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Home from "./pages/Main/Home";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Chat from "./pages/Chat/Chat";

export default function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<AuthLayout/>}>
      <Route path="" element={<Login/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      </Route>

      <Route path="/main" element={<MainLayout/>}>
      <Route path="" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="tasks" element={<Tasks/>}/>
      <Route path="chat" element={<Chat/>}/>
      
      </Route>
      </Routes> 
    </>
  )
}
