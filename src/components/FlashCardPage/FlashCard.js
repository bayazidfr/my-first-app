import React, { useState } from 'react';
import EditCardModal from './EditCardModal';
import './FlashCard.css';

const FlashCard = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete(card.id);
  };

  const handleModalSave = (editedCard) => {
    onEdit({ ...editedCard, lastModified: new Date().toISOString() });
    setIsModalOpen(false);
  };

  return (
    <div className="flashcard-container" onClick={flipCard}>
      <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-side front">
          <p>{card.front}</p>
        </div>
        <div className="card-side back">
          <p>{card.back}</p>
          <div className="card-info">
            <div className="card-date">
              Last Modified: {new Date(card.lastModified).toLocaleString()}
            </div>
            <div className="card-status">Status: {card.status}</div>
          </div>
        </div>
      </div>

      <div className="card-controls">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>

      {isModalOpen && (
        <EditCardModal
          card={card}
          onSave={handleModalSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FlashCard;
