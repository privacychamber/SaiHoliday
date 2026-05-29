'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, ArrowLeftRight, Calendar, Users, Briefcase, Search, CheckCircle2, Loader2, MapPin, Phone } from 'lucide-react';
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
  const [isSearching, setIsSearching] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [depType, setDepType] = useState('text');
  const [retType, setRetType] = useState('text');

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

  const totalPax = adults + children + infants;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    const phoneInput = (e.currentTarget as any).querySelector('input[type="tel"]');
    const phone = phoneInput?.value || '';

    const data = {
      name: 'Flight Enquiry',
      phone: phone,
      destination: `${from} to ${to}`,
      travel_date: departure,
      type: 'flight',
      message: `Trip: ${tripType}, Class: ${cabinClass}, Pax: ${totalPax}${returnDate ? `, Return: ${returnDate}` : ''}`
    };

    try {
      // Attempt to save to database (optional/upcoming backend)
      await fetch('/php-backend/api/enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(err => {
        console.warn('Database save failed/skipped:', err);
      });

      // Format details for WhatsApp redirection
      const msg = `Hi Sai Holiday! 🙏\n\nI want to enquire about a flight booking:\n` +
        `• *From*: ${from}\n` +
        `• *To*: ${to}\n` +
        `• *Trip Type*: ${tripType}\n` +
        `• *Departure Date*: ${formatDateForDisplay(departure) || 'N/A'}\n` +
        `${returnDate ? `• *Return Date*: ${formatDateForDisplay(returnDate)}\n` : ''}` +
        `• *Cabin Class*: ${cabinClass}\n` +
        `• *Number of Passengers*: ${totalPax}\n` +
        `• *WhatsApp Number*: ${phone}`;
      
      const whatsappUrl = `https://wa.me/919594541724?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      alert('✅ Flight enquiry sent successfully! Opening WhatsApp to send details...');

      // Reset form state to clear inputs
      setFrom('');
      setTo('');
      setDeparture('');
      setReturnDate('');
      setAdults(1);
      setChildren(0);
      setInfants(0);
      (e.target as HTMLFormElement).reset();

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Flight enquiry failed', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`${styles.widget} ${compact ? styles.compact : ''} glass`}>
      {/* Trip type tabs */}
      <div className={styles.tabs}>
        {(['one-way', 'round-trip', 'multi-city'] as TripType[]).map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${tripType === t ? styles.activeTab : ''}`}
            onClick={() => setTripType(t)}
            type="button"
          >
            {t === 'one-way' && <Plane size={16} style={{ transform: 'rotate(45deg)' }} />}
            {t === 'round-trip' && <ArrowLeftRight size={16} />}
            {t === 'multi-city' && <Search size={16} />}
            <span style={{ marginLeft: '8px', textTransform: 'capitalize' }}>
              {t.replace('-', ' ')}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        {/* Route row */}
        <div className={styles.routeRow}>
          <div className={styles.field}>
            <label><MapPin size={14} /> From</label>
            <div className={styles.inputWrapper}>
              <input
                list="airports-from"
                value={from}
                onChange={e => setFrom(e.target.value)}
                placeholder="Origin City"
                required
              />
            </div>
            <datalist id="airports-from">
              {popularAirports.map(a => <option key={a} value={a} />)}
            </datalist>
          </div>

          <button type="button" className={styles.swapBtn} onClick={handleSwap} title="Swap Locations">
            <ArrowLeftRight size={18} />
          </button>

          <div className={styles.field}>
            <label><MapPin size={14} /> To</label>
            <div className={styles.inputWrapper}>
              <input
                list="airports-to"
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="Destination City"
                required
              />
            </div>
            <datalist id="airports-to">
              {popularAirports.map(a => <option key={a} value={a} />)}
            </datalist>
          </div>

          <div className={styles.field}>
            <label><Calendar size={14} /> Departure</label>
            <input
              type={depType}
              placeholder="dd-mm-yyyy"
              onFocus={() => setDepType('date')}
              onBlur={() => setDepType('text')}
              value={depType === 'date' ? departure : formatDateForDisplay(departure)}
              onChange={e => {
                const val = e.target.value;
                setDeparture(depType === 'date' ? val : parseDateFromDisplay(val));
              }}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {tripType === 'round-trip' && (
            <div className={styles.field}>
              <label><Calendar size={14} /> Return</label>
              <input
                type={retType}
                placeholder="dd-mm-yyyy"
                onFocus={() => setRetType('date')}
                onBlur={() => setRetType('text')}
                value={retType === 'date' ? returnDate : formatDateForDisplay(returnDate)}
                onChange={e => {
                  const val = e.target.value;
                  setReturnDate(retType === 'date' ? val : parseDateFromDisplay(val));
                }}
                min={departure || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          )}
        </div>

        {/* Options Row */}
        <div className={styles.optionsRow}>
          <div className={styles.field} style={{ position: 'relative' }}>
            <label><Users size={14} /> Passengers</label>
            <button
              type="button"
              className={styles.paxBtn}
              onClick={() => setShowPassengers(!showPassengers)}
            >
              {totalPax} Passenger{totalPax !== 1 ? 's' : ''}
            </button>
            <AnimatePresence>
              {showPassengers && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={styles.paxDropdown}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.field}>
            <label><Briefcase size={14} /> Cabin Class</label>
            <select value={cabinClass} onChange={e => setCabinClass(e.target.value as CabinClass)}>
              {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label><Phone size={14} /> WhatsApp for Alerts *</label>
            <input type="tel" placeholder="+91 95945 41724" required />
          </div>

          <button 
            type="submit" 
            disabled={isSearching}
            className={`btn btn-primary ${styles.searchBtn} ${isSearching ? styles.loading : ''}`}
          >
            {isSearching ? (
              <><Loader2 size={18} className={styles.spin} /> Finding Best Fares...</>
            ) : submitted ? (
              <><CheckCircle2 size={18} /> Enquiry Sent!</>
            ) : (
              <><Search size={18} /> Search Flights</>
            )}
          </button>
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.successMsg}
            >
              <CheckCircle2 size={16} /> 
              <span>We&apos;ve received your request! Our flight expert will call you shortly with the best available fares.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className={styles.note}>
        ✦ Best Fares Guaranteed &nbsp;·&nbsp; 24/7 Expert Support &nbsp;·&nbsp; Instant Confirmation
      </p>
    </div>
  );
}
