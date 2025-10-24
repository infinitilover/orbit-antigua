'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import ChatBubble from './ChatBubble';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm the Orbit assistant. How can I help you find businesses in Antigua & Barbuda today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentInput }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = { role: 'bot', text: data.text };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error fetching from chat API:', error);
      const errorMessage: Message = {
        role: 'bot',
        text: 'Sorry, I seem to be having some trouble connecting. Please try again later.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-turquoise text-brand-navy p-4 rounded-full shadow-lg"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white/60 backdrop-blur-lg border border-white/30 shadow-glass rounded-2xl flex flex-col overflow-hidden z-50"
          >
            <header className="p-4 bg-brand-navy text-white flex items-center gap-3">
              <Bot size={20} />
              <h3 className="font-bold">Orbit Assistant</h3>
            </header>
            <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg} />
              ))}
              {isLoading && <ChatBubble message={{ role: 'bot', text: 'Thinking...' }} />}
            </div>
            <div className="p-4 border-t border-white/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full h-12 px-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-brand-turquoise transition"
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading} className="p-3 bg-brand-turquoise text-brand-navy rounded-xl disabled:bg-gray-300">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;