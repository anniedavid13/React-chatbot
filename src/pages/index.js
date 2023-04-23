import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })
import TypingAnimation from '@/components/TypingAnimation'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = async (message) => {
    const url = 'https://api.openai.com/v1/chat/completions' ;
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAPI_KEY}`
    };
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": message}]
    };
    

    setIsLoading(true);

    
    
      axios.post(url, data, {headers: headers}).then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        console.log(error);
      })
    }
    
    return (
      
      <div className="container mx-auto max-w-screen-2xl">
        <div className="flex flex-col min-h-screen bg-gray-900">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">ChatGPT</h1>
          <div className="flex-grow p-6">
            <div className="flex flex-col space-y-4">
            {
          chatLog.map((message, index) => (
            <div key={index} className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
              <div className={`${
                message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
              } rounded-lg p-4 text-white max-w-sm`}>
              {message.message}
              </div>
              </div>
          ))
              }
              {
                isLoading &&
                <div key={chatLog.length} className="flex justify-start">
                    <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                      <TypingAnimation />
                    </div>
                </div>
              }
        </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-none p-6">
            <div className="flex rounded-lg border border-gray-700 bg-gray-800 bottom bottom-0 left-0">  
          <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
              </div>
          </form>
          </div>
      </div>
    )
  }