import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaTelegram, 
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaExclamationCircle,
  FaTimes
} from 'react-icons/fa';
import styles from './Contact.module.css';

// Validation helper - updated to match new field names
const validateForm = ({ user_name, user_email, subject, message }) => {
  if (!user_name?.trim() || !user_email?.trim() || !subject?.trim() || !message?.trim()) {
    return 'Please fill in all fields';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email.trim())) {
    return 'Please enter a valid email address';
  }
  
  if (user_name.trim().length < 2) {
    return 'Name should be at least 2 characters long';
  }
  
  if (message.trim().length < 10) {
    return 'Message should be at least 10 characters long';
  }
  
  return null;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef();




  // EmailJS configuration from environment variables
  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY


    
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'kalebmq123@gmail.com',
      link: 'mailto:kalebmq123@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+251 922 111 970',
      link: 'tel:+251922111970',
      description: 'Call or text me directly'
    },
    {
      icon: <FaTelegram />,
      title: 'Telegram',
      value: '@kalebbbpo',
      link: 'https://t.me/kalebbbpo',
      description: 'Message me on Telegram'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Bole Dembele, Addis Ababa, Ethiopia',
      link: 'https://maps.app.goo.gl/FkxjN8nnFjYKqGM28',
      description: 'Based in Ethiopia, serving globally'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/',
      color: '#0077B5'
    },
    {
      icon: <FaInstagram />,
      name: 'Instagram',
      url: 'https://instagram.com/',
      color: '#E4405F'
    },
    {
      icon: <FaWhatsapp />,
      name: 'WhatsApp',
      url: 'https://wa.me/251922111970',
      color: '#25D366'
    },
    {
      icon: <FaTelegram />,
      name: 'Telegram',
      url: 'https://t.me/kalebbbpo',
      color: '#0088CC'
    }
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing and hide success message
    if (error) setError('');
    if (isSubmitted) setIsSubmitted(false);
  }, [error, isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');

    // Validate form using helper function
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate EmailJS configuration
      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
        setError('Email service is not configured. Please contact me directly at kalebmq123@gmail.com');
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form but don't auto-hide success message
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS error details:', {
        text: error.text,
        message: error.message,
        status: error.status
      });
      
      let errorMessage = 'Failed to send message. Please try again or contact me directly.';
      
      // Provide more specific error messages
      if (error.status === 400) {
        errorMessage = 'Invalid form data. Please check your inputs and try again.';
      } else if (error.status === 403) {
        errorMessage = 'Email service is temporarily unavailable. Please try again later.';
      } else if (error.status === 0) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSubmitted(false);
  };

  const handleCloseError = () => {
    setError('');
  };

  // Container variants for animations
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.floatingShape1}></div>
        <div className={styles.floatingShape2}></div>
      </div>

      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            Let's <span className={styles.highlight}>Work Together</span>
          </h1>
          <p className={styles.subtitle}>
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Left Side - Contact Information */}
          <motion.div 
            className={styles.contactInfo}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className={styles.sectionTitle} variants={itemVariants}>
              Get In Touch
            </motion.h2>
            <motion.p className={styles.sectionDescription} variants={itemVariants}>
              I'm always excited to take on new projects and collaborate with creative minds. 
              Whether you need video editing, motion design, or consultation, let's connect!
            </motion.p>

            {/* Contact Methods */}
            <div className={styles.contactMethods}>
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  className={styles.contactItem}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className={styles.contactIcon}>
                    {item.icon}
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>{item.title}</h3>
                    <p className={styles.contactValue}>{item.value}</p>
                    <p className={styles.contactDescription}>{item.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className={styles.socialSection}
              variants={itemVariants}
            >
              <h3 className={styles.socialTitle}>Follow Me</h3>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    style={{ '--social-color': social.color }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className={styles.contactFormSection}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className={styles.formCard}
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {isSubmitted ? (
                <motion.div 
                  className={styles.successMessage}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className={styles.messageHeader}>
                    <FaCheckCircle className={styles.successIcon} />
                    <h3>Message Sent Successfully!</h3>
                    <button 
                      className={styles.closeButton}
                      onClick={handleCloseSuccess}
                      aria-label="Close success message"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <FaComment className={styles.formIcon} />
                    <h3>Send Me a Message</h3>
                    <p>Fill out the form below and I'll respond as soon as possible</p>
                  </div>

                  {error && (
                    <motion.div 
                      className={styles.errorMessage}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className={styles.messageHeader}>
                        <FaExclamationCircle className={styles.errorIcon} />
                        <span>{error}</span>
                        <button 
                          className={styles.closeButton}
                          onClick={handleCloseError}
                          aria-label="Close error message"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <FaUser className={styles.inputIcon} />
                        <input
                          type="text"
                          name="user_name"
                          value={formData.user_name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          className={styles.formInput}
                          required
                          minLength={2}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <FaEnvelope className={styles.inputIcon} />
                        <input
                          type="email"
                          name="user_email"
                          value={formData.user_email}
                          onChange={handleChange}
                          placeholder="Your Email Address"
                          className={styles.formInput}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <FaComment className={styles.inputIcon} />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project Subject"
                          className={styles.formInput}
                          required
                          minLength={2}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.textareaWrapper}>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, timeline, and any specific requirements..."
                          className={styles.formTextarea}
                          rows="5"
                          required
                          minLength={10}
                        ></textarea>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <div className={styles.loadingSpinner}></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className={styles.buttonIcon} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div 
              className={styles.quickActions}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href="https://t.me/kalebbbpo"
                className={styles.quickButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
                Message on Telegram
              </motion.a>
              <motion.a
                href="https://wa.me/251922111970"
                className={styles.quickButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <h3>Ready to Start Your Project?</h3>
            <p>Let's schedule a free consultation call to discuss your vision and requirements</p>
            <motion.button
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;