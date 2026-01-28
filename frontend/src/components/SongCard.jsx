import React from 'react'
import './SongCard.css'

const SongCard = ({ song, onClick, active }) => {
  return (
    <div className={`song-card ${active ? 'active' : ''}`} onClick={onClick}>
      <img src={song.poster} alt={song.title} />
      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
      <span className="play-icon">▶</span>
    </div>
  )
}

export default SongCard

