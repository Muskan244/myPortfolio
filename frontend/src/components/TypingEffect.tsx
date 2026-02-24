import { useState, useEffect, useRef, useCallback } from 'react';

const phrases = [
  'Backend Developer',
  'Spring Boot Engineer',
  'REST API Builder',
  'Problem Solver',
  'Java & Python Developer',
  'System Design Learner',
];

const TYPE_SPEED = 80;
const ERASE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_ERASE = 500;

export default function TypingEffect() {
  const [display, setDisplay] = useState('');
  const state = useRef({
    phraseIdx: 0,
    charIdx: 0,
    isErasing: false,
    isPaused: false,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = useCallback((fn: () => void, delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, delay);
  }, []);

  const tick = useCallback(() => {
    const s = state.current;
    const phrase = phrases[s.phraseIdx];

    if (s.isPaused) return;

    if (!s.isErasing) {
      // Typing forward
      s.charIdx++;
      setDisplay(phrase.slice(0, s.charIdx));

      if (s.charIdx >= phrase.length) {
        // Finished typing — pause then start erasing
        s.isPaused = true;
        schedule(() => {
          s.isPaused = false;
          s.isErasing = true;
          tick();
        }, PAUSE_AFTER_TYPE);
      } else {
        schedule(tick, TYPE_SPEED);
      }
    } else {
      // Erasing
      s.charIdx--;
      setDisplay(phrase.slice(0, s.charIdx));

      if (s.charIdx <= 0) {
        // Finished erasing — pause then move to next phrase
        s.isPaused = true;
        s.isErasing = false;
        s.phraseIdx = (s.phraseIdx + 1) % phrases.length;
        schedule(() => {
          s.isPaused = false;
          tick();
        }, PAUSE_AFTER_ERASE);
      } else {
        schedule(tick, ERASE_SPEED);
      }
    }
  }, [schedule]);

  useEffect(() => {
    schedule(tick, TYPE_SPEED);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick, schedule]);

  return (
    <span className="inline-flex items-center">
      {display}
      <span className="inline-block w-[2px] h-[1em] bg-text-tertiary ml-0.5 animate-blink" />
    </span>
  );
}
