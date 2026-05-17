import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { userData } from '../data';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  Swal.fire({
    title: 'Sending Message...',
    text: 'Please wait while your message is being sent.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const form = new FormData();

    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("_subject", "New Message from Portfolio Website");
    form.append("_captcha", "false");

    const response = await fetch(
      "https://formsubmit.co/ajax/nishank855@gmail.com",
      {
        method: "POST",
        body: form,
      }
    );

    const result = await response.json();

    if (result.success === "true") {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out.",
      });

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Unable to send message"
    });
  }
};

  return (
    <div className="contact-page section" style={{marginTop: 'var(--nav-height)'}}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contact-header"
        >
          <h2>Get In <span className="text-gradient">Touch</span></h2>
          <p className="summary-text">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        </motion.div>

        <div className="contact-container">
          <motion.div 
            className="contact-info glass-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Contact Information</h3>
            <p>Fill out the form or reach out directly using the details below.</p>
            
            <div className="info-items">
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>{userData.phone}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${userData.email}`}>{userData.email}</a>
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>{userData.location}</p>
                </div>
              </div>

              <div className="info-item">
                <FaLinkedin className="info-icon" />
                <div>
                  <h4>LinkedIn</h4>
                  <a href={userData.linkedin !== 'LinkedIn' ? userData.linkedin : '#'} target="_blank" rel="noreferrer">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form glass-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>

<input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_template" value="table" />
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name"  
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
