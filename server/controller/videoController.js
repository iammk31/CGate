import axios from 'axios';
export const video_router = async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_API}&maxResults=30`, {});

        const videos = response.data.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId
        }));

        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Error fetching videos');
    }
};


