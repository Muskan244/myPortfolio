import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Section from '../layout/Section';
import { projects } from '../../data/resume';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Projects() {
  return (
    <Section id="projects" title="Selected Projects" className="border-t border-border">
      <div className="divide-y divide-border">
        {projects.map((project, index) => (
          <ProjectRow key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="py-8 first:pt-0 last:pb-0 group -mx-4 px-4 rounded-lg transition-all duration-300 hover:bg-surface/50 hover:-translate-y-0.5 hover:shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: index * 0.12 }}
    >
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="md:w-1/3 mb-3 md:mb-0">
          <h3 className="text-sm font-semibold text-text">{project.title}</h3>
          <p className="text-xs text-text-tertiary mt-1">{project.period}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs text-text-tertiary border border-border rounded transition-colors duration-200 group-hover:border-text-tertiary/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="md:w-2/3">
          <p className="text-sm text-text-secondary leading-normal mb-3">{project.description}</p>
          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-text-tertiary mt-0.5 shrink-0">—</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-text-tertiary hover:text-text transition-colors duration-200 underline underline-offset-2">
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-text-tertiary hover:text-text transition-colors duration-200 underline underline-offset-2">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
