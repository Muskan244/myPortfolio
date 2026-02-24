import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-border">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Muskan..."
        disabled={disabled}
        className="flex-1 px-3.5 py-2 bg-surface rounded-lg text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-border transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="p-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <HiArrowUp size={16} />
      </button>
    </form>
  );
}
