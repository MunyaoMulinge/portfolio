'use client';

import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { href: 'https://github.com/MunyaoMulinge', icon: FiGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/victormulinge', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/MunYeahOh', icon: FaXTwitter, label: 'X (Twitter)' },
  { href: 'mailto:munyaomulinge@protonmail.com', icon: FiMail, label: 'Email' },
];

const quickLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Victor Mulinge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer crafting responsive mobile &amp; web apps with Flutter, Angular, React &amp; modern JS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={scrollToSection}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {currentYear} Victor Mulinge. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            Built with <FiHeart className="w-4 h-4 text-red-500" /> using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
