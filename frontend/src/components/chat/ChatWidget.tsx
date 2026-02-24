import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiChat, HiX } from 'react-icons/hi';
import ChatWindow from './ChatWindow';
import { useChat } from '../../hooks/useChat';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-14 right-0 w-[360px] h-[480px] bg-bg rounded-xl border border-border shadow-md overflow-hidden max-sm:w-[calc(100vw-3rem)] max-sm:h-[70vh]"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease }}
          >
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              error={error}
              onSend={sendMessage}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-accent text-white rounded-full shadow-md hover:bg-accent-hover transition-colors duration-200 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease, delay: 0.6 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <HiX size={18} /> : <HiChat size={18} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
