'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

const destinations = ['Kashmir', 'Manali', 'Goa', 'Kerala', 'Bali', 'Dubai', 'Maldives', 'Switzerland', 'Paris', 'Singapore'];
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Flights', href: '/flight' },
  { label: 'Consultancy', href: '/consultancy' },
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
            <a href="#" aria-label="Instagram" className={styles.social}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.social}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className={styles.social}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="https://wa.me/919594541724" aria-label="WhatsApp" className={styles.social}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
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
            <li><a href="mailto:info@saiholiday.in" className={styles.link}>✉️ info@saiholiday.in</a></li>
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
