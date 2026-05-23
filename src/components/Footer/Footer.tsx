'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

const destinations = ['Kashmir', 'Manali', 'Goa', 'Kerala', 'Bali', 'Dubai', 'Maldives', 'Switzerland', 'Paris', 'Singapore'];
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Flights', href: '/flight' },
  { label: 'Villa & Staycation', href: '/villa-staycation' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✦</span>
            <div>
              <span className={styles.logoMain}>Sai Holiday</span>
              <span className={styles.logoSub}>Your World, Your Way</span>
            </div>
          </div>
          <p className={styles.about}>
            A premium travel experience platform crafting handpicked domestic & international
            journeys for every kind of traveler. Est. 2010.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/saivila2026" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.list}>
            {quickLinks.map((l) => (
              <li key={l.label}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className={styles.colTitle}>Popular Destinations</h4>
          <ul className={styles.list}>
            {destinations.map((d) => (
              <li key={d}><Link href="/#packages" className={styles.link}>{d}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li><a href="tel:+919594541724" className={styles.link}>📞 +91 95945 41724</a></li>
            <li><a href="mailto:Jdvilla2026@gmail.com" className={styles.link}>✉️ Jdvilla2026@gmail.com</a></li>
            <li><span className={styles.link}>🕐 Mon–Sat, 9 AM – 8 PM</span></li>
            <li><span className={styles.link}>📍 Mumbai, Maharashtra</span></li>
          </ul>
          <a
            href="https://wa.me/919594541724?text=Hi Sai Holiday!"
            target="_blank" rel="noreferrer"
            className={`btn btn-primary ${styles.waBtn}`}
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} Sai Holiday | saiholiday.in. All Rights Reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
