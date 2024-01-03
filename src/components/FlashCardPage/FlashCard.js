import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip back after 3 seconds
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Keyboard accessibility for flipping
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      flipCard();
    }
  };

  return (
    <div
      className="flashcard-container"
      onClick={flipCard}
      onKeyPress={handleKeyPress}
      tabIndex={0} // Make div focusable
      aria-label="Flip card" // Accessibility label
    >
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
