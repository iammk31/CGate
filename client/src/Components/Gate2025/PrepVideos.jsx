import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PrepVideos.module.css';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    axios.get('/api/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className={styles.container}>
      {currentVideo ? (
        <div className={styles.videoWrapper}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Select a video to play</p>
      )}
      <div className={styles.videoList}>
        {videos.map(video => (
          <button
            key={video.id}
            onClick={() => setCurrentVideo(video.videoId)}
            className={styles.videoButton}
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
