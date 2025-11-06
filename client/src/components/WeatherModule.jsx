// File: InfoHub-Challenge/client/src/components/WeatherModule.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCloudSun, FaMapMarkerAlt, FaSearch, FaThermometerHalf } from 'react-icons/fa';

export default function WeatherModule() {
  const [city, setCity] = useState('London');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWeather(qcity = city) {
    setError(''); setLoading(true);
    try {
      const res = await axios.get(`/api/weather`, { params: { city: qcity } });
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to fetch weather.');
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchWeather(); /* initial fetch */ }, []);

  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <FaCloudSun /> Weather
      </h2>
      <p className="small">Check current weather conditions anywhere</p>
      <div className="row">
        <input
          className="input"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
          aria-label="City name"
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather(city)}
        />
        <button
          className="btn"
          onClick={() => fetchWeather(city)}
          disabled={isLoading}
          aria-label="Fetch weather"
        >
          <FaSearch /> Get Weather
        </button>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          Fetching weather data...
        </div>
      )}
      {error && <div className="error" role="alert">{error}</div>}
      {data && !isLoading && !error && (
        <div className="result" role="region" aria-label="Weather information">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <FaMapMarkerAlt />
            <strong style={{ fontSize: '1.2rem' }}>{data.city}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FaThermometerHalf />
            <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              {data.tempC}°C / {data.tempF}°F
            </span>
          </div>
          <div style={{ padding: '8px 12px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <strong>Condition:</strong> {data.description}
          </div>
        </div>
      )}
    </div>
  );
}
