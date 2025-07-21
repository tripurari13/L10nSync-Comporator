// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadBox from './UploadBox';
import Comparison from './Comparison';
import Contact from './Contact';
import './App.css';

function HomePage() {
  const [json1, setJson1] = useState(null);
  const [json2, setJson2] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <p>L10nSync</p>

        <Link to="/contact">
          <button className="contact-btn">Contact</button>
        </Link>

        <div className="upload-container">
          <UploadBox
            index={0}
            currentFile={file1}
            otherFile={file2}
            setParsedData={(data, file) => {
              setJson1(data);
              setFile1(file);
            }}
            setError={setError}
          />

          <UploadBox
            index={1}
            currentFile={file2}
            otherFile={file1}
            setParsedData={(data, file) => {
              setJson2(data);
              setFile2(file);
            }}
            setError={setError}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <Comparison file1={json1} file2={json2} />
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
