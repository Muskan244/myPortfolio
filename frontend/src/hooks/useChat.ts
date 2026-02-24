import { useState, useEffect, useCallback } from 'react';
import type { ChatMessageType } from '../types';
import { sendChatMessage, getChatHistory } from '../utils/api';

const SESSION_KEY = 'portfolio_chat_session';

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const GREETING: ChatMessageType = {
  role: 'assistant',
  content:
    "Hey! Feel free to ask me anything about Muskan's skills, projects, or experience.",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = getSessionId();

  useEffect(() => {
    getChatHistory(sessionId)
      .then((data) => {
        if (data.messages && data.messages.length > 0) {
          setMessages([
            GREETING,
            ...data.messages.map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          ]);
        }
      })
      .catch(() => {
        // Silently fail — show greeting only
      });
  }, [sessionId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMsg: ChatMessageType = { role: 'user', content: content.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      try {
        const data = await sendChatMessage(content.trim(), sessionId);
        const assistantMsg: ChatMessageType = {
          role: 'assistant',
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        setError('Failed to get a response. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  return { messages, isLoading, error, sendMessage };
}
