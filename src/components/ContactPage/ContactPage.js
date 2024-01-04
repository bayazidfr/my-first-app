import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/messages', formData);
      setMessageSent(true);
      setFormData({ subject: '', email: '', content: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      {messageSent && <div className="success-message">Message sent successfully!</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Your Message"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
