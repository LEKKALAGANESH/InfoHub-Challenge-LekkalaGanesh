import axios from 'axios';
import { useState } from 'react';
import { FaCalculator, FaExchangeAlt } from 'react-icons/fa';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function convert() {
    setError(''); setLoading(true); setResult(null);
    try {
      const res = await axios.get('/api/currency', { params: { amount } });
      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Conversion failed.');
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <FaExchangeAlt /> Currency Converter
      </h2>
      <p className="small">Convert INR to USD and EUR instantly</p>
      <div className="row">
        <input
          className="input"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
          aria-label="Amount in INR"
          min="0"
          step="0.01"
        />
        <button
          className="btn"
          onClick={convert}
          disabled={isLoading}
          aria-label="Convert currency"
        >
          <FaCalculator /> Convert
        </button>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          Converting currency...
        </div>
      )}
      {error && <div className="error" role="alert">{error}</div>}
      {result && !isLoading && (
        <div className="result" role="region" aria-label="Conversion results">
          <div style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            <strong>₹{result.amountINR.toLocaleString()}</strong> INR converts to:
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>USD:</span>
            <strong>${result.usd.toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>EUR:</span>
            <strong>€{result.eur.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
