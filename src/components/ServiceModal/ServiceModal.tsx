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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.type = service.toLowerCase().replace(/[\s()]/g, '_');

    try {
      const res = await fetch('/php-backend/api/enquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
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
              <input type="date" name="travel_date" required />
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
              <input type="date" name="travel_date" required />
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
              <input type="date" name="travel_date" required />
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
              <label>Approx Budget (Total)</label>
              <input name="budget" placeholder="e.g. ₹50,000" />
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
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required />
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
