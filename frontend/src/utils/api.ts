const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function sendChatMessage(message: string, sessionId: string) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function getChatHistory(sessionId: string) {
  const res = await fetch(`${API_URL}/api/chat/history/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}
