'use client';
import styles from './Hero.module.css';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85',
    label: 'Kashmir',
    tagline: 'Heaven on Earth',
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=85',
    label: 'Bali',
    tagline: 'Island of the Gods',
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85',
    label: 'Maldives',
    tagline: 'A Drop of Paradise',
  },
];

import { useEffect, useState } from 'react';

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className={styles.hero} id="hero">
      {/* Background Image */}
      <div className={styles.bg}>
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      {/* Slide Indicators */}
      <div className={styles.indicators}>
        {slides.map((s, i) => (
          <button
            key={s.label}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${s.label}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <span className={styles.slideLabel}>{slide.label} — {slide.tagline}</span>
          <h1 className={styles.headline}>
            Your Dream Destination<br />
            <em>Is One Call Away.</em>
          </h1>
          <p className={styles.sub}>
            Handcrafted journeys across India &amp; the world — domestic escapes,
            international adventures, and honeymoon retreats. Trusted by 10,000+ happy travelers.
          </p>
          <div className={styles.ctas}>
            <a href="#packages" className="btn btn-primary">✦ Start Exploring</a>
            <a href="tel:+91XXXXXXXXXX" className="btn btn-outline">📞 Call Now</a>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <span>★ 4.9/5 Rating</span>
            <span>|</span>
            <span>10,000+ Travelers</span>
            <span>|</span>
            <span>100+ Destinations</span>
            <span>|</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Floating Enquiry Form */}
        <div className={`glass ${styles.formCard}`}>
          <h3 className={styles.formTitle}>Plan Your Trip</h3>
          <p className={styles.formSub}>Get a free personalised quote</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.field}>
              <label htmlFor="hero-name">Full Name</label>
              <input id="hero-name" type="text" placeholder="Your name" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="hero-phone">WhatsApp Number</label>
              <input id="hero-phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="hero-dest">Destination Interest</label>
              <select id="hero-dest">
                <option value="">Select destination…</option>
                <option>Kashmir</option>
                <option>Manali</option>
                <option>Kedarnath</option>
                <option>Kerala</option>
                <option>Goa</option>
                <option>Rajasthan</option>
                <option>Bali</option>
                <option>Dubai</option>
                <option>Maldives</option>
                <option>Switzerland</option>
                <option>Paris</option>
                <option>Singapore</option>
                <option>Thailand</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="hero-date">Travel Date (approx)</label>
              <input id="hero-date" type="month" />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.formBtn}`}>
              Get My Quote →
            </button>
          </form>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
