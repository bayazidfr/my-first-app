import React, { useState, useEffect } from 'react';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      flipCard();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(editedCard);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCard({ ...card });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCard({ ...editedCard, [name]: value });
  };

  return (
    <div
      className="flashcard-container"
      onClick={flipCard}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      aria-label="Flip card"
    >
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        {isEditing ? (
          <div className="card-side front">
            <input
              type="text"
              name="front"
              value={editedCard.front}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="card-side front">
            <p>{editedCard.front}</p>
          </div>
        )}
        {isEditing ? (
          <div className="card-side back">
            <input
              type="text"
              name="back"
              value={editedCard.back}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="card-side back">
            <p>{editedCard.back}</p>
            <div className="card-info">
              <div className="card-date">
                Last Modified: {new Date(editedCard.lastModified).toLocaleString()}
              </div>
              <div className="card-status">Status: {editedCard.status}</div>
            </div>
          </div>
        )}
      </div>
      <div className="card-controls">
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(card.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashCard;