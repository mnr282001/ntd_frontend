// App.js
import React from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import StandupSummary from './components/StandupSummary';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Daily Notes & Standup Summary</h1>
      </header>
      <main className="app-main">
        <div className="app-content">
          <NotesForm />
          <div className="notes-section">
            <NotesList day="today" />
            <NotesList day="yesterday" />
          </div>
          <StandupSummary />
        </div>
      </main>
    </div>
  );
}

export default App;