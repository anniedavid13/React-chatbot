import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })

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
    <div className='container mx-auto max-w-[700]'>
      <div className='flex flex-col h-screen bg-gray-900'>
      <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl'>
        CHATGPT Chatbot
      </h1>
      <div className='flex-grow p-6'>

      </div>
      {chatLog.map((message, index) => (
       
          <div key={index} className={message.type === 'bot' ? styles.botMessage : styles.userMessage}>
            {message.message}
          </div>
      ))}

      
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='Enter your message' value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
        <button type="submit">Send</button>
      </form>
      </div>
    </div>
  )
      }