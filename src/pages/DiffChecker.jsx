import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { computeAlignedDiff, renderLineParts } from '../utils/diffUtils';
import './DiffChecker.css';

const DiffChecker = () => {
  const [originalText, setOriginalText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [showDiff, setShowDiff] = useState(false);
  const [diffResults, setDiffResults] = useState([]);

  const findDifference = () => {
    const results = computeAlignedDiff(originalText, changedText);
    setDiffResults(results);
    setShowDiff(true);
    
    // Scroll to top to show the comparison results
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const clearAll = () => {
    setOriginalText('');
    setChangedText('');
    setShowDiff(false);
    setDiffResults([]);
  };

  const renderLineContent = (parts) => {
    if (!parts) {
      return '\u00A0';
    }
    
    const partElements = renderLineParts(parts);
    if (typeof partElements === 'string') {
      return partElements;
    }
    
    return partElements.map((part) => {
      if (part.type === 'added') {
        return (
          <span key={part.key} className="word-added">
            {part.value}
          </span>
        );
      } else if (part.type === 'removed') {
        return (
          <span key={part.key} className="word-removed">
            {part.value}
          </span>
        );
      } else {
        return <span key={part.key}>{part.value}</span>;
      }
    });
  };

  const renderDiffRow = (row, index) => {
    return (
      <div key={index} className="diff-row">
        {/* Original side */}
        <div className={`diff-cell ${row.originalLine ? row.originalLine.type : 'empty'}`}>
          {row.originalLine ? (
            <>
              <span className="line-number">{row.originalLine.lineNum}</span>
              <span className="line-content">
                {row.originalLine.parts ? 
                  renderLineContent(row.originalLine.parts) : 
                  (row.originalLine.text || '\u00A0')
                }
              </span>
            </>
          ) : (
            <>
              <span className="line-number empty-line-num"></span>
              <span className="line-content empty-content"></span>
            </>
          )}
        </div>
        
        {/* Changed side */}
        <div className={`diff-cell ${row.changedLine ? row.changedLine.type : 'empty'}`}>
          {row.changedLine ? (
            <>
              <span className="line-number">{row.changedLine.lineNum}</span>
              <span className="line-content">
                {row.changedLine.parts ? 
                  renderLineContent(row.changedLine.parts) : 
                  (row.changedLine.text || '\u00A0')
                }
              </span>
            </>
          ) : (
            <>
              <span className="line-number empty-line-num"></span>
              <span className="line-content empty-content"></span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="diff-checker-page">
      <div className="diff-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Diff Checker</h1>
        <p>Compare and find differences between two texts</p>
      </div>

      <div className="diff-container">
        {!showDiff ? (
          <div className="input-section">
            <div className="text-input-container">
              <div className="text-input-box">
                <h3>Original Text</h3>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Paste your original text here..."
                  className="text-area"
                />
              </div>
              <div className="text-input-box">
                <h3>Changed Text</h3>
                <textarea
                  value={changedText}
                  onChange={(e) => setChangedText(e.target.value)}
                  placeholder="Paste your changed text here..."
                  className="text-area"
                />
              </div>
            </div>
            <div className="button-group">
              <button onClick={findDifference} className="find-diff-button">
                Find Difference
              </button>
              <button onClick={clearAll} className="clear-button">
                Clear All
              </button>
            </div>
          </div>
        ) : (
          <div className="results-section">
            <div className="results-header">
              <h2>Comparison Results</h2>
              <button onClick={() => setShowDiff(false)} className="edit-button">
                ← Back to Input
              </button>
            </div>
            <div className="legend">
              <span className="legend-item">
                <span className="legend-color removed-color"></span>
                Deletions
              </span>
              <span className="legend-item">
                <span className="legend-color added-color"></span>
                Additions
              </span>
              <span className="legend-item">
                <span className="legend-color modified-color"></span>
                Modifications
              </span>
            </div>
            <div className="diff-results-aligned">
              <div className="diff-headers">
                <div className="diff-header-cell">
                  <h3>Original Text</h3>
                </div>
                <div className="diff-header-cell">
                  <h3>Changed Text</h3>
                </div>
              </div>
              <div className="diff-content-aligned">
                {diffResults.map((row, index) => renderDiffRow(row, index))}
              </div>
            </div>

            {/* Editable text fields below results */}
            <div className="edit-section">
              <div className="text-input-container">
                <div className="text-input-box">
                  <h3>Original Text</h3>
                  <textarea
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Paste your original text here..."
                    className="text-area"
                  />
                </div>
                <div className="text-input-box">
                  <h3>Changed Text</h3>
                  <textarea
                    value={changedText}
                    onChange={(e) => setChangedText(e.target.value)}
                    placeholder="Paste your changed text here..."
                    className="text-area"
                  />
                </div>
              </div>
              <div className="button-group">
                <button onClick={findDifference} className="find-diff-button">
                  Re-compare
                </button>
                <button onClick={clearAll} className="clear-button">
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiffChecker;
