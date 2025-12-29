'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiLinkedin, FiMail, FiExternalLink, FiPhone } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Image from 'next/image';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const skills = [
  { name: 'Flutter', level: 'Advanced', icon: '🐦' },
  { name: 'Angular', level: 'Advanced', icon: '🅰️' },
  { name: 'React', level: 'Advanced', icon: '⚛️' },
  { name: 'TypeScript', level: 'Advanced', icon: '🟦' },
  { name: 'Dart', level: 'Advanced', icon: '🎯' },
  { name: 'Firebase', level: 'Advanced', icon: '🔥' },
  { name: 'Tailwind CSS', level: 'Advanced', icon: '🎨' },
  { name: 'PostgreSQL', level: 'Advanced', icon: '🐘' },
];

const experience = [
  {
    title: 'Software Developer',
    company: 'Tangazoletu Limited',
    period: 'Feb 2024 - Present',
    description: 'Develop cross-platform mobile apps with Flutter/Dart, delivering responsive UI/UX across iOS and Android. Build web admin portals integrating with Spring Boot microservices for NCBA Bank\'s loan management system. Achieved 30% improvement in load times through smart caching and lazy loading.',
    tech: ['Flutter', 'Dart', 'Spring Boot', 'PHP', 'Firebase', 'REST APIs'],
  },
  {
    title: 'Software Developer',
    company: 'Sanifu Smart Technologies',
    period: 'Dec 2021 - Jan 2024',
    description: 'Designed cross-platform mobile applications using Flutter/Dart for financial dashboards serving 5,000+ users. Built web interfaces with Angular and React, integrated payment gateways and third-party APIs for real-time transactions.',
    tech: ['Flutter', 'Angular', 'React', 'Firebase', 'REST APIs', 'JWT/OAuth'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Multimedia University of Kenya',
    period: '2017 - 2021',
    description: 'Honours, Second Class Upper Division. Focused on software engineering, database management, and web development.',
  },
];

const projects = [
  {
    title: 'Land Mawe Fleet Management',
    description: 'A comprehensive fleet management system for logistics operations featuring truck tracking, driver management, job cards with pre-departure checklists, fuel tracking, scheduled maintenance, insurance & compliance monitoring, invoicing with PDF generation, and role-based access control.',
    tech: ['React', 'Node.js/Express', 'Supabase'],
    link: 'https://land-mawe-app.vercel.app',
    image: '/images/projects/truck.jpg'
  },
  {
    title: 'Full Stack Customer Management System',
    description: 'A modern, containerized full-stack application for customer management built with Spring Boot, Angular, and PostgreSQL. Features include customer CRUD operations, responsive UI with PrimeFlex, and Docker containerization for easy deployment.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL'],
    link: 'https://github.com/MunyaoMulinge/FullStack',
    image: '/images/projects/fullstack-customer.jpg'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS, featuring dark mode, smooth animations, and fully responsive design.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/MunyaoMulinge/portfolio',
    image: '/images/projects/default.jpg'
  },
];

