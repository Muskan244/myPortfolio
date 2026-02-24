import Section from '../layout/Section';
import { education } from '../../data/resume';

export default function Education() {
  return (
    <Section id="education" title="Education" className="border-t border-border">
      <div>
        <h3 className="text-sm font-semibold text-text">{education.degree}</h3>
        <p className="text-sm text-text-secondary mt-1">{education.institution}</p>
        <p className="text-xs text-text-tertiary mt-0.5">{education.location}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs text-text-tertiary">{education.period}</span>
          <span className="text-xs font-medium text-text">CGPA: {education.cgpa}</span>
        </div>
      </div>
    </Section>
  );
}
