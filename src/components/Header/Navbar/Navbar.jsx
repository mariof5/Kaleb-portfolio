import React, { useState, useEffect, useRef } from 'react';
import { FaCrown, FaTimes, FaBars, FaChevronDown, FaStar, FaGem } from 'react-icons/fa';
import { MdOndemandVideo } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import Kaleb_logo from '../../../../public/Logo/kaleb_logo_G.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const navbarRef = useRef(null);

  const navItems = [
    { name: 'About', path: '#about', hasDropdown: false },
    { 
      name: 'Portfolio', 
      path: '#portfolio', 
      hasDropdown: true,
      items: [
        { 
          name: 'LongForm Video', 
          path: '#portfolio', 
          filter: 'longform',
          icon: <MdOndemandVideo />
        },
        { 
          name: 'ShortForm Video', 
          path: '#portfolio', 
          filter: 'shortform',
          icon: <MdOndemandVideo />
        },
        { 
          name: 'Skills', 
          path: '#skills', 
          filter: null,
          icon: <MdOndemandVideo />
        }
      ]
    },
    { 
      name: 'Services', 
      path: '#services', 
      hasDropdown: true,
      items: [
        'Package', 
      ]
    },
    { name: 'Blog', path: '#blog', hasDropdown: false },
    { name: 'Contact', path: '#contact', hasDropdown: false }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileDropdown = (index) => {
    setMobileOpenDropdown(mobileOpenDropdown === index ? null : index);
  };

  const handlePortfolioNavigation = (filter, event) => {
    event.preventDefault();
    
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    
    if (filter) {
      sessionStorage.setItem('portfolioFilter', filter);
    }
    
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
      
      if (filter) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('portfolioFilterChange', { 
            detail: { filter } 
          }));
        }, 500);
      }
    }
  };

  const handleNavigation = (path, event) => {
    event.preventDefault();
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileOpenDropdown(null);
    
    const section = document.querySelector(path);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    })
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileDropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      ref={navbarRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <motion.div 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Scroll to about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              // Fallback to top of page
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
            
            // Close mobile menu if open
            setIsOpen(false);
            setActiveDropdown(null);
            setMobileOpenDropdown(null);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.logoContent}>
            <motion.div
              className={styles.crownWrapper}
              animate={{ 
                rotate: [0, -5, 5, -3, 0],
                scale: [1, 1.1, 1.05, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img 
                src={Kaleb_logo} 
                alt="logo" 
                className={styles.crownIcon}
              />
              <div className={styles.crownGlow}></div>
            </motion.div>
            <span className={styles.logoText}>KALEB</span>
            <motion.div
              className={styles.particle}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={styles.navMenu}>
          {navItems.map((item, index) => (
            <div 
              key={item.name}
              className={styles.navItemWrapper}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
            >
              <motion.a
                href={item.path}
                className={styles.navLink}
                custom={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -2,
                  color: "#944AF2"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => !item.hasDropdown ? handleNavigation(item.path, e) : null}
              >
                {item.name}
                {item.hasDropdown && (
                  <motion.span
                    animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className={styles.chevron} />
                  </motion.span>
                )}
              </motion.a>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.hasDropdown && activeDropdown === index && (
                  <motion.div
                    className={styles.dropdownMenu}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className={styles.dropdownContent}>
                      {item.items.map((dropdownItem, idx) => (
                        <motion.a
                          key={dropdownItem.name || dropdownItem}
                          href={dropdownItem.path || dropdownItem}
                          className={styles.dropdownItem}
                          onClick={(e) => dropdownItem.filter ? 
                            handlePortfolioNavigation(dropdownItem.filter, e) : 
                            handleNavigation(dropdownItem.path || dropdownItem, e)
                          }
                          whileHover={{ 
                            x: 10,
                            backgroundColor: "rgba(148, 74, 242, 0.1)"
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {dropdownItem.icon ? dropdownItem.icon : <FaGem className={styles.dropdownIcon} />}
                          {dropdownItem.name || dropdownItem}
                          <motion.div
                            className={styles.hoverLine}
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaWrapper}
          variants={itemVariants}
          custom={5}
        >
          <motion.button
            className={styles.ctaButton}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(148, 74, 242, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <FaStar className={styles.ctaIcon} />
            Get In Touch
            <div className={styles.buttonGlow}></div>
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={styles.mobileMenuContent}>
              {navItems.map((item, index) => (
                <div key={item.name} className={styles.mobileNavItemContainer}>
                  {item.hasDropdown ? (
                    <div className={styles.mobileDropdown}>
                      {/* Mobile Dropdown Header - Clickable */}
                      <motion.button
                        className={styles.mobileDropdownHeader}
                        onClick={() => toggleMobileDropdown(index)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{item.name}</span>
                        <motion.span
                          animate={{ rotate: mobileOpenDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={styles.mobileDropdownChevron}
                        >
                          <FaChevronDown />
                        </motion.span>
                      </motion.button>
                      
                      {/* Mobile Dropdown Content - Animated */}
                      <AnimatePresence>
                        {mobileOpenDropdown === index && (
                          <motion.div
                            className={styles.mobileDropdownContent}
                            variants={mobileDropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {item.items.map((dropdownItem, idx) => (
                              <a
                                key={dropdownItem.name || dropdownItem}
                                href={dropdownItem.path || dropdownItem}
                                className={styles.mobileDropdownItem}
                                onClick={(e) => {
                                  dropdownItem.filter ? 
                                    handlePortfolioNavigation(dropdownItem.filter, e) : 
                                    handleNavigation(dropdownItem.path || dropdownItem, e);
                                }}
                              >
                                {dropdownItem.icon && (
                                  <span className={styles.mobileDropdownIcon}>
                                    {dropdownItem.icon}
                                  </span>
                                )}
                                {dropdownItem.name || dropdownItem}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      className={styles.mobileNavItem}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.path}
                        className={styles.mobileNavLink}
                        onClick={(e) => handleNavigation(item.path, e)}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.button
                className={styles.mobileCta}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsOpen(false);
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <FaStar className={styles.mobileCtaIcon} />
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;