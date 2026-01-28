import { createSlice } from '@reduxjs/toolkit';

// Sample initial music data
const initialState = {
  songs: [
    {
      id: 1,
      title: "Ho Hey",
      artist: "The Lumineers",
      image: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=2944&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Fix You",
      artist: "Coldplay",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Shape of You",
      artist: "Ed Sheeran",
      image: "https://images.unsplash.com/photo-1507525338232-5e96371ee660?q=80&w=2946&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Rolling in the Deep",
      artist: "Adele",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2952&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Believer",
      artist: "Imagine Dragons",
      image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2944&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Sugar",
      artist: "Maroon 5",
      image: "https://images.unsplash.com/photo-1566208541738-35a5e8d33930?q=80&w=2952&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Shake It Off",
      artist: "Taylor Swift",
      image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=2736&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Sorry",
      artist: "Justin Bieber",
      image: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=2944&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Midnight Serenade",
      artist: "Luna",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=2948&auto=format&fit=crop"
    }
  ],
  currentSong: {
    id: 0,
    title: "Gehra Hua",
    artist: "Unknown",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop",
    poster: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop",
    audio: ""
  },
  isPlaying: false,
  filteredSongs: [] // For search functionality
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextSong: (state) => {
      const currentIndex = state.songs.findIndex(song => song._id === state.currentSong._id);
      const nextIndex = (currentIndex + 1) % state.songs.length;
      state.currentSong = state.songs[nextIndex];
      state.isPlaying = true;
    },
    prevSong: (state) => {
      const currentIndex = state.songs.findIndex(song => song._id === state.currentSong._id);
      const prevIndex = currentIndex === 0 ? state.songs.length - 1 : currentIndex - 1;
      state.currentSong = state.songs[prevIndex];
      state.isPlaying = true;
    },
    searchSongs: (state, action) => {
      const query = action.payload.toLowerCase();
      if (query.trim() === '') {
        state.filteredSongs = [];
      } else {
        state.filteredSongs = state.songs.filter(
          song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
      }
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    setSongs : (state, action) => {
      state.songs = action.payload;
      // Set default song if not set
      if (!state.currentSong && state.songs.length > 0) {
        const defaultSong = state.songs.find(song => song.title === "Gehra Hua") || state.songs[0];
        state.currentSong = defaultSong;
      }
    },
    setFilteredSongs: (state, action) => {
      state.filteredSongs = action.payload;
    }
  },
});

export const { setCurrentSong, togglePlayPause, nextSong, prevSong, searchSongs, addSong, setSongs,setFilteredSongs } = songSlice.actions;

export const selectSongs = (state) => state.songs.songs;
export const selectCurrentSong = (state) => state.songs.currentSong;
export const selectIsPlaying = (state) => state.songs.isPlaying;
export const selectFilteredSongs = (state) => state.songs.filteredSongs;

export default songSlice.reducer;
