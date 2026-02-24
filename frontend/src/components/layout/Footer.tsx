import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { personalInfo } from '../../data/resume';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.footer
      ref={ref}
      className="border-t border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, ease }}
    >
      <div className="max-w-5xl mx-auto py-6 px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-tertiary">
          &copy; 2026 Muskan Raghav
        </p>
        <div className="flex items-center gap-5">
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
        </div>
      </div>
    </motion.footer>
  );
}
