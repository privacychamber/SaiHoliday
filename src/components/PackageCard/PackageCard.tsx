'use client';
import Link from 'next/link';
import styles from './PackageCard.module.css';

const WA = '919999999999'; // ← Replace with real number

export interface PackageCardProps {
  id?: number | string;
  image: string; title: string; location: string;
  duration: string; price: string; rating: number;
  badge?: string; badgeType?: 'gold' | 'amber';
  type: 'domestic' | 'international';
}

export default function PackageCard({
  id, image, title, location, duration, price, rating, badge, badgeType = 'gold',
}: PackageCardProps) {
  const sendEnquiry = () => {
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'm interested in:\n*${title}*\nLocation: ${location}\nDuration: ${duration}\nPrice: ${price}\n\nPlease send me the full itinerary and availability.`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={image} alt={title} className={styles.img} loading="lazy" />
        <div className={styles.imgOverlay} />
        {badge && <span className={`badge badge-${badgeType} ${styles.badge}`}>{badge}</span>}
        <span className={styles.duration}>{duration}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.location}>📍 {location}</span>
          <span className={styles.rating}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>
          Starting from <strong>{price}</strong><span>/person</span>
        </p>
        <div className={styles.actions}>
          <Link href={id ? `/itinerary/?id=${id}` : '#contact'} className="btn btn-ghost-gold" style={{ fontSize: '0.8rem' }}>
            View Itinerary
          </Link>
          <button className="btn btn-primary" onClick={sendEnquiry} style={{ fontSize: '0.8rem' }}>Send Enquiry</button>
        </div>
      </div>
    </div>
  );
}

