import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';
import Packages from './Packages/Packages';

const Services = () => {
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const additionalVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  // Main Services - 3 in a row
  const mainServices = [
    {
      title: 'Motion Graphics & Animation',
      image: '/services/motion-graphics.jpg',
      features: [
        'Animated intros and outros',
        'Logo reveals and text animations',
        'Lower thirds and graphic overlays',
        'Infographic or explainer visuals',
        'Motion-tracked effects'
      ],
      description: 'Bring your content to life with dynamic animations and professional motion graphics that captivate your audience.',
      color: '#944AF2'
    },
    {
      title: 'Short-Form Content Editing',
      image: '/services/short-form.jpg',
      features: [
        'TikTok, Reels, and YouTube Shorts optimization',
        'Dynamic cuts and pacing for engagement',
        'On-screen captions and emoji overlays',
        'Trend-based edit styles for social media',
        'Vertical format optimization'
      ],
      description: 'Viral-ready short form content editing tailored for maximum engagement on social platforms.',
      color: '#4A90F2'
    },
    {
      title: 'Long-Form & Documentary Editing',
      image: '/services/long-form.jpg',
      features: [
        'Narrative structuring and storytelling',
        'Multi-camera sync and editing',
        'B-roll integration and pacing',
        'Subtitle integration and localization',
        'Cinematic color grading'
      ],
      description: 'Professional long-form content editing with cinematic quality and compelling narrative flow.',
      color: '#00D4AA'
    }
  ];

  // Additional Services - Only Thumbnail Designing
  const additionalServices = [
    {
      title: 'Thumbnail Designing',
      image: '/services/thumbnail-design.jpg',
      features: [
        'Custom thumbnail design for YouTube',
        'Click-through rate optimization',
        'Brand consistency across all thumbnails',
        'A/B testing and performance analysis',
        'Template creation for series content'
      ],
      description: 'Eye-catching custom thumbnails designed to maximize click-through rates and brand consistency across all your content platforms.',
      color: '#FF6B6B'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAdditionalServices = () => {
    setShowAdditionalServices(!showAdditionalServices);
  };

  return (
    <section id="services" className={styles.services}>
      {/* Background Visuals */}
      <div className={styles.backgroundVisuals}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gradientOrb2}></div>
      </div>

      {/* Animated Background Particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${15 + i * 2}s`,
            '--size': `${20 + i * 3}px`,
            '--opacity': `${0.1 + i * 0.03}`
          }}></div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.headerVisual}>
            <div className={styles.visualDot}></div>
            <div className={styles.visualLine}></div>
          </div>
          <h1 className={styles.title}>
            Video Editing <span className={styles.highlight}>Services</span>
          </h1>
          <p className={styles.subtitle}>
            Professional video editing solutions tailored for content creators, brands, and businesses
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <motion.div 
          className={styles.mainServices}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Specialized Editing Services</h2>
            <p className={styles.sectionSubtitle}>Comprehensive video solutions for every platform and purpose</p>
          </div>

          <div className={styles.servicesContainer}>
            <div className={styles.mainServicesGrid}>
              {mainServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className={styles.serviceCard}
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {/* Animated Border Glow */}
                  <div className={styles.cardGlow} style={{ 
                    background: `radial-gradient(circle at center, ${service.color}40 0%, transparent 70%)`,
                    opacity: hoveredCard === index ? 1 : 0
                  }}></div>
                  
                  {/* Floating Elements */}
                  <div className={styles.floatingElements}>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={styles.floatingElement}
                        style={{ 
                          background: service.color,
                          '--delay': `${i * 0.3}s`
                        }}
                        animate={{
                          y: hoveredCard === index ? [0, -10, 0] : 0,
                          opacity: hoveredCard === index ? [0.3, 0.7, 0.3] : 0,
                          scale: hoveredCard === index ? [1, 1.2, 1] : 0
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: hoveredCard === index ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>

                  <div className={styles.cardHeader}>
                    <motion.div 
                      className={styles.serviceImageContainer}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className={styles.serviceImage}
                        loading="lazy"
                      />
                      <div 
                        className={styles.imageOverlay}
                        style={{ background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)` }}
                      ></div>
                      
                      {/* Image Shine Effect */}
                      <motion.div 
                        className={styles.imageShine}
                        animate={{
                          x: hoveredCard === index ? ['0%', '100%'] : '0%',
                          opacity: hoveredCard === index ? [0, 0.8, 0] : 0
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.2
                        }}
                      />
                    </motion.div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    
                    {/* Title Underline Animation */}
                    <motion.div 
                      className={styles.titleUnderline}
                      style={{ background: service.color }}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredCard === index ? '100%' : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <motion.p 
                      className={styles.serviceDescription}
                      animate={{ 
                        color: hoveredCard === index ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                    
                    <div className={styles.featuresList}>
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={feature}
                          className={styles.featureItem}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.05 + 0.3 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className={styles.featureDot}
                            style={{ backgroundColor: service.color }}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          />
                          <motion.span 
                            className={styles.featureText}
                            whileHover={{ color: service.color }}
                            transition={{ duration: 0.2 }}
                          >
                            {feature}
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <motion.button 
                      className={styles.serviceButton}
                      style={{ 
                        '--button-color': service.color
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                        boxShadow: `0 10px 30px ${service.color}80, 0 0 0 1px ${service.color}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToContact}
                    >
                      <motion.span
                        animate={{ x: hoveredCard === index ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: hoveredCard === index ? Infinity : 0 }}
                      >
                        Get Started
                      </motion.span>
                      <motion.span 
                        className={styles.buttonArrow}
                        animate={{ x: hoveredCard === index ? [0, 8, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: hoveredCard === index ? Infinity : 0 }}
                      >
                        →
                      </motion.span>
                      
                      {/* Button Ripple Effect */}
                      <motion.div 
                        className={styles.buttonRipple}
                        animate={{
                          scale: hoveredCard === index ? [0, 3] : 0,
                          opacity: hoveredCard === index ? [0.5, 0] : 0
                        }}
                        transition={{ duration: 1 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Services Toggle Button - Positioned next to Long-Form */}
            <div className={styles.additionalSection}>
              <motion.button
                className={styles.additionalToggle}
                onClick={toggleAdditionalServices}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(148, 74, 242, 0.15)',
                  boxShadow: '0 10px 30px rgba(148, 74, 242, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ 
                    color: showAdditionalServices ? '#FF6B6B' : '#ffffff'
                  }}
                >
                  {showAdditionalServices ? '−' : '+'} Additional Services
                </motion.span>
              </motion.button>

              {/* Additional Services - Appears inline when toggled */}
              <AnimatePresence>
                {showAdditionalServices && (
                  <motion.div
                    className={styles.additionalServices}
                    variants={additionalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className={styles.additionalGrid}>
                      {additionalServices.map((service, index) => (
                        <motion.div
                          key={service.title}
                          className={styles.serviceCard}
                          variants={itemVariants}
                          whileHover="hover"
                          custom={index}
                          onHoverStart={() => setHoveredCard(index + 3)}
                          onHoverEnd={() => setHoveredCard(null)}
                        >
                          {/* Same amazing hover effects for additional services */}
                          <div className={styles.cardGlow} style={{ 
                            background: `radial-gradient(circle at center, ${service.color}40 0%, transparent 70%)`,
                            opacity: hoveredCard === index + 3 ? 1 : 0
                          }}></div>
                          
                          <div className={styles.floatingElements}>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={styles.floatingElement}
                                style={{ background: service.color }}
                                animate={{
                                  y: hoveredCard === index + 3 ? [0, -10, 0] : 0,
                                  opacity: hoveredCard === index + 3 ? [0.3, 0.7, 0.3] : 0,
                                  scale: hoveredCard === index + 3 ? [1, 1.2, 1] : 0
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: hoveredCard === index + 3 ? Infinity : 0,
                                  repeatType: "reverse"
                                }}
                              />
                            ))}
                          </div>

                          <div className={styles.cardHeader}>
                            <motion.div 
                              className={styles.serviceImageContainer}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5, type: "spring" }}
                            >
                              <img 
                                src={service.image} 
                                alt={service.title}
                                className={styles.serviceImage}
                                loading="lazy"
                              />
                              <div 
                                className={styles.imageOverlay}
                                style={{ background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)` }}
                              ></div>
                              <motion.div 
                                className={styles.imageShine}
                                animate={{
                                  x: hoveredCard === index + 3 ? ['0%', '100%'] : '0%',
                                  opacity: hoveredCard === index + 3 ? [0, 0.8, 0] : 0
                                }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                              />
                            </motion.div>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <motion.div 
                              className={styles.titleUnderline}
                              style={{ background: service.color }}
                              initial={{ width: 0 }}
                              animate={{ width: hoveredCard === index + 3 ? '100%' : 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>

                          <div className={styles.cardContent}>
                            <motion.p 
                              className={styles.serviceDescription}
                              animate={{ 
                                color: hoveredCard === index + 3 ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {service.description}
                            </motion.p>
                            
                            <div className={styles.featuresList}>
                              {service.features.map((feature, featureIndex) => (
                                <motion.div 
                                  key={feature}
                                  className={styles.featureItem}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: featureIndex * 0.05 + 0.3 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <motion.div 
                                    className={styles.featureDot}
                                    style={{ backgroundColor: service.color }}
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  />
                                  <motion.span 
                                    className={styles.featureText}
                                    whileHover={{ color: service.color }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {feature}
                                  </motion.span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.cardFooter}>
                            <motion.button 
                              className={styles.serviceButton}
                              style={{ '--button-color': service.color }}
                              whileHover={{ 
                                scale: 1.05,
                                background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                                boxShadow: `0 10px 30px ${service.color}80, 0 0 0 1px ${service.color}40`
                              }}
                              whileTap={{ scale: 0.95 }}
                              onClick={scrollToContact}
                            >
                              <motion.span
                                animate={{ x: hoveredCard === index + 3 ? [0, 5, 0] : 0 }}
                                transition={{ duration: 0.5, repeat: hoveredCard === index + 3 ? Infinity : 0 }}
                              >
                                Get Started
                              </motion.span>
                              <motion.span 
                                className={styles.buttonArrow}
                                animate={{ x: hoveredCard === index + 3 ? [0, 8, 0] : 0 }}
                                transition={{ duration: 0.5, repeat: hoveredCard === index + 3 ? Infinity : 0 }}
                              >
                                →
                              </motion.span>
                              <motion.div 
                                className={styles.buttonRipple}
                                animate={{
                                  scale: hoveredCard === index + 3 ? [0, 3] : 0,
                                  opacity: hoveredCard === index + 3 ? [0.5, 0] : 0
                                }}
                                transition={{ duration: 1 }}
                              />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        {/* package section */}
         <Packages/> 

      </div>
    </section>
  );
};

export default Services;