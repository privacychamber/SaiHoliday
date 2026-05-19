'use client';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FlightSearch from '@/components/FlightSearch/FlightSearch';
import styles from './flight.module.css';

const features = [
  { icon: '💰', title: 'Best Fare Guarantee', desc: 'We compare 500+ airlines to get you the lowest price, every time.' },
  { icon: '📞', title: '24/7 Expert Support', desc: 'Our travel experts are available round the clock to assist you.' },
  { icon: '🛡️', title: 'Secure Booking', desc: 'Your data and payment are 100% protected with us.' },
  { icon: '🔄', title: 'Free Date Changes', desc: 'Flexible bookings with easy date change assistance.' },
  { icon: '🎯', title: 'No Hidden Fees', desc: 'What you see is what you pay. Fully transparent pricing.' },
  { icon: '✈️', title: '500+ Airlines', desc: 'Domestic & international airlines including budget & full-service carriers.' },
];

const popularRoutes = [
  { from: 'Delhi', to: 'Mumbai', code: 'DEL→BOM' },
  { from: 'Mumbai', to: 'Goa', code: 'BOM→GOI' },
  { from: 'Delhi', to: 'Bengaluru', code: 'DEL→BLR' },
  { from: 'Mumbai', to: 'Dubai', code: 'BOM→DXB' },
  { from: 'Delhi', to: 'Singapore', code: 'DEL→SIN' },
  { from: 'Bengaluru', to: 'Bangkok', code: 'BLR→BKK' },
];

export default function FlightPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <span className="section-label" style={{ color: 'var(--gold)' }}>✦ Flight Booking</span>
            <h1 className={styles.heroTitle}>
              Domestic & International<br />Flights at Best Fares
            </h1>
            <p className={styles.heroSub}>
              Book flights with Sai Holiday — compare 500+ airlines, get expert support,
              and fly smarter for less.
            </p>
          </div>
        </section>

        {/* Search Widget */}
        <section className={styles.searchSection}>
          <div className="container">
            <FlightSearch />
          </div>
        </section>

        {/* Popular Routes */}
        <section className={styles.routesSection}>
          <div className="container">
            <div className={styles.routesHeader}>
              <span className="section-label">✦ Popular Routes</span>
              <h2 className="section-title">Trending Flight Routes</h2>
              <p className="section-sub">Frequently searched routes with our best negotiated fares.</p>
            </div>
            <div className={styles.routesGrid}>
              {popularRoutes.map((r) => (
                <div key={r.code} className={styles.routeCard}>
                  <div className={styles.routePath}>
                    <span className={styles.city}>{r.from}</span>
                    <span className={styles.arrow}>✈</span>
                    <span className={styles.city}>{r.to}</span>
                  </div>
                  <span className={styles.routeCode}>{r.code}</span>
                  <div className={styles.routePrice}>
                    <span>Enquire for best fares</span>
                  </div>
                  <button className="btn btn-ghost-gold" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Book with Us */}
        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.routesHeader}>
              <span className="section-label">✦ Why Choose Us</span>
              <h2 className="section-title">The Sai Holiday Advantage</h2>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div>
                <h2>Need Help Booking Your Flight?</h2>
                <p>Call our travel experts — we&apos;ll find you the best deal in minutes.</p>
              </div>
              <div className={styles.ctaBtns}>
                <a href="https://wa.me/919594541724?text=Hi, I need help booking a flight" target="_blank" rel="noreferrer" className="btn btn-primary">
                  💬 WhatsApp Us
                </a>
                <a href="tel:+919594541724" className="btn btn-outline">📞 Call Now</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
