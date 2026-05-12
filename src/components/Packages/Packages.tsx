'use client';
import PackageCard from '@/components/PackageCard/PackageCard';
import styles from './Packages.module.css';

const domestic = [
  { title: 'Paradise in Kashmir', location: 'Srinagar, J&K', duration: '6D/5N', price: '₹24,999', rating: 5, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80' },
  { title: 'Divine Kedarnath Yatra', location: 'Uttarakhand', duration: '5D/4N', price: '₹18,999', rating: 5, badge: 'Trending', badgeType: 'amber' as const, image: 'https://images.unsplash.com/photo-1608555855762-2b657eb1278b?w=600&q=80' },
  { title: 'Royal Rajasthan Tour', location: 'Jaisalmer, Jodhpur', duration: '7D/6N', price: '₹21,999', rating: 4, image: 'https://images.unsplash.com/photo-1477587458883-47145ed94397?w=600&q=80' },
  { title: 'Manali Snow Adventure', location: 'Himachal Pradesh', duration: '5D/4N', price: '₹16,999', rating: 5, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1585516482984-d1a32eb4a1c5?w=600&q=80' },
  { title: 'Backwaters of Kerala', location: 'Alleppey, Munnar', duration: '6D/5N', price: '₹22,999', rating: 5, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80' },
  { title: 'Rishikesh Spiritual Escape', location: 'Uttarakhand', duration: '4D/3N', price: '₹12,999', rating: 4, badge: 'New', badgeType: 'amber' as const, image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=600&q=80' },
  { title: 'Spiritual Varanasi', location: 'Uttar Pradesh', duration: '3D/2N', price: '₹9,999', rating: 4, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80' },
  { title: 'Goa Sun & Beaches', location: 'North & South Goa', duration: '5D/4N', price: '₹14,999', rating: 5, badge: 'Popular', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80' },
];

const international = [
  { title: 'Enchanting Bali', location: 'Bali, Indonesia', duration: '7D/6N', price: '₹54,999', rating: 5, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  { title: 'Glamorous Dubai', location: 'UAE', duration: '5D/4N', price: '₹44,999', rating: 5, badge: 'Visa Incl.', badgeType: 'amber' as const, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { title: 'Maldives Serenity', location: 'North Malé Atoll', duration: '5D/4N', price: '₹79,999', rating: 5, badge: '🏝️ Luxury', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80' },
  { title: 'Swiss Alps Explorer', location: 'Zurich, Interlaken', duration: '8D/7N', price: '₹1,29,999', rating: 5, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { title: 'Paris — City of Love', location: 'France', duration: '7D/6N', price: '₹99,999', rating: 5, badge: 'Romantic', badgeType: 'amber' as const, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
  { title: 'Singapore Discovery', location: 'Singapore', duration: '5D/4N', price: '₹59,999', rating: 4, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
  { title: 'Thailand Explorer', location: 'Bangkok, Phuket', duration: '7D/6N', price: '₹49,999', rating: 5, badge: 'New', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80' },
];

export default function Packages() {
  return (
    <section className={styles.section} id="packages">
      <div className="container">

        {/* Domestic */}
        <div className={styles.header}>
          <span className="section-label">✦ Domestic Escapes</span>
          <h2 className="section-title">Explore Incredible India</h2>
          <p className="section-sub">
            From the snow peaks of Kashmir to the spiritual ghats of Varanasi —
            your next chapter begins here.
          </p>
        </div>

        <div className={styles.grid}>
          {domestic.map((pkg) => (
            <PackageCard key={pkg.title} {...pkg} type="domestic" />
          ))}
        </div>

        <div className={styles.viewAll}>
          <button className="btn btn-ghost-gold">View All Domestic Packages →</button>
        </div>

        {/* International — wrapped in dark panel */}
        <div className={styles.intlPanel}>
          <div className={styles.header}>
            <span className="section-label" style={{ color: 'var(--gold)' }}>✦ International Escapes</span>
            <h2 className="section-title section-title-light">The World Is Waiting For You</h2>
            <p className="section-sub section-sub-light">
              Bespoke international holidays crafted to perfection — from Bali&apos;s sunrise temples
              to the Eiffel Tower&apos;s golden hour.
            </p>
          </div>

          <div className={styles.grid}>
            {international.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} type="international" />
            ))}
          </div>

          <div className={styles.viewAll}>
            <button className="btn btn-primary">Explore International Packages →</button>
          </div>
        </div>

      </div>
    </section>
  );
}
