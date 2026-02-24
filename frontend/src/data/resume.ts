import type { Project, Skill, Education } from '../types';

export const personalInfo = {
  name: 'Muskan Raghav',
  title: 'Computer Science Student & Backend Developer',
  email: 'raghav12muskan@gmail.com',
  phone: '7004466065',
  linkedIn: 'https://www.linkedin.com/in/muskan-raghav-10511a320/',
  github: 'https://github.com/Muskan244',
  codeforces: 'https://codeforces.com/profile/muskanraghav',
  leetcode: 'https://leetcode.com/u/12muskanraghav/',
};

export const about = `I'm a Computer Science student at Jaypee University of Engineering and Technology with a passion for building scalable backend systems. I love working with Java, Spring Boot, Python, and Django to create robust APIs and services. From real-time bidding systems to AI-powered exam platforms, I enjoy tackling complex engineering challenges. I'm also an active problem solver on Codeforces and LeetCode, and I've contributed to open-source projects like JabRef.`;

export const education: Education = {
  institution: 'Jaypee University of Engineering and Technology',
  degree: 'B.Tech in Computer Science and Engineering',
  location: 'Guna, Madhya Pradesh',
  period: 'Aug 2022 – May 2026',
  cgpa: '8.3 / 10',
};

export const projects: Project[] = [
  {
    title: 'Course Platform',
    description:
      'A scalable course platform backend with hierarchical REST API design, full-text search, and real-time progress tracking.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Elasticsearch'],
    highlights: [
      'Hierarchical REST API design using Spring Boot',
      'RSA-encrypted JWT authentication via Spring Security OAuth2',
      'Full-text search with n-gram tokenization and fuzzy matching',
      'Real-time learner progress tracking with custom JPA queries',
    ],
    period: 'Jan 2026 – Present',
    githubUrl: 'https://github.com/Muskan244/course-platform',
    liveUrl: 'https://course-platform-api-ofoj.onrender.com/swagger-ui.html',
  },
  {
    title: 'Dhimura – AI Exam Platform',
    description:
      'A bilingual competitive exam platform with AI capabilities, phone-based OTP auth, and rate limiting.',
    techStack: ['Django', 'PostgreSQL', 'React', 'LangChain'],
    highlights: [
      'Bilingual competitive exam platform with React & Django REST',
      'Automatic JWT refresh using Axios interceptors',
      'Phone-based OTP verification via Twilio',
      'Rate limiting with django-ratelimit middleware',
    ],
    period: 'Nov 2025 – Present',
    liveUrl: 'https://www.dhimura.club/',
  },
  {
    title: 'Online Bidding System',
    description:
      'A real-time online bidding system with concurrent request handling and role-based access control.',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'JavaScript'],
    highlights: [
      'Real-time bidding with concurrent request handling',
      'Modular REST APIs following SOLID principles',
      'Transactional data consistency under high bid volume',
      'Role-based access control via Spring Security',
    ],
    period: 'Jan 2025 – Oct 2025',
    githubUrl: 'https://github.com/Muskan244/onlineBiddingSystem',
    liveUrl: 'https://onlinebiddingsystem.netlify.app/',
  },
  {
    title: 'File Summarizer MCP Server',
    description:
      'A Python MCP server for multimodal document, audio, and video summarization. Published on PyPI.',
    techStack: ['Python', 'FastMCP', 'Apache Tika'],
    highlights: [
      'Multimodal document, audio, and video summarization',
      'Low-latency async pipelines with Whisper & Apache Tika',
      'LLM-native tool usage via Claude Desktop',
    ],
    period: 'May 2025 – Jun 2025',
    githubUrl: 'https://github.com/Muskan244/File_Summarizer_MCP_Server',
    liveUrl: 'https://pypi.org/project/file-summarizer-mcp-server/',
  },
];

export const skills: Skill[] = [
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Microservices', category: 'backend' },
  { name: 'PostgreSQL', category: 'databases' },
  { name: 'MySQL', category: 'databases' },
  { name: 'SQLite', category: 'databases' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Linux', category: 'tools' },
  { name: 'MCP Server', category: 'tools' },
  { name: 'DSA', category: 'core' },
  { name: 'OOP', category: 'core' },
  { name: 'DBMS', category: 'core' },
];

export const skillCategories: Record<string, string> = {
  languages: 'Languages',
  backend: 'Backend',
  databases: 'Databases',
  tools: 'Developer Tools',
  core: 'Core CS',
};
