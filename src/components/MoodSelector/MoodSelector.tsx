'use client';
import { useState } from 'react';
import styles from './MoodSelector.module.css';

const BASE = process.env.NODE_ENV === 'production' ? '/SaiHoliday' : '';

const moods = [
  { icon: '🏖️', label: 'Beach & Sun' },
  { icon: '🏔️', label: 'Mountains' },
  { icon: '🧘', label: 'Spiritual' },
  { icon: '💑', label: 'Romantic' },
  { icon: '🎯', label: 'Adventure' },
  { icon: '👨‍👩‍👧', label: 'Family' },
  { icon: '👑', label: 'Luxury' },
  { icon: '🌿', label: 'Nature' },
];

const moodPackages: Record<string, { title: string; location: string; price: string; image: string }[]> = {
  'Beach & Sun': [
    { title: 'Goa Sun & Beaches', location: 'Goa, India', price: '₹14,999', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80' },
    { title: 'Maldives Serenity', location: 'North Malé Atoll', price: '₹79,999', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80' },
    { title: 'Thailand Beach Escape', location: 'Phuket', price: '₹49,999', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80' },
  ],
  'Mountains': [
    { title: 'Kashmir Valley', location: 'Srinagar, J&K', price: '₹24,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80' },
    { title: 'Manali Snow Adventure', location: 'Himachal Pradesh', price: '₹16,999', image: `${BASE}/images/packages/manali.png` },
    { title: 'Swiss Alps Explorer', location: 'Interlaken, Switzerland', price: '₹1,29,999', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80' },
  ],
  'Spiritual': [
    { title: 'Divine Kedarnath Yatra', location: 'Uttarakhand', price: '₹18,999', image: `${BASE}/images/packages/kedarnath.png` },
    { title: 'Spiritual Varanasi', location: 'Uttar Pradesh', price: '₹9,999', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&q=80' },
    { title: 'Rishikesh Retreat', location: 'Uttarakhand', price: '₹12,999', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&q=80' },
  ],
  'Romantic': [
    { title: 'Maldives Honeymoon', location: 'Maldives', price: '₹79,999', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80' },
    { title: 'Paris City of Love', location: 'France', price: '₹99,999', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80' },
    { title: 'Kashmir Honeymoon', location: 'Srinagar', price: '₹29,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80' },
  ],
  'Adventure': [
    { title: 'Rishikesh Rafting & Camping', location: 'Uttarakhand', price: '₹12,999', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&q=80' },
    { title: 'Manali Trekking', location: 'Himachal Pradesh', price: '₹16,999', image: 'https://images.unsplash.com/photo-1585516482984-d1a32eb4a1c5?w=500&q=80' },
    { title: 'Bali Adventure', location: 'Bali, Indonesia', price: '₹54,999', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80' },
  ],
  'Family': [
    { title: 'Kerala Family Tour', location: 'Alleppey, Munnar', price: '₹22,999', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80' },
    { title: 'Rajasthan Royal Family Tour', location: 'Jaipur, Udaipur', price: '₹21,999', image: `${BASE}/images/packages/rajasthan.png` },
    { title: 'Singapore Family Discovery', location: 'Singapore', price: '₹59,999', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80' },
  ],
  'Luxury': [
    { title: 'Swiss Luxury Tour', location: 'Zurich, Geneva', price: '₹1,29,999', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80' },
    { title: 'Maldives Water Villa', location: 'Maldives', price: '₹1,49,999', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80' },
    { title: 'Dubai Luxury Experience', location: 'UAE', price: '₹74,999', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80' },
  ],
  'Nature': [
    { title: 'Kerala Backwaters', location: 'Alleppey, Kerala', price: '₹22,999', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80' },
    { title: 'Bali Rice Terraces', location: 'Ubud, Bali', price: '₹54,999', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80' },
    { title: 'Manali Valley', location: 'Himachal Pradesh', price: '₹16,999', image: 'https://images.unsplash.com/photo-1585516482984-d1a32eb4a1c5?w=500&q=80' },
  ],
};

export default function MoodSelector() {
  const [selected, setSelected] = useState('Beach & Sun');
  const packages = moodPackages[selected] ?? [];

  const sendEnquiry = (pkg: { title: string; location: string; price: string }) => {
    const WA = '919594541724';
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'm interested in the *${pkg.title}* package.\nLocation: ${pkg.location}\nPrice: ${pkg.price}\n\nPlease share more details.`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  return (
    <section className={styles.section} id="mood">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">✦ Travel Mood</span>
          <h2 className="section-title">What Kind of Traveler Are You?</h2>
          <p className="section-sub">
            Pick your vibe — we&apos;ll instantly show you the perfect packages.
          </p>
        </div>

        {/* Mood Pills */}
        <div className={styles.pills}>
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`${styles.pill} ${selected === mood.label ? styles.active : ''}`}
              onClick={() => setSelected(mood.label)}
            >
              <span className={styles.pillIcon}>{mood.icon}</span>
              {mood.label}
            </button>
          ))}
        </div>

        {/* Package Preview Cards */}
        <div className={styles.cards}>
          {packages.map((pkg) => (
            <div key={pkg.title} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <img src={pkg.image} alt={pkg.title} className={styles.cardImg} loading="lazy" />
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardLocation}>📍 {pkg.location}</p>
                <h3 className={styles.cardTitle}>{pkg.title}</h3>
                <p className={styles.cardPrice}>from <strong>{pkg.price}</strong></p>
                <button 
                  className="btn btn-primary" 
                  style={{ fontSize: '0.82rem', padding: '0.55rem 1.2rem' }}
                  onClick={() => sendEnquiry(pkg)}
                >
                  Get Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="#packages" className="btn btn-ghost-gold">View All {selected} Packages →</a>
        </div>
      </div>
    </section>
  );
}
