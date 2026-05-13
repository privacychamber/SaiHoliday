'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Globe, Sparkles } from 'lucide-react';
import PackageCard from '@/components/PackageCard/PackageCard';
import styles from './Packages.module.css';

import { allPackages } from '@/data/packages';

export default function Packages() {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const [dynamicPackages, setDynamicPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/php-backend/api/packages.php')
      .then(res => {
        if (!res.ok) throw new Error('Backend not found');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicPackages(data);
        } else {
          setDynamicPackages(allPackages);
        }
      })
      .catch(err => {
        console.warn('Backend unavailable, using static fallback:', err);
        setDynamicPackages(allPackages);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' 
    ? dynamicPackages 
    : dynamicPackages.filter((p: any) => p.category === filter);

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
