'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = {
  github: 'https://github.com/MunyaoMulinge',
  linkedin: 'https://linkedin.com/in/victormulinge',
  email: 'munyaomulinge@protonmail.com',
  twitter: 'https://twitter.com/MunYeahOh',
};

const menuItems = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        setMobileMenuOpen(false);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className={`fixed w-full bg-background/80 backdrop-blur-sm border-b z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
            Victor Mulinge
          </h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="nav-link"
                onClick={scrollToSection}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="nav-link"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="hidden md:flex items-center gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>

              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link hover:scale-110 transition-transform"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              
              <a
                href={`mailto:${socialLinks.email}`}
                target="_blank"
                className="nav-link hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden nav-link"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link block px-4 py-2"
                  onClick={scrollToSection}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 px-4 py-2">
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
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
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
        )}
      </div>
    </nav>
  );
}