const contact = {
  email: 'munyaomulinge@protonmail.com',
  phone: '+254722253660',
  github: 'https://github.com/MunyaoMulinge',
  linkedin: 'https://linkedin.com/in/victormulinge',
  twitter: 'https://twitter.com/MunYeahOh',
};

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: educationRef, inView: educationInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSending(true);
    setError('');
    setIsSent(false);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        'service_kqfkrzu', // Replace with your EmailJS Service ID
        'template_7e4ec5r', // Replace with your EmailJS Template ID
        formRef.current,
        'E3fErgvoOnuFIsVtg' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setIsSent(true);
          setIsSending(false);
          setFormData({ name: '', email: '', phone: '', message: '' });
          formRef.current?.reset();
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => setIsSent(false), 5000);
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          setError('Failed to send email. Please try again.');
          setIsSending(false);
        }
      );
  };

  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <BackToTop />
      
      {/* Hero Section */}
      <section id="hero" className="section-container min-h-[60vh] sm:min-h-[70vh] flex items-center" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Flutter Expert',
                2000,
                'Angular Developer',
                2000,
                'React Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            4+ years crafting responsive mobile &amp; web apps with Flutter, Angular, React &amp; modern JS. Expert in cross-platform development, UI/UX optimization, and RESTful APIs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={async (e) => {
                e.preventDefault();
                setIsDownloading(true);
                
                try {
                  const response = await fetch('/resume.pdf');
                  if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Victor_Mulinge_Resume.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } else {
                    throw new Error('Resume not found');
                  }
                } catch (error) {
                  alert('Resume not available at the moment. Please contact me directly at munyaomulinge@protonmail.com');
                } finally {
                  setIsDownloading(false);
                }
              }}
              disabled={isDownloading}
              whileHover={{ scale: isDownloading ? 1 : 1.05 }}
              whileTap={{ scale: isDownloading ? 1 : 0.95 }}
              className={`btn-primary inline-flex items-center gap-2 ${
                isDownloading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </>
              )}
            </motion.button>
            <a href="#projects" className="btn-secondary hover:scale-105 transition-transform inline-flex items-center gap-2">
              View My Work
              <FiExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container bg-muted/50 pattern-dots" ref={skillsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={skillsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:scale-105 transition-transform text-center"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{skill.icon}</div>
                <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">{skill.name}</h3>
                <div className="w-full bg-border rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                    style={{ width: skill.level === 'Advanced' ? '100%' : '75%' }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container" ref={experienceRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={experienceInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="space-y-4 sm:space-y-6">
            {experience.map((job, index) => (
              <motion.div
                key={job.period}
                initial={{ opacity: 0, y: 20 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{job.company}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{job.period}</span>
                </div>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{job.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-muted rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-container" ref={educationRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={educationInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Education</h2>
          <div className="space-y-4 sm:space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.period}
                initial={{ opacity: 0, y: 20 }}
                animate={educationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{edu.school}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{edu.period}</span>
                </div>
                <p className="text-sm sm:text-base">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container bg-muted/50" ref={projectsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={projectsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="custom-card group"
              >
                <div className="h-40 sm:h-48 relative overflow-hidden">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                    />
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:py-1 bg-muted text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2 text-xs sm:text-sm font-medium"
                  >
                    View Project <FiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container pattern-dots" ref={contactRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-card p-4 sm:p-6 md:p-8 rounded-xl border border-border"
        >
          <h2 className="section-title">Let&apos;s Connect</h2>
          <div className="text-center">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a project in mind or just want to chat about tech, I&apos;d love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={`mailto:${contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email me (opens in new tab)"
                className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
              >
                <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Me
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
              >
                <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Me
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
              >
                <FiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                LinkedIn
              </a>
            </div>
          </div>
          <form ref={formRef} onSubmit={sendEmail} className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full p-2.5 sm:p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                  formErrors.name 
                    ? 'border-destructive focus:border-destructive' 
                    : 'border-border focus:border-primary'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                disabled={isSending}
              />
              {formErrors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs sm:text-sm mt-1"
                >
                  {formErrors.name}
                </motion.p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className={`w-full p-2.5 sm:p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                  formErrors.email 
                    ? 'border-destructive focus:border-destructive' 
                    : 'border-border focus:border-primary'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                disabled={isSending}
              />
              {formErrors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs sm:text-sm mt-1"
                >
                  {formErrors.email}
                </motion.p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                className={`w-full p-2.5 sm:p-3 rounded-lg border transition-colors text-sm sm:text-base ${
                  formErrors.phone 
                    ? 'border-destructive focus:border-destructive' 
                    : 'border-border focus:border-primary'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                disabled={isSending}
              />
              {formErrors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs sm:text-sm mt-1"
                >
                  {formErrors.phone}
                </motion.p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={4}
                className={`w-full p-2.5 sm:p-3 rounded-lg border transition-colors resize-none text-sm sm:text-base ${
                  formErrors.message 
                    ? 'border-destructive focus:border-destructive' 
                    : 'border-border focus:border-primary'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                disabled={isSending}
              />
              {formErrors.message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs sm:text-sm mt-1"
                >
                  {formErrors.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={{ scale: isSending ? 1 : 1.02 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              className={`w-full btn-primary flex items-center justify-center gap-2 ${
                isSending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiMail className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Success Message */}
            {isSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <p className="text-green-700 dark:text-green-300 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  {error}
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </section>
    </main>
  );
}
