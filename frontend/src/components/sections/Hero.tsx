import { motion } from 'motion/react';
import TypingEffect from '../TypingEffect';
import { personalInfo } from '../../data/resume';

const ease = [0.25, 0.1, 0.25, 1] as const;

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease, delay: 0.1 + i * 0.07 },
});

export default function Hero() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="text-xs uppercase tracking-wide text-text-tertiary font-medium mb-6 h-[1.5em]"
          {...reveal(0)}
        >
          <TypingEffect />
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text mb-6"
          {...reveal(1)}
        >
          Muskan Raghav
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-normal"
          {...reveal(2)}
        >
          I build scalable backend systems with Java, Spring Boot, and Python
          — from real-time bidding platforms to AI-powered exam engines.
        </motion.p>

        <motion.div className="flex justify-center gap-3 mb-12" {...reveal(3)}>
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, '#projects')}
            className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-hover transition-all duration-200 active:scale-[0.97]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="px-5 py-2.5 border border-border text-text text-sm font-medium rounded-full hover:bg-surface transition-all duration-200 active:scale-[0.97]"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div className="flex justify-center items-center gap-6" {...reveal(4)}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-tertiary hover:text-text transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-tertiary hover:text-text transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xs text-text-tertiary hover:text-text transition-colors duration-200"
          >
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
