import React, { useState } from 'react';
import axios from 'axios';
import FlashCardList from './FlashCardList';
import './FlashCardPage.css'; // Assuming you have a CSS file

const FlashCardPage = () => {
  const initialCardState = { front: '', back: '', status: 'Want to Learn' };
  const [newCard, setNewCard] = useState(initialCardState);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const addNewCard = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const currentDate = new Date().toISOString();
    const cardToAdd = { ...newCard, lastModified: currentDate };

    try {
      const response = await axios.post('http://localhost:5000/cards', cardToAdd);
      if (response.status === 201) {
        setFeedbackMessage('Card added successfully');
        setNewCard(initialCardState); // Resets the form
      }
    } catch (error) {
      setFeedbackMessage('Error adding new card');
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

      <form className="new-card-form" onSubmit={addNewCard}>
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
        <button type="submit">Add Card</button>
      </form>

      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}

      <FlashCardList />
    </div>
  );
};

export default FlashCardPage;
