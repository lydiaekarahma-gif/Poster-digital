import React, { useState, useRef, useEffect } from 'react';
import { generateHealthAdvice } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Halo! Saya asisten kesehatan pintar Anda. Ingin bertanya tentang cara mencegah hipertensi atau tips diet rendah garam? Silakan tanya saya!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await generateHealthAdvice(userText);
      if (responseText) {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[600px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center gap-3 text-white shadow-sm">
        <div className="bg-white/20 p-2 rounded-full">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Asisten Kesehatan AI</h2>
          <p className="text-xs text-blue-100">Siap menjawab pertanyaan seputar Hipertensi</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : msg.isError 
                    ? 'bg-red-100 text-red-700 rounded-tl-none border border-red-200'
                    : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
              }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < msg.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm ml-12">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sedang mengetik...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya soal diet garam atau olahraga..."
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1 text-gray-700 placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          AI dapat membuat kesalahan. Selalu konsultasikan dengan dokter untuk diagnosis medis.
        </p>
      </div>
    </div>
  );
};

export default AIChat;