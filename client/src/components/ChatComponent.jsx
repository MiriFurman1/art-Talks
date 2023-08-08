import React, { useState, useEffect } from 'react';

function ChatComponent({ websocketUrl }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [ws, setWs] = useState(null); // Declare the "ws" state variable
  
    useEffect(() => {
      const newWs = new WebSocket(websocketUrl); // Create a new WebSocket instance
  
      newWs.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      };
  
      setWs(newWs); // Set the "ws" state variable
  
      return () => {
        newWs.close();
      };
    }, [websocketUrl]);
  
    const handleSendMessage = () => {
        if (messageInput.trim() !== '' && nameInput.trim() !== '') {
          const message = {
            name: nameInput,
            text: messageInput,
            timestamp: new Date().toISOString(),
          };
          setMessages((prevMessages) => [...prevMessages, message]);
          setMessageInput('');
      
          // Send JSON-formatted message to WebSocket server
          if (ws) {
            ws.send(JSON.stringify(message));
          }
        }
      };

  return (
    <div className="chat-interface m-8 bg-white p-8 rounded-lg shadow-md max-w-lg w-full">

      <div className="chat-messages mb-4">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <p className="font-semibold">{message.name}</p>
            <p>{message.text}</p>
            <small className="text-gray-600">{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>


      <div className="message-input flex">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="border border-gray-300 rounded-l p-2 w-1/3"
          placeholder="Your Name"
        />
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="border border-gray-300 p-2 w-2/3"
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded bg-purple-500 ">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;