import ChatArea from "../../component/ChatArea/ChatArea";
import SideUser from "../../component/SideUser/SideUser";
// import "./style.css"
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import axios from "axios";





export default function Chat() {
  let [tempUsers, setTempUsers] = useState([]);
  const [ID, setID] = useState(-1)
  const [chatReceverName, setchatReceverName] = useState("")
  const [Messages, setMessages] = useState([]);
  const [msg, setmsg] = useState("");
  const message = () => {

    console.log("messageing")
    const messageHelper = JSON.parse(localStorage.getItem("messageHelper"));

    const newMsg = {
      sender: messageHelper.current,
      recever: messageHelper.recever,
      content: msg
    }
    console.log("new", newMsg)
    const messages = JSON.parse(localStorage.getItem("messages"));
    if (messages) {
      messages.push(newMsg);
      localStorage.setItem("messages", JSON.stringify(messages));

    }
    else {
      localStorage.setItem("messages", JSON.stringify([newMsg]))
    }
    message.value = "";
    loadChat();
  }

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    const messageHelper = JSON.parse(localStorage.getItem("messageHelper"));
    const tempChat = messages.filter((message) => {
      return (messageHelper.current.id == message.sender.id || messageHelper.current.id == message.recever.id) && (messageHelper.recever.id == message.recever.id || messageHelper.recever.id == message.sender.id);
    })
    console.log(tempChat)
    setMessages([...tempChat]);

  };


  const loadChat = () => {

    const recever = JSON.parse(localStorage.getItem('messageHelper')).recever;

    setchatReceverName(recever ? recever.username : '');
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
    console.log(allUsers);
    const students = allUsers.filter(user => user.type === role);
    
    setTempUsers(students);
  }catch(error){
    console.log(error);
  }
}




useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("currentUser"));
    getAllStudents(user.role=="admin"?"student":"admin");
  console.log("dfdf");
},[])

  console.log("msg from chat.js", msg)
  return (
    <div className="chat flex gap-[15px]">
      <SideUser tempUsers={tempUsers} ID={ID} loadChat={loadChat} setID={setID} />
      <ChatArea ID={ID} message={() => { message() }} chatReceverName={chatReceverName} Messages={Messages} msg={msg} setmsg={setmsg} />

    </div>
  )
}
