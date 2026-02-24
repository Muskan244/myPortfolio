import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} className={"py-20 md:py-28 px-6 md:px-8 " + className}>
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title && (
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-text mb-12">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
}
