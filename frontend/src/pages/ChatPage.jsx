import { useEffect, useRef, useState } from 'react'
import ChatHeader from '../components/ChatHeader'
import ChatWindow from '../components/ChatWindow'
import ChatInput from '../components/ChatInput'

function ChatPage() {
  const [messages, setMessages] = useState([
  ])

  const ws = useRef(null) // Keep WebSocket instance in a ref

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080') // Correct protocol

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: 'join',
          payload: {
            roomId: 'black',
          },
        })
      )
    }

    return () => {
      ws.current && ws.current.close()
    }
  }, [])

  const [participants, setParticipants] = useState(2) // Mock count
  const roomId = 'H7H04'

  const handleSend = (text) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: 'chat',
          payload: {
            message: text,
          },
        })
      )
    }
  }

  const handleExit = () => {
    alert('Exiting room...')
    ws.current && ws.current.close()
    // In real app, navigate away
  }

  return (
    <div className="w-full max-w-2xl h-[90vh] bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
      <ChatHeader roomId={roomId} participants={participants} onExit={handleExit} />
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  )
}

export default ChatPage
