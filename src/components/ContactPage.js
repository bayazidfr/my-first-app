import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css'; // Make sure to create this CSS file

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
