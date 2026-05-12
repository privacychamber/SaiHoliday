'use client';
import styles from './Testimonials.module.css';

const reviews = [
  {
    name: 'Priya & Rahul Sharma',
    origin: 'Mumbai',
    package: 'Kashmir Package',
    avatar: '👩',
    rating: 5,
    text: 'Sai Holiday made our Kashmir trip absolutely magical. From booking to the last day, everything was flawlessly organized. The houseboat stay on Dal Lake was breathtaking!',
  },
  {
    name: 'Arjun & Divya Mehta',
    origin: 'Pune',
    package: 'Maldives Honeymoon',
    avatar: '💑',
    rating: 5,
    text: 'Our Maldives honeymoon was pure magic. Sai Holiday handled every detail — flights, overwater villa, transfers. We didn\'t worry about a single thing. Worth every rupee!',
  },
  {
    name: 'Sneha Patel',
    origin: 'Ahmedabad',
    package: 'Bali International Package',
    avatar: '🧳',
    rating: 5,
    text: 'Best travel experience of my life! The Bali package itinerary was perfectly crafted. Every day felt like a different world. Already planning my next trip with them.',
  },
  {
    name: 'Karan & Family',
    origin: 'Delhi',
    package: 'Rajasthan Family Tour',
    avatar: '👨‍👩‍👧‍👦',
    rating: 5,
    text: 'Took our family of 6 to Rajasthan — it was seamless! The kids loved the desert camp in Jaisalmer, and the forts were breathtaking. A family memory for life.',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">✦ Traveler Stories</span>
          <h2 className="section-title">Stories That Inspire Us</h2>
          <p className="section-sub">
            Real experiences from real travelers — this is why we do what we do.
          </p>
        </div>

        <div className={styles.grid}>
          {reviews.map((r) => (
            <div key={r.name} className={styles.card}>
              <div className={styles.rating}>{'★'.repeat(r.rating)}</div>
              <p className={styles.text}>&ldquo;{r.text}&rdquo;</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{r.avatar}</span>
                <div>
                  <strong className={styles.name}>{r.name}</strong>
                  <span className={styles.meta}>{r.origin} · {r.package}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews badge */}
        <div className={styles.googleBadge}>
          <span>⭐ 4.9 / 5</span>
          <span className={styles.sep}>·</span>
          <span>As seen on</span>
          <strong>Google Reviews</strong>
          <span className={styles.count}>(200+ reviews)</span>
        </div>
      </div>
    </section>
  );
}
