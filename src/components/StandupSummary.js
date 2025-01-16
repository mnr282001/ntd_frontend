import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function StandupSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStandupSummary = async () => {
    setLoading(true);
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await axios.post(`http://localhost:3000/summaries/standup-summary?date=${today}`);
      console.log(response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching standup summary:', error);
      alert('Failed to fetch standup summary');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStandupSummary();
  }, []);

  return (
    <div className="standup-summary">
      <h2>Today's Standup Summary</h2>
      {loading ? (
        <p>Loading summary...</p>
      ) : (
        <div>
          <pre>{summary || 'No summary available'}</pre>
          <button onClick={fetchStandupSummary}>Regenerate Summary</button>
        </div>
      )}
    </div>
  );
}

export default StandupSummary;