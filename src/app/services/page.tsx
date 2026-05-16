'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ServiceModal from '@/components/ServiceModal/ServiceModal';
import styles from './services.module.css';

const services = [
  {
    icon: '✈️',
    title: 'Flight Booking',
    desc: 'Domestic & international flights at the best available fares. We compare 500+ airlines so you never overpay.',
    features: ['Domestic & International routes', 'Best fare guarantee', 'Free date change assistance', '24/7 booking support'],
  },
  {
    icon: '🚂',
    title: 'Railway (IRCTC)',
    desc: 'Confirmed train tickets through our IRCTC-authorized agents. Skip the queue, skip the stress.',
    features: ['Tatkal & premium tatkal booking', 'All classes — SL to 1A', 'PNR status tracking', 'Group booking available'],
  },
  {
    icon: '🏨',
    title: 'Hotel Reservations',
    desc: 'Curated stays for every budget — from boutique retreats to 5-star luxury properties worldwide.',
    features: ['Budget to luxury options', 'Best rate guarantee', 'Free cancellation on select stays', 'Verified guest reviews'],
  },
  {
    icon: '🛂',
    title: 'Visa Assistance',
    desc: 'Hassle-free visa processing for 40+ countries with expert documentation support and fast turnaround.',
    features: ['40+ countries supported', 'Document checklist & review', 'Fast-track processing', 'Embassy appointment booking'],
  },
  {
    icon: '🗺️',
    title: 'Customized Packages',
    desc: 'Your ideal itinerary built around your schedule, preferences & budget. Tell us your dream — we make it real.',
    features: ['Fully personalized trips', 'Flexible duration & budget', 'Private transfers included', 'Dedicated trip coordinator'],
  },
  {
    icon: '🚗',
    title: 'Car & Transfer',
    desc: 'Airport pickups, intercity transfers, and self-drive rentals — reliable transport wherever you go.',
    features: ['Airport pickup & drop', 'Intercity transfers', 'Self-drive & chauffeur options', 'Clean, sanitized vehicles'],
  },
];

const whyChooseUs = [
  { icon: '🏆', title: '14+ Years Experience', desc: 'Trusted by 10,000+ happy travelers since 2010.' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'We match or beat any comparable quote you find.' },
  { icon: '📞', title: '24/7 Expert Support', desc: 'Our travel experts are available round the clock.' },
  { icon: '🤝', title: 'Personalized Service', desc: 'Every trip is custom-built to your preferences.' },
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('');

  const openEnquiry = (title: string) => {
    setActiveService(title);
    setModalOpen(true);
  };

  const WA = '919594541724';
  const handleWhatsApp = (title: string) => {
    const msg = encodeURIComponent(
      `Hi Sai Holiday! 🙏\n\nI'd like to enquire about your *${title}* service.\n\nPlease share details and pricing.`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <span className="section-label" style={{ color: 'var(--gold)' }}>✦ Our Services</span>
            <h1 className={styles.heroTitle}>
              Everything You Need,<br />All in One Place
            </h1>
            <p className={styles.heroSub}>
              From booking your first flight to planning your entire journey —
              Sai Holiday handles it all with expertise and care.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="section-label">✦ What We Offer</span>
              <h2 className="section-title">Our Premium Travel Services</h2>
              <p className="section-sub" style={{ marginInline: 'auto' }}>
                Each service is backed by our 14+ years of industry expertise and a commitment to making your travel seamless.
              </p>
            </div>

            <div className={styles.grid}>
              {services.map((s) => (
                <div key={s.title} className={styles.card}>
                  <span className={styles.cardIcon}>{s.icon}</span>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.desc}</p>
                  <ul className={styles.cardFeatures}>
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className={styles.cardActions}>
                    <button
                      className="btn btn-ghost-gold"
                      style={{ fontSize: '0.82rem' }}
                      onClick={() => openEnquiry(s.title)}
                    >
                      Enquire Now
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.82rem' }}
                      onClick={() => handleWhatsApp(s.title)}
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whySection}>
          <div className="container">
            <div style={{ textAlign: 'center' }}>
              <span className="section-label">✦ Why Sai Holiday</span>
              <h2 className="section-title">The Sai Holiday Advantage</h2>
            </div>
            <div className={styles.whyGrid}>
              {whyChooseUs.map((item) => (
                <div key={item.title} className={styles.whyCard}>
                  <span className={styles.whyIcon}>{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div>
                <h2>Need a Custom Service?</h2>
                <p>Talk to our experts — we&apos;ll tailor the perfect solution for your travel needs.</p>
              </div>
              <div className={styles.ctaBtns}>
                <a
                  href="https://wa.me/919594541724?text=Hi, I need help with a travel service"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  💬 WhatsApp Us
                </a>
                <a href="tel:+919594541724" className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.4)' }}>
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={activeService}
      />
    </>
  );
}
