import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const Skills = () => {
  // Clean animation variants
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
    hidden: { y: 25, opacity: 0 },
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

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Skills data
  const coreSkills = [
    {
      category: 'Editing',
      image: '/skills/editing.webp',
      skills: [
        { name: 'Video Editing', level: 95 },
        { name: 'Color Grading', level: 90 },
        { name: 'Audio Mixing', level: 85 }
      ]
    },
    {
      category: 'Creative',
      image: '/skills/creative.webp',
      skills: [
        { name: 'Motion Graphics', level: 88 },
        { name: 'Visual Effects', level: 82 },
        { name: 'Storytelling', level: 90 }
      ]
    },
    {
      category: 'Technical',
      image: '/skills/technical.webp',
      skills: [
        { name: 'Cinematography', level: 80 },
        { name: 'Workflow', level: 85 },
        { name: 'Quality Control', level: 88 }
      ]
    }
  ];

  const software = [
    { 
      name: 'Premiere Pro', 
      level: 95, 
      image: '/software/premiere-pro.webp',
      category: 'Video Editing'
    },
    { 
      name: 'After Effects', 
      level: 90, 
      image: '/software/after-effects.webp',
      category: 'Motion Graphics'
    },
    { 
      name: 'DaVinci Resolve', 
      level: 88, 
      image: '/software/davinci-resolve.webp',
      category: 'Color Grading'
    },
    { 
      name: 'Capcut', 
      level: 98, 
      image: '/software/capcut.webp',
      category: 'Video Editing'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
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
          <h2 id="skills-title" className={styles.title}>
            Professional <span className={styles.highlight}>Skills</span>
          </h2>
          <p className={styles.subtitle}>
            Expertise in video production and post-production
          </p>
        </motion.div>

        {/* Software Proficiency */}
        <section className={styles.softwareSection} aria-labelledby="software-title">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.softwareHeader}>
              <h3 id="software-title" className={styles.softwareTitle}>Software Proficiency</h3>
              <div className={styles.softwareVisual}>
                <div className={styles.visualPulse}></div>
              </div>
            </div>
            <div className={styles.softwareGrid}>
              {software.map((program, index) => (
                <motion.div
                  key={program.name}
                  className={styles.softwareItem}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                >
                  <motion.div 
                    className={styles.softwareImageContainer}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={program.image} 
                      alt={`${program.name} software interface`}
                      className={styles.softwareImage}
                      loading="lazy"
                    />
                    <div className={styles.softwareLevelBadge}>
                      {program.level}%
                    </div>
                  </motion.div>
                  <div className={styles.softwareContent}>
                    <div className={styles.softwareInfo}>
                      <span className={styles.softwareName}>{program.name}</span>
                      <span className={styles.softwareCategory}>{program.category}</span>
                    </div>
                    <div className={styles.softwareBar}>
                      <motion.div 
                        className={styles.softwareProgress}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: program.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.1 + 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Core Skills */}
        <section className={styles.skillsSection} aria-labelledby="core-skills-title">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.skillsHeader}>
              <h3 id="core-skills-title" className={styles.skillsTitle}>Core Competencies</h3>
              <div className={styles.skillsVisual}>
                <div className={styles.visualPulse}></div>
              </div>
            </div>
            <div className={styles.skillsGrid}>
              {coreSkills.map((category) => (
                <motion.div
                  key={category.category}
                  className={styles.skillCategory}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className={styles.categoryVisual}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.categoryImage}>
                      <img 
                        src={category.image} 
                        alt={`${category.category} skill category`}
                        className={styles.image}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}></div>
                    </div>
                    <h4 className={styles.categoryTitle}>{category.category}</h4>
                  </motion.div>
                  <div className={styles.skillsList}>
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className={styles.skillItem}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillBar}>
                          <motion.div 
                            className={styles.skillProgress}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: skill.level / 100 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 1, 
                              delay: skillIndex * 0.1 + 0.3,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.ctaVisual}>
            <div className={styles.ctaOrb}></div>
          </div>
          <p className={styles.ctaText}>
            Ready to create something amazing?{' '}
            <motion.button 
              type="button"
              className={styles.ctaLink}
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's talk
            </motion.button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;