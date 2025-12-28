'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiMail, FiCalendar, FiExternalLink, FiPhone } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Image from 'next/image';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const skills = [
  { name: 'Spring Boot', level: 'Advanced', icon: '🌱' },
  { name: 'Angular', level: 'Advanced', icon: '🅰️' },
  { name: 'React', level: 'Advanced', icon: '⚛️' },
  { name: 'PHP', level: 'Advanced', icon: '🐘' },
  { name: 'Flutter', level: 'Intermediate', icon: '🐦' },
  { name: 'MySQL', level: 'Advanced', icon: '🐬' },
  { name: 'TypeScript', level: 'Advanced', icon: '🟦' },
  { name: 'Tailwind CSS', level: 'Intermediate', icon: '🎨' },
];

const experience = [
  {
    title: 'Full Stack Developer',
    company: 'Tangazoletu Limited',
    period: '2024 - Present',
    description: 'Developed and maintained web applications using Spring Boot, Angular, and MySQL. Implemented new features and improved application performance.',
    tech: ['Spring Boot', 'Angular', 'MySQL', 'PHP', 'Flutter', 'JavaScript'],
  },
  {
    title: 'ICT Assistant',
    company: 'ICT Authority of Kenya',
    period: '2022 - 2023',
    description: 'Built responsive web applications using React and PHP. Collaborated with the design team to implement user-friendly interfaces.',
    tech: ['Django', 'PHP', 'MySQL', 'JavaScript'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Multimedia University of Kenya',
    period: '2017 - 2021',
    description: 'Focused on software engineering, database management, and web development.',
  },
];

const projects = [
  {
    title: 'Full Stack Customer Management System',
    description: 'A modern, containerized full-stack application for customer management built with Spring Boot, Angular, and PostgreSQL. Features include customer CRUD operations, responsive UI with PrimeFlex, and Docker containerization for easy deployment.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL'],
    link: 'https://github.com/MunyaoMulinge/FullStack',
    image: '/images/projects/fullstack-customer.jpg'
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    tech: ['React', 'Spring Boot', 'MySQL'],
    link: 'https://github.com/your-username/project1',
    image: '/images/projects/default.jpg'
  },
  {
    title: 'Task Management App',
    description: 'A mobile application for task management and team collaboration built with Flutter.',
    tech: ['Flutter', 'Firebase'],
    link: 'https://github.com/your-username/project2',
    image: '/images/projects/default.jpg'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS, featuring dark mode and animations.',
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
};

const testimonials = [
  {
    name: 'John Doe',
    role: 'Tech Lead at Company',
    content: 'Victor is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are remarkable.',
    image: '/testimonials/john.jpg'
  },
  {
    name: 'Jane Smith',
    role: 'Project Manager',
    content: 'Working with Victor was a pleasure. He has excellent communication skills and always meets deadlines while maintaining code quality.',
    image: '/testimonials/jane.jpg'
  },
  {
    name: 'Mike Johnson',
    role: 'Senior Developer',
    content: 'Victor\'s ability to quickly grasp new technologies and implement them effectively is impressive. He\'s a valuable asset to any development team.',
    image: '/testimonials/mike.jpg'
  }
];

const blogPosts = [
  {
    title: 'Building Scalable Applications with Spring Boot',
    excerpt: 'Learn how to create robust and scalable applications using Spring Boot and best practices.',
    date: '2024-02-15',
    link: '/blog/spring-boot-scalable-apps'
  },
  {
    title: 'Modern Angular Development Techniques',
    excerpt: 'Explore advanced Angular patterns and techniques for building better web applications.',
    date: '2024-02-01',
    link: '/blog/angular-development'
  },
  {
    title: 'Docker and Kubernetes: A Practical Guide',
    excerpt: 'A comprehensive guide to containerization and orchestration with Docker and Kubernetes.',
    date: '2024-01-15',
    link: '/blog/docker-kubernetes-guide'
  }
];

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: skillsRef, inView: skillsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: educationRef, inView: educationInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: blogRef, inView: blogInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <section id="hero" className="section-container min-h-[90vh] flex items-center" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Spring Boot Expert',
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
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            With 2 years of experience in building modern web applications using
            Spring Boot, Angular, React, PHP, Flutter, and MySQL databases.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:scale-105 transition-transform text-center"
              >
                <div className="text-3xl mb-3">{skill.icon}</div>
                <h3 className="font-semibold mb-3">{skill.name}</h3>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500" 
                    style={{ width: skill.level === 'Advanced' ? '100%' : '75%' }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{skill.level}</p>
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
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={job.period}
                initial={{ opacity: 0, y: 20 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted dark:bg-muted rounded-full text-sm"
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
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.period}
                initial={{ opacity: 0, y: 20 }}
                animate={educationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
                <p>{edu.description}</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="custom-card group"
              >
                <div className="h-48 relative overflow-hidden">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-muted text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium"
                  >
                    View Project <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-container" ref={testimonialsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={testimonialsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-container bg-muted/50" ref={blogRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={blogInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium"
                >
                  Read More →
                </a>
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
          className="max-w-4xl mx-auto bg-card p-8 rounded-xl border border-border"
        >
          <h2 className="section-title">Let&apos;s Connect</h2>
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a project in mind or just want to chat about tech, I&apos;d love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email me (opens in new tab)"
                className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FiMail className="w-5 h-5" />
                Email Me
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FiPhone className="w-5 h-5" />
                Call Me
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FiLinkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
          <form ref={formRef} onSubmit={sendEmail} className="mt-8 space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full p-3 rounded-lg border transition-colors ${
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
                  className="text-destructive text-sm mt-1"
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
                className={`w-full p-3 rounded-lg border transition-colors ${
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
                  className="text-destructive text-sm mt-1"
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
                className={`w-full p-3 rounded-lg border transition-colors ${
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
                  className="text-destructive text-sm mt-1"
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
                className={`w-full p-3 rounded-lg border transition-colors resize-none ${
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
                  className="text-destructive text-sm mt-1"
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

      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Available for New Opportunities</h2>
          <p className="mb-8 text-primary-foreground/80">I&apos;m currently open to freelance projects, full-time roles, and collaborations. Let&apos;s build something amazing together!</p>
          <a href="#contact" className="inline-block px-6 py-3 bg-background text-foreground rounded-lg hover:opacity-90 transition-all font-medium">Hire Me</a>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src="/images/projects/fullstack-customer.jpg"
              alt="Full Stack Customer Management System"
              width={1200}
              height={800}
              className="object-contain"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/75"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
