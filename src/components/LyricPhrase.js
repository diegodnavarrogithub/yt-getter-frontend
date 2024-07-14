// components/LyricPhrase.js
import React, { useEffect, useState } from 'react';

function LyricPhrase({ apiKey }) {
  const [lyricData, setLyricData] = useState({});

  useEffect(() => {

    let api_url = `https://guj4ap2j7b.execute-api.us-east-1.amazonaws.com/Prod/lyric_snippet`

    const fetchLyricData = async () => {
      try {
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseBody = await response.text();
        console.log("Response body:", responseBody);
    
        const data = JSON.parse(responseBody);
        setLyricData({ lyric: data.snippet, artist: data.Artist, track: data.track });
      } catch (error) {
        console.error('Error fetching lyric data:', error);
      }
    };
    

    fetchLyricData();
  }, [apiKey]);

  return (
    <div className="lyric-phrase">
      <p id="lyric">{lyricData.lyric}</p>
      <p>{lyricData.track} - {lyricData.artist}</p>
    </div>
  );
}

export default LyricPhrase;
