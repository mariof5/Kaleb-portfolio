import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaMobileAlt } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './styles/Portfolio.module.css';
import { portfolioItems, filters } from './data/portfolioitems';
import { usePortfolio } from './hooks/usePortfolio';
import { PortfolioItem } from './PortfolioItem';
import { VideoModal } from './VideoModal';
import Skills from './skills/Skills';

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h3>Something went wrong loading the portfolio.</h3>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Filter Buttons Component
const FilterButtons = ({ filters, activeFilter, onFilterChange }) => {
  const renderFilterIcon = (iconName) => {
    return iconName === 'youtube' ? <FaYoutube /> : <FaMobileAlt />; // Changed to FaMobile
  };
  
  return (
    <div className={styles.filters}>
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          className={`${styles.filterBtn} ${activeFilter === filter.key ? styles.active : ''} ${styles[filter.key]}`}
          onClick={() => onFilterChange(filter.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.filterIcon}>
            {renderFilterIcon(filter.icon)}
          </span>
          {filter.label}
          {activeFilter === filter.key && (
            <motion.div 
              className={styles.activeIndicator}
              layoutId="activeFilter"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

// Header Component
const PortfolioHeader = () => (
  <div className={styles.header}>
    <div className={styles.sectionBadge}>
      <FaYoutube className={styles.badgeIcon} />
      <span>VIDEO PORTFOLIO</span>
    </div>
    <h2 className={styles.title}>
      Content <span className={styles.highlight}>Showcase</span>
    </h2>
    <p className={styles.subtitle}>
      Professional video editing tailored for each content format's unique requirements
    </p>
  </div>
);

// Platform Info Component
const PlatformInfo = ({ activeFilter, filteredItems }) => (
  <div className={styles.platformInfo}>
    <div className={styles.platformStats}>
      <div className={styles.platformStat}>
        <span className={styles.platformStatNumber}>
          {filteredItems.length}
        </span>
        <span className={styles.platformStatLabel}>
          {activeFilter === 'longform' ? 'Long Form' : 'Short Form'} Videos
        </span>
      </div>
      <div className={styles.platformDescription}>
        {activeFilter === 'longform' 
          ? 'Long-form content with cinematic storytelling and professional editing'
          : 'Short-form viral content with engaging transitions and trends'
        }
      </div>
    </div>
  </div>
);

// Main Portfolio Component
const Portfolio = () => {
  const {
    activeFilter,
    filteredItems,
    selectedVideo,
    hoveredItem,
    imageErrors,
    handleFilterChange,
    openVideoModal,
    closeVideoModal,
    handleImageError,
    handleExternalLink,
    setHoveredItem
  } = usePortfolio();

  useEffect(() => {
    const handleFilterChangeEvent = (event) => {
      if (event.detail && event.detail.filter) {
        handleFilterChange(event.detail.filter);
      }
    };

    // Check if there's a saved filter from sessionStorage
    const savedFilter = sessionStorage.getItem('portfolioFilter');
    if (savedFilter) {
      handleFilterChange(savedFilter);
      sessionStorage.removeItem('portfolioFilter'); // Clean up
    }

    window.addEventListener('portfolioFilterChange', handleFilterChangeEvent);

    return () => {
      window.removeEventListener('portfolioFilterChange', handleFilterChangeEvent);
    };
  }, [handleFilterChange]);


  return (
    <ErrorBoundary>
      <section id="portfolio" className={styles.portfolio}>
        <div className={styles.container}>
          {/* Header */}
          <PortfolioHeader />

          {/* Filter Buttons */}
          <FilterButtons 
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Platform Info */}
          <PlatformInfo 
            activeFilter={activeFilter}
            filteredItems={filteredItems}
          />

          {/* Portfolio Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              className={styles.portfolioGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.gridContainer}>
                {filteredItems.map((item) => (
                  <PortfolioItem
                    key={item.id}
                    item={item}
                    isHovered={hoveredItem === item.id}
                    onHover={setHoveredItem}
                    onClick={openVideoModal}
                    onImageError={handleImageError}
                    onExternalLink={handleExternalLink}
                    imageError={imageErrors[item.id]}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsContent}>
                {activeFilter === 'longform' ? <FaYoutube /> : <SiTiktok />}
                <h3>No {activeFilter === 'longform' ? 'Long Form' : 'Short Form'} videos available</h3>
                <p>Check back soon for new content on this format.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        onExternalLink={handleExternalLink}
      />

    <Skills/>


    </ErrorBoundary>
    
  );
};

export default Portfolio;