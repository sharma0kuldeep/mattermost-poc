// src/App.js
import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs"; // Import STOMP client
import SockJS from "sockjs-client"; // SockJS client for fallback
import { io } from "socket.io-client";

const socket = io("http://localhost:9000",{
    withCredentials:true,
})

const Demo = () => {
  const [message, setMessage] = useState([]); 
  const [input,setInput] = useState("")

//   useEffect(()=>{
//     socket.on("connect",()=>{
//         console.log("Connected to webSocket server")
//     })
//     socket.on("response",(message)=>{
//         console.log("message",message);
//         setMessage((pre)=>[...pre,message])
        
//     })
//     socket.on("disconnect",()=>{
//         console.log("Disconnected from webSocket server");
        
//     })
//     return ()=>{
//         socket.off("connect")
//         socket.off("response")
//         socket.off("disconnect")
//     }
//   },[])


//   const sendMessage = () => {
//     socket.emit("message",input)
//     setInput("")
//   };

useEffect(() => {
    // Create a new STOMP client using WebSocket (SockJS fallback)
    const stompClient = new Client({
      brokerURL: "ws://localhost:9000", // WebSocket URL (update with your actual WebSocket endpoint)
      connectHeaders: {
        // Optional: Provide login info if needed
        login: "user", 
        passcode: "password",
      },
      debug: (str) => console.log(str), // Debugging
      onConnect: () => {
        console.log("Connected to WebSocket server");

        // Subscribe to a topic to listen for messages
        stompClient.subscribe("/topic/messages", (message) => {
          console.log("Message from server:", message.body);
          setMessage((prev) => [...prev, message.body]); // Update state with the received message
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket server");
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });

    stompClient.activate(); // Connect to the server

    // Cleanup on component unmount
    return () => {
    //   stompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    const stompClient = new Client(); // Use your active STOMP client
    if (stompClient.connected) {
      // Send a message to the server
      stompClient.publish({
        destination: "/app/chat", // Your destination path
        body: input, // Message body
      });
    }
    setInput(""); // Clear the input field
  };

  return (
    <div>
      <h1>STOMP with React</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update message on input change
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <h2>Server Response:</h2>
        {
            message.map((msg,index)=>(<p key={index}>{msg}</p>))
        }
      </div>
    </div>
  );
};

export default Demo;
