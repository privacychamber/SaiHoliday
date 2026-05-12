'use client';
import styles from './Footer.module.css';

const destinations = ['Kashmir', 'Manali', 'Goa', 'Kerala', 'Bali', 'Dubai', 'Maldives', 'Switzerland', 'Paris', 'Singapore'];
const quickLinks = ['Home', 'Packages', 'Experiences', 'Services', 'Gallery', 'About', 'Contact'];

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
            <a href="#" aria-label="Instagram" className={styles.social}>📸</a>
            <a href="#" aria-label="Facebook" className={styles.social}>📘</a>
            <a href="#" aria-label="YouTube" className={styles.social}>🎬</a>
            <a href="https://wa.me/91XXXXXXXXXX" aria-label="WhatsApp" className={styles.social}>💬</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.list}>
            {quickLinks.map((l) => (
              <li key={l}><a href="#" className={styles.link}>{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className={styles.colTitle}>Popular Destinations</h4>
          <ul className={styles.list}>
            {destinations.map((d) => (
              <li key={d}><a href="#packages" className={styles.link}>{d}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li><a href="tel:+91XXXXXXXXXX" className={styles.link}>📞 +91 XXXXX XXXXX</a></li>
            <li><a href="mailto:info@saiholiday.in" className={styles.link}>✉️ info@saiholiday.in</a></li>
            <li><span className={styles.link}>🕐 Mon–Sat, 9 AM – 8 PM</span></li>
            <li><span className={styles.link}>📍 [Your Office Address]</span></li>
          </ul>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi Sai Holiday!"
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
