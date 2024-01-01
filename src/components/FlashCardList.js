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
  };

export default FlashCardList;
