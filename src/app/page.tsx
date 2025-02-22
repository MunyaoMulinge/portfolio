'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const skills = [
  { name: 'Spring Boot', level: 'Advanced' },
  { name: 'Angular', level: 'Advanced' },
  { name: 'React', level: 'Advanced' },
  { name: 'PHP', level: 'Advanced' },
  { name: 'Flutter', level: 'Intermediate' },
  { name: 'MySQL', level: 'Advanced' },
  { name: 'TypeScript', level: 'Advanced' },
  { name: 'Tailwind CSS', level: 'Intermediate' },
];

const experience = [
  {
    title: 'Full Stack Developer',
    company: 'Company Name',
    period: '2023 - Present',
    description: 'Developed and maintained web applications using Spring Boot, Angular, and MySQL. Implemented new features and improved application performance.',
    tech: ['Spring Boot', 'Angular', 'MySQL', 'TypeScript'],
  },
  {
    title: 'Software Developer',
    company: 'Company Name',
    period: '2022 - 2023',
    description: 'Built responsive web applications using React and PHP. Collaborated with the design team to implement user-friendly interfaces.',
    tech: ['React', 'PHP', 'MySQL', 'JavaScript'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Your University',
    period: '2018 - 2022',
    description: 'Focused on software engineering, database management, and web development.',
  },
];

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    tech: ['React', 'Spring Boot', 'MySQL'],
    link: 'https://github.com/your-username/project1',
  },
  {
    title: 'Task Management App',
    description: 'A mobile application for task management and team collaboration built with Flutter.',
    tech: ['Flutter', 'Firebase'],
    link: 'https://github.com/your-username/project2',
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS, featuring dark mode and animations.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/your-username/project3',
  },
];

const contact = {
  email: 'your.email@example.com',
  phone: '+254 700 000000',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile',
};

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Full Stack Developer
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            With 2 years of experience in building modern web applications using
            Spring Boot, Angular, React, PHP, Flutter, and MySQL databases.
          </p>
          <button className="btn-primary">
            View My Work
          </button>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="section-container bg-muted dark:bg-muted" ref={skillsRef}>
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
                className="card"
              >
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <p className="text-sm text-muted-foreground">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="section-container" ref={experienceRef}>
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
      <section className="section-container bg-muted dark:bg-muted" ref={educationRef}>
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
      <section className="section-container" ref={projectsRef}>
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
                className="card"
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted dark:bg-muted rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-primary hover:underline inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project <FiGithub className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-container bg-muted dark:bg-muted" ref={contactRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get in Touch</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              I am currently open to new opportunities. Whether you have a question or just want to say hi, 
              feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiMail className="w-5 h-5" />
                Email Me
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiLinkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
