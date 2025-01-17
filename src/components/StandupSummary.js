// StandupSummary.js
import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './StandupSummary.css';

function StandupSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStandupSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await axios.post(`http://localhost:3000/summaries/standup-summary?date=${today}`);
      console.log(response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching standup summary:', error);
      setError('Failed to generate standup summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="standup-summary-container">
      <h2 className="standup-summary-header">Standup Summary</h2>
      <button 
        onClick={fetchStandupSummary} 
        className="generate-summary-btn"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>

      {error && <div className="standup-summary-error">{error}</div>}

      {summary && (
        <div className="standup-summary-content">
          <section className="summary-section">
            <h3>Standup Summary</h3>
            <pre className="summary-text">{summary}</pre>
          </section>
        </div>
      )}
    </div>
  );
}

export default StandupSummary;