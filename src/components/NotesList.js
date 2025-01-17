import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function NotesList({ day }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
        try {
          console.log("Fetching notes for day: ", day);
          const response = await axios.get(`http://localhost:3000/notes/${day}`);
          // Ensure we have an array, even if the response is different
          const notesData = Array.isArray(response.data) 
            ? response.data 
            : (response.data.notes || []);
          setNotes(notesData);
        } catch (error) {
          console.error('Error fetching notes:', error);
          setNotes([]); // Set to empty array to prevent mapping error
        }
      };

    fetchNotes();
  }, [day]);

  const dayDisplay = day === 'today' ? 'Today' : day === 'yesterday' ? 'Yesterday' : day;

  return (
    <div className="notes-list">
      <h2>{ dayDisplay }'s Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{format(new Date(note.created_at), 'PPpp')}</small>
        </div>
      ))}
    </div>
  );
}

export default NotesList;