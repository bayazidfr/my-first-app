import React, { useState } from 'react';
import './EditCardModal.css';

const EditCardModal = ({ card, onSave, onClose }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleInputChange = (event) => {
    setEditedCard({ ...editedCard, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {

    const updatedCard = { ...editedCard, lastModified: new Date().toISOString() };
    onSave(updatedCard);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <input type="text" name="front" value={editedCard.front} onChange={handleInputChange} />
        <input type="text" name="back" value={editedCard.back} onChange={handleInputChange} />
        <select name="status" value={editedCard.status} onChange={handleInputChange}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default EditCardModal;
