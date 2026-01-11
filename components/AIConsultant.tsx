
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageCircle, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { getShoppingAdvice } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "欢迎来到 L'Amour 精品店。我是您的私人康养导购助理。今天有什么我可以帮您的吗？" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getShoppingAdvice([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-2xl shadow-rose-600/20 flex items-center gap-2 group transition-all transform hover:scale-105"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-medium pr-2">
          咨询 L'Amour 助理
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[550px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-zinc-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-600/20 p-2 rounded-lg text-rose-500">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">L'Amour 导购助理</h3>
                <p className="text-[10px] text-rose-400 font-medium">尊享 AI 礼宾</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-rose-600 text-white rounded-br-none' 
                    : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-zinc-900/50">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="询问关于康养、丝绸或礼赠建议..."
                className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 pr-12 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-rose-500 hover:text-rose-400 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-zinc-600 mt-2 uppercase tracking-tighter">
              专业、私密的康养咨询建议
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
