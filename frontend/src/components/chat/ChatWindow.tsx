import { useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import type { ChatMessageType } from '../../types';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onClose: () => void;
}

export default function ChatWindow({ messages, isLoading, error, onSend, onClose }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div>
          <h3 className="text-xs font-semibold text-text">Chat</h3>
          <p className="text-xs text-text-tertiary">Ask about my work</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-surface rounded-lg transition-colors text-text-tertiary">
          <HiX size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface px-4 py-3 rounded-xl rounded-bl-sm">
              <div className="flex gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
