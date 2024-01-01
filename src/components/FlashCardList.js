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
  };

export default FlashCardList;
