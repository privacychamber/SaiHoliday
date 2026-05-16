'use client';
import styles from './Experiences.module.css';

const categories = [
  { icon: '💍', label: 'Honeymoon Escapes', cta: 'Plan Your Honeymoon', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', desc: 'Romantic getaways crafted for two' },
  { icon: '🕉️', label: 'Spiritual Journeys', cta: 'Explore Sacred Routes', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80', desc: 'Pilgrimages & soul-nourishing escapes' },
  { icon: '🏔️', label: 'Adventure Tours', cta: 'Seek the Thrill', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', desc: 'Trek, camp & conquer the wild' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Holidays', cta: 'Plan Family Fun', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80', desc: 'Memories made for every generation' },
  { icon: '🌟', label: 'Luxury Retreats', cta: 'Indulge in Luxury', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', desc: 'Five-star experiences, zero compromise' },
  { icon: '🚗', label: 'Weekend Getaways', cta: 'Escape This Weekend', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', desc: 'Quick breaks from the everyday' },
  { icon: '🎉', label: 'Group Tours', cta: 'Book Group Travel', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', desc: 'Epic adventures, shared memories' },
];

const WA = '919594541724';

export default function Experiences() {
  const handleEnquiry = (cat: { label: string; desc: string }) => {
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'm interested in *${cat.label}*.\n${cat.desc}\n\nPlease share available packages and details.`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  return (
    <section className={styles.section} id="experiences">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">✦ Signature Experiences</span>
          <h2 className="section-title">
            Experiences Crafted Beyond<br />Ordinary Travel
          </h2>
          <p className="section-sub">
            Every journey is unique. Choose the experience that speaks to your soul —
            we&apos;ll craft the perfect itinerary around it.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.block} onClick={() => handleEnquiry(cat)} style={{ cursor: 'pointer' }}>
              <img src={cat.image} alt={cat.label} className={styles.blockImg} loading="lazy" />
              <div className={styles.blockOverlay} />
              <div className={styles.blockContent}>
                <span className={styles.blockIcon}>{cat.icon}</span>
                <h3 className={styles.blockTitle}>{cat.label}</h3>
                <p className={styles.blockDesc}>{cat.desc}</p>
                <button className={`btn btn-outline ${styles.blockCta}`} onClick={(e) => { e.stopPropagation(); handleEnquiry(cat); }}>{cat.cta} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
