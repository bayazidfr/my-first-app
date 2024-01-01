import React, { useState } from 'react';
import axios from 'axios';
import FlashCardList from './FlashCardList';
import './FlashCardPage.css';

const FlashCardPage = () => {
  const [newCard, setNewCard] = useState({ front: '', back: '', status: 'Want to Learn' });

  const addNewCard = async () => {
    const currentDate = new Date().toISOString();
    const cardToAdd = { ...newCard, lastModified: currentDate };
    try {
      const response = await axios.post('http://localhost:5000/cards', cardToAdd);
      if (response.status === 201) {
        // Refresh cards list or add the new card to the state
      }
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };
};
