import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WhitespaceConverter.css';

const WhitespaceConverter = () => {
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

  const encodeWhitespace = () => {
    // First convert 4 consecutive spaces to tabs (common for pasted code)
    let processed = leftText.replace(/(^|\n)([ ]{4})+/g, (match, lineStart) => {
      const numSpaces = match.length - lineStart.length;
      const numTabs = numSpaces / 4;
      return lineStart + '\t'.repeat(numTabs);
    });
    
    const converted = processed
      .replace(/\\/g, '\\\\')  // Escape existing backslashes first
      .replace(/\r\n/g, '\\r\\n')  // Windows line endings
      .replace(/\n/g, '\\n')       // Unix line endings
      .replace(/\r/g, '\\r')       // Mac line endings
      .replace(/\t/g, '\\t')       // Tabs
      .replace(/\f/g, '\\f')       // Form feeds
      .replace(/\v/g, '\\v');      // Vertical tabs
    setRightText(converted);
  };

  const decodeWhitespace = () => {
    const converted = leftText
      .replace(/\\r\\n/g, '\r\n')  // Windows line endings
      .replace(/\\n/g, '\n')        // Newlines
      .replace(/\\r/g, '\r')        // Carriage returns
      .replace(/\\t/g, '\t')        // Tabs
      .replace(/\\f/g, '\f')        // Form feeds
      .replace(/\\v/g, '\v')        // Vertical tabs
      .replace(/\\\\/g, '\\');      // Unescape backslashes last
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
    <div className="whitespace-converter-page">
      <div className="whitespace-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Whitespace Converter</h1>
        <p>Convert whitespace to escape sequences (\n, \t, \r) • Auto-converts 4 spaces to tabs</p>
      </div>

      <div className="whitespace-container">
        <div className="controls-section">
          <div className="legend">
            <span className="legend-item">
              <span className="symbol">\n</span> = Newline
            </span>
            <span className="legend-item">
              <span className="symbol">\t</span> = Tab
            </span>
            <span className="legend-item">
              <span className="symbol">\r</span> = Carriage Return
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
              className="whitespace-textarea"
            />
          </div>

          <div className="button-middle">
            <div className="button-group-vertical">
              <button onClick={encodeWhitespace} className="encode-button" title="Converts 4 spaces to tabs, then encodes whitespace">
                Encode →
              </button>
              <button onClick={decodeWhitespace} className="decode-button">
                ← Decode
              </button>
              <button onClick={clearAll} className="clear-button-middle">
                Clear All
              </button>
            </div>
          </div>

          <div className="text-box">
            <h3>Output (Escape Sequences)</h3>
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, setRightText)}
              placeholder="Result will appear here..."
              className="whitespace-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitespaceConverter;
