import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Packages.module.css';

const Packages = () => {
  const [billingType, setBillingType] = useState('single'); // 'single' or 'monthly'
  const [selectedPreview, setSelectedPreview] = useState(null);

  const packages = [
    {
      id: 1,
      title: 'Short-Form',
      subtitle: 'TikTok, Reels & YouTube Shorts',
      badge: 'Trending',
      badgeColor: '#FF6B6B',
      singlePrice: '2,500',
      monthlyPrice: '10,000',
      singleText: 'per video',
      monthlyText: 'for 5 videos monthly',
      features: [
        '15-90 second fast-paced edits',
        'Amharic/English text overlays',
        'Local & international music',
        'Color & sound enhancement',
        '1-2 revisions included'
      ],
      deliverables: [
        { text: '2-3 days delivery' },
        { text: '2 revisions included' },
        { text: 'Amharic/English support' }
      ],
      preview: '/previews/short-form-sample.jpg',
      popular: false
    },
    {
      id: 2,
      title: 'Long-Form',
      subtitle: 'YouTube & Documentary Style',
      badge: 'Most Popular',
      badgeColor: '#4A90F2',
      singlePrice: '5,000',
      monthlyPrice: '17,000',
      singleText: 'per video',
      monthlyText: 'for 4 videos monthly',
      features: [
        '10-30 minute full edits',
        'Professional storytelling',
        'Amharic/English subtitles',
        'Branded intro/outro',
        'Color grading & sound design'
      ],
      deliverables: [
        { text: '4-6 days delivery' },
        { text: '3 revisions included' },
        { text: 'Amharic/English support' }
      ],
      preview: '/previews/long-form-sample.jpg',
      popular: true
    },
    {
      id: 3,
      title: 'Full Creator',
      subtitle: 'Short + Long Form Bundle',
      badge: 'Best Value',
      badgeColor: '#00D4AA',
      singlePrice: '8,000',
      monthlyPrice: '28,000',
      singleText: 'per package',
      monthlyText: 'for 4 sets monthly',
      features: [
        '1 long video + 4 short clips',
        'Consistent brand styling',
        'Cross-platform optimization',
        'Dedicated project manager',
        '3 revisions included'
      ],
      deliverables: [
        { text: '5-7 days delivery' },
        { text: '3 revisions included' },
        { text: 'Amharic/English support' }
      ],
      preview: '/previews/creator-sample.jpg',
      popular: false
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = "Hello! I'm interested in your video editing packages. Can you provide more information?";
    const url = `https://wa.me/251912345678?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="packages" className={styles.packages}>
      {/* Background Visuals */}
      <div className={styles.backgroundVisuals}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gradientOrb2}></div>
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
            Professional <span className={styles.highlight}>Packages</span>
          </h1>
          <p className={styles.subtitle}>
            Choose the perfect video editing solution for your content needs
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div 
          className={styles.billingToggle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${billingType === 'single' ? styles.active : ''}`}
              onClick={() => setBillingType('single')}
            >
              Pay Per Video
            </button>
            <button
              className={`${styles.toggleButton} ${billingType === 'monthly' ? styles.active : ''}`}
              onClick={() => setBillingType('monthly')}
            >
              Monthly Package
            </button>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`${styles.packageCard} ${pkg.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Badge */}
              {pkg.badge && (
                <div 
                  className={styles.badge}
                  style={{ backgroundColor: pkg.badgeColor }}
                >
                  {pkg.badge}
                </div>
              )}

              {/* Header */}
              <div className={styles.cardHeader}>
                <h3 className={styles.packageTitle}>{pkg.title}</h3>
                <p className={styles.packageSubtitle}>{pkg.subtitle}</p>
              </div>

              {/* Pricing */}
              <div className={styles.pricingSection}>
                <div className={styles.price}>
                  ETB {billingType === 'single' ? pkg.singlePrice : pkg.monthlyPrice}
                </div>
                <div className={styles.priceText}>
                  {billingType === 'single' ? pkg.singleText : pkg.monthlyText}
                </div>
              </div>

              {/* Features */}
              <div className={styles.featuresSection}>
                <h4 className={styles.sectionTitle}>What's Included</h4>
                <div className={styles.featuresList}>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <div className={styles.checkmark}>✓</div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className={styles.deliverablesSection}>
                <div className={styles.deliverablesGrid}>
                  {pkg.deliverables.map((item, idx) => (
                    <div key={idx} className={styles.deliverableItem}>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className={styles.previewSection}>
                <motion.div 
                  className={styles.preview}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPreview(pkg.preview)}
                >
                  <img 
                    src={pkg.preview} 
                    alt={`${pkg.title} sample`}
                    className={styles.previewImage}
                  />
                  <div className={styles.previewOverlay}>
                    <span>View Sample</span>
                  </div>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaSection}>
                <motion.button
                  className={styles.primaryButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToContact}
                >
                  Request Quote
                </motion.button>
                <button
                  className={styles.secondaryButton}
                  onClick={openWhatsApp}
                >
                  Message on WhatsApp
                </button>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustSection}>
                <div className={styles.trustItem}>Quality Guaranteed</div>
                <div className={styles.trustItem}>Fast Delivery</div>
                <div className={styles.trustItem}>Local Support</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Sticky CTA */}
        <div className={styles.mobileStickyCTA}>
          <div className={styles.stickyContent}>
            <div className={styles.stickyText}>
              <div className={styles.stickyPrice}>Starting from ETB 2,500</div>
              <div className={styles.stickySubtitle}>Professional video editing</div>
            </div>
            <motion.button
              className={styles.stickyButton}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <motion.div
            className={styles.previewModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPreview(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedPreview(null)}
              >
                ×
              </button>
              <img 
                src={selectedPreview} 
                alt="Preview"
                className={styles.modalImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Packages;