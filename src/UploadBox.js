import React, { useState, useRef } from 'react';
import './App.css';

function UploadBox({ label, setParsedData, index, currentFile, otherFile, setError }) {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const readJSONFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);

        // Check for empty object
        if (Object.keys(json).length === 0) {
          setError(`Uploaded file in Box ${index + 1} is empty or invalid.`);
          return;
        }

        // Check if same file is uploaded in both boxes
        if (otherFile && file.name === otherFile.name && file.size === otherFile.size) {
          setError("You've uploaded the same file in both boxes.");
          return;
        }

        setParsedData(json, file); // send both JSON and File object
        setFileName(file.name);
        setError('');
      } catch {
        setError('Invalid JSON structure. Please upload a proper JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleFile = (file) => {
    if (file && file.type === 'application/json') {
      readJSONFile(file);
    } else {
      setError('Please upload a valid .json file.');
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleClick = () => fileInputRef.current.click();

  const handleRemove = () => {
    setParsedData(null, null);
    setFileName(null);
    setError('');
    fileInputRef.current.value = '';
  };

  return (
    <div
      className="upload-box"
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".json"
      />
      {fileName ? (
        <div className="uploaded-file">
          <span>{fileName}</span>
          <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemove(); }}>✖</button>
        </div>
      ) : (
        <p>
          Click or Drag .json file to upload<br />
          <small>{label}</small>
        </p>
      )}
    </div>
  );
}

export default UploadBox;
