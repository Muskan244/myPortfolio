import { motion } from 'motion/react';
import type { ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-normal ${
          isUser
            ? 'bg-accent text-white rounded-xl rounded-br-sm'
            : 'bg-surface text-text rounded-xl rounded-bl-sm'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
