// NotesForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './NotesForm.css';

function NotesForm() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/notes', { 
        content, 
        created_at: new Date().toISOString() 
      });
      setContent('');
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    }
  };

  return (
    <div className="notes-form-container">
      <h2 className="notes-form-header">Create a New Note</h2>
      <form onSubmit={handleSubmit} className="notes-form">
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-submit-btn">Save Note</button>
      </form>
    </div>
  );
}

export default NotesForm;