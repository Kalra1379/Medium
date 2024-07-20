import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSpring, animated, config } from 'react-spring';
import styles from './index.module.css';

const videos = [
  {
    id: 1,
    title: "Our Company Story",
    description: "Learn about our journey and what drives us.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  },
  {
    id: 2,
    title: "Product Showcase",
    description: "Discover our latest innovations and products.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  },
  {
    id: 3,
    title: "Customer Testimonials",
    description: "Hear what our customers have to say about us.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  }
];

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const playerRef = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.molasses,
  });

  const progressAnimation = useSpring({
    width: `${progress * 100}%`,
    config: config.molasses,
  });

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleProgress = (state) => setProgress(state.played);

  const handleSeek = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    playerRef.current.seekTo(percentage, 'fraction');
  };

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <animated.div style={fadeIn} className={styles.videoSection}>
      <h2>Explore Our Videos</h2>
      <div className={styles.videoContainer}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            ref={playerRef}
            url={currentVideo.url}
            width="100%"
            height="100%"
            playing={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={handleProgress}
            controls={false}
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
          <div className={styles.customControls}>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <div className={styles.progressBar} onClick={handleSeek}>
              <animated.div style={progressAnimation} className={styles.progressFill} />
            </div>
          </div>
          <div className={styles.videoInfo}>
            <h3>{currentVideo.title}</h3>
            <p>{currentVideo.description}</p>
          </div>
        </div>
        <div className={styles.playlist}>
          {videos.map((video) => (
            <div
              key={video.id}
              className={`${styles.playlistItem} ${currentVideo.id === video.id ? styles.active : ''}`}
              onClick={() => handleVideoChange(video)}
            >
              <img src={video.thumbnail} alt={video.title} />
              <div className={styles.playlistItemInfo}>
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
};

export default VideoSection;