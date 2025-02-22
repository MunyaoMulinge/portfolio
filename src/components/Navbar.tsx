'use client';

import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const socialLinks = {
  github: 'https://github.com/MunyaoMulinge',
  linkedin: 'https://linkedin.com/in/victormulinge',
  email: 'victormulinge@gmail.com',
};

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial dark mode preference from localStorage or system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <nav className={`fixed w-full bg-background/80 backdrop-blur-sm border-b z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Victor Mulinge
          </h1>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="nav-link"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            
            <a
              href={`mailto:${socialLinks.email}`}
              className="nav-link"
              aria-label="Email"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
