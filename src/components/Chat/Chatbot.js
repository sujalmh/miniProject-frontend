// Chatbot.js
import React, { useState, useEffect } from 'react';
import DishOption from './DishOption';
import '../css/ScrollBar.css';

import { TypeAnimation } from 'react-type-animation';
import { IoMdPause } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [index, setIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(false);

  // Predefined bot responses with options for specific replies
  const botReplies = [
    { text: "I'm here to assist you with anything." },
    { text: "I can help you find our best dishes.", options: [
      { id: 1, name: "Pasta Alfredo", image: "/images/pasta.jpg" },
      { id: 2, name: "Margherita Pizza", image: "/images/pizza.jpg" }
    ]},
    { text: "Would you like to see our special menu?", options: [
      { id: 3, name: "Caesar Salad", image: "/images/salad.jpg" },
      { id: 4, name: "Tiramisu", image: "/images/tiramisu.jpg" }
    ]},
    { text: "Would you like to see our special menu?", options: [
      { id: 1, name: "Pasta Alfredo", image: "/images/pasta.jpg" },
      { id: 2, name: "Margherita Pizza", image: "/images/pizza.jpg" }
    ] },
    { text: "Feel free to ask me anything!" },
    { text: "Feel free to ask me anything!" }
  ];


  const handleSend = () => {
    if (loadingMessage || userInput.trim() === '') return;
  
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
  
    setIsTyping(true);
    setLoadingMessage(true);
  
    setTimeout(() => {
      const randomReply = botReplies[index];
      let tempIndex = index;
      setIndex(++tempIndex);
      console.log(index);
      setMessages((prevMessages) => [...prevMessages, { ...randomReply, sender: 'bot' }]);
      setIsTyping(false);
      setLoadingMessage(false);
    }, 2000);
  };
  
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
    <div className="flex flex-col h-full">
      <div id="chat-container" className="flex-grow h-full relative overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex flex-col z-1 ${message.sender === 'user' ? 'items-end' : 'items-start'} mb-4`}>
            {/* Chat Message */}
            <div className={`p-3 rounded-xl typewriter shadow-lg z-1 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'} max-w-xs md:max-w-md lg:max-w-lg`}>
              {message.sender === 'bot' ? (<span class="bot-text"><script>console.log();</script><TypeAnimation
      sequence={[message.text, 1000]}
      wrapper="span"
      speed={75}
      repeat={0} // No repetition
      cursor={false}
    /></span>): <span >{message.text}</span>}
            </div>
            
            {/* Display Options Below Message if it's a Bot Message */}
            {message.sender === 'bot' && message.options && (
              <div className="flex flex-wrap gap-4 pt-2 ">
                {message.options.map((dish) => (
                  <DishOption key={dish.id} dish={dish} />
                ))}
              </div>
            )}
          </div>
        ))}

        {loadingMessage && (
          <>
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-xl bg-gray-700 md:max-w-100 xs:max-w-xs shadow-lg">
              <div className="w-24 h-4 bg-gray-600 rounded-md animate-pulse mb-2"></div>
              <div className="w-36 h-4 bg-gray-600 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className='flex flex-wrap gap-4 pt-0'>
          <div className="w-[120px] h-40 sm:w-32 md:w-36 lg:w-40 p-2 bg-gray-700 rounded-xl shadow-lg text-center">
            <div className="h-24 bg-gray-600 rounded-md animate-pulse mb-2 w-full"></div>
            <div className="w-24 h-4 bg-gray-600 rounded-md animate-pulse"></div>
          </div>
          <div className="w-[120px] h-40 sm:w-32 md:w-36 lg:w-40 p-2 bg-gray-700 rounded-xl shadow-lg text-center">
            <div className="h-24 bg-gray-600 rounded-md animate-pulse mb-2 w-full"></div>
            <div className="w-24 h-4 bg-gray-600 rounded-md animate-pulse"></div>
          </div>
          </div>
        </>
        )}
        
      </div>

      <div className="flex items-center px-4 py-3 bg-gray-700 shadow-lg">
        <input
          type="text"
          className="flex-grow p-3 rounded-full bg-gray-600 text-white focus:outline-none placeholder-gray-400"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
        />
        {!loadingMessage ? (
        <button
          className="ml-3 h-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-center hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center justify-center"
          onClick={handleSend}
        >
          <IoSend className='text-[1.35rem]' />
          
        </button>) : (<button
          className="ml-3 h-full p-3 bg-gray-800 animate-pulse  text-white px-4 py-2 rounded-full shadow-md transition duration-300"
          onClick={handleSend}
        ><IoMdPause className='text-[1.35rem]'/>
        </button>
)}

      </div>
    </div>
    </>
  );
};

export default Chatbot;
