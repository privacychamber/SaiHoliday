'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Packages', href: '#packages',
    children: ['Domestic Escapes', 'International Escapes', 'Honeymoon Packages', 'Group & Family Tours'],
  },
  { label: 'Flights', href: '/flight' },
  { label: 'Consultancy', href: '/consultancy' },
  {
    label: 'Experiences', href: '#experiences',
    children: ['Adventure Tours', 'Spiritual Journeys', 'Luxury Retreats', 'Weekend Getaways'],
  },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
          <span>✉ info@saiholiday.in</span>
          <span>📞 +91 XXXXX XXXXX &nbsp;|&nbsp; Mon–Sat 9 AM – 8 PM</span>
        </div>
      </div>

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <span>
              <span className={styles.logoMain}>Sai Holiday</span>
              <span className={styles.logoSub}>Your World, Your Way</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                  {link.children && <span className={styles.chevron}>▾</span>}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <ul className={styles.dropdown}>
                    {link.children.map((child) => (
                      <li key={child}>
                        <Link href="#packages" className={styles.dropdownItem}>{child}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={styles.ctaGroup}>
            <a href="tel:+91XXXXXXXXXX" className={`btn btn-primary ${styles.ctaBtn}`}>
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
              <a href="tel:+91XXXXXXXXXX" className="btn btn-primary">📞 Call Now</a>
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi Sai Holiday, I want to enquire about a travel package."
                target="_blank" rel="noreferrer"
                className="btn btn-ghost-gold"
              >💬 WhatsApp</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
