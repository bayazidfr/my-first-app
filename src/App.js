import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FlashCardsPage from './components/FlashCardPage/FlashCardsPage';
import ContactPage from './components/ContactPage/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-button">Home</Link>
            </li>
            <li>
              <Link to="/flashcards" className="nav-button">Flash Cards</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-button">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashCardsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
