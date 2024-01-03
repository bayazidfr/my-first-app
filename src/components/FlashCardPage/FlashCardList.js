import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';
import './FlashCardList.css';

const FlashCardList = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState('lastModified');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/cards');
        const sortedCards = response.data.sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]));
        setCards(sortedCards);
      } catch (err) {
        setError('Failed to fetch cards');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [sortKey]);

  const handleEdit = (card) => {
    setEditingCard(card);
  };

  const handleSaveEdit = async (editedCard) => {
    try {
      const response = await axios.put(`http://localhost:5000/cards/${editedCard.id}`, editedCard);
      if (response.status === 200) {
        const updatedCards = cards.map((card) => (card.id === editedCard.id ? editedCard : card));
        setCards(updatedCards);
        setEditingCard(null); // Close the edit form
      } else {
        setError('Failed to save changes');
      }
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null); // Close the edit form without saving changes
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:5000/cards/${cardId}`);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (err) {
      setError('Failed to delete card');
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      (card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.back.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || card.status === statusFilter)
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard-list-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search cards..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <select onChange={(e) => setSortKey(e.target.value)}>
          <option value="lastModified">Last Modified</option>
          <option value="front">Card Front</option>
          {/* Add other sort options here */}
        </select>
      </div>
      <div className="flashcard-list">
        {filteredCards.map((card) => (
          <FlashCard
            key={card.id}
            card={card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {editingCard && (
          // Render the edit form
          <div className="edit-card-form">
            <input
              type="text"
              value={editingCard.front}
              onChange={(e) =>
                setEditingCard({ ...editingCard, front: e.target.value })
              }
            />
            <input
              type="text"
              value={editingCard.back}
              onChange={(e) =>
                setEditingCard({ ...editingCard, back: e.target.value })
              }
            />
            <button onClick={() => handleSaveEdit(editingCard)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCardList;
