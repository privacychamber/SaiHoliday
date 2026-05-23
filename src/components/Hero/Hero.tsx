'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Home } from 'lucide-react';
import styles from './Hero.module.css';

const WA_NUMBER = '919594541724';

const slides = [
  { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85', label: 'Kashmir', tagline: 'Heaven on Earth' },
  { image: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?w=1920&q=85', label: 'Swiss Alps', tagline: 'Majestic Peaks' },
  { image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85', label: 'Kerala', tagline: 'God\'s Own Country' },
  { image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85', label: 'Maldives', tagline: 'A Drop of Paradise' },
  { image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=85', label: 'Rajasthan', tagline: 'Royal Heritage' },
  { image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85', label: 'Paris', tagline: 'The City of Lights' },
];



export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg}>
        {slides.map((s, i) => (
          <div key={s.label}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.indicators}>
        {slides.map((s, i) => (
          <button key={s.label}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${s.label}`}
          />
        ))}
      </div>

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.ctas}
          >
            <a href="#packages" className="btn btn-primary">
              <Star size={18} fill="currentColor" /> Start Exploring
            </a>
            <Link href="/villa-staycation" className="btn btn-outline">
              <Home size={18} /> Villa & Staycation
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi Sai Holiday, I want to book a trip!`}
              target="_blank" rel="noreferrer" className="btn btn-outline">
              <MessageSquare size={18} /> WhatsApp Us
            </a>
          </motion.div>
          <div className={styles.trustRow}>
            <span>★ 4.9/5 Rating</span><span>|</span>
            <span>10,000+ Travelers</span><span>|</span>
            <span>100+ Destinations</span><span>|</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
