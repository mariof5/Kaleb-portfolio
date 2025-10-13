import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaExternalLinkAlt, FaYoutube, FaHeart, FaEye, FaClock, FaMobile } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './styles/Portfolio.module.css';
import { getYouTubeThumbnail } from './data/portfolioItems';

// Smart image component with fallback handling
const SmartImage = ({ sources = [], alt = '', className = '', onFinalError }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleError = () => {
    if (currentIndex < sources.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinalError?.();
    }
  };

  if (!sources.length) return null;

  return (
    <img
      src={sources[currentIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// Main portfolio item component
export const PortfolioItem = ({ 
  item, 
  isHovered, 
  onHover, 
  onClick, 
  onImageError, 
  onExternalLink,
  imageError 
}) => {
  // Helper functions
  const renderPlatformIcon = (platform) => {
    return platform === 'longform' ? <FaYoutube /> : <FaMobile />; // Changed to FaMobile
  };

  const getAspectRatio = (platform) => {
    return platform === 'longform' ? '16/9' : '9/16';
  };

  const getEngagementWidth = (engagement) => {
    const numericValue = parseInt(engagement);
    return `${Math.min(numericValue, 100)}%`;
  };

  const getImageSources = () => {
    if (item.platform === 'longform' && item.youtubeId) {
      return [
        getYouTubeThumbnail(item.youtubeId, 'maxresdefault'),
        getYouTubeThumbnail(item.youtubeId, 'sddefault'),
        getYouTubeThumbnail(item.youtubeId, 'hqdefault'),
        getYouTubeThumbnail(item.youtubeId, 'mqdefault'),
        getYouTubeThumbnail(item.youtubeId, 'default')
      ];
    }
    return [item.thumbnail];
  };

  return (
    <motion.div
      className={styles.portfolioItem}
      layout
      whileHover={{ y: -8 }}
      onHoverStart={() => onHover(item.id)}
      onHoverEnd={() => onHover(null)}
    >
      <div className={`${styles.itemCard} ${styles[item.platform]}`}>
        
        {/* Thumbnail Section */}
        <div 
          className={`${styles.thumbnailContainer} ${styles[item.platform]}`}
          style={{ aspectRatio: getAspectRatio(item.platform) }}
        >
          <div className={styles.thumbnail}>
            {imageError ? (
              <div className={styles.placeholderThumbnail}>
                <div className={styles.placeholderContent}>
                  <div className={styles.platformIcon}>
                    {renderPlatformIcon(item.platform)}
                  </div>
                  <span className={styles.placeholderText}>{item.title}</span>
                </div>
              </div>
            ) : (
              <SmartImage
                sources={getImageSources()}
                alt={`Thumbnail for ${item.title}`}
                className={styles.thumbnailImage}
                onFinalError={() => onImageError(item.id)}
              />
            )}
            
            {/* Hover Overlay */}
            <motion.div 
              className={styles.thumbnailOverlay}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.button 
                className={styles.playBtn}
                onClick={() => onClick(item)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlay className={styles.playIcon} />
              </motion.button>
              
              <motion.div 
                className={styles.quickStats}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              >
                <div className={styles.quickStat}>
                  <FaEye />
                  <span>{item.views}</span>
                </div>
                <div className={styles.quickStat}>
                  <FaHeart />
                  <span>{item.likes}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Platform Badge */}
            <div className={`${styles.platformBadge} ${styles[item.platform]}`}>
              {renderPlatformIcon(item.platform)}
            </div>

            {/* Duration */}
            <div className={styles.duration}>
              <FaClock />
              <span>{item.duration}</span>
            </div>

            {/* Engagement Indicator */}
            <div className={styles.engagement}>
              <div className={styles.engagementBar}>
                <motion.div 
                  className={styles.engagementFill}
                  initial={{ width: '0%' }}
                  whileInView={{ width: getEngagementWidth(item.engagement) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className={styles.engagementText}>{item.engagement} Engagement</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.itemContent}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <motion.a 
              href={item.videoUrl}
              className={styles.externalLink}
              onClick={(e) => onExternalLink(e, item.videoUrl)}
              whileHover={{ scale: 1.1 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt />
            </motion.a>
          </div>
          
          <p className={styles.itemDescription}>{item.description}</p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <FaEye className={styles.statIcon} />
              <div>
                <span className={styles.statNumber}>{item.views}</span>
                <span className={styles.statLabel}>Views</span>
              </div>
            </div>
            <div className={styles.stat}>
              <FaHeart className={styles.statIcon} />
              <div>
                <span className={styles.statNumber}>{item.likes}</span>
                <span className={styles.statLabel}>Likes</span>
              </div>
            </div>
          </div>

          <div className={styles.tags}>
            {item.tags.map((tag, index) => (
              <motion.span 
                key={index} 
                className={styles.tag}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};