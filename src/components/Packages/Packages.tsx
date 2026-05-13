'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Globe, Sparkles } from 'lucide-react';
import PackageCard from '@/components/PackageCard/PackageCard';
import styles from './Packages.module.css';

const domestic = [
  { title: 'Paradise in Kashmir', location: 'Srinagar, J&K', duration: '6D/5N', price: '₹24,999', rating: 5, badge: 'Best Seller', category: 'domestic', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' },
  { title: 'Divine Kedarnath Yatra', location: 'Uttarakhand', duration: '5D/4N', price: '₹18,999', rating: 5, badge: 'Trending', badgeType: 'amber' as const, category: 'domestic', image: 'https://images.unsplash.com/photo-1608555855762-2b657eb1278b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Royal Rajasthan Tour', location: 'Jaisalmer, Jodhpur', duration: '7D/6N', price: '₹21,999', rating: 4, category: 'domestic', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94397?auto=format&fit=crop&w=800&q=80' },
  { title: 'Manali Snow Adventure', location: 'Himachal Pradesh', duration: '5D/4N', price: '₹16,999', rating: 5, badge: 'Best Seller', category: 'domestic', image: 'https://images.unsplash.com/photo-1585516482984-d1a32eb4a1c5?auto=format&fit=crop&w=800&q=80' },
  { title: 'Backwaters of Kerala', location: 'Alleppey, Munnar', duration: '6D/5N', price: '₹22,999', rating: 5, category: 'domestic', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
  { title: 'Goa Sun & Beaches', location: 'North & South Goa', duration: '5D/4N', price: '₹14,999', rating: 5, badge: 'Popular', category: 'domestic', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
];

const international = [
  { title: 'Enchanting Bali', location: 'Bali, Indonesia', duration: '7D/6N', price: '₹54,999', rating: 5, badge: 'Best Seller', category: 'international', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
  { title: 'Glamorous Dubai', location: 'UAE', duration: '5D/4N', price: '₹44,999', rating: 5, badge: 'Visa Incl.', badgeType: 'amber' as const, category: 'international', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
  { title: 'Maldives Serenity', location: 'North Malé Atoll', duration: '5D/4N', price: '₹79,999', rating: 5, badge: '🏝️ Luxury', category: 'international', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80' },
  { title: 'Swiss Alps Explorer', location: 'Zurich, Interlaken', duration: '8D/7N', price: '₹1,29,999', rating: 5, category: 'international', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { title: 'Paris — City of Love', location: 'France', duration: '7D/6N', price: '₹99,999', rating: 5, badge: 'Romantic', badgeType: 'amber' as const, category: 'international', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
  { title: 'Singapore Discovery', location: 'Singapore', duration: '5D/4N', price: '₹59,999', rating: 4, category: 'international', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80' },
];

const allPackages = [...domestic, ...international];

export default function Packages() {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const [dynamicPackages, setDynamicPackages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/php-backend/api/packages.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDynamicPackages(data);
      })
      .catch(err => console.error('Failed to fetch packages', err));
  }, []);

  const combined = [...dynamicPackages, ...allPackages];

  // Remove duplicates based on title if necessary, or just show all
  const uniquePackages = combined.reduce((acc, current) => {
    const x = acc.find((item: any) => item.title === current.title);
    if (!x) return acc.concat([current]);
    else return acc;
  }, []);

  const filtered = filter === 'all' 
    ? uniquePackages 
    : uniquePackages.filter((p: any) => p.category === filter);

  return (
    <section className={styles.section} id="packages">
      <div className="container">
        <div className={styles.topHeader}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">✦ Handpicked Experiences</span>
            <h2 className="section-title">Your Next Journey Awaits</h2>
            <p className="section-sub" style={{ marginInline: 'auto' }}>
              Whether it&apos;s the serene hills of Kashmir or the vibrant streets of Dubai, 
              we craft memories that last a lifetime.
            </p>
          </div>

          <div className={styles.filterTabs}>
            {[
              { id: 'all', label: 'All Packages', icon: <Sparkles size={16} /> },
              { id: 'domestic', label: 'Domestic', icon: <Compass size={16} /> },
              { id: 'international', label: 'International', icon: <Globe size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`${styles.filterTab} ${filter === tab.id ? styles.activeFilter : ''}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <PackageCard {...pkg} type={pkg.category as any} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className={styles.viewAll}>
          <a href="#contact" className="btn btn-ghost-gold">
            Can&apos;t find what you&apos;re looking for? Talk to an Expert →
          </a>
        </div>
      </div>
    </section>
  );
}
