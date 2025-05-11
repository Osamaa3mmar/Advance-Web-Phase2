import ChatArea from "../../component/ChatArea/ChatArea";
import SideUser from "../../component/SideUser/SideUser";
// import "./style.css"
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import axios from "axios";
import { getMessages, sendMessages } from "./chatPageHandler";





export default function Chat() {
  // getMessages();
  let [tempUsers, setTempUsers] = useState([]);
  const [ID, setID] = useState(-1)
  const [reciever,setReciever]=useState(null);
  const [chatReceverName, setchatReceverName] = useState("")
  const [Messages, setMessages] = useState([]);
  const [msg, setmsg] = useState("");
  const message = async () => {


    const newMsg = {
      sender: user,
      recever: reciever,
      content: msg
    }
    const messages =  await getMessages();
    if (messages) {
      messages.push(newMsg);
      sendMessages(newMsg);
    }
    else {
      sendMessages(newMsg);
    }
    message.value = "";
    setmsg("");
    loadChat();
  }

  const {user}=useContext(CurrentUserContext);
  const loadMessages = async() => {
    let messages =await getMessages();
    messages=Array.from(messages);
    const tempChat = messages.filter((message) => {
      return (user?.id == message.sender_ID || user?.id == message.recever_ID) && (reciever?.id == message.recever_ID || reciever?.id == message.sender_ID);
    })
    setMessages([...Array.from(tempChat)]);

  };


  const loadChat = () => {


    setchatReceverName(reciever ? reciever.username : '');
    loadMessages();
  }


const getAllStudents=async(role)=>{
  try{
    const token = localStorage.getItem('token');
    const query = `
      query Users {
        users {
          id
          username
          type
          uid
        }
      }
    `;
    
    const response = await axios.post("http://localhost:4001/graphql", {
      query
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    
    const allUsers = response.data.data.users;
    const students = allUsers.filter(user => user.type == role);
    
    setTempUsers(students);
  }catch(error){
    console.log(error);
  }
}




useEffect(()=>{
    getAllStudents(user?.role=="admin"?"student":"admin");
},[user])

useEffect(() => {
  loadChat();
  const interval = setInterval(async () => {
    const messages = await getMessages();
    const filteredMessages = messages.filter(message => 
      (user?.id === message.sender_ID || user?.id === message.recever_ID) &&
      (reciever?.id === message.sender_ID || reciever?.id === message.recever_ID)
    );
    setchatReceverName(reciever ? reciever.username : '');

    setMessages(filteredMessages);
  }, 1000); // Every 3 seconds, for example

  return () => clearInterval(interval); // Clean up on unmount
}, [reciever, user]);
  return (
    <div className="chat flex gap-[15px]">
      <SideUser tempUsers={tempUsers} ID={ID} loadChat={loadChat} setID={setID} reciever={reciever} setReciever={setReciever} />
      <ChatArea ID={ID} message={() => { message() }} chatReceverName={chatReceverName} Messages={Messages} msg={msg} setmsg={setmsg}  />
    </div>
  )
}
