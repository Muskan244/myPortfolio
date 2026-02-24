import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Section from '../layout/Section';
import { skills, skillCategories } from '../../data/resume';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Skills() {
  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <Section id="skills" title="Skills" className="border-t border-border">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {categories.map((category, idx) => {
          const categorySkills = skills.filter((s) => s.category === category);
          return (
            <SkillGroup
              key={category}
              title={skillCategories[category]}
              skills={categorySkills.map((s) => s.name)}
              index={idx}
            />
          );
        })}
      </div>
    </Section>
  );
}

function SkillGroup({ title, skills, index }: { title: string; skills: string[]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease, delay: index * 0.08 }}
    >
      <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs text-text border border-border rounded-full hover:border-text-tertiary transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
