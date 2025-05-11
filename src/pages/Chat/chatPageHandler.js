import axios from "axios";

export  async function  getMessages(){
    try {
        const token = localStorage.getItem('token');
        
        
        const query = `query Messages {
    messages {
        id
        sender_ID
        recever_ID
        payload
        timestamp
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
        
        if (response.data.errors) {
            console.error('Error fetching user:', response.data.errors[0].message);
            localStorage.removeItem('token'); 
            return;
        }
        
        const messages = response.data.data.messages;
        return messages;

        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


export async function sendMessages(msg){
    console.log(msg)
    try {
        const token = localStorage.getItem('token');
        const query = `mutation SendMessage {
    sendMessage(input: { sender_ID: "${msg.sender.id}", recever_ID: "${msg.recever.id}", payload:"${msg.content}" }) {
        sender_ID
        recever_ID
        payload
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
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    }
}
