import ChatArea from "../../component/ChatArea/ChatArea";
import SideUser from "../../component/SideUser/SideUser";
// import "./style.css"
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import axios from "axios";
import { getMessages} from "./chatPageHandler";
import { io } from 'socket.io-client';




const socket = io('ws://localhost:4001', {
  transports: ['websocket'], // Optional: Ensures it uses WebSocket directly
});

const sendMessages=(msg)=>{
  // if (msg && msg.sender&&msg.recever&&msg.content&&msg.content.trim().length)
  socket.emit("messageTo", msg);

  console.log(msg);
  

}



export default function Chat() {
  // getMessages();
  let [tempUsers, setTempUsers] = useState([]);
  const [ID, setID] = useState(-1)
  const [reciever,setReciever]=useState(null);
  const [chatReceverName, setchatReceverName] = useState("")
  const [Messages, setMessages] = useState([]);
  const [msg, setmsg] = useState("");
  const [isReg,setIsReg]=useState(false);
  const message = async () => {


    const newMsg = {
      sender_ID: user.id,
      recever_ID: reciever.id,
      payload: msg
    }
    const messages = Messages;
    sendMessages(newMsg)
    messages.push(newMsg);
    console.log(messages)
    setMessages([...messages])
    
    message.value = "";
    setmsg("");
    // loadChat();
  }

  const {user}=useContext(CurrentUserContext);
  const loadMessages = async() => {
    let messages =await getMessages();
    messages=Array.from(messages);
    const tempChat = messages.filter((message) => {
      return (user?.id == message.sender_ID || user?.id == message.recever_ID) && (reciever?.id == message.recever_ID || reciever?.id == message.sender_ID);
    })
    console.log(tempChat)
    setMessages(tempChat);
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


  const reg=()=>{
    if (user?.username?.trim() !== '') {
      socket.emit('login', user?.id);
      setIsReg(true)
    }
  }


useEffect(()=>{
    getAllStudents(user?.role=="admin"?"student":"admin");

},[user]);




useEffect(() => {
  reg();
  loadChat();

  const handler = (data) => {
    if (data?.sender_ID === reciever?.id) {
      console.log('📩 New message received:', data);
      setMessages(prevMessages => [...prevMessages, data]);
    }
  };

  socket.on('newMsg', handler);

  return () => {
    socket.off('newMsg', handler); // ✅ clean up listener
  };
}, [reciever, user]);

  return (
    <div className="chat flex gap-[15px]">
      <SideUser tempUsers={tempUsers} ID={ID} loadChat={loadChat} setID={setID} reciever={reciever} setReciever={setReciever} />
      <ChatArea ID={ID} message={() => { message() }} chatReceverName={chatReceverName} Messages={Messages} msg={msg} setmsg={setmsg}  />
    </div>
  )
}
