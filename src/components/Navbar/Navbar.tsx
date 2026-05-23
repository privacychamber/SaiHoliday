'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Flights', href: '/flight' },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/#contact' },
  { label: '💳 Pay Now', href: '/payment' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className={styles.utilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <span>✉ Jdvilla2026@gmail.com</span>
          <span>📞 +91 95945 41724 &nbsp;|&nbsp; Mon–Sat 9 AM – 8 PM</span>
        </div>
      </div>

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span>
              <span className={styles.logoMain}>Sai Holiday&apos;s</span>
              <span className={styles.logoSub}>Your World, Your Way</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${link.href === '/payment' ? styles.navLinkPay : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Theme Toggle */}
          <div className={styles.ctaGroup}>
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              <span className={styles.themeToggleTrack}>
                <span className={styles.themeToggleThumb} />
                <span className={styles.themeIcon} aria-hidden="true">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
              </span>
            </button>

            <a href="tel:+919594541724" className={`btn btn-primary ${styles.ctaBtn}`}>
              📞 Get Free Quote
            </a>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={menuOpen ? styles.barOpen : ''}></span>
              <span className={menuOpen ? styles.barOpen : ''}></span>
              <span className={menuOpen ? styles.barOpen : ''}></span>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileCtas}>
            <a href="tel:+919594541724" className="btn btn-primary">📞 Call Now</a>
            <a
              href="https://wa.me/919594541724?text=Hi Sai Holiday, I want to enquire about a travel package."
              target="_blank" rel="noreferrer"
              className="btn btn-ghost-gold"
            >💬 WhatsApp</a>
          </div>
          {/* Theme toggle inside mobile menu */}
          <button
            className={styles.mobileThemeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      )}
    </>
  );
}
