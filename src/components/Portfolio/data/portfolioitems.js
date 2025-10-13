// All portfolio data and utility functions in one place

// Function to get YouTube thumbnail URL 
export const getYouTubeThumbnail = (youtubeId, quality = 'hqdefault') => {
  if (!youtubeId) return null;
  
  const qualities = {
    'default': 'default.jpg',
    'mqdefault': 'mqdefault.jpg',
    'hqdefault': 'hqdefault.jpg',
    'sddefault': 'sddefault.jpg',
    'maxresdefault': 'maxresdefault.jpg'
  };
  
  return `https://img.youtube.com/vi/${youtubeId}/${qualities[quality] || qualities['hqdefault']}`;
};

// Function to get TikTok thumbnail
export const getTikTokThumbnail = (itemId) => {
  return `/thumbnails/tiktok-${itemId}.jpg`;
};

export const portfolioItems = [
  {
    id: 1,
    title: 'Cinematic Travel Vlog',
    platform: 'longform',
    views: '200k',
    likes: '1K',
    duration: '8:53',
    youtubeId: '_LZDitqcPIA',
    videoUrl: 'https://www.youtube.com/watch?v=_LZDitqcPIA',
    description: 'እንደገና የfreshman ተማሪ ብሆን ይህን ነው የማደርገው! | freshman mistakes!',
    tags: ['Cinematic', 'Travel', '4K', 'Color Grading'],
    engagement: '92%'
  },
  {
    id: 2,
    title: 'Digital Marketing Tutorial',
    platform: 'longform',
    views: '15K',
    likes: '850',
    duration: '12:20',
    youtubeId: 'tWFVqAxcW04',
    videoUrl: 'https://www.youtube.com/watch?v=tWFVqAxcW04',
    description: 'Digital Marketing በ 2025 | ለጀማሪዎች | Step By Step.',
    tags: ['Tutorial', 'Digital Marketing', 'Educational'],
    engagement: '88%'
  },
  {
    id: 3,
    title: 'Viral Dance Challenge',
    platform: 'shortform',
    views: '5.7M',
    likes: '1.2M',
    duration: '0:15',
    thumbnail: getTikTokThumbnail(3),
    videoUrl: 'https://www.tiktok.com/@duekneel/video/7382618417842490632',
    description: 'Fast-paced editing synced perfectly with trending music and viral transitions.',
    tags: ['Trending', 'Music', 'Dance', 'Viral'],
    engagement: '156%'
  },
  {
    id: 4,
    title: 'Want to learn how to turn words into money?',
    platform: 'longform',
    views: '25k',
    likes: '1K',
    duration: '8:53',
    youtubeId: '5eL_242vL6w',
    videoUrl: 'https://www.youtube.com/watch?v=5eL_242vL6w',
    description: 'Copywriting ከዜሮ ላስጀምራችሁ! | Step by Step Guidemarketing.',
    tags: ['Monetization', 'Content Creation', 'Copywriting', 'Digital Marketing', 'Income'],
    engagement: '92%'
  },
  {
    id: 5,
    title: 'Comedy Skit Series',
    platform: 'shortform',
    views: '3.2M',
    likes: '780K',
    duration: '0:45',
    thumbnail: getTikTokThumbnail(5),
    videoUrl: 'https://www.tiktok.com/@dkr5624/video/7558495761067953430',
    description: 'Multi-part comedy series with seamless transitions and perfect comedic timing.',
    tags: ['Comedy', 'Series', 'Transition'],
    engagement: '134%'
  },
  {
    id: 6,
    title: 'Quick Tutorial Series',
    platform: 'shortform',
    views: '4.1M',
    likes: '920K',
    duration: '0:30',
    thumbnail: getTikTokThumbnail(6),
    videoUrl: 'https://www.tiktok.com/@liverpoolfc/video/7556249185444515094',
    description: 'Engaging tutorial content with text animations and clear step-by-step guidance.',
    tags: ['Tutorial', 'Educational', 'Text Animation'],
    engagement: '142%'
  },
  {
    id: 7,
    title: 'Documentary Short',
    platform: 'longform',
    views: '1.2M',
    likes: '68K',
    duration: '12:45',
    youtubeId: '3JZ_D3ELwOQ',
    videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    description: 'Emotional storytelling with professional narration and cinematic pacing.',
    tags: ['Documentary', 'Storytelling', 'Narration'],
    engagement: '86%'
  },
  {
    id: 8,
    title: 'Trending Transition',
    platform: 'shortform',
    views: '6.3M',
    likes: '1.5M',
    duration: '0:10',
    thumbnail: getTikTokThumbnail(8),
    videoUrl: 'https://www.tiktok.com/@xquyebqjlzc/video/7558138274959707447',
    description: 'Viral transition effect that gained massive popularity and started a trend.',
    tags: ['Viral', 'Transition', 'Effect'],
    engagement: '198%'
  }
];

export const filters = [
  { key: 'longform', label: 'Long Form', icon: 'youtube' },
  { key: 'shortform', label: 'Short Form', icon: 'tiktok' }   
];