export interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  period: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'backend' | 'databases' | 'tools' | 'core';
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  cgpa: string;
}

export interface ChatMessageType {
  role: 'user' | 'assistant';
  content: string;
}
