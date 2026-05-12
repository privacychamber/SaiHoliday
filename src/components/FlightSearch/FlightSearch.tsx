'use client';
import { useState } from 'react';
import styles from './FlightSearch.module.css';

type TripType = 'one-way' | 'round-trip' | 'multi-city';
type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';

const popularAirports = [
  'Delhi (DEL)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Chennai (MAA)',
  'Kolkata (CCU)', 'Hyderabad (HYD)', 'Pune (PNQ)', 'Ahmedabad (AMD)',
  'Goa (GOI)', 'Jaipur (JAI)', 'Dubai (DXB)', 'Singapore (SIN)',
  'Bangkok (BKK)', 'London (LHR)', 'Paris (CDG)', 'Bali (DPS)',
];

export default function FlightSearch({ compact = false }: { compact?: boolean }) {
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [showPassengers, setShowPassengers] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPax = adults + children + infants;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this POSTs to /api/flight-leads
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={`${styles.widget} ${compact ? styles.compact : ''}`}>
      {/* Trip type tabs */}
      <div className={styles.tabs}>
        {(['one-way', 'round-trip', 'multi-city'] as TripType[]).map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${tripType === t ? styles.activeTab : ''}`}
            onClick={() => setTripType(t)}
            type="button"
          >
            {t === 'one-way' ? '✈ One Way' : t === 'round-trip' ? '↔ Round Trip' : '⊕ Multi City'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        {/* Route row */}
        <div className={styles.routeRow}>
          <div className={styles.field}>
            <label>From</label>
            <input
              list="airports-from"
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="City or Airport"
              required
            />
            <datalist id="airports-from">
              {popularAirports.map(a => <option key={a} value={a} />)}
            </datalist>
          </div>

          <button type="button" className={styles.swapBtn} onClick={handleSwap} title="Swap">
            ⇄
          </button>

          <div className={styles.field}>
            <label>To</label>
            <input
              list="airports-to"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="City or Airport"
              required
            />
            <datalist id="airports-to">
              {popularAirports.map(a => <option key={a} value={a} />)}
            </datalist>
          </div>

          {/* Dates */}
          <div className={styles.field}>
            <label>Departure</label>
            <input
              type="date"
              value={departure}
              onChange={e => setDeparture(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {tripType === 'round-trip' && (
            <div className={styles.field}>
              <label>Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                min={departure || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          )}
        </div>

        {/* Second row: passengers + class + search */}
        <div className={styles.optionsRow}>
          {/* Passengers dropdown */}
          <div className={styles.field} style={{ position: 'relative' }}>
            <label>Passengers</label>
            <button
              type="button"
              className={styles.paxBtn}
              onClick={() => setShowPassengers(!showPassengers)}
            >
              👤 {totalPax} Passenger{totalPax !== 1 ? 's' : ''}
            </button>
            {showPassengers && (
              <div className={styles.paxDropdown}>
                {[
                  { label: 'Adults', sub: '12+ years', value: adults, setter: setAdults, min: 1 },
                  { label: 'Children', sub: '2–12 years', value: children, setter: setChildren, min: 0 },
                  { label: 'Infants', sub: 'Under 2', value: infants, setter: setInfants, min: 0 },
                ].map(({ label, sub, value, setter, min }) => (
                  <div key={label} className={styles.paxRow}>
                    <div>
                      <strong>{label}</strong>
                      <span>{sub}</span>
                    </div>
                    <div className={styles.counter}>
                      <button type="button" onClick={() => setter(Math.max(min, value - 1))}>−</button>
                      <span>{value}</span>
                      <button type="button" onClick={() => setter(value + 1)}>+</button>
                    </div>
                  </div>
                ))}
                <button type="button" className={styles.donePax} onClick={() => setShowPassengers(false)}>
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Cabin class */}
          <div className={styles.field}>
            <label>Cabin Class</label>
            <select value={cabinClass} onChange={e => setCabinClass(e.target.value as CabinClass)}>
              {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Contact for enquiry */}
          <div className={styles.field}>
            <label>WhatsApp / Phone *</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.searchBtn}`}>
            {submitted ? '✓ Enquiry Sent!' : '🔍 Search Flights'}
          </button>
        </div>

        {submitted && (
          <p className={styles.successMsg}>
            ✅ We received your flight enquiry! Our team will call you within 30 minutes.
          </p>
        )}
      </form>

      <p className={styles.note}>
        ✦ Best fares guaranteed &nbsp;·&nbsp; No hidden charges &nbsp;·&nbsp; Free cancellation advice &nbsp;·&nbsp; 24/7 support
      </p>
    </div>
  );
}
