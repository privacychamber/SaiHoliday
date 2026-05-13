'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, ChevronDown, Star, Users, MapPin, Calendar, Home } from 'lucide-react';
import styles from './Hero.module.css';

const WA_NUMBER = '919999999999'; // ← Replace with real number (country code + number, no +)

const slides = [
  { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85', label: 'Kashmir', tagline: 'Heaven on Earth' },
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', label: 'Swiss Alps', tagline: 'Majestic Peaks' },
  { image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85', label: 'Kerala', tagline: 'God\'s Own Country' },
  { image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85', label: 'Maldives', tagline: 'A Drop of Paradise' },
  { image: 'https://images.unsplash.com/photo-1477587458883-47145ed94397?w=1920&q=85', label: 'Rajasthan', tagline: 'Royal Heritage' },
  { image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85', label: 'Paris', tagline: 'The City of Lights' },
];

function HeroForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    setSent(true);
    
    // Save to DB
    try {
      await fetch('/php-backend/api/enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, destination: dest, travel_date: date,
          type: 'consultancy',
          message: 'Villa Consultancy Request from Hero Banner'
        })
      });
    } catch (err) {
      console.error('Failed to save lead', err);
    }

    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'm interested in Villa Consultancy/Staycations.\nName: ${name}\nPhone: ${phone}\nDestination: ${dest || 'Not specified'}\nTravel Date: ${date || 'Flexible'}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="hero-name">Full Name</label>
        <input id="hero-name" type="text" placeholder="Your name" value={name}
          onChange={e => setName(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="hero-phone">WhatsApp Number</label>
        <input id="hero-phone" type="tel" placeholder="+91 XXXXX XXXXX" value={phone}
          onChange={e => setPhone(e.target.value)} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="hero-dest">Destination Interest</label>
        <select id="hero-dest" value={dest} onChange={e => setDest(e.target.value)}>
          <option value="">Select destination…</option>
          {['Kashmir', 'Manali', 'Kedarnath', 'Kerala', 'Goa', 'Rajasthan', 'Bali', 'Dubai', 'Maldives', 'Switzerland', 'Paris', 'Singapore', 'Thailand'].map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="hero-date">Travel Date (approx)</label>
        <input id="hero-date" type="month" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <button type="submit" className={`btn btn-primary ${styles.formBtn}`}>
        {sent ? '✅ Opening WhatsApp…' : 'Get My Quote →'}
      </button>
    </form>
  );
}

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
            <Link href="/consultancy/" className="btn btn-outline" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              <Home size={18} /> Villa Consultancy
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

        <div className={`glass ${styles.formCard}`}>
          <h3 className={styles.formTitle}>Plan Your Trip</h3>
          <p className={styles.formSub}>Get a free personalised quote</p>
          <HeroForm />
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
