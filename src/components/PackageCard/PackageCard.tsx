'use client';
import styles from './PackageCard.module.css';

export interface PackageCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  badge?: string;
  badgeType?: 'gold' | 'amber';
  type: 'domestic' | 'international';
}

export default function PackageCard({
  image, title, location, duration, price, rating, badge, badgeType = 'gold',
}: PackageCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={image} alt={title} className={styles.img} loading="lazy" />
        <div className={styles.imgOverlay} />
        {badge && (
          <span className={`badge badge-${badgeType} ${styles.badge}`}>{badge}</span>
        )}
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
          <button className="btn btn-ghost-gold">View Itinerary</button>
          <button className="btn btn-primary">Send Enquiry</button>
        </div>
      </div>
    </div>
  );
}
