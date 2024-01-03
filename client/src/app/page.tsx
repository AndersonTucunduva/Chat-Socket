'use client'

import { useState } from 'react'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

export default function Home() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  return (
    <div>
      {chatVisibility ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      )}
    </div>
  )
}
