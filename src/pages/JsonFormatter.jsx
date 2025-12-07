import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JsonFormatter.css';

const JsonFormatter = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(leftText);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setRightText(formatted);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(leftText);
      const minified = JSON.stringify(parsed);
      setRightText(minified);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  const clearAll = () => {
    setLeftText('');
    setRightText('');
    setError('');
  };

  const swapSides = () => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
  };

  return (
    <div className="json-formatter-page">
      <div className="json-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>JSON Formatter</h1>
        <p>Format, minify, and validate JSON data</p>
      </div>

      <div className="json-container">
        {error && (
          <div className="error-section">
            <div className="error-message">❌ {error}</div>
          </div>
        )}

        <div className="controls-section">
          <div className="indent-control">
            <label>Indent Size:</label>
            <select value={indentSize} onChange={(e) => setIndentSize(Number(e.target.value))}>
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          <button onClick={swapSides} className="swap-button">
            ⇄ Swap Sides
          </button>
        </div>

        <div className="text-container">
          <div className="text-box">
            <h3>Input (Unformatted)</h3>
            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder='{"name":"John","age":30}'
              className="json-textarea"
            />
          </div>

          <div className="button-middle">
            <div className="button-group-vertical">
              <button onClick={formatJson} className="format-button">
                Format →
              </button>
              <button onClick={minifyJson} className="minify-button">
                ← Minify
              </button>
              <button onClick={clearAll} className="clear-button-middle">
                Clear All
              </button>
            </div>
          </div>

          <div className="text-box">
            <h3>Output (Formatted)</h3>
            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder='Result will appear here...'
              className="json-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
