import axios from 'axios';
export const video_router = async (req, res) => {
    // const  PLAYLIST_ID  = process.env.PLAYLIST_ID
    // console.log(process.env.PLAYLIST_ID)
    // console.log(process.env.YOUTUBE_API)
    try {
        // console.log("inside try")
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_API}&maxResults=30`, {
            
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


