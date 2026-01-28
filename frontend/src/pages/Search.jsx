import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import TopHeader from '../components/TopHeader'
import './Search.css'
import NowPlaying from '../components/NowPlaying'
import { setFilteredSongs, setCurrentSong, togglePlayPause, selectFilteredSongs, selectCurrentSong, selectIsPlaying } from '../redux/features/songSlice'
import axios from 'axios'

const Search = () => {
    const dispatch = useDispatch();
    const filteredSongs = useSelector(selectFilteredSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = (e) => {
        const query = e.target.value;

        console.log(query)
        axios.get(`http://localhost:3000/songs/search-songs?text=${query}`,{
            withCredentials: true
        })
        .then(response => {
            console.log(response.data)
            dispatch(setFilteredSongs(response.data.songs));
        })
        setSearchQuery(query);
    };

    const handlePlaySong = (song) => {
        dispatch(setCurrentSong(song));
    };

    return (
        <div className="app-layout">
            <Navigation />
            <TopHeader />
            <main className="main-content">
                <section className="search-section">
                    <div className="search-header">
                        <h1>Search</h1>
                        <div className="search-bar">
                            <input 
                                type="text" 
                                placeholder="What do you want to listen to?" 
                                value={searchQuery}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>
                    </div>
                    <div className="search-content">
                        {filteredSongs.length > 0 ? (
                            <div className="song-grid">
                                {filteredSongs.map(song => (
                                    <div 
                                        key={song._id} 
                                        className="song-card" 
                                        onClick={() => handlePlaySong(song)}
                                    >
                                        <div className="song-card-image">
                                            <img 
                                                src={song.poster} 
                                                alt={song.title} 
                                                className="song-image" 
                                            />
                                            <div className="play-overlay">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="song-card-details">
                                            <div className="song-title">{song.title}</div>
                                            <div className="song-artist">{song.artist}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery ? (
                            <p>No results found for "{searchQuery}"</p>
                        ) : (
                            <p>Type something to search for songs or artists</p>
                        )}
                    </div>
                </section>
            </main>
            <NowPlaying 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                togglePlayPause={() => dispatch(togglePlayPause())} 
            />
        </div>
    )
}

export default Search