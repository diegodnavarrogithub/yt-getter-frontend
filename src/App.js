import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdComponent from './components/AdComponent';
import LyricPhrase from './components/LyricPhrase';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!videoUrl) {
      alert('Please enter a YouTube video URL.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://guj4ap2j7b.execute-api.us-east-1.amazonaws.com/Prod/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video: videoUrl }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      alert('Failed to fetch video data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="main-content">
              <div className="title-bar">
                <img src={process.env.PUBLIC_URL + "/ytg_icon.png"} alt="YT Getter Icon" style={{ width: '50px', height: '50px' }} />
                <h1>YT Getter</h1>
              </div>
              <header className="App-header">
                <LyricPhrase></LyricPhrase>
                <form onSubmit={handleSubmit} className="download-form">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Enter the YouTube video URL here"
                    className="url-input"
                  />
                  <button type="submit" className="download-button" disabled={!videoUrl || isLoading}>Look for Video</button>
                </form>
                {isLoading && <div className="loader"></div>}
                {videoData && !isLoading && (
                  <div className="video-container">
                    <img src={videoData.thumbnail_url} alt="Video thumbnail" className="video-thumbnail" />
                    <p className="video-title">{videoData.title}</p>
                    <a href={videoData.download_url} className="get-video-button" download target="_blank" rel="noopener noreferrer">Get Video</a>
                  </div>
                )}
              </header>
              <AdComponent
                adClient="ca-pub-4180415339261855"
                adSlot="tu-slot-id"
                adFormat="auto"
                adStyle={{ width: '320px', height: '100px' }}
              />
            </div>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
        <footer className="App-footer">
          <Link to="/">Home</Link> | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
