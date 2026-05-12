'use client';
import { useEffect, useRef } from 'react';
import styles from './Stats.module.css';

const stats = [
  { icon: '🌍', value: 100, suffix: '+', label: 'Destinations Covered' },
  { icon: '⭐', value: 10000, suffix: '+', label: 'Happy Travelers' },
  { icon: '🎯', value: 15, suffix: '+', label: 'Years of Experience' },
  { icon: '🕐', value: 24, suffix: '/7', label: 'Dedicated Trip Support' },
];

function animateCount(el: HTMLElement, target: number, duration = 1600) {
  let start = 0;
  const step = (timestamp: number, startTime: number) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
  };
  requestAnimationFrame((t) => step(t, t));
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          sectionRef.current?.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            animateCount(el, Number(el.dataset.count));
          });
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <div key={s.label} className={styles.card}>
            <span className={styles.icon}>{s.icon}</span>
            <div className={styles.value}>
              <span data-count={s.value}>0</span>
              <span className={styles.suffix}>{s.suffix}</span>
            </div>
            <p className={styles.label}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
