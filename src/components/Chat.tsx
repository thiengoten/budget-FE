import React, { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { socket } from '@/services/socket'

type Test = 'text' | 'sender'
function Chat() {
  const [messages, setMessages] = useState<Record<Test, string>[]>([])
  console.log('🚀 ~ Chat ~ messages:', messages)
  const [inputMessage, setInputMessage] = useState('')

  console.log('id:', socket.id)

  useEffect(() => {
    socket.on('init', (message) => {
      console.log('🚀 ~ socket.on ~ message:', message)
    })

    socket.on('message', (msg) => {
      console.log('message:', msg)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: msg.message, sender: msg.sender },
      ])
    })

    return () => {
      socket.off('init')
      socket.off('message')
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMessage.trim() !== '') {
      socket.emit('chat', inputMessage)
      setInputMessage('')
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === socket.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.sender === socket.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className='p-4 bg-white border-t border-gray-200'
      >
        <div className='flex items-center space-x-2'>
          <input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
