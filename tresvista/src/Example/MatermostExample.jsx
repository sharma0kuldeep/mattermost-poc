// import React, { useEffect, useState } from 'react';
// import { Client } from '@stomp/stompjs';
// import {Client4, WebSocketClient} from '@mattermost/client';
// const MattermostWebSocket = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [client, setClient] = useState(null);
 
//   useEffect(() => {
//     const stompClient = new Client({
//       brokerURL: 'ws://localhost:8065/api/v4/websocket',
//       connectHeaders: {
//         Authorization: '8bsr355jdffiubeczu1xa6mqzr'
//       },
//       debug: function (str) {
//         console.log("====>",str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });
 
//     stompClient.onConnect = function (frame) {
//       console.log('Connected: ' + frame);
//       stompClient.subscribe('/topic/messages', function (message) {
//         const parsedMessage = JSON.parse(message.body);
//         if (parsedMessage.event === 'posted') {
//           const post = JSON.parse(parsedMessage.data.post);
//           setMessages(prevMessages => [...prevMessages, post.message]);
//         }
//       });
//     };
 
//     stompClient.onStompError = function (frame) {
//       console.error('Broker reported error: ' + frame.headers['message']);
//       console.error('Additional details: ' + frame.body);
//     };
 
//     stompClient.activate();
//     setClient(stompClient);
 
//     // return () => {
//     //   stompClient.deactivate();
//     // };
//   }, []);
 
//   const handleSendMessage = async () => {
//     if (newMessage.trim() === '') return;
 
//     const response = await fetch('http://localhost:8065/api/v4/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': '8bsr355jdffiubeczu1xa6mqzr'
//       },
//       body: JSON.stringify({
//         channel_id: '6ecym7nx438ricah7pcjdsmrhy',
//         message: newMessage
//       })
//     });
 
//     if (response.ok) {
//       setNewMessage('');
//     } else {
//       console.error('Failed to send message');
//     }
//   };
 
//   return (
// <div>
// <h1>Chat</h1>
// <ul>
//         {messages.map((msg, index) => (
// <li key={index}>{msg}</li>
//         ))}
// </ul>
// <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type a message"
//       />
// <button onClick={handleSendMessage}>Send</button>
// </div>
//   );
// };

// export default MattermostWebSocket;
import React, { useState, useEffect, useRef } from 'react';

const MattermostWebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null); // Using useRef to store WebSocket instance
  const socket = new WebSocket('ws://localhost:9000');

  useEffect(() => {
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    socket.send(newMessage)
    setNewMessage('');
    
    
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MattermostWebSocket;

