import { useState, useMemo, useCallback } from 'react';
import { portfolioItems } from '../data/portfolioitems';

// Clean custom hook for portfolio logic
export const usePortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('longform');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Filter items based on active filter
  const filteredItems = useMemo(() => 
    portfolioItems.filter(item => item.platform === activeFilter),
    [activeFilter]
  );

  // Simple filter change handler
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Modal handlers
  const openVideoModal = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const closeVideoModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Image error handling
  const handleImageError = useCallback((itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  }, []);

  // External link safety check
  const handleExternalLink = useCallback((e, videoUrl) => {
    if (!videoUrl || videoUrl === '#') {
      e.preventDefault();
    }
  }, []);

  return {
    // State
    activeFilter,
    filteredItems,
    selectedVideo,
    hoveredItem,
    imageErrors,
    
    // Handlers
    handleFilterChange,
    openVideoModal,
    closeVideoModal,
    handleImageError,
    handleExternalLink,
    setHoveredItem
  };
};