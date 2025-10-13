import React from 'react';
import { motion } from 'framer-motion';
import styles from './Packages.module.css';

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: 'Short-Form Content Package',
      subtitle: 'For businesses, artists, and influencers who want to shine on TikTok, Instagram Reels, or YouTube Shorts.',
      popular: false,
      features: [
        'Fast-paced editing for 15–90 second clips',
        'Text overlays in Amharic or English',
        'Background music (local or international styles)',
        'Clean color and sound adjustments',
        '1–2 revisions per video'
      ],
      uses: [
        'Music promotion',
        'Event highlights (weddings, graduations, concerts)',
        'Short brand promos or motivational clips'
      ],
      pricing: {
        single: '2,500 ETB per video',
        package: '5 videos package – 10,000 ETB',
        turnaround: '2–3 days per video'
      },
      accentColor: '#FF6B6B'
    },
    {
      id: 2,
      title: 'YouTube & Long-Form Package',
      subtitle: 'Ideal for YouTubers, storytellers, educators, and organizations who want polished, long-form videos.',
      popular: true,
      features: [
        'Full edit (10–30 minutes)',
        'Smooth transitions and storytelling structure',
        'Subtitle (Amharic or English)',
        'Intro/outro with your logo and brand style',
        'Clean sound, color, and pacing'
      ],
      uses: [
        'YouTube channels (vlogs, educational, lifestyle)',
        'Church programs, cultural storytelling, and interviews',
        'NGO or company video content'
      ],
      pricing: {
        single: '5,000 ETB per video',
        package: 'Monthly plan (4 videos): 17,000 ETB',
        turnaround: '4–6 days per video'
      },
      accentColor: '#4A90F2'
    },
    {
      id: 3,
      title: 'Full Creator Package',
      subtitle: 'For creators or businesses that post both long YouTube videos and short clips for social media.',
      popular: false,
      features: [
        '1 full YouTube video (10–30 min)',
        '4 short-form clips (for TikTok / Reels / Shorts)',
        'Branded graphics and subtitles',
        'Consistent color, sound, and storytelling style',
        'Up to 3 revisions'
      ],
      uses: [
        'Artists promoting new music or events',
        'Educational and inspirational creators',
        'Brands combining storytelling + promo content'
      ],
      pricing: {
        single: '8,000 ETB per package',
        package: 'Monthly plan (4 sets): 28,000 ETB',
        turnaround: '5–7 days per set'
      },
      accentColor: '#00D4AA'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
            Tailored video editing solutions for Ethiopian creators and businesses
          </p>
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
              whileHover={{ y: -5 }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className={styles.popularBadge}>
                  Most Popular
                </div>
              )}

              {/* Package Header */}
              <div className={styles.packageHeader}>
                <div 
                  className={styles.accentLine}
                  style={{ backgroundColor: pkg.accentColor }}
                />
                <h3 className={styles.packageTitle}>{pkg.title}</h3>
                <p className={styles.packageSubtitle}>{pkg.subtitle}</p>
              </div>

              {/* Features Section */}
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>What's Included</h4>
                <div className={styles.featuresList}>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <div 
                        className={styles.checkmark}
                        style={{ backgroundColor: pkg.accentColor }}
                      >
                        ✓
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Uses Section */}
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Popular Uses in Ethiopia</h4>
                <div className={styles.usesList}>
                  {pkg.uses.map((use, idx) => (
                    <div key={idx} className={styles.useItem}>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Pricing & Delivery</h4>
                <div className={styles.pricingGrid}>
                  <div className={styles.pricingItem}>
                    <span className={styles.pricingLabel}>Single Video</span>
                    <span className={styles.pricingValue}>{pkg.pricing.single}</span>
                  </div>
                  <div className={styles.pricingItem}>
                    <span className={styles.pricingLabel}>Package Deal</span>
                    <span className={styles.pricingValue}>{pkg.pricing.package}</span>
                  </div>
                  <div className={styles.pricingItem}>
                    <span className={styles.pricingLabel}>Delivery Time</span>
                    <span className={styles.pricingValue}>{pkg.pricing.turnaround}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                className={styles.ctaButton}
                style={{ 
                  backgroundColor: pkg.accentColor,
                  boxShadow: `0 4px 15px ${pkg.accentColor}40`
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 8px 25px ${pkg.accentColor}60`
                }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
              >
                Start Your Project
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className={styles.bottomCta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Need a Custom Solution?</h3>
            <p className={styles.ctaText}>
              Contact me to discuss your specific requirements and get a personalized quote tailored to your needs.
            </p>
            <motion.button
              className={styles.ctaButtonSecondary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
            >
              Get Custom Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;