'use client';
import { useState } from 'react';
import styles from './Enquiry.module.css';

export default function Enquiry() {
  const [travelDate, setTravelDate] = useState('');
  const [dateType, setDateType] = useState('text');

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const parseDateFromDisplay = (displayStr: string) => {
    const parts = displayStr.split('-');
    if (parts.length === 3 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return displayStr;
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.bgOverlay} />
      <div className={`container ${styles.inner}`}>
        {/* Text Side */}
        <div className={styles.textSide}>
          <span className="section-label" style={{ color: 'var(--gold)' }}>✦ Let&apos;s Plan Together</span>
          <h2 className="section-title section-title-light">
            Your Next Journey<br />Starts Here.
          </h2>
          <p className="section-sub section-sub-light">
            Tell us where you want to go — we&apos;ll handle everything else.
            Personalized. Premium. Perfectly planned.
          </p>

          <div className={styles.contactInfo}>
            <a href="tel:+919594541724" className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <strong>Call / WhatsApp</strong>
                <span>+91 95945 41724</span>
              </div>
            </a>
            <a href="mailto:info@saiholiday.in" className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <div>
                <strong>Email Us</strong>
                <span>info@saiholiday.in</span>
              </div>
            </a>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <strong>Office Hours</strong>
                <span>Mon–Sat, 9 AM – 8 PM</span>
              </div>
            </div>
          </div>

          <div className={styles.ctaBtns}>
            <a
              href="https://wa.me/919594541724?text=Hi Sai Holiday, I want to enquire about a travel package."
              target="_blank" rel="noreferrer"
              className="btn btn-primary"
            >
              💬 WhatsApp Now
            </a>
            <a href="tel:+919594541724" className="btn btn-outline">📞 Call Our Experts</a>
          </div>
        </div>

        {/* Form Side */}
        <div className={`glass ${styles.formCard}`}>
          <h3 className={styles.formTitle}>Get a Free Quote</h3>
          <form className={styles.form} onSubmit={async (e) => {
            e.preventDefault();
            const btn = e.currentTarget.querySelector('button');
            if (btn) btn.disabled = true;
            
            const formData = {
              name: (document.getElementById('eq-name') as HTMLInputElement).value,
              phone: (document.getElementById('eq-phone') as HTMLInputElement).value,
              email: (document.getElementById('eq-email') as HTMLInputElement).value,
              destination: (document.getElementById('eq-dest') as HTMLSelectElement).value,
              travel_date: travelDate,
              pax: (document.getElementById('eq-pax') as HTMLInputElement).value,
              message: (document.getElementById('eq-msg') as HTMLTextAreaElement).value,
              type: 'general'
            };

            try {
              const res = await fetch('/php-backend/api/enquiry.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });
              if (res.ok) {
                alert('✅ Enquiry sent successfully! Our experts will contact you soon.');
                setTravelDate('');
                (e.target as HTMLFormElement).reset();
              }
            } catch (err) {
              console.error(err);
            } finally {
              if (btn) btn.disabled = false;
            }
          }}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="eq-name">Full Name *</label>
                <input id="eq-name" type="text" placeholder="Your full name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="eq-phone">WhatsApp Number *</label>
                <input id="eq-phone" type="tel" placeholder="+91 95945 41724" required />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="eq-email">Email Address</label>
              <input id="eq-email" type="email" placeholder="you@example.com" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="eq-dest">Destination Interest *</label>
                <select id="eq-dest" required>
                  <option value="">Select…</option>
                  <option>Domestic Escape</option>
                  <option>International Trip</option>
                  <option>Honeymoon Package</option>
                  <option>Family Tour</option>
                  <option>Group Travel</option>
                  <option>Flight / Train Booking</option>
                  <option>Villa / Staycation</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="eq-date">Travel Date (approx)</label>
                <input
                  id="eq-date"
                  type={dateType}
                  placeholder="dd-mm-yyyy"
                  onFocus={() => setDateType('date')}
                  onBlur={() => setDateType('text')}
                  value={dateType === 'date' ? travelDate : formatDateForDisplay(travelDate)}
                  onChange={e => {
                    const val = e.target.value;
                    setTravelDate(dateType === 'date' ? val : parseDateFromDisplay(val));
                  }}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="eq-pax">Number of Travelers</label>
              <input id="eq-pax" type="number" min="1" defaultValue="1" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="eq-msg">Message / Special Requests</label>
              <textarea id="eq-msg" rows={3} placeholder="Tell us about your dream trip…"></textarea>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              Send My Enquiry →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
