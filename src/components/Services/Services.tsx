'use client';
import styles from './Services.module.css';

const services = [
  { icon: '✈️', title: 'Flight Booking', desc: 'Domestic & international flights at best available fares. We search, you save.' },
  { icon: '🚂', title: 'Railway (IRCTC)', desc: 'Confirmed train tickets through our IRCTC-authorized agents. No queue, no stress.' },
  { icon: '🏨', title: 'Hotel Reservations', desc: 'Curated stays for every budget — from boutique retreats to 5-star luxury.' },
  { icon: '🛂', title: 'Visa Assistance', desc: 'Hassle-free visa processing for 40+ countries with expert documentation support.' },
  { icon: '🗺️', title: 'Customized Packages', desc: 'Your ideal itinerary built around your schedule, preferences & budget.' },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">✦ Our Services</span>
          <h2 className="section-title">Everything You Need,<br />All in One Place</h2>
          <p className="section-sub">
            From booking your first flight to planning your entire journey — Sai Holiday handles it all.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.title} className={styles.card}>
              <span className={styles.icon}>{s.icon}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <button className={`btn btn-ghost-gold ${styles.cta}`}>Learn More →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
