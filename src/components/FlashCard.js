import React, { useState } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={flipCard} onMouseLeave={() => setIsFlipped(false)}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-side front">
          <p>{card.front}</p>
        </div>
        <div className="card-side back">
          <p>{card.back}</p>
          <div className="card-info">
            <div className="card-date">Last Modified: {new Date(card.lastModified).toLocaleString()}</div>
            <div className="card-status">Status: {card.status}</div>
          </div>
        </div>
      </div>
      <div className="card-controls">
        <button onClick={() => onEdit(card)}>Edit</button>
        <button onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    </div>
  );
};

export default FlashCard;
