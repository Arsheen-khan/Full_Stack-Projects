import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './Upload.css';
import axios from 'axios';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  // ✅ CHANGE 1: audio file ke liye state
  const [audioFile, setAudioFile] = useState(null);

  // ✅ CHANGE 2: poster image ke liye state
  const [posterFile, setPosterFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ CHANGE 3: safety check
    if (!audioFile || !posterFile) {
      alert("Audio aur poster dono upload karo");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);

    // ✅ CHANGE 4: backend multer field names ke hisaab se
    formData.append('chacha', audioFile);  // 🎵 audio
    formData.append('poster', posterFile); // 🖼️ poster

    axios.post('http://localhost:3000/songs/upload', formData, {
      withCredentials: true
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="upload-section">
      <div className="upload-header">
        <h1>Upload Music</h1>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        {/* ✅ CHANGE 5: audio input */}
        <label className="upload-button">
          Upload Audio
          <input
            type="file"
            accept="audio/*"
            style={{ display: 'none' }}
            required
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </label>

        {/* ✅ CHANGE 6: poster input */}
        <label className="upload-button">
          Upload Album Poster
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            required
            onChange={(e) => setPosterFile(e.target.files[0])}
          />
        </label>

        <button type="submit" className="submit-button">
          Upload Music
        </button>
      </form>

      <Navigation />
    </section>
  );
};

export default Upload;
