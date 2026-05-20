'use client';
import { motion } from 'framer-motion';
import { Home, Waves, Trees, MapPin, Phone, MessageSquare, ShieldCheck, Sparkles, Star, Mountain, Umbrella, Building } from 'lucide-react';
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
  },
  {
    icon: <Mountain size={32} />,
    title: 'Hill Station Villas',
    text: 'Wake up to misty mountains and cool breezes in our handpicked hilltop properties across India.'
  },
  {
    icon: <Umbrella size={32} />,
    title: 'Beach & Coastal Stays',
    text: 'Sun-kissed villas and beachfront properties along Goa, Alibaug, and the Konkan coast.'
  },
  {
    icon: <Building size={32} />,
    title: 'Corporate Retreats',
    text: 'Offsite-ready properties with conference spaces, team activities, and catered dining options.'
  }
];

const locations = [
  { name: 'Mahabaleshwar', image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lonavala', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Alibaug', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Karjat', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Khandala', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80' },
  { name: 'Igatpuri', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
  { name: 'Panchgani', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
];

const values = [
  { icon: <ShieldCheck size={36} color="var(--gold)" />, title: 'Verified Sources', text: 'We only consult for villas that meet our strict quality and hygiene standards.' },
  { icon: <Sparkles size={36} color="var(--gold)" />, title: 'Bespoke Curation', text: 'No more scrolling through hundreds of listings. We send you the top 3 matches.' },
  { icon: <Star size={36} color="var(--gold)" />, title: 'Best Price Guarantee', text: 'Our partnerships with booking sources ensure you get exclusive consultant rates.' },
  { icon: <Phone size={36} color="var(--gold)" />, title: 'Dedicated Consultant', text: 'A single point of contact for your entire stay — from booking to checkout.' },
];

export default function ConsultancyPage() {
  const sendLocationEnquiry = (locationName: string) => {
    const WA = '919594541724';
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'm interested in booking a villa staycation in *${locationName}*.\n\nPlease share the best available options and details.`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label"
              style={{ color: 'var(--gold)' }}
            >
              ✦ Expert Travel Consultancy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.heroTitle}
            >
              Villa & Staycation<br />Consultancy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={styles.heroSub}
            >
              We don&apos;t just book; we curate. Tell us your vibe, and our senior consultants
              will find the perfect villa from the best booking sources for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}
            >
              <a
                href="https://wa.me/919594541724?text=Hi, I need villa consultancy for a staycation."
                target="_blank" rel="noreferrer"
                className="btn btn-primary"
              >
                💬 Get Free Consultation
              </a>
              <a href="tel:+919594541724" className="btn btn-outline">
                📞 Call a Consultant
              </a>
            </motion.div>
          </div>
        </section>

        {/* Locations Section */}
        <section className={styles.locations}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label" style={{ color: 'var(--gold)' }}>✦ Our Expertise</span>
              <h2 className="section-title section-title-light">Locations We Specialize In</h2>
              <p className="section-sub section-sub-light" style={{ marginInline: 'auto' }}>
                We have deep partnerships and verified properties across these popular destinations.
              </p>
            </div>

            <div className={styles.locGrid}>
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={styles.locCard}
                  onClick={() => sendLocationEnquiry(loc.name)}
                >
                  <img src={loc.image} alt={loc.name} className={styles.locImg} />
                  <div className={styles.locOverlay}>
                    <span className={styles.locName}><MapPin size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {loc.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className={styles.servicesSection}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">✦ What We Offer</span>
              <h2 className="section-title">Our Consultancy Services</h2>
              <p className="section-sub" style={{ marginInline: 'auto' }}>
                From luxury pool villas to peaceful nature retreats — we curate the perfect stay for every occasion.
              </p>
            </div>
            <div className={styles.grid}>
              {consultancyServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={styles.card}
                >
                  <div className={styles.cardIcon}>{service.icon}</div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardText}>{service.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.valuesSection}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">✦ Why Choose Us</span>
              <h2 className="section-title">The Sai Holiday Advantage</h2>
            </div>
            <div className={styles.valuesGrid}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={styles.valueCard}
                >
                  {v.icon}
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <Enquiry />

        {/* WhatsApp CTA */}
        <section style={{ paddingBlock: '4rem' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.ctaBox}
            >
              <h2>Need Free Advice?</h2>
              <p style={{ marginBottom: '2rem', fontSize: '1.15rem' }}>Our senior travel consultants are ready to help you plan your perfect weekend getaway.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://wa.me/919594541724?text=Hi, I need villa consultancy." className="btn btn-primary" style={{ background: '#25D366', color: 'white', border: 'none' }}>
                  <MessageSquare size={20} /> Chat on WhatsApp
                </a>
                <a href="tel:+919594541724" className="btn btn-outline" style={{ color: 'var(--sapphire)', borderColor: 'var(--sapphire)' }}>
                  <Phone size={20} /> Call a Consultant
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
