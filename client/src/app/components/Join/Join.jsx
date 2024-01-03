'use client'

import { useState } from 'react'
import io from 'socket.io-client'

export default function Join({ setChatVisibility, setSocket }) {
  const [username, setUsername] = useState('')

  console.log(username)

  async function handleSubmit() {
    const socket = await io.connect('http://localhost:3001')

    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div className="bg-gray-800">
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-3xl text-gray-100 md:text-4xl">
          Bem vindo ao nosso Chat!
        </h1>
        <input
          type="text"
          placeholder="Nome de usuário"
          className="h-[50px] border border-gray-500 bg-transparent p-2 text-base text-gray-400 placeholder-gray-400"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
        />
        <button
          onClick={handleSubmit}
          className="w-60 bg-gray-500 p-4 text-white hover:bg-gray-600"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
