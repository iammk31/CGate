import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PrepVideos.module.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { backendUrl } from '../../utils/config.js';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}api/v1/cgate/videos`)
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleVideoClick = (videoId) => {
    if (currentVideo === videoId) {
      setCurrentVideo(null);  // Close the video if it's already playing
    } else {
      setCurrentVideo(videoId);  // Open the selected video
    }
  };

  return (
    <>
    <Navbar />
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
        <h3>Select Videos To Play</h3>
      )}
      <div className={styles.videoList}>
        {videos.map(video => (
          <div
            key={video.id}
            className={styles.videoCard}
            onClick={() => handleVideoClick(video.videoId)}
          >
            <img 
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
              alt={video.title}
              className={styles.thumbnail}
            />
            <div className={styles.videoInfo}>
              <h4>{video.title}</h4>
              {/* Add more details here like channel name, views, etc., if available */}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default VideoPlayer;
