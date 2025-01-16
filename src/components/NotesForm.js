import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function NotesForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/notes', {
        title: title || null,
        content,
        created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx")
      });
      
      // Reset form after submission
      setTitle('');
      setContent('');
      
      // Optional: Refresh notes list or show success message
      alert('Note created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    }
  };

  return (
    <div className="notes-form">
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Note Content" 
          required 
        />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default NotesForm;