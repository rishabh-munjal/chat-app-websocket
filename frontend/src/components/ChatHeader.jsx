function ChatHeader({ roomId, participants, onExit }) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 flex items-center justify-between border-b border-indigo-400">
      <div className="flex flex-col">
        <span className="text-sm text-gray-200">Room:</span>
        <span className="font-semibold text-white text-base tracking-wide">{roomId} | {participants}/2 participants</span>
      </div>

      <button
        onClick={onExit}
        className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-all"
      >
        Exit
      </button>
    </div>
  )
}

export default ChatHeader
