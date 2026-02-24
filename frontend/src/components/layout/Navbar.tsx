import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'About', href: '#about' },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          className="text-sm font-semibold text-text hover:opacity-70 transition-opacity duration-200"
        >
          muskan.
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wide text-text-tertiary hover:text-text transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="text-xs font-medium text-text hover:text-text-secondary transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-bg border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-xs font-medium uppercase tracking-wide text-text-tertiary hover:text-text transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-text hover:text-text-secondary transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
