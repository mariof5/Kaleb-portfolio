import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEye, FaHeart, FaClock, FaPlay, FaYoutube, FaMobile } from 'react-icons/fa';
import styles from './styles/Portfolio.module.css';

export const VideoModal = ({ video, isOpen, onClose, onExternalLink }) => {
  // Helper functions
  const renderPlatformIcon = (platform) => {
    return platform === 'longform' ? <FaYoutube /> : <FaMobile />; // Changed to FaMobile for short form
  };

  const getAspectRatio = (platform) => {
    return platform === 'longform' ? '16/9' : '9/16';
  };

  const getYouTubeEmbedUrl = (youtubeId) => {
    if (!youtubeId) return null;
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`;
  };

  const handleShortFormPlay = () => {
    if (video?.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  // Keyboard and scroll handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            maxWidth: video.platform === 'shortform' ? '400px' : '800px' 
          }}
        >
          {/* Close Button */}
          <motion.button 
            className={styles.closeBtn} 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
          >
            <FaTimes />
          </motion.button>
          
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={`${styles.modalPlatform} ${styles[video.platform]}`}>
              {renderPlatformIcon(video.platform)}
              <span>{video.platform === 'longform' ? 'Long Form Video' : 'Short Form Video'}</span>
            </div>
            <h3 className={styles.modalTitle}>{video.title}</h3>
          </div>

          {/* Video Container */}
          <div 
            className={styles.videoContainer}
            style={{ aspectRatio: getAspectRatio(video.platform) }}
          >
            {video.platform === 'longform' && video.youtubeId ? (
              <iframe
                src={getYouTubeEmbedUrl(video.youtubeId)}
                className={styles.videoIframe}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : (
              <div className={styles.videoPlaceholder}>
                <div className={styles.platformIndicator}>
                  {renderPlatformIcon(video.platform)}
                  <span>Short form videos require external viewing</span>
                </div>
                <motion.button
                  className={styles.playButtonLarge}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleShortFormPlay}
                >
                  <FaPlay />
                </motion.button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className={styles.modalStats}>
            <div className={styles.modalStat}>
              <FaEye />
              <strong>{video.views}</strong>
              <span>Views</span>
            </div>
            <div className={styles.modalStat}>
              <FaHeart />
              <strong>{video.likes}</strong>
              <span>Likes</span>
            </div>
            <div className={styles.modalStat}>
              <FaClock />
              <strong>{video.duration}</strong>
              <span>Duration</span>
            </div>
            <div className={styles.modalStat}>
              <div className={styles.engagementDot} />
              <strong>{video.engagement}</strong>
              <span>Engagement</span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.modalDescription}>{video.description}</p>

          {/* Tags */}
          <div className={styles.modalTags}>
            {video.tags.map((tag, index) => (
              <span key={index} className={styles.modalTag}>{tag}</span>
            ))}
          </div>

          {/* Action Button */}
          <div className={styles.modalActions}>
            <motion.a 
              href={video.videoUrl}
              className={styles.watchBtn}
              onClick={(e) => onExternalLink(e, video.videoUrl)}
              whileHover={{ scale: 1.05 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on {video.platform === 'longform' ? 'YouTube' : 'TikTok'}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};