
import axios from 'axios';
export const video_router = async (req, res) => {
    // const { PLAYLIST_ID } = req.body
    // console.log(PLAYLIST_ID)
    try {
        console.log("inside try")
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLmXKhU9FNesR1rSES7oLdJaNFgmuj0SYV&key=AIzaSyAyDf5-MegWaG3Ksh0BNoGUyK02YS4LmhM&maxResults=30`, {
            
            // params: {
            //     part: 'snippet',
            //     playlistId: PLAYLIST_ID,
            //     key: YOUTUBE_API,
            //     maxResults: 30
            // }
        });

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


