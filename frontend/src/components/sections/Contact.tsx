import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Section from '../layout/Section';
import { personalInfo } from '../../data/resume';

const ease = [0.25, 0.1, 0.25, 1] as const;

const links = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'GitHub', value: 'Muskan244', href: personalInfo.github },
  { label: 'LinkedIn', value: 'Muskan Raghav', href: personalInfo.linkedIn },
  { label: 'Codeforces', value: 'muskanraghav', href: personalInfo.codeforces },
  { label: 'LeetCode', value: 'muskanraghav', href: personalInfo.leetcode },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Section id="contact" title="Contact" className="border-t border-border">
      <div ref={ref}>
        <p className="text-sm text-text-secondary mb-8">
          I'm always open to new opportunities and collaborations.
        </p>
        <div className="divide-y divide-border max-w-2xl">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="flex items-center justify-between py-3 group hover:bg-surface/50 -mx-3 px-3 rounded transition-all duration-200"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, ease, delay: i * 0.05 }}
            >
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide">{link.label}</span>
              <span className="text-sm text-text group-hover:underline underline-offset-2 transition-transform duration-200 group-hover:translate-x-0.5">{link.value}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
