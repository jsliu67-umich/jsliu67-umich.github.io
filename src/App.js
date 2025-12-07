import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import DiffChecker from './pages/DiffChecker';
import JsonFormatter from './pages/JsonFormatter';
import WhitespaceConverter from './pages/WhitespaceConverter';
import ShowWhitespace from './pages/ShowWhitespace';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diffchecker" element={<DiffChecker />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/whitespace-converter" element={<WhitespaceConverter />} />
          <Route path="/show-whitespace" element={<ShowWhitespace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
