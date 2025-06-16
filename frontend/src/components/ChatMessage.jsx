function ChatMessage({ text, isSender }) {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm transition-all duration-200 ${
          isSender
            ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

export default ChatMessage
