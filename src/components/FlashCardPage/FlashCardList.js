import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FlashCard from './FlashCard';
import './FlashCardList.css';
import { debounce } from 'lodash'; // Import debounce function from lodash

const FlashCardList = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAscending, setIsAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreCards, setHasMoreCards] = useState(true);
  const loader = useRef(null);

  const debouncedSearchTerm = useRef(debounce((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setPage(1); // Reset to first page on new search
  }, 500)).current;

  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sortOrder = isAscending ? 'asc' : 'desc';
      const response = await axios.get('http://localhost:5000/cards', {
        params: {
          _page: page,
          _limit: 10,
          _sort: 'lastModified',
          _order: sortOrder,
          ...(statusFilter !== 'All' && { status: statusFilter }),
          ...(searchTerm && { q: searchTerm }),
        },
      });

      if (response.data.length === 0) {
        setHasMoreCards(false);
      } else {
        setHasMoreCards(true);
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

  useEffect(() => {
    fetchCards();
  }, [page, statusFilter, searchTerm, isAscending]);

  const handleSortChange = () => {
    setIsAscending(!isAscending);
    setPage(1); // Reset to first page on sort change
  };

  const handleSearchChange = (event) => {
    debouncedSearchTerm(event.target.value);
  };

  const handleEdit = async (editedCard) => {
    try {
      await axios.put(`http://localhost:5000/cards/${editedCard.id}`, editedCard);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === editedCard.id ? editedCard : card
        )
      );
    } catch (err) {
      setError('Failed to update card');
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:5000/cards/${cardId}`);
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== cardId)
      );
    } catch (err) {
      setError('Failed to delete card');
    }
  };
  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !isLoading && hasMoreCards) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 1.0 });
    if (loader.current && hasMoreCards) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, hasMoreCards]);

  return (
    <div className="flashcard-list-container">
      <div className="controls">
        <input type="text" placeholder="Search cards..." onChange={handleSearchChange} />
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <div className="sort-options">
          <button onClick={handleSortChange}>
            {isAscending ? 'Sort Descending' : 'Sort Ascending'}
          </button>
        </div>
      </div>
      <div className="flashcard-list">
        {cards.map(card => (
          <FlashCard key={card.id} card={card} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {isLoading && <p>Loading more cards...</p>}
        {!isLoading && cards.length === 0 && <p>No cards found.</p>}
        {error && <div className="error-message">{error}</div>}
      </div>
      <div ref={loader}></div>
    </div>
  );
};

export default FlashCardList;
