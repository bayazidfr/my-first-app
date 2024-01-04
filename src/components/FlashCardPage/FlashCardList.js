// FlashCardList.js
import React, { useState, useEffect, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [hasMoreCards, setHasMoreCards] = useState(true);
  const loader = useRef(null);

  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/cards', {
        params: {
          _page: page,
          _limit: 10,
          _sort: sortKey,
          ...(statusFilter !== 'All' && { status: statusFilter }),
          ...(searchTerm && { q: searchTerm }),
        },
      });

      if (response.data.length === 0) {
        setHasMoreCards(false);
      }

      if (page === 1) {
        setCards(response.data);
      } else {
        setCards(prevCards => [...prevCards, ...response.data]);
      }
    } catch (err) {
      setError('Failed to fetch cards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !isLoading && hasMoreCards) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      { threshold: 1.0 }
    );

    if (loader.current && hasMoreCards) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, error, cards, hasMoreCards]);

  useEffect(() => {
    fetchCards();
  }, [page]);

  // Handle status and sort key changes
  useEffect(() => {
    setPage(1); // Reset page to 1 when filters change
    fetchCards();
  }, [sortKey, statusFilter, searchTerm]);

  const handleEdit = (editedCard) => {
    setCards(cards.map(card => card.id === editedCard.id ? editedCard : card));
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:5000/cards/${cardId}`);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (err) {
      setError('Failed to delete card');
    }
  };

  return (
    <div className="flashcard-list-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search cards..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="lastModified">Last Modified</option>
          <option value="front">Card Front</option>
        </select>
      </div>
      <div className="flashcard-list">
        {cards.map(card => (
          <FlashCard
            key={card.id}
            card={card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {isLoading && hasMoreCards && <p>Loading more cards...</p>}
        {error && <div className="error-message">{error}</div>}
      </div>
      {hasMoreCards && <div ref={loader} />}
    </div>
  );
};

export default FlashCardList;
