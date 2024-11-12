'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Send } from 'lucide-react';

const pixelBorder = "border-[4px] border-black shadow-[4px_4px_0_0_#000000]";
const pixelFont = { fontFamily: "'VT323', monospace" };

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Thanks for your message! I\'ll help you with that.' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${pixelBorder} bg-[#4CAF50] p-2 rounded-full hover:bg-[#45a049] transition-colors`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative w-10 h-10">
            <Image
              src="https://media.giphy.com/media/ObNTw8Uzwy6KQ/giphy.gif"
              alt="Chat Bot"
              fill
              className="rounded-full"
            />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 w-80 ${pixelBorder} bg-white`}>
          {/* Header */}
          <div className="bg-[#4CAF50] p-3 flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="https://media.giphy.com/media/ObNTw8Uzwy6KQ/giphy.gif"
                alt="Chat Bot"
                fill
                className="rounded-full"
              />
            </div>
            <h3 className="text-white font-bold" style={pixelFont}>AI Assistant</h3>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#FFEB3B] text-black'
                      : 'bg-[#4CAF50] text-white'
                  }`}
                  style={pixelFont}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                style={pixelFont}
              />
              <button
                onClick={handleSend}
                className={`${pixelBorder} bg-[#4CAF50] p-2 text-white hover:bg-[#45a049]`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 