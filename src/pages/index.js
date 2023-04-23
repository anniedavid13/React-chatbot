import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState([])
  const [chatLog, setChatLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    // sendMessage(inputValue);
    
    setInputValue('');
  }

  // const sendMessage = (message) => {
  //   const url = '/api/chat';

  //   const data = {
  //     model: "gpt-3.5-turbo-0301",
  //     messages: [{ "role": "user", "content": message }]
  //   };

  //   setIsLoading(true);

  //   axios.post(url, data).then((response) => {
  //     console.log(response);
  //     setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
  //     setIsLoading(false);
  //   }).catch((error) => {
  //     setIsLoading(false);
  //     console.log(error);
  //   })
  // }

  return (
    <>
      <h1>
        CHATGPT Chatbot
      </h1>
      {chatLog.map((message, index) => (
       
          <div key={index}>
            {message.message}
          </div>
      ))}

      
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='Enter your message'/>
        <button type="submit">Send</button>
      </form>
    </>
  )
}
