import React from 'react';
import { FaDownload, FaPlay, FaUser, FaCalendar, FaRocket } from 'react-icons/fa';
import { MdVerified, MdOutlineVerified } from "react-icons/md";
import { motion } from 'framer-motion';
import styles from './About.module.css';
import editorPhoto from '../../assets/img/kaleb-photo-rm.png';


const About = () => {
  const stats = [
    { number: '150+', label: 'Projects Done', icon: <FaRocket /> },
    { number: '50+', label: 'Happy Clients', icon: <FaUser /> },
    { number: '8+', label: 'Years Experience', icon: <FaCalendar /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const photoVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Content Section */}
          <motion.div 
            className={styles.content}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header Section */}
            <motion.div className={styles.header} variants={itemVariants}>
              <div className={styles.badge}>
             
                <MdVerified  className={styles.badgeIcon} />
            
       
                <span>PROFESSIONAL VIDEO EDITOR</span>
              </div>
              <h1 className={styles.title}>
                Hi, I'm <span className={styles.highlight}>Kaleb</span>
              </h1>
            </motion.div>

            {/* Description Section */}
            <motion.div className={styles.description} variants={itemVariants}>
              <p className={styles.lead}>
                Crafting cinematic stories through the art of video editing.
              </p>
              <p className={styles.sublead}>
                Specializing in commercials, music videos, and premium content 
                that captivates audiences.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className={styles.ctaSection} variants={itemVariants}>
              <motion.button 
                className={styles.primaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className={styles.btnIcon} />
                View My Work
              </motion.button>
              <motion.button 
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className={styles.btnIcon} />
                Download Resume
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div className={styles.stats} variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className={styles.statItem}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statContent}>
                    <h3 className={styles.statNumber}>{stat.number}</h3>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Photo Section */}
          <motion.div 
            className={styles.photoSection}
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.photoContainer}>
              <div className={styles.photoWrapper}>
                <img 
                  src={editorPhoto} 
                  alt="Kaleb - Professional Video Editor" 
                  className={styles.photo}
                />
                {/* Photo Frame Effects */}
                <div className={styles.photoFrame}></div>
                <div className={styles.photoGlow}></div>
                
                {/* Floating Elements */}
                <div className={styles.floatingElement1}></div>
                <div className={styles.floatingElement2}></div>
                <div className={styles.floatingElement3}></div>
              </div>
              
              {/* Experience Badge */}
              <div className={styles.experienceBadge}>
                <div className={styles.badgeContent}>
                  <span className={styles.badgeNumber}>8+</span>
                  <span className={styles.badgeText}>Years Experience</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;