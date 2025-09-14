import React, { useEffect, useRef, useState } from 'react';
import { type ChatMessage } from '../App';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void; // Fixed arrow function syntax
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isProcessing }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='max-w-4xl mx-auto px-6 pb-8'>
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className='mb-8 max-h-96 overflow-y-auto space-y-4'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg font-mono text-sm ${
                  message.role === 'user' ?
                    'bg-cipher-gold/20 text-white border border-cipher-gold/40' :
                    'bg-cipher-gray/50 text-cipher-gold border border-cipher-gray'
                }`}>
                <div className='whitespace-pre-wrap'>{message.content}</div>
                <div className='text-xs opacity-60 mt-1'>{new Date(message.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className='flex justify-start'>
              <div className='bg-cipher-gray/50 text-cipher-gold border border-cipher-gray px-4 py-2 rounded-lg font-mono text-sm'>
                <div className='flex items-center space-x-2'>
                  <span>Processing</span>
                  <div className='flex space-x-1'>
                    <div className='w-1 h-1 bg-cipher-gold rounded-full animate-pulse' />
                    <div className='w-1 h-1 bg-cipher-gold rounded-full animate-pulse delay-100' />
                    <div className='w-1 h-1 bg-cipher-gold rounded-full animate-pulse delay-200' />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Search Input */}
      <div className='relative'>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <div className='relative flex-1'>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Ask me anything...'
              disabled={isProcessing}
              className='w-full bg-cipher-gray/30 border border-cipher-gold/30 rounded-lg px-6 py-4
                         text-white placeholder-cipher-gold/60 font-mono text-lg
                         focus:outline-none focus:border-cipher-gold/60 focus:bg-cipher-gray/50
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200' />
          </div>
          <button
            type='submit'
            disabled={!input.trim() || isProcessing}
            className='ml-4 bg-cipher-gold hover:bg-cipher-gold/80 disabled:bg-cipher-gold/30
                       text-black font-mono font-bold px-8 py-4 rounded-lg
                       transition-colors duration-200 disabled:cursor-not-allowed'>
            Search
          </button>
        </form>
      </div>

      {/* Bottom Status */}
      <div className='flex justify-between items-center mt-6 text-xs font-mono text-cipher-gold/60'>
        <div>{messages.length > 0 ? `${messages.length} messages` : 'Ready to chat'}</div>
        <div className='flex space-x-4'>
          <span>Translate</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
