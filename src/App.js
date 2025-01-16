import React from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import StandupSummary from './components/StandupSummary';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Daily Notes & Standup Summary</h1>
      </header>
      <main>
        <NotesForm />
        <NotesList />
        <StandupSummary />
      </main>
    </div>
  );
}

export default App;