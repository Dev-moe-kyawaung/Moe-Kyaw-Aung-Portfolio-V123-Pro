import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Menu, X, Moon, Sun, Send, Search, ExternalLink, Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Portfolio() {
  // ===== STATE MANAGEMENT =====
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [certSearch, setCertSearch] = useState('');
  const [certFilter, setCertFilter] = useState('all');
  const [imageIndex, setImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [faqActive, setFaqActive] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  // Portfolio data
  const apps = [
    { id: 1, icon: '📱', name: 'Social Dashboard', github: 'https://github.com/moekyawaung-tech/social-dashboard', desc: 'Real-time analytics' },
    { id: 2, icon: '📱', name: 'PWA App', github: 'https://github.com/moekyawaung-tech/pwa-app', desc: 'Progressive Web App' },
    { id: 3, icon: '📊', name: 'Admin Dashboard', github: '#', desc: 'Full-featured admin' },
    { id: 4, icon: '📈', name: 'Stock Market', github: '#', desc: 'Live market data' },
    { id: 5, icon: '🎮', name: 'Game Collection', github: 'https://github.com/moekyawaung-tech/game-collection', desc: 'Interactive games' },
    { id: 6, icon: '🎵', name: 'Music Player', github: 'https://github.com/moekyawaung-tech/video-player', desc: 'Stream music' },
    { id: 7, icon: '💬', name: 'Chat App', github: '#', desc: 'Real-time messaging' },
    { id: 8, icon: '⚽', name: 'World Cup', github: '#', desc: 'Sports tracker' },
    { id: 9, icon: '🛒', name: 'E-commerce', github: 'https://github.com/moekyawaung-tech/POS-Full-Version', desc: 'Online store' },
    { id: 10, icon: '💼', name: 'Portfolio', github: '#', desc: 'Showcase projects' },
    { id: 11, icon: '💰', name: 'Money Tracker', github: '#', desc: 'Finance management' },
    { id: 12, icon: '🌤️', name: 'Weather App', github: 'https://github.com/moekyawaung-tech/Weather-app', desc: 'Weather forecast' },
  ];

  const portfolioImages = [
    'https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png',
    'https://res.cloudinary.com/dye5qpwii/image/upload/v1778747388/image-1_1_khsx9s.png',
    'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp',
  ];

  const socialLinks = [
    { icon: '🐙', name: 'GitHub', url: 'https://github.com/Dev-moe-kyawaung', color: '#00d9ff' },
    { icon: '💼', name: 'LinkedIn', url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', color: '#00d9ff' },
    { icon: '🎬', name: 'YouTube', url: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG', color: '#ff00aa' },
    { icon: '🎪', name: 'Gravatar', url: 'https://gravatar.com/moekyawaung13721', color: '#00d9ff' },
    { icon: '📺', name: 'Vimeo', url: 'https://vimeo.com/user252414232', color: '#ff00aa' },
    { icon: '🦋', name: 'Bluesky', url: 'https://bsky.app/profile/moekyawaung96.bsky.social', color: '#00d9ff' },
  ];

  const faqItems = [
    { q: 'What are your core Android skills?', a: 'Kotlin, Jetpack Compose, MVVM/Clean Architecture, Firebase, REST APIs, Room Database, and CI/CD pipelines with GitHub Actions.' },
    { q: 'How many years of experience do you have?', a: 'Nearly 12 years of hands-on Android development, building secure, scalable mobile applications.' },
    { q: 'Do you work with modern Jetpack libraries?', a: 'Yes! Jetpack Compose, ViewModel, Navigation, Room, Paging, and all modern Android Jetpack components.' },
    { q: 'Can you set up CI/CD pipelines?', a: 'Absolutely. I have extensive experience with GitHub Actions, Azure DevOps, and Fastlane for automated testing and deployment.' },
    { q: 'What databases have you worked with?', a: 'Firebase (Firestore, Realtime DB), SQLite with Room, PostgreSQL, MongoDB, and Redis.' },
    { q: 'How can I reach you?', a: 'Email: moekyawaung@programmer.net | Phone: +95 9 889 000 889 | LinkedIn: moe-kyaw-aung-2653093a1' },
  ];

  const certificates = [
    { id: 1, name: 'C Programming', date: 'Jul 4, 2024', category: 'Programming Languages' },
    { id: 2, name: 'Python Fundamentals', date: 'Jul 5, 2024', category: 'Programming Languages' },
    { id: 3, name: 'JavaScript Mastery', date: 'Jul 6, 2024', category: 'Web Development' },
    { id: 4, name: 'React.js Advanced', date: 'Jul 7, 2024', category: 'Web Development' },
    { id: 5, name: 'Kotlin Programming', date: 'Jul 8, 2024', category: 'Mobile & App Dev' },
    { id: 6, name: 'Android Jetpack', date: 'Jul 9, 2024', category: 'Mobile & App Dev' },
    { id: 7, name: 'Firebase Mastery', date: 'Jul 10, 2024', category: 'Backend & Cloud' },
    { id: 8, name: 'Machine Learning Basics', date: 'Jul 11, 2024', category: 'AI & Data Science' },
    { id: 9, name: 'Cybersecurity Fundamentals', date: 'Jul 12, 2024', category: 'Security & DevOps' },
  ];

  // ===== EFFECTS =====
  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    const particleArray = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      opacity: Math.random() * 0.5,
    }));

    const animate = () => {
      ctx.fillStyle = darkMode ? '#0b0b1a' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [darkMode]);

  // ===== HANDLERS =====
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== STYLES =====
  const styles = {
    container: {
      fontFamily: "'Courier New', monospace",
      background: darkMode ? '#0b0b1a' : '#f5f5f5',
      color: darkMode ? '#e0e0e0' : '#1a1a1a',
      transition: 'all 0.3s ease',
      minHeight: '100vh',
      overflow: 'hidden',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      width: '100%',
      background: darkMode ? 'rgba(11, 11, 26, 0.95)' : 'rgba(245, 245, 245, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      borderBottom: `1px solid ${darkMode ? 'rgba(0, 217, 255, 0.3)' : 'rgba(0, 217, 255, 0.2)'}`,
      padding: '1.2rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #00d9ff 0%, #ff00aa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      cursor: 'pointer',
      textShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    navLink: {
      cursor: 'pointer',
      color: darkMode ? '#e0e0e0' : '#1a1a1a',
      transition: 'all 0.3s ease',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      fontSize: '0.95rem',
    },
    navLinkHover: {
      color: '#00d9ff',
      boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)',
    },
    heroSection: {
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginTop: '60px',
      background: darkMode 
        ? 'linear-gradient(135deg, #0b0b1a 0%, #1a1a2e 100%)' 
        : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
    },
    heroCopy: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      animation: 'fadeInUp 0.8s ease-out',
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #00d9ff 0%, #ff00aa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      textShadow: '0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(255, 0, 170, 0.2)',
      letterSpacing: '-1px',
    },
    heroSubtitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      color: '#00d9ff',
      marginBottom: '2rem',
      fontWeight: '300',
      letterSpacing: '2px',
    },
    heroDesc: {
      maxWidth: '600px',
      margin: '0 auto 2rem',
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: darkMode ? '#a0a0a0' : '#555',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1.5rem',
      margin: '2.5rem 0',
      maxWidth: '600px',
      margin: '2.5rem auto',
    },
    statItem: {
      textAlign: 'center',
      padding: '1.5rem',
      border: `1px solid rgba(0, 217, 255, 0.3)`,
      borderRadius: '8px',
      background: darkMode ? 'rgba(26, 26, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    },
    statNumber: {
      fontSize: '2.5rem',
      color: '#00d9ff',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: darkMode ? '#a0a0a0' : '#666',
    },
    cta: {
      display: 'inline-flex',
      gap: '1rem',
      marginTop: '2rem',
    },
    button: {
      padding: '0.8rem 2.2rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #00d9ff 0%, #00a8cc 100%)',
      color: '#0b0b1a',
      boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
    },
    buttonPrimaryHover: {
      boxShadow: '0 0 40px rgba(0, 217, 255, 0.7)',
      transform: 'translateY(-2px)',
    },
    buttonSecondary: {
      background: 'transparent',
      color: '#00d9ff',
      border: '2px solid #00d9ff',
      boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
    },
    buttonSecondaryHover: {
      background: 'rgba(0, 217, 255, 0.1)',
      boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.3)',
    },
    section: {
      padding: '6rem 5%',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #00d9ff 0%, #ff00aa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    sectionLabel: {
      fontSize: '0.85rem',
      color: '#00d9ff',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2.5rem',
    },
    card: {
      padding: '1.8rem',
      border: `1px solid ${darkMode ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.3)'}`,
      borderRadius: '8px',
      background: darkMode ? 'rgba(26, 26, 46, 0.6)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      borderColor: '#00d9ff',
      boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
      transform: 'translateY(-5px)',
    },
    footer: {
      background: darkMode ? 'rgba(11, 11, 26, 0.95)' : 'rgba(245, 245, 245, 0.95)',
      borderTop: `1px solid ${darkMode ? 'rgba(0, 217, 255, 0.3)' : 'rgba(0, 217, 255, 0.2)'}`,
      padding: '4rem 5%',
      marginTop: '4rem',
    },
  };

  // ===== COMPONENTS =====

  const Preloader = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0b0b1a',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeOut 0.5s ease-out 2s forwards',
    }}>
      <style>{`
        @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .preloader { animation: spin 2s linear infinite; }
      `}</style>
      <div className="preloader" style={{
        width: '60px',
        height: '60px',
        border: '3px solid rgba(0, 217, 255, 0.3)',
        borderTop: '3px solid #00d9ff',
        borderRadius: '50%',
      }} />
    </div>
  );

  const NavigationBar = () => (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => scrollToSection('home')}>
        ⭐ MKA V123
      </div>
      <div style={styles.navLinks}>
        {['Home', 'About', 'Projects', 'Skills', 'Certificates', 'Contact'].map((item) => (
          <div
            key={item}
            style={styles.navLink}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.navLinkHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { color: darkMode ? '#e0e0e0' : '#1a1a1a', boxShadow: 'none' })}
            onClick={() => scrollToSection(item.toLowerCase())}
          >
            {item}
          </div>
        ))}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#00d9ff',
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: '#00d9ff',
          display: 'none',
          '@media (max-width: 768px)': {
            display: 'block',
          },
        }}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );

  const HeroSection = () => (
    <section style={styles.heroSection} id="home">
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div style={styles.heroCopy}>
        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
          .pulse-text { animation: pulse 2s ease-in-out infinite; }
        `}</style>
        <h1 style={styles.heroTitle}>MŒKYAW AUNG</h1>
        <div style={styles.heroSubtitle}>ANDROID SENIOR DEVELOPER ★</div>
        <p style={styles.heroDesc}>
          12+ years crafting secure, scalable mobile applications with Kotlin, Jetpack Compose, and modern Android architecture. Clean code. Passionate about innovation.
        </p>
        
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>12+</div>
            <div style={styles.statLabel}>Years Experience</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>3K+</div>
            <div style={styles.statLabel}>Apps Built</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>122</div>
            <div style={styles.statLabel}>GitHub Repos</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Satisfaction</div>
          </div>
        </div>

        <div style={styles.cta}>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonPrimaryHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)', transform: 'none' })}
            onClick={() => scrollToSection('contact')}
          >
            LET'S BUILD
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonSecondaryHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { background: 'transparent', boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.1)' })}
            onClick={() => scrollToSection('about')}
          >
            EXPLORE MORE →
          </button>
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section style={styles.section} id="about">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Who I Am</div>
        <h2 style={styles.sectionTitle}>Android Developer. Problem Solver.</h2>
      </div>
      
      <div style={{ ...styles.grid, gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2.5rem', '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }}>
        <div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: darkMode ? '#a0a0a0' : '#666' }}>
            I'm a passionate Senior Android Engineer with nearly 12 years of experience building high-performance, user-centric mobile applications. My expertise spans from Kotlin and Jetpack Compose to Firebase integration and CI/CD pipeline management.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: darkMode ? '#a0a0a0' : '#666' }}>
            I believe in clean architecture, maintainable code, and delivering features that matter. Whether it's complex state management or optimizing app performance, I approach every challenge with precision and creativity.
          </p>
        </div>
        
        <div style={{
          padding: '2rem',
          border: `1px solid rgba(0, 217, 255, 0.3)`,
          borderRadius: '8px',
          background: darkMode ? 'rgba(26, 26, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#00d9ff', fontSize: '0.85rem', letterSpacing: '1px' }}>LOCATION</strong>
            <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>🇲🇲 Tachileik, Myanmar ↔ 🇹🇭 Bangkok, Thailand</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#00d9ff', fontSize: '0.85rem', letterSpacing: '1px' }}>CORE SKILLS</strong>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Kotlin • Jetpack Compose • MVVM • Clean Arch • Firebase • REST APIs</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#00d9ff', fontSize: '0.85rem', letterSpacing: '1px' }}>CERTIFICATIONS</strong>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>40+ verified certs • Google Developers Launchpad</p>
          </div>
          <div>
            <strong style={{ color: '#00d9ff', fontSize: '0.85rem', letterSpacing: '1px' }}>PHILOSOPHY</strong>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>"Code with culture. Build with purpose."</p>
          </div>
        </div>
      </div>
    </section>
  );

  const SkillsSection = () => (
    <section style={styles.section} id="skills">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Technical Arsenal</div>
        <h2 style={styles.sectionTitle}>Tech Stack & Expertise</h2>
      </div>
      
      <div style={{ marginTop: '2.5rem' }}>
        <style>{`
          .skill-tag { 
            display: inline-block; 
            padding: 0.6rem 1.2rem; 
            margin: 0.5rem 0.5rem 0.5rem 0; 
            border: 1px solid rgba(0, 217, 255, 0.5); 
            border-radius: 20px; 
            font-size: 0.95rem;
            background: rgba(0, 217, 255, 0.1);
            color: #00d9ff;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .skill-tag:hover { 
            background: rgba(0, 217, 255, 0.2);
            box-shadow: 0 0 15px rgba(0, 217, 255, 0.4);
            transform: translateY(-2px);
          }
        `}</style>
        
        <div>
          <h3 style={{ color: '#ff00aa', marginBottom: '1rem', fontSize: '1.2rem' }}>📱 Android / Mobile</h3>
          <div>
            {['Kotlin', 'Jetpack Compose', 'Android Studio', 'Material 3', 'Coroutines', 'Flow'].map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#ff00aa', marginBottom: '1rem', fontSize: '1.2rem' }}>🏗️ Architecture & Patterns</h3>
          <div>
            {['MVVM', 'Clean Architecture', 'SOLID Principles', 'Repository Pattern', 'Dependency Injection'].map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#ff00aa', marginBottom: '1rem', fontSize: '1.2rem' }}>☁️ Backend & Cloud</h3>
          <div>
            {['Firebase', 'REST APIs', 'Retrofit', 'Room Database', 'SQLite', 'GraphQL'].map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#ff00aa', marginBottom: '1rem', fontSize: '1.2rem' }}>🤖 AI / ML & Tools</h3>
          <div>
            {['Claude API', 'Python', 'TensorFlow Lite', 'GitHub Actions', 'CI/CD', 'Testing'].map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectsSection = () => (
    <section style={styles.section} id="projects">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Featured Work</div>
        <h2 style={styles.sectionTitle}>App Collection</h2>
      </div>
      
      <div style={styles.grid}>
        {apps.map((app) => (
          <div
            key={app.id}
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
              borderColor: darkMode ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.3)',
              boxShadow: 'none',
              transform: 'none',
            })}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{app.icon}</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#00d9ff' }}>{app.name}</h3>
            <p style={{ color: darkMode ? '#a0a0a0' : '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{app.desc}</p>
            <a
              href={app.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff00aa',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );

  const CertificatesSection = () => (
    <section style={styles.section} id="certificates">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Credentials</div>
        <h2 style={styles.sectionTitle}>Certifications</h2>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          placeholder="Search certificates..."
          value={certSearch}
          onChange={(e) => setCertSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.8rem 1rem',
            border: `1px solid rgba(0, 217, 255, 0.5)`,
            borderRadius: '6px',
            background: darkMode ? 'rgba(26, 26, 46, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            color: darkMode ? '#e0e0e0' : '#1a1a1a',
            fontSize: '1rem',
            marginBottom: '1.5rem',
          }}
        />
      </div>

      <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {certificates.map((cert) => (
          <div
            key={cert.id}
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
              borderColor: darkMode ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.3)',
              boxShadow: 'none',
              transform: 'none',
            })}
          >
            <div style={{ color: '#ff00aa', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>{cert.category}</div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: '#00d9ff' }}>{cert.name}</h4>
            <div style={{ color: darkMode ? '#a0a0a0' : '#666', fontSize: '0.85rem' }}>📅 {cert.date}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const SocialLinksSection = () => (
    <section style={styles.section} id="social">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Connect</div>
        <h2 style={styles.sectionTitle}>Social & Online Presence</h2>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ color: '#ff00aa', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Primary Networks</h3>
        <div style={styles.grid}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.card,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
                borderColor: darkMode ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.3)',
                boxShadow: 'none',
                transform: 'none',
              })}
            >
              <span style={{ fontSize: '2rem' }}>{link.icon}</span>
              <div>
                <div style={{ color: '#00d9ff', fontWeight: 'bold' }}>{link.name}</div>
                <div style={{ color: darkMode ? '#a0a0a0' : '#666', fontSize: '0.85rem' }}>Visit Profile →</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#ff00aa', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact Information</h3>
        <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{
            ...styles.card,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '2rem' }}>📧</span>
            <div>
              <div style={{ color: '#00d9ff', fontWeight: 'bold', marginBottom: '0.3rem' }}>Email</div>
              <a href="mailto:moekyawaung@programmer.net" style={{ color: darkMode ? '#e0e0e0' : '#1a1a1a', textDecoration: 'none', fontSize: '0.9rem' }}>
                moekyawaung@programmer.net
              </a>
            </div>
          </div>
          <div style={{
            ...styles.card,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <span style={{ fontSize: '2rem' }}>📱</span>
            <div>
              <div style={{ color: '#00d9ff', fontWeight: 'bold', marginBottom: '0.3rem' }}>Phone</div>
              <a href="tel:+959889000889" style={{ color: darkMode ? '#e0e0e0' : '#1a1a1a', textDecoration: 'none', fontSize: '0.9rem' }}>
                +95 9 889 000 889
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const FAQSection = () => (
    <section style={styles.section} id="faq">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Questions</div>
        <h2 style={styles.sectionTitle}>FAQ</h2>
      </div>

      <div style={{ marginTop: '2.5rem', maxWidth: '800px' }}>
        {faqItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '1rem',
              border: `1px solid ${faqActive === idx ? '#00d9ff' : 'rgba(0, 217, 255, 0.2)'}`,
              borderRadius: '8px',
              overflow: 'hidden',
              background: darkMode ? 'rgba(26, 26, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
            }}
          >
            <button
              onClick={() => setFaqActive(faqActive === idx ? null : idx)}
              style={{
                width: '100%',
                padding: '1.2rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: faqActive === idx ? '#00d9ff' : darkMode ? '#e0e0e0' : '#1a1a1a',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              {item.q}
              <span style={{ transform: faqActive === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
            </button>
            {faqActive === idx && (
              <div style={{
                padding: '0 1.2rem 1.2rem',
                borderTop: `1px solid rgba(0, 217, 255, 0.2)`,
                color: darkMode ? '#a0a0a0' : '#666',
                lineHeight: '1.8',
              }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const ContactSection = () => (
    <section style={styles.section} id="contact">
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={styles.sectionLabel}>Let's Talk</div>
        <h2 style={styles.sectionTitle}>Get In Touch</h2>
      </div>

      <div style={{
        ...styles.grid,
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginTop: '2.5rem',
        '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
      }}>
        <div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', color: darkMode ? '#a0a0a0' : '#666' }}>
            Have a project in mind? Let's build something amazing together. Reach out with your ideas, and let's discuss how I can help bring your vision to life.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { icon: '📧', text: 'moekyawaung@programmer.net', link: 'mailto:moekyawaung@programmer.net' },
              { icon: '📱', text: '+95 9 889 000 889', link: 'tel:+959889000889' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                style={{
                  ...styles.card,
                  flex: 1,
                  textDecoration: 'none',
                  color: darkMode ? '#e0e0e0' : '#1a1a1a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
                  borderColor: darkMode ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.3)',
                  boxShadow: 'none',
                  transform: 'none',
                })}
              >
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <small style={{ color: darkMode ? '#a0a0a0' : '#666' }}>{item.text}</small>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleFormSubmit} style={{
          padding: '2rem',
          border: `1px solid rgba(0, 217, 255, 0.3)`,
          borderRadius: '8px',
          background: darkMode ? 'rgba(26, 26, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            style={{
              padding: '0.8rem',
              border: `1px solid rgba(0, 217, 255, 0.3)`,
              borderRadius: '4px',
              background: darkMode ? 'rgba(11, 11, 26, 0.7)' : 'rgba(245, 245, 245, 0.7)',
              color: darkMode ? '#e0e0e0' : '#1a1a1a',
              fontSize: '1rem',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleFormChange}
            required
            style={{
              padding: '0.8rem',
              border: `1px solid rgba(0, 217, 255, 0.3)`,
              borderRadius: '4px',
              background: darkMode ? 'rgba(11, 11, 26, 0.7)' : 'rgba(245, 245, 245, 0.7)',
              color: darkMode ? '#e0e0e0' : '#1a1a1a',
              fontSize: '1rem',
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleFormChange}
            required
            rows="4"
            style={{
              padding: '0.8rem',
              border: `1px solid rgba(0, 217, 255, 0.3)`,
              borderRadius: '4px',
              background: darkMode ? 'rgba(11, 11, 26, 0.7)' : 'rgba(245, 245, 245, 0.7)',
              color: darkMode ? '#e0e0e0' : '#1a1a1a',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonPrimaryHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)', transform: 'none' })}
          >
            SEND MESSAGE →
          </button>
        </form>
      </div>
    </section>
  );

  const FooterComponent = () => (
    <footer style={styles.footer}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          <div>
            <div style={{ fontSize: '1.4rem', color: '#00d9ff', marginBottom: '1rem', fontWeight: 'bold' }}>⭐ MKA V123</div>
            <p style={{ fontSize: '0.9rem', color: darkMode ? '#a0a0a0' : '#666', lineHeight: '1.6' }}>
              Senior Android Developer crafting exceptional mobile experiences with cutting-edge technology and clean architecture.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#00d9ff', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'About', 'Projects', 'Contact'].map(link => (
                <li key={link} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    style={{ color: darkMode ? '#a0a0a0' : '#666', textDecoration: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.target.style.color = '#00d9ff'}
                    onMouseLeave={(e) => e.target.style.color = darkMode ? '#a0a0a0' : '#666'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#00d9ff', marginBottom: '1rem' }}>Follow</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid rgba(0, 217, 255, 0.3)`,
                    borderRadius: '4px',
                    color: '#00d9ff',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                  }}
                  onMouseEnter={(e) => Object.assign(e.target.style, { background: 'rgba(0, 217, 255, 0.2)', boxShadow: '0 0 15px rgba(0, 217, 255, 0.4)' })}
                  onMouseLeave={(e) => Object.assign(e.target.style, { background: 'transparent', boxShadow: 'none' })}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid rgba(0, 217, 255, 0.2)`,
          marginTop: '2rem',
          paddingTop: '2rem',
          textAlign: 'center',
          color: darkMode ? '#a0a0a0' : '#666',
          fontSize: '0.9rem',
        }}>
          <p>© 2024 Moe Kyaw Aung. Crafted with precision and passion in Tachileik, Myanmar.</p>
          <p style={{ marginTop: '0.5rem' }}>Constantly learning. Always building. Forever evolving.</p>
        </div>
      </div>
    </footer>
  );

  const FloatingButtons = () => (
    <>
      {scrollPosition > 300 && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d9ff 0%, #ff00aa 100%)',
            border: 'none',
            color: '#0b0b1a',
            cursor: 'pointer',
            fontSize: '1.5rem',
            zIndex: 50,
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)',
            animation: 'fadeInUp 0.3s ease-out',
          }}
          title="Back to top"
        >
          ↑
        </button>
      )}
      <button
        onClick={() => scrollToSection('contact')}
        style={{
          position: 'fixed',
          bottom: scrollPosition > 300 ? '7rem' : '2rem',
          right: '2rem',
          padding: '1rem 1.5rem',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #ff00aa 0%, #ff6699 100%)',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          zIndex: 50,
          boxShadow: '0 0 30px rgba(255, 0, 170, 0.5)',
          animation: 'slideIn 0.3s ease-out',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => Object.assign(e.target.style, { transform: 'scale(1.05)', boxShadow: '0 0 40px rgba(255, 0, 170, 0.7)' })}
        onMouseLeave={(e) => Object.assign(e.target.style, { transform: 'scale(1)', boxShadow: '0 0 30px rgba(255, 0, 170, 0.5)' })}
      >
        CONTACT ME
      </button>
    </>
  );

  // ===== RENDER =====
  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Courier New', monospace;
          scroll-behavior: smooth;
        }

        @keyframes slideIn { 
          from { transform: translateX(30px); opacity: 0; } 
          to { transform: translateX(0); opacity: 1; } 
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-animation { animation: float 3s ease-in-out infinite; }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#0b0b1a' : '#f5f5f5'};
        }

        ::-webkit-scrollbar-thumb {
          background: #00d9ff;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #ff00aa;
        }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>

      {showPreloader && <Preloader />}
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <SocialLinksSection />
      <FAQSection />
      <ContactSection />
      <FooterComponent />
      <FloatingButtons />
    </div>
  );
}
