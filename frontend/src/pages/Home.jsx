import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'
import Navigation from '../components/Navigation'
import NowPlaying from '../components/NowPlaying'
import TopHeader from '../components/TopHeader'
import { setCurrentSong, togglePlayPause, selectSongs, selectCurrentSong, selectIsPlaying, setSongs } from '../redux/features/songSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { gsap } from 'gsap'

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const gridRef = useRef(null);



    const handlePlaySong = (song) => {
        dispatch(setCurrentSong(song));
    };

    useEffect(()=>{

        axios.get("http://localhost:3000/songs/get-songs",{
            withCredentials:true
        })
        .then(response=>{
            console.log("Songs:", response.data.songs);

            dispatch(setSongs(response.data.songs))
        })
        
    },[])

    useEffect(() => {
        if (gridRef.current && songs.length > 0) {
            gsap.fromTo(gridRef.current.children, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, [songs]);
    

    return (
        <div className="app-layout">
            <Navigation />
            <TopHeader />
            <main className="main-content">
                <section className="home-section">
                    {/* Header with greeting */}
                    <div className="home-header">
                        <h1 className="home-title">Good afternoon</h1>
                    </div>

                    {/* Song grid */}
                    <div className="song-grid" ref={gridRef}>
                        {songs.map(song => (
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

export default Home