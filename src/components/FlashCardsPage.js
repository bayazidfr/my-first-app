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

  return (
    <div className="flashcard-page">
      <h1>FlashCard App</h1>

      <div className="new-card-form">
        <input
          type="text"
          name="front"
          placeholder="Front side text"
          value={newCard.front}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="back"
          placeholder="Back side text"
          value={newCard.back}
          onChange={handleInputChange}
        />
        <select name="status" onChange={handleInputChange} value={newCard.status}>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Learned">Learned</option>
          <option value="Noted">Noted</option>
        </select>
        <button onClick={addNewCard}>Add Card</button>
      </div>

      <FlashCardList />
    </div>
  );
};

export default FlashCardPage;
