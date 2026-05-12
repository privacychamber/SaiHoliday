'use client';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const WA_NUMBER = '919999999999'; // ← Replace with real number (country code + number, no +)

const slides = [
  { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85', label: 'Kashmir', tagline: 'Heaven on Earth' },
  { image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=85', label: 'Bali', tagline: 'Island of the Gods' },
  { image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85', label: 'Maldives', tagline: 'A Drop of Paradise' },
];

function HeroForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nName: ${name}\nPhone: ${phone}\nDestination: ${dest || 'Not specified'}\nTravel Date: ${date || 'Flexible'}\n\nI'd like a free quote for my trip.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    setSent(true);
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
          {['Kashmir','Manali','Kedarnath','Kerala','Goa','Rajasthan','Bali','Dubai','Maldives','Switzerland','Paris','Singapore','Thailand'].map(d => (
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
          <div className={styles.ctas}>
            <a href="#packages" className="btn btn-primary">✦ Start Exploring</a>
            <a href={`https://wa.me/${WA_NUMBER}?text=Hi Sai Holiday, I want to book a trip!`}
              target="_blank" rel="noreferrer" className="btn btn-outline">💬 WhatsApp Us</a>
          </div>
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
