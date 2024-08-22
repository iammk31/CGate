import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// const video_router = express.Router();
dotenv.config();

const YOUTUBE_API = process.env.YOUTUBE_API;
// const PLAYLIST_ID = process.env.PLAYLIST_ID;
console.log(YOUTUBE_API);

export const video_router = async (req, res) => {
    const { PLAYLIST_ID } = req.body
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API}&maxResults=30`, {
            params: {
                part: 'snippet',
                playlistId: PLAYLIST_ID,
                key: YOUTUBE_API,
                maxResults: 30
            }
        });

        const videos = response.data.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId
        }));

        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Error fetching videos');
    }
};


