import React, { useState, useEffect } from 'react';
import './App.css';

function Comparison({ file1, file2 }) {
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    if (!file1 || !file2) return;

    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);

    const missingInFile2 = keys1.filter((key) => !keys2.includes(key));
    const missingInFile1 = keys2.filter((key) => !keys1.includes(key));

    setResult({ missingInFile2, missingInFile1 });
  };

  const handleDownload = () => {
    if (!result) return;

    const textContent = `
Missing in Box Two:
${result.missingInFile2.length ? result.missingInFile2.join(', ') : 'None'}

Missing in Box One:
${result.missingInFile1.length ? result.missingInFile1.join(', ') : 'None'}
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'comparison_result.txt';
    link.click();
  };

  useEffect(() => {
    setResult(null);
  }, [file1, file2]);

  return (
    <>
      <div className="button-container">
        <button className="action-btn" onClick={handleCompare} disabled={!file1 || !file2}>
          Compare
        </button>
        <button className="action-btn" onClick={handleDownload} disabled={!result}>
          Download Result
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h3>Comparison Result</h3>
          <div>
            <strong>Missing in Box Two:</strong> {result.missingInFile2.length} key{result.missingInFile2.length !== 1 ? 's' : ''}
          </div>
          <div>
            <strong>Missing in Box One:</strong> {result.missingInFile1.length} key{result.missingInFile1.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </>
  );
}

export default Comparison;
