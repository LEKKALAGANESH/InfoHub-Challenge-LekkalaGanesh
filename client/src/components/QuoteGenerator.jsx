// File: InfoHub-Challenge/client/src/components/QuoteGenerator.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaQuoteLeft, FaRedo } from 'react-icons/fa';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchQuote() {
    setLoading(true); setError('');
    try {
      const res = await axios.get('/api/quote');
      setQuote(res.data.quote);
    } catch (err) {
      setError('Could not fetch quote.');
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchQuote(); }, []);

  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <FaQuoteLeft /> Motivational Quote
      </h2>
      <p className="small">Get inspired with daily motivational quotes</p>
      <div className="row">
        <button
          className="btn"
          onClick={fetchQuote}
          disabled={isLoading}
          aria-label="Get new quote"
        >
          <FaRedo /> {isLoading ? 'Loading...' : 'New Quote'}
        </button>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          Fetching inspiration...
        </div>
      )}
      {error && <div className="error" role="alert">{error}</div>}
      {quote && !isLoading && (
        <div className="result" role="region" aria-label="Quote display">
          <blockquote style={{ margin: 0, padding: '16px', background: 'linear-gradient(135deg, #fef7ed, #fed7aa)', borderRadius: '12px', borderLeft: '4px solid #f97316' }}>
            <p className="quote-text">"{quote.text}"</p>
            <footer className="quote-author">— {quote.author || 'Unknown'}</footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}
