import ChatMessage from './ChatMessage'

function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-800">
{messages.map((msg, idx) => (
  <ChatMessage key={idx} text={msg} isSender={false} />
))}

    </div>
  )
}

export default ChatWindow
