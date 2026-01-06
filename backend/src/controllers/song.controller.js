import { uploadFile } from '../services/storage.service.js';
import songModel from '../models/song.model.js';

export async function upload(req, res) {

   

    const { artist, title } = req.body;

    
    const audioBuffer = req.files.chacha[0].buffer;
    const posterBuffer = req.files.poster[0].buffer;

   
    const audioResult = await uploadFile(audioBuffer, "/audio-files");
const posterResult = await uploadFile(posterBuffer, "/poster");

console.log("Poster Result:", posterResult);
   
    const song = await songModel.create({
        artist,
        title,
        audio: audioResult.url,  
        poster: posterResult.url  
    });

    res.status(201).json({
        message: "Song uploaded successfully",
        song: {
            id: song._id,
            title: song.title,
            artist: song.artist,
            audio: song.audio,
            poster: song.poster
        }
    });
}

export async function getSongs(req, res) {
    const songs = await songModel.find();

    res.status(200).json({
        message: "songs fetched successfully",
        songs: songs
    });
}

export async function getSongById(req, res) {

    
    const songId = req.params.mama;

    const song = await songModel.findOne({
        _id: songId
    });

    res.status(200).json({
        message: "Song fetched successfully",
        song
    });
}

export async function searchSong(req, res) {
    const text = req.query.text;

    const songs = await songModel.find({
        title: {
            $regex: text,
            $options: 'i'
        }
    });

    res.status(200).json({
        message: "Songs fetched successfully",
        songs: songs
    });
}
