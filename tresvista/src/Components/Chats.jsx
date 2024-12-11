import { Box, Card, CardContent, CardHeader, Grid, ListItem, Typography, useTheme } from "@mui/material";
import CustomInput from "./CustomInput";
import ChatHeader from "./ChatHeader";
import { useEffect, useState } from "react";
const chatData = [
  {
    id: 1,
    sender: "you",
    message: "Hey, how's it going?",
    timestamp: "2024-12-02T09:15:30Z",
    type: "text",
    status: "sent"
  },
  {
    id: 2,
    sender: "Sarah",
    message: "I'm doing well, thanks! How about you?",
    timestamp: "2024-12-02T09:16:00Z",
    type: "text",
    status: "sent"
  },
  {
    id: 3,
    sender: "you",
    message: "Not bad, just a bit tired. Have you seen the new movie?",
    timestamp: "2024-12-02T09:16:45Z",
    type: "text",
    status: "sent"
  },
  {
    id: 4,
    sender: "Sarah",
    message: "Yes, I watched it last night. It was great!",
    timestamp: "2024-12-02T09:17:10Z",
    type: "text",
    status: "sent"
  },
  {
    id: 5,
    sender: "you",
    message: "Awesome! I can't wait to watch it this weekend.",
    timestamp: "2024-12-02T09:17:35Z",
    type: "text",
    status: "sent"
  },
  {
    id: 6,
    sender: "you",
    message: "By the way, are we still on for dinner tomorrow?",
    timestamp: "2024-12-02T09:18:00Z",
    type: "text",
    status: "sent"
  },
  {
    id: 7,
    sender: "Sarah",
    message: "Yes, definitely! I'll pick you up at 7.",
    timestamp: "2024-12-02T09:18:30Z",
    type: "text",
    status: "sent"
  },
  {
    id: 8,
    sender: "you",
    message: "Perfect! Looking forward to it.",
    timestamp: "2024-12-02T09:19:00Z",
    type: "text",
    status: "sent"
  },
  {
    id: 9,
    sender: "Sarah",
    message: "Me too! See you tomorrow.",
    timestamp: "2024-12-02T09:19:30Z",
    type: "text",
    status: "sent"
  },
  {
    id: 10,
    sender: "you",
    message: "Take care, bye!",
    timestamp: "2024-12-02T09:19:50Z",
    type: "text",
    status: "sent"
  }
];

export default function Chats (currentNavItem,socket) { 
  const [messages, setMessages] = useState([]);
  const [userId,setUserId] = useState("")
  
  const theme = useTheme();
  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setUserId(data.clientId)
      console.log('Message from server:', data);
      if(data.message)
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  }, []);
  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() === '') return;
    const messageId = Date.now();
    const messageObject = {
      id: messageId,  
      sender: userId,  
      message: newMessage,  
      timestamp: new Date().toISOString(),  
      type: "text",  
      status: "sent"  
    };
    const messageJson = JSON.stringify(messageObject);
    socket.send(messageJson)    
  };
     if (currentNavItem) {
      return (
        <Box>
            <ChatHeader data={currentNavItem} />
            

            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  {
     <div style={{ padding: '20px', width:"100%", margin: '0 auto' }}>
     {messages.map((item) => (
       <Box
         key={item.id}
         sx={{
           display: 'flex',
           flexDirection: item.sender == userId ? 'row-reverse' : 'row', // Message alignment based on sender
           alignItems: 'center',
           mb: 2, // margin bottom for spacing between messages
         }}
       >
         {/* Message timestamp */}
         <Typography
           sx={{
             fontSize: '0.8rem',
             color: 'gray',
             marginRight: item.sender == userId ? '0' : '8px', // Adjust for alignment
             marginLeft: item.sender == userId ? '8px' : '0',
           }}
         >
           {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </Typography>

         {/* Message content with background and rounded corners */}
         <Box
           sx={{
             maxWidth: '80%',
             padding: '10px 15px',
             backgroundColor: item.sender == userId ? '#0078FF' : '#E4E6EB', // Different color for sender/receiver
             color: item.sender == userId ? 'white' : 'black',
             borderRadius: '20px',
             wordWrap: 'break-word',
             boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow
           }}
         >
           <Typography variant="body1">{item.message}</Typography>
         </Box>

         {/* Message status (optional) */}
         {item.status && (
           <Typography
             sx={{
               fontSize: '0.7rem',
               color: 'gray',
               marginLeft: '8px',
             }}
           >
             {item.status}
           </Typography>
         )}
       </Box>
     ))}
   </div>
  }
</Grid>


          <Box sx={{ position: 'fixed', 
                    bottom: 10, 
                    left: 350, 
                    width: '70%',  
                    zIndex: 1,
                    background:"white" }}>
            <CustomInput handleSendMessage={handleSendMessage} />
            </Box>
        </Box>
      
    ); 
    }else {
      return <h1>No Content Available</h1>;
    }
  };