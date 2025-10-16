import React, { useState } from 'react';
import { FaDownload, FaPlay, FaUser, FaCalendar, FaRocket, FaTimes } from 'react-icons/fa';
import { MdVerified } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import styles from './About.module.css';
import editorPhoto from '../../assets/img/kaleb-photo-rm.webp';
import resumeFile from '../../assets/files/kaleb_resume.pdf'; // ✅ place your PDF here

const About = () => {
  const [showResume, setShowResume] = useState(false);

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: <FaRocket /> },
    { number: '50+', label: 'Satisfied Clients', icon: <FaUser /> },
    { number: '2+', label: 'Years Experience', icon: <FaCalendar /> }
  ];

  const handleScrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) portfolioSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewResume = () => {
    setShowResume(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeFile;
    link.download = 'Kaleb_Mitiku_Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* LEFT SECTION */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.header}>
              <div className={styles.badge}>
                <MdVerified className={styles.badgeIcon} />
                <span>PROFESSIONAL VIDEO EDITOR</span>
              </div>
              <h1 className={styles.title}>
                Hi, I'm <span className={styles.highlight}>Kaleb Mitiku</span>
              </h1>
            </div>

            <div className={styles.description}>
              <p className={styles.lead}>
                Creative video editor, motion designer & cinematographer with 2+ years of professional experience
              </p>
              <p className={styles.sublead}>
                I craft cinematic visuals and cool animations that capture attention and emotion. My goal? To make every project unforgettable and trigger real connection the moment you hit play.
              </p>
            </div>

            <div className={styles.ctaSection}>
              <motion.button
                className={styles.primaryBtn}
                onClick={handleScrollToPortfolio}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className={styles.btnIcon} />
                View Portfolio
              </motion.button>

              <motion.button
                className={styles.proDownloadBtn}
                onClick={handleViewResume}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className={styles.downloadIcon} />
                <span>View Resume</span>
              </motion.button>
            </div>

            <div className={styles.stats}>
              {stats.map((stat) => (
                <motion.div key={stat.label} className={styles.statItem} whileHover={{ scale: 1.05 }}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statContent}>
                    <h3 className={styles.statNumber}>{stat.number}</h3>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            className={styles.photoSection}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.photoContainer}>
              <div className={styles.photoWrapper}>
                <img src={editorPhoto} alt="Kaleb Mitiku" className={styles.photo} />
                <div className={styles.photoFrame}></div>
                <div className={styles.photoGlow}></div>
                <div className={styles.floatingElement1}></div>
                <div className={styles.floatingElement2}></div>
                <div className={styles.floatingElement3}></div>
              </div>
              <div className={styles.experienceBadge}>
                <div className={styles.badgeContent}>
                  <span className={styles.badgeNumber}>2+</span>
                  <span className={styles.badgeText}>Years Experience</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* === Resume Preview Modal === */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className={styles.resumeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.resumeBox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <button className={styles.closeBtn} onClick={() => setShowResume(false)}>
                <FaTimes />
              </button>

              <h3 className={styles.resumeTitle}>My Resume</h3>
              <iframe
                src={resumeFile}
                title="Resume Preview"
                className={styles.resumeFrame}
              ></iframe>

              <div className={styles.resumeActions}>
                <button className={styles.downloadResumeBtn} onClick={handleDownload}>
                  <FaDownload /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
