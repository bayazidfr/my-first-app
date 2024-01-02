import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import axios from 'axios';

const FlashCardList = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState('lastModified');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/cards');
      setCards(result.data.sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey])));
    };
    fetchData();
  }, [sortKey]);

  const handleEdit = (card) => {
    // TODO: Implement card edit functionality
  };

  const handleDelete = async (cardId) => {
    await axios.delete(`http://localhost:5000/cards/${cardId}`);
    setCards(cards.filter(card => card.id !== cardId));
  };

  const filteredCards = cards.filter(card => {
    return (
      (card.front.toLowerCase().includes(searchTerm.toLowerCase()) || card.back.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'All' || card.status === statusFilter)
    );
  });

  return (
    <div>
      <input type="text" placeholder="Search cards..." onChange={(e) => setSearchTerm(e.target.value)} />
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Learned">Learned</option>
        <option value="Want to Learn">Want to Learn</option>
        <option value="Noted">Noted</option>
      </select>
      <select onChange={(e) => setSortKey(e.target.value)}>
        <option value="lastModified">Last Modified</option>
        {/* Add other sort options here */}
      </select>
      <div className="flashcard-list">
        {filteredCards.map(card => (
          <FlashCard key={card.id} card={card} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default FlashCardList;
