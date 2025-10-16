import React from 'react';
import { 
  FaEnvelope, 
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaArrowUp,
  FaHeart,
  FaVideo,
  FaPhone
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <FaYoutube />,
      url: 'https://youtube.com/@kaleb',
      label: 'YouTube'
    },
    {
      icon: <SiTiktok />,
      url: 'https://tiktok.com/@kaleb',
      label: 'TikTok'
    },
    {
      icon: <FaInstagram />,
      url: 'https://instagram.com/kaleb',
      label: 'Instagram'
    },
    {
      icon: <FaTelegramPlane />,
      url: 'https://t.me/kalebbbpo',
      label: 'Telegram'
    }
  ];

  const quickLinks = [
    { name: 'Home', url: '#about' },
    { name: 'Portfolio', url: '#portfolio' },
    { name: 'About', url: '#about' },
    { name: 'Contact', url: '#contact' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Decorative Top Border */}
      <div className={styles.footerTopBorder}></div>

      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <FaVideo className={styles.logoIcon} />
              <span className={styles.logoText}>Kaleb</span>
            </div>
            <p className={styles.brandTagline}>
              Professional Video Editor & Content Creator
            </p>
          </div>

          {/* Links & Social Section */}
          <div className={styles.footerMiddle}>
            
            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Navigation</h4>
              <div className={styles.linksGrid}>
                {quickLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className={styles.footerLink}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.url)?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Contact</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span>kalebmq123@gmail.com</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <a href="tel:+251912345678" className={styles.phoneLink}>
                    +251 922 111 970 
                     
                  </a>
                  
                </div>
                   <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <a href="tel:+251912345678" className={styles.phoneLink}>
                    +251 984 859 090 
                     
                  </a>
                  
                </div>
                <div className={styles.contactItem}>
                  <FaVideo className={styles.contactIcon} />
                  <span>Available for Projects</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Follow Me</h4>
              <p className={styles.socialText}>
                Check out my latest work
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.footerBottomContent}>
            <div className={styles.copyright}>
              <p>
                © {currentYear} Kaleb. Crafted with <FaHeart className={styles.heartIcon} />
              </p>
            </div>

            {/* Back to Top */}
            <button 
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;