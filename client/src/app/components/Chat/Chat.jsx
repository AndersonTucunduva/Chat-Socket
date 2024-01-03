'use client'

import { useState, useEffect } from 'react'
import { ChevronRightSquare } from 'lucide-react'

export default function Chat({ socket }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const getEnterKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('receive_message')
  }, [socket])

  function handleSubmit() {
    socket.emit('message', message)
    clearInput()
  }

  function clearInput() {
    setMessage('')
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 bg-gray-800">
      <div className="flexflex-col gap-4 p-4">
        <h1 className="flex items-center justify-center text-4xl text-gray-100">
          Cefis - Chat
        </h1>

        <div className="flex h-[800px] w-[320px] flex-col items-center justify-between  border border-gray-600 md:w-[500px]">
          <div className="flex w-full flex-col justify-center overflow-y-auto rounded-lg p-4 text-xl text-gray-400">
            {messageList.map((message, index) => {
              return (
                <div
                  key={index}
                  className={
                    message.authorId === socket.id
                      ? 'mt-1 self-start rounded-md bg-gray-500 p-4 text-base text-gray-200'
                      : 'mt-1 self-end rounded-md bg-gray-400 p-4 text-base text-gray-800'
                  }
                >
                  <div className="flex">
                    <h1>{message.author}</h1>:
                    <h2 className="ml-2">{message.text}</h2>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bottom-0 box-border flex w-full gap-4 p-2">
            <input
              type="text"
              placeholder="Mensagem"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="flex h-[50px] w-[384px] border-b border-gray-500 bg-transparent p-2 text-base text-gray-400  placeholder-gray-400 md:w-[600px]"
              id="message"
              onKeyDown={(e) => getEnterKey(e)}
            />
            <button onClick={handleSubmit}>
              <ChevronRightSquare className="h-[40px] w-[40px] text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
