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
