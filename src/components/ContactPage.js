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
