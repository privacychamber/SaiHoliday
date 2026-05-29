'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Send } from 'lucide-react';
import styles from './ServiceModal.module.css';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.type = service.toLowerCase().replace(/[\s()]/g, '_');
    data.travel_date = travelDate;

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
      let msgDetails = `• *Name*: ${data.name || 'N/A'}\n` +
                       `• *WhatsApp Number*: ${data.phone || 'N/A'}\n`;
      
      if (service === 'Railway (IRCTC)') {
        msgDetails += `• *Service*: Railway Booking\n` +
                      `• *From - To Station*: ${data.route || 'N/A'}\n` +
                      `• *Travel Date*: ${formatDateForDisplay(travelDate) || 'N/A'}\n` +
                      `• *Class*: ${data.class || 'N/A'}\n` +
                      `• *Number of Passengers*: ${data.pax || '1'}`;
      } else if (service === 'Hotel Reservations') {
        msgDetails += `• *Service*: Hotel Reservations\n` +
                      `• *Destination / Hotel*: ${data.destination || 'N/A'}\n` +
                      `• *Check-in Date*: ${formatDateForDisplay(travelDate) || 'N/A'}\n` +
                      `• *Number of Nights*: ${data.nights || '1'}\n` +
                      `• *Room Category*: ${data.budget || 'Standard / Deluxe'}`;
      } else if (service === 'Visa Assistance') {
        msgDetails += `• *Service*: Visa Assistance\n` +
                      `• *Country for Visa*: ${data.destination || 'N/A'}\n` +
                      `• *Tentative Travel Date*: ${formatDateForDisplay(travelDate) || 'N/A'}\n` +
                      `• *Number of Applicants*: ${data.pax || '1'}\n` +
                      `• *Visa Type*: ${data.visa_type || 'Tourist / Visit'}`;
      } else {
        msgDetails += `• *Service*: ${service}\n` +
                      `• *Desired Destination*: ${data.destination || 'N/A'}\n` +
                      `• *Travel Month / Date*: ${data.travel_date || travelDate || 'N/A'}\n` +
                      `• *Number of Travelers*: ${data.pax || '1'}`;
      }
      
      if (data.message) {
        msgDetails += `\n• *Additional Notes*: ${data.message}`;
      }

      const msg = `Hi Sai Holiday! 🙏\n\nI want to enquire about *${service}*:\n${msgDetails}`;
      const whatsappUrl = `https://wa.me/919594541724?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setTravelDate('');
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (service) {
      case 'Railway (IRCTC)':
        return (
          <>
            <div className={styles.field}>
              <label>From - To Station</label>
              <input name="route" placeholder="e.g. Mumbai to Delhi" required />
            </div>
            <div className={styles.field}>
              <label>Travel Date</label>
              <input
                type={dateType}
                name="travel_date"
                placeholder="dd-mm-yyyy"
                onFocus={() => setDateType('date')}
                onBlur={() => setDateType('text')}
                value={dateType === 'date' ? travelDate : formatDateForDisplay(travelDate)}
                onChange={e => {
                  const val = e.target.value;
                  setTravelDate(dateType === 'date' ? val : parseDateFromDisplay(val));
                }}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Class</label>
              <select name="class">
                <option>Sleeper (SL)</option>
                <option>3rd AC (3A)</option>
                <option>2nd AC (2A)</option>
                <option>1st AC (1A)</option>
                <option>CC / 2S</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Number of Passengers</label>
              <input type="number" name="pax" min="1" defaultValue="1" required />
            </div>
          </>
        );
      case 'Hotel Reservations':
        return (
          <>
            <div className={styles.field}>
              <label>Destination / Hotel Name</label>
              <input name="destination" placeholder="e.g. Goa, Taj Exotica" required />
            </div>
            <div className={styles.field}>
              <label>Check-in Date</label>
              <input
                type={dateType}
                name="travel_date"
                placeholder="dd-mm-yyyy"
                onFocus={() => setDateType('date')}
                onBlur={() => setDateType('text')}
                value={dateType === 'date' ? travelDate : formatDateForDisplay(travelDate)}
                onChange={e => {
                  const val = e.target.value;
                  setTravelDate(dateType === 'date' ? val : parseDateFromDisplay(val));
                }}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Number of Nights</label>
              <input type="number" name="nights" min="1" defaultValue="1" required />
            </div>
            <div className={styles.field}>
              <label>Room Category Preference</label>
              <select name="budget">
                <option>Standard / Deluxe</option>
                <option>Premium / Suite</option>
                <option>Luxury / Villa</option>
              </select>
            </div>
          </>
        );
      case 'Visa Assistance':
        return (
          <>
            <div className={styles.field}>
              <label>Country for Visa</label>
              <input name="destination" placeholder="e.g. Schengen, UAE, Thailand" required />
            </div>
            <div className={styles.field}>
              <label>Tentative Travel Date</label>
              <input
                type={dateType}
                name="travel_date"
                placeholder="dd-mm-yyyy"
                onFocus={() => setDateType('date')}
                onBlur={() => setDateType('text')}
                value={dateType === 'date' ? travelDate : formatDateForDisplay(travelDate)}
                onChange={e => {
                  const val = e.target.value;
                  setTravelDate(dateType === 'date' ? val : parseDateFromDisplay(val));
                }}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Number of Applicants</label>
              <input type="number" name="pax" min="1" defaultValue="1" required />
            </div>
            <div className={styles.field}>
              <label>Visa Type</label>
              <select name="visa_type">
                <option>Tourist / Visit</option>
                <option>Business</option>
                <option>Student</option>
              </select>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className={styles.field}>
              <label>Desired Destination</label>
              <input name="destination" placeholder="Where do you want to go?" required />
            </div>
            <div className={styles.field}>
              <label>Travel Month / Date</label>
              <input name="travel_date" placeholder="e.g. October 2025" required />
            </div>
            <div className={styles.field}>
              <label>Number of Travelers</label>
              <input name="pax" type="number" min="1" defaultValue="1" required />
            </div>
          </>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={styles.content}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
            
            <div className={styles.header}>
              <h2 className={styles.title}>{service} Enquiry</h2>
              <p className={styles.desc}>Fill in the details below and our experts will get back to you.</p>
            </div>

            <div className={styles.body}>
              {isSuccess ? (
                <div className={styles.success}>
                  <CheckCircle2 size={60} color="var(--gold)" />
                  <h3>Enquiry Received!</h3>
                  <p>Our team will contact you within 30 minutes.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input name="name" placeholder="Enter your name" required />
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number (WhatsApp)</label>
                    <input type="tel" name="phone" placeholder="+91 95945 41724" required />
                  </div>

                  {renderForm()}

                  <div className={styles.field}>
                    <label>Additional Notes</label>
                    <textarea name="message" rows={3} placeholder="Any special requests?"></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.submitBtn}`}>
                    {isSubmitting ? <><Loader2 className="spin" size={18} /> Submitting...</> : <><Send size={18} /> Send Enquiry</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
