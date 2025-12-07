import * as Diff from 'diff';

/**
 * Computes similarity score between two strings (0 to 1, higher is more similar)
 */
const getSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * Computes Levenshtein distance between two strings
 */
const getEditDistance = (str1, str2) => {
  const costs = [];
  for (let i = 0; i <= str1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= str2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[str2.length] = lastValue;
  }
  return costs[str2.length];
};

/**
 * Pairs up removed and added lines intelligently based on similarity
 */
const pairLines = (removedLines, addedLines) => {
  const pairs = [];
  const usedAdded = new Set();
  const usedRemoved = new Set();
  
  // Find best matches for each removed line
  removedLines.forEach((removedLine, removedIdx) => {
    let bestMatch = -1;
    let bestSimilarity = 0.4; // Threshold for considering lines as modified
    
    addedLines.forEach((addedLine, addedIdx) => {
      if (usedAdded.has(addedIdx)) return;
      
      const similarity = getSimilarity(removedLine.text, addedLine.text);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatch = addedIdx;
      }
    });
    
    if (bestMatch !== -1) {
      pairs.push({
        removedIdx,
        addedIdx: bestMatch,
        similarity: bestSimilarity
      });
      usedAdded.add(bestMatch);
      usedRemoved.add(removedIdx);
    }
  });
  
  return { pairs, usedAdded, usedRemoved };
};

/**
 * Computes an aligned diff between two texts with word-level highlighting
 * @param {string} originalText - The original text
 * @param {string} changedText - The changed text
 * @returns {Array} Array of aligned diff rows
 */
export const computeAlignedDiff = (originalText, changedText) => {
  // Get line-level diff
  const lineDiff = Diff.diffLines(originalText, changedText);
  
  // Build initial diff structure
  const blocks = [];
  let originalLineNum = 0;
  let changedLineNum = 0;
  
  lineDiff.forEach((part) => {
    const lines = part.value.split('\n');
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }
    
    if (!part.added && !part.removed) {
      // Unchanged lines
      lines.forEach((line) => {
        blocks.push({
          type: 'unchanged',
          originalLine: {
            text: line,
            lineNum: ++originalLineNum,
            type: 'unchanged',
            parts: null
          },
          changedLine: {
            text: line,
            lineNum: ++changedLineNum,
            type: 'unchanged',
            parts: null
          }
        });
      });
    } else if (part.removed) {
      // Removed block
      const removedLines = lines.map((line) => ({
        text: line,
        lineNum: ++originalLineNum
      }));
      blocks.push({
        type: 'removed',
        lines: removedLines
      });
    } else if (part.added) {
      // Added block
      const addedLines = lines.map((line) => ({
        text: line,
        lineNum: ++changedLineNum
      }));
      blocks.push({
        type: 'added',
        lines: addedLines
      });
    }
  });
  
  // Process blocks to pair up removed/added blocks intelligently
  const processedResults = [];
  let i = 0;
  
  while (i < blocks.length) {
    const current = blocks[i];
    
    if (current.type === 'unchanged') {
      processedResults.push(current);
      i++;
      continue;
    }
    
    // Look for adjacent removed/added blocks
    if (current.type === 'removed') {
      const next = blocks[i + 1];
      
      if (next && next.type === 'added') {
        // We have a removed block followed by an added block
        const removedLines = current.lines;
        const addedLines = next.lines;
        
        // Pair up lines intelligently
        const { pairs, usedAdded, usedRemoved } = pairLines(removedLines, addedLines);
        
        // Process paired lines (modifications)
        pairs.forEach(({ removedIdx, addedIdx }) => {
          const removedLine = removedLines[removedIdx];
          const addedLine = addedLines[addedIdx];
          
          // Do word-level diff
          const wordDiff = Diff.diffWords(removedLine.text, addedLine.text);
          const originalParts = wordDiff.filter(p => !p.added);
          const changedParts = wordDiff.filter(p => !p.removed);
          
          processedResults.push({
            type: 'modified',
            originalLine: {
              text: removedLine.text,
              lineNum: removedLine.lineNum,
              type: 'modified',
              parts: originalParts
            },
            changedLine: {
              text: addedLine.text,
              lineNum: addedLine.lineNum,
              type: 'modified',
              parts: changedParts
            }
          });
        });
        
        // Process unpaired removed lines (pure deletions)
        removedLines.forEach((line, idx) => {
          if (!usedRemoved.has(idx)) {
            processedResults.push({
              type: 'removed',
              originalLine: {
                text: line.text,
                lineNum: line.lineNum,
                type: 'removed',
                parts: [{ value: line.text, removed: true }]
              },
              changedLine: null
            });
          }
        });
        
        // Process unpaired added lines (pure additions)
        addedLines.forEach((line, idx) => {
          if (!usedAdded.has(idx)) {
            processedResults.push({
              type: 'added',
              originalLine: null,
              changedLine: {
                text: line.text,
                lineNum: line.lineNum,
                type: 'added',
                parts: [{ value: line.text, added: true }]
              }
            });
          }
        });
        
        i += 2; // Skip both blocks
        continue;
      } else {
        // Only removed block, no matching added block
        current.lines.forEach((line) => {
          processedResults.push({
            type: 'removed',
            originalLine: {
              text: line.text,
              lineNum: line.lineNum,
              type: 'removed',
              parts: [{ value: line.text, removed: true }]
            },
            changedLine: null
          });
        });
        i++;
        continue;
      }
    }
    
    if (current.type === 'added') {
      // Only added block, no matching removed block
      current.lines.forEach((line) => {
        processedResults.push({
          type: 'added',
          originalLine: null,
          changedLine: {
            text: line.text,
            lineNum: line.lineNum,
            type: 'added',
            parts: [{ value: line.text, added: true }]
          }
        });
      });
      i++;
      continue;
    }
    
    i++;
  }
  
  return processedResults;
};

/**
 * Renders the parts of a diff line with appropriate highlighting
 * @param {Array} parts - Array of diff parts
 * @returns {Array} Array of React elements
 */
export const renderLineParts = (parts) => {
  if (!parts || parts.length === 0) {
    return '\u00A0';
  }
  
  return parts.map((part, partIndex) => {
    if (part.added) {
      return {
        key: partIndex,
        type: 'added',
        value: part.value
      };
    } else if (part.removed) {
      return {
        key: partIndex,
        type: 'removed',
        value: part.value
      };
    } else {
      return {
        key: partIndex,
        type: 'normal',
        value: part.value
      };
    }
  });
};
