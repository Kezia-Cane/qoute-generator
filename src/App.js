import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (e) {
      setError('Failed to fetch quote. Please try again.');
      console.error('Error fetching quote:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []); // Fetch quote on initial load

  return (
    <div className="App">
      <div className="quote-container">
        <h1>Random Quote Generator</h1>
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <blockquote className="quote-card">
            <p className="quote-text">"{quote}"</p>
            <cite className="quote-author">- {author}</cite>
          </blockquote>
        )}
        <button onClick={fetchQuote} disabled={isLoading} className="new-quote-button">
          {isLoading ? 'Loading...' : 'Get New Quote'}
        </button>
      </div>
    </div>
  );
}

export default App;
