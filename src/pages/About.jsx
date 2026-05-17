import React from 'react';
import { motion } from 'framer-motion';
import { userData } from '../data';
import './About.css';

const About = () => {
  return (
    <div className="about-page section" style={{marginTop: 'var(--nav-height)'}}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="about-header"
        >
          <h2>About <span className="text-gradient">Me</span></h2>
          <p className="summary-text">{userData.profileSummary}</p>
        </motion.div>

        <div className="skills-section">
          <h3>Technical <span className="text-gradient">Skills</span></h3>
          <div className="skills-grid">
            <div className="skill-category glass-panel">
              <h4>Frontend</h4>
              <div className="skill-tags">
                {userData.skills.frontend.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category glass-panel">
              <h4>Backend</h4>
              <div className="skill-tags">
                {userData.skills.backend.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category glass-panel">
              <h4>Tools & Architecture</h4>
              <div className="skill-tags">
                {userData.skills.tools.map(tool => (
                  <span key={tool} className="tag">{tool}</span>
                ))}
                {userData.skills.architecture.map(arch => (
                  <span key={arch} className="tag">{arch}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="timeline-container">
          <div className="experience-section">
            <h3><span className="text-gradient">Experience</span></h3>
            <div className="timeline">
              {userData.experience.map((exp, index) => (
                <motion.div 
                  className="timeline-item glass-panel"
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{exp.role}</h4>
                    <h5>{exp.company} | {exp.location}</h5>
                    <span className="duration">{exp.duration}</span>
                    <ul>
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="education-section">
            <h3><span className="text-gradient">Education</span></h3>
            <div className="timeline">
              {userData.education.map((edu, index) => (
                <motion.div 
                  className="timeline-item glass-panel"
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>{edu.degree}</h4>
                    <h5>{edu.institution}</h5>
                    <span className="duration">{edu.duration} | {edu.location}</span>
                    {edu.score && <p className="score">{edu.score}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
