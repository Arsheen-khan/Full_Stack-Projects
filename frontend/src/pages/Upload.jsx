import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TopHeader from '../components/TopHeader';
import NowPlaying from '../components/NowPlaying';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentSong, selectIsPlaying, togglePlayPause } from '../redux/features/songSlice';
import './Upload.css';
import axios from 'axios';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile || !posterFile) {
      alert("Audio aur poster dono upload karo");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('chacha', audioFile);
    formData.append('poster', posterFile);

    try {
      await axios.post('http://localhost:3000/songs/upload', formData, {
        withCredentials: true
      });

      // Show success state
      setUploadSuccess(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setUploadSuccess(false);
        setTitle('');
        setArtist('');
        setAudioFile(null);
        setPosterFile(null);
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="app-layout">
      <Navigation />
      <TopHeader />
      <main className="main-content">
        <section className="upload-section">
          <div className="upload-container">
            <div className="upload-header">
              <h1>Upload Music</h1>
            </div>

            <form className="upload-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Song Title</label>
                <input
                  type="text"
                  placeholder="Enter song title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isUploading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Artist Name</label>
                <input
                  type="text"
                  placeholder="Enter artist name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                  disabled={isUploading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Audio File</label>
                <label className="upload-button">
                  {audioFile ? `Selected: ${audioFile.name}` : 'Choose Audio File'}
                  <input
                    type="file"
                    accept="audio/*"
                    style={{ display: 'none' }}
                    required
                    onChange={(e) => setAudioFile(e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Album Cover</label>
                <label className="upload-button">
                  {posterFile ? `Selected: ${posterFile.name}` : 'Choose Cover Image'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    required
                    onChange={(e) => setPosterFile(e.target.files[0])}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <button
                type="submit"
                className={`submit-button ${uploadSuccess ? 'success' : ''} ${isUploading ? 'loading' : ''}`}
                disabled={isUploading || uploadSuccess}
              >
                {isUploading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Uploading...
                  </>
                ) : uploadSuccess ? (
                  <>
                    <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Uploaded Successfully!
                  </>
                ) : (
                  'Upload Song'
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
      <NowPlaying
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlayPause={() => dispatch(togglePlayPause())}
      />
    </div>
  );
};

export default Upload;
