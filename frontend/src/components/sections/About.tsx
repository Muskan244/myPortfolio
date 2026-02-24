import Section from '../layout/Section';
import { about } from '../../data/resume';

export default function About() {
  return (
    <Section id="about" title="About" className="border-t border-border">
      <p className="text-sm text-text-secondary leading-normal max-w-2xl">
        {about}
      </p>
    </Section>
  );
}
