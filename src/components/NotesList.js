import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './NotesList.css';

function NotesList({ day }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("Fetching notes for day: ", day);
        const response = await axios.get(`http://localhost:3000/notes/${day}`);
        const notesData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.notes || []);
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [day]);

  const dayDisplay = day === 'today' ? 'Today' : day === 'yesterday' ? 'Yesterday' : day;

  return (
    <div className="notes-list-container">
      <h2 className="notes-list-header">{ dayDisplay }'s Notes</h2>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes for this day</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <h3 className="note-title">{note.title}</h3>
              <p className="note-content">{note.content}</p>
              <small className="note-timestamp">
                {format(new Date(note.created_at), 'PPpp')}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;