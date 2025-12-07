import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const tools = [
    {
      name: 'Diff Checker',
      path: '/diffchecker',
      description: 'Compare and find differences between two texts',
      icon: '⚡'
    },
    {
      name: 'JSON Formatter',
      path: '/json-formatter',
      description: 'Format and validate JSON data',
      icon: '📝'
    },
    {
      name: 'Whitespace Converter',
      path: '/whitespace-converter',
      description: 'Convert whitespace to escape sequences',
      icon: '🔍'
    },
    {
      name: 'Show Whitespace',
      path: '/show-whitespace',
      description: 'Visualize whitespace with visible characters',
      icon: '👁️'
    }
  ];

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Developer Tools</h1>
        <p className="landing-subtitle">A collection of useful utilities for developers</p>
        
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link 
              key={tool.path} 
              to={tool.path} 
              className="tool-card"
            >
              <div className="tool-icon">{tool.icon}</div>
              <h2 className="tool-name">{tool.name}</h2>
              <p className="tool-description">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

