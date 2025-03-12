'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiMail, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Image from 'next/image';
import { useState } from 'react';

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
  },
];

const contact = {
  email: 'munyaomulinge@protonmail.com',
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

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <ScrollProgress />
      <BackToTop />
      
      {/* Hero Section */}
      <section id="hero" className="section-container" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            With 2 years of experience in building modern web applications using
            Spring Boot, Angular, React, PHP, Flutter, and MySQL databases.
          </p>
          <button className="btn-primary hover:scale-105 transition-transform">
            View My Work
          </button>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container bg-muted dark:bg-muted" ref={skillsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={skillsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: skill.level === 'Advanced' ? '100%' : '75%' }}></div>
                </div>
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
      <section id="projects" className="section-container bg-muted dark:bg-muted" ref={projectsRef}>
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
                className="custom-card group hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  {project.image && (
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors relative z-10">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 relative z-10">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2 relative z-10"
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
      <section id="testimonials" className="section-container bg-muted dark:bg-muted" ref={testimonialsRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={testimonialsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-container" ref={blogRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={blogInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <a
                    href={post.link}
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    Read More →
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
          className="max-w-4xl mx-auto bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
        >
          <h2 className="section-title">Let's Connect</h2>
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-8">
              I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to chat about tech, I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
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
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FiLinkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
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
