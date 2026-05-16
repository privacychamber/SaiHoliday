'use client';
import { motion } from 'framer-motion';
import { Home, Waves, Trees, MapPin, Phone, MessageSquare, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Enquiry from '@/components/Enquiry/Enquiry';
import styles from './Consultancy.module.css';

const consultancyServices = [
  {
    icon: <Waves size={32} />,
    title: 'Luxury & Private Pools',
    text: 'Handpicked premium villas with crystal clear private pools for the ultimate staycation experience.'
  },
  {
    icon: <Home size={32} />,
    title: 'Family Stays',
    text: 'Spacious properties designed for reunions, celebrations, and quality time with your loved ones.'
  },
  {
    icon: <Trees size={32} />,
    title: 'Nature Escapes',
    text: 'Offbeat retreats tucked away in lush greenery, offering peace and serenity away from city life.'
  }
];

const locations = [
  { name: 'Mahabaleshwar', image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lonavala', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Khandala', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80' },
  { name: 'Karjat', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
];

export default function ConsultancyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.section}>
        <div className="container">
          {/* Hero Section */}
          <section className={styles.hero}>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label"
            >
              ✦ Expert Travel Consultancy
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Villa & Staycation <br />
              <span className="text-gradient-gold">Consultancy</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              We don&apos;t just book; we curate. Tell us your vibe, and our senior consultants will find the perfect villa from the best booking sources for you.
            </motion.p>
          </section>

          {/* Service Cards */}
          <div className={styles.grid}>
            {consultancyServices.map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.card}
              >
                <div className={styles.cardIcon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Locations Section */}
        <section className={styles.locations}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label" style={{ color: 'var(--gold)' }}>✦ Our Expertise</span>
              <h2 className="section-title section-title-light">Primary Domains</h2>
            </div>
            
            <div className={styles.locGrid}>
              {locations.map((loc, i) => (
                <motion.div 
                  key={loc.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={styles.locCard}
                >
                  <img src={loc.image} alt={loc.name} className={styles.locImg} />
                  <div className={styles.locOverlay}>
                    <span className={styles.locName}><MapPin size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> {loc.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultancy Values */}
        <section className="section-py">
           <div className="container">
              <div className={styles.grid}>
                 <div className={styles.card} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                    <ShieldCheck size={40} color="var(--gold)" />
                    <h3 className={styles.cardTitle} style={{ marginTop: '1rem' }}>Verified Sources</h3>
                    <p className={styles.cardText}>We only consult for villas that meet our strict quality and hygiene standards.</p>
                 </div>
                 <div className={styles.card} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                    <Sparkles size={40} color="var(--gold)" />
                    <h3 className={styles.cardTitle} style={{ marginTop: '1rem' }}>Bespoke Curation</h3>
                    <p className={styles.cardText}>No more scrolling through hundreds of listings. We send you the top 3 matches.</p>
                 </div>
                 <div className={styles.card} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                    <Star size={40} color="var(--gold)" />
                    <h3 className={styles.cardTitle} style={{ marginTop: '1rem' }}>Best Price Guarantee</h3>
                    <p className={styles.cardText}>Our partnerships with booking sources ensure you get exclusive consultant rates.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Enquiry Form Integration */}
        <div className={styles.formSection}>
          <Enquiry />
        </div>

        {/* Direct WhatsApp CTA */}
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.ctaBox}
          >
            <h2>Need Free Advice?</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Our senior travel consultants are ready to help you plan your perfect weekend.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919594541724" className="btn btn-primary" style={{ background: '#25D366', color: 'white', border: 'none' }}>
                <MessageSquare size={20} /> Chat on WhatsApp
              </a>
              <a href="tel:+919594541724" className="btn btn-outline" style={{ color: 'var(--sapphire)', borderColor: 'var(--sapphire)' }}>
                <Phone size={20} /> Call a Consultant
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
