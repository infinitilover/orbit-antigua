import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'bot';
    text: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.role === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 my-4 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-brand-turquoise text-brand-navy' : 'bg-brand-navy text-white'}`}>
        {isBot ? <Sparkles size={18} /> : <User size={18} />}
      </div>
      <div className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md ${isBot ? 'bg-white/80 text-brand-navy rounded-tl-none' : 'bg-brand-turquoise text-brand-navy rounded-tr-none'}`}>
        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
      </div>
    </motion.div>
  );
};

export default ChatBubble;