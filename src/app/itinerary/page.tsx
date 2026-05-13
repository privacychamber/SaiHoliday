'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Phone, MessageSquare, Loader2, ChevronRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './Itinerary.module.css';

function ItineraryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Fetch package details from the PHP API
    fetch(`/php-backend/api/packages.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          // Parse itinerary if it's a string
          if (typeof data.itinerary === 'string' && data.itinerary.trim().startsWith('[')) {
            try {
              data.itineraryData = JSON.parse(data.itinerary);
            } catch (e) {
              data.itineraryData = null;
            }
          }
          setPkg(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader2 className="spin" size={40} />
        <p>Fetching your handcrafted itinerary...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className={styles.loader}>
        <h2>Package Not Found</h2>
        <p>The requested itinerary could not be located. Please browse our other packages.</p>
        <a href="/#packages" className="btn btn-primary">Browse Packages</a>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Hero */}
      <section className={styles.hero}>
        <img src={pkg.image} alt={pkg.title} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            {pkg.title}
          </motion.h1>
          <div className={styles.meta}>
            <span><MapPin size={18} /> {pkg.location}</span>
            <span><Clock size={18} /> {pkg.duration}</span>
            <span><Star size={18} fill="var(--gold)" color="var(--gold)" /> Premium Package</span>
          </div>
        </div>
      </section>

      <div className={styles.layout}>
        {/* Main Itinerary */}
        <div className={styles.main}>
          <h2 className={styles.itineraryTitle}>The Journey</h2>
          
          {pkg.itineraryData ? (
            pkg.itineraryData.map((day: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.dayCard}
              >
                <span className={styles.dayNum}>Day {day.day || (i + 1)}</span>
                <h3 className={styles.dayTitle}>{day.title}</h3>
                <div className={styles.dayContent}>{day.activities || day.desc}</div>
              </motion.div>
            ))
          ) : (
            <div dangerouslySetInnerHTML={{ __html: pkg.itinerary }} />
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.bookCard}>
            <span className="section-label" style={{ color: 'var(--gold)' }}>Special Offer</span>
            <h3>Book This Trip</h3>
            <p className={styles.price}>{pkg.price}</p>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Per person including taxes</p>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => window.open(`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in the ${pkg.title} package!`)}
              >
                <MessageSquare size={18} /> Enquire on WhatsApp
              </button>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => window.print()}
              >
                Download Itinerary
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <>
      <Navbar />
      <main className={styles.section}>
        <Suspense fallback={<div className={styles.loader}><Loader2 className="spin" size={40} /></div>}>
          <ItineraryContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
