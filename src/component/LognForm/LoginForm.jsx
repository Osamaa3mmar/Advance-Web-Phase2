import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import FormGroup from "../FormGourp/FormGroup"
import SelectBox from "../selectBox/SelectBox"
import { toast } from "react-hot-toast"


export default function LoginForm() {
   const navigate = useNavigate();
  const [username,setUsername]=useState("")
  const [password , setPassword]=useState("")
  const [staySignedIn, setStaySignedIn] = useState(false)


  const login=function(){

   
  
    const users=JSON.parse(localStorage.getItem('users'));
    JSON.stringify(localStorage.setItem("stay",staySignedIn));
    if(!users){
     
      
        
        toast.error("User Not Found !");
      
    }
    else{
        const currentUser=users.find((user)=>{
            return user.username===username ;
        })

        if(currentUser){
            if(currentUser.password==password){
              localStorage.setItem('currentUser',JSON.stringify(currentUser));
                
                  toast.success("Signed in successfully !");
                  navigate("/main/home")
            }
            else{
              
              toast.error( "Wrong Password !");
            }
        }
        else{
           
              
              toast.error("User Not Found !");
            
        }
    }}
  


  return (

    <div className="w-full h-dvh flex items-center justify-center bg-[#333]">
    <form autoComplete="off" className=" bg-[#1e1e1e] text-[#1e1e1e] flex rounded-[30px] justify-center   items-center flex-col  border-[4px] border-solid border-[#444444] min-w-[500px]  shadow-[ 0_0_10px #444444] !px-[30px] !py-[20px] " >
    <h1 className="w-full text-[36px]  font-bold font-[ Lato] tracking-[1px] mb-[20px] text-[#e0e0e0]">Sign In</h1>
        
        <FormGroup onChange={(e) => setUsername(e.target.value)} value={username}  name="username" id="username"/>
        <FormGroup onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" />
        
        <SelectBox checked={staySignedIn}
            onChange={()=>{setStaySignedIn(!staySignedIn)}} /> 

         <input onClick={()=>{login()}} className='w-full mx-auto text-[#e0e0e0] font-[ Lato ] text-[ 18px] outline-none border-none bg-[#4caf50] rounded-[8px] !p-[8px] font-medium cursor-pointer mt-[10px] border-2 border-transparent transition duration-[400ms] hover:bg-[#333] hover:border-[#4caf50]' value="Sign In"/>
        <p className=" !w-fit sign-up-btn-page  mt-8 font-[ Lato] text-[#e0e0e0]" onClick={()=>{ navigate('/signup', { state: { from: '/' } });}}>Dont have an account ? <span className="underline cursor-pointer text-[#0000ff] ml-[6px]" >signUp</span></p>
    </form>
</div>
  )
}

