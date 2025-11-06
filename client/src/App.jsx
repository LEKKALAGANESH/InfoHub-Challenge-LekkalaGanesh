// File: InfoHub-Challenge/client/src/App.jsx
import { useState } from 'react';
import { FaCloudSun, FaExchangeAlt, FaQuoteLeft } from 'react-icons/fa';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import WeatherModule from './components/WeatherModule';

export default function App() {
  const [tab, setTab] = useState('Weather');

  const tabIcons = {
    Weather: <FaCloudSun />,
    Currency: <FaExchangeAlt />,
    Quotes: <FaQuoteLeft />
  };

  const tabDescriptions = {
    Weather: 'Get current weather information',
    Currency: 'Convert INR to USD and EUR',
    Quotes: 'Get motivational quotes'
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="title">InfoHub</h1>
          <p className="small">{tabDescriptions[tab]}</p>
        </div>
        <nav className="tabs" role="tablist" aria-label="Main navigation">
          {['Weather', 'Currency', 'Quotes'].map(t => (
            <button
              key={t}
              className={`tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
              aria-selected={tab === t}
              role="tab"
            >
              {tabIcons[t]} {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="card" role="main" aria-live="polite">
        {tab === 'Weather' && <WeatherModule />}
        {tab === 'Currency' && <CurrencyConverter />}
        {tab === 'Quotes' && <QuoteGenerator />}
      </main>
    </div>
  );
}
