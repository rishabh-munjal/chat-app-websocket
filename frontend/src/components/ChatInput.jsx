import { useState } from 'react'

function ChatInput({ onSend }) {
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.trim()) {
      onSend(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="flex items-center px-4 py-3 border-t border-gray-700 bg-gray-800">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput
