import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShowWhitespace.css';

const ShowWhitespace = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');

  // Handle Tab key to insert actual tab character
  const handleKeyDown = (e, setSide) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      
      // Insert tab character at cursor position
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      setSide(newValue);
      
      // Move cursor after the inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const showWhitespace = () => {
    // First convert 4 consecutive spaces at line start to tabs (common for pasted code)
    let processed = leftText.replace(/(^|\n)([ ]{4})+/g, (match, lineStart) => {
      const numSpaces = match.length - lineStart.length;
      const numTabs = numSpaces / 4;
      return lineStart + '\t'.repeat(numTabs);
    });
    
    const converted = processed
      .replace(/ /g, '·')
      .replace(/\t/g, '→   ')
      .replace(/\n/g, '↵\n');
    setRightText(converted);
  };

  const hideWhitespace = () => {
    // Hide converts the visible symbols back to normal whitespace
    const converted = leftText
      .replace(/·/g, ' ')
      .replace(/→   /g, '\t')
      .replace(/↵/g, '');
    setRightText(converted);
  };

  const clearAll = () => {
    setLeftText('');
    setRightText('');
  };

  const swapSides = () => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
  };

  return (
    <div className="show-whitespace-page">
      <div className="show-whitespace-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Show Whitespace</h1>
        <p>Visualize whitespace with visible characters • Auto-converts 4 spaces to tabs</p>
      </div>

      <div className="show-whitespace-container">
        <div className="controls-section">
          <div className="legend">
            <span className="legend-item">
              <span className="symbol">·</span> = Space
            </span>
            <span className="legend-item">
              <span className="symbol">→</span> = Tab
            </span>
            <span className="legend-item">
              <span className="symbol">↵</span> = Newline
            </span>
          </div>
          <button onClick={swapSides} className="swap-button">
            ⇄ Swap Sides
          </button>
        </div>

        <div className="text-container">
          <div className="text-box">
            <h3>Input (Normal Text)</h3>
            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setLeftText)}
              placeholder="Paste your text here... (Press Tab to insert actual tab)"
              className="show-whitespace-textarea"
            />
          </div>

          <div className="button-middle">
            <div className="button-group-vertical">
              <button onClick={showWhitespace} className="show-button" title="Converts 4 spaces to tabs, then shows whitespace">
                Show →
              </button>
              <button onClick={hideWhitespace} className="hide-button">
                ← Hide
              </button>
              <button onClick={clearAll} className="clear-button-middle">
                Clear All
              </button>
            </div>
          </div>

          <div className="text-box">
            <h3>Output (Converted)</h3>
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setRightText)}
              placeholder="Result will appear here..."
              className="show-whitespace-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowWhitespace;

