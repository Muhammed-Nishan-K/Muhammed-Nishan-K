import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { userData } from '../data';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-page section" style={{marginTop: 'var(--nav-height)'}}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="projects-header"
        >
          <h2>Featured <span className="text-gradient">Projects</span></h2>
          <p className="summary-text">A collection of my recent work, university projects, and freelance engagements.</p>
        </motion.div>

        <div className="projects-grid">
          {userData.projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-content">
                <h3>{project.title}</h3>
                <ul className="project-desc">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
              <div className="project-footer">
                {project.linkType && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                    {project.linkType.toLowerCase() === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
                    <span>{project.linkType}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
