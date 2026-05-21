'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './payment.module.css';

const paymentMethods = [
  { icon: '📱', label: 'UPI / GPay / PhonePe / Paytm', desc: 'Scan the QR code with any UPI app' },
  { icon: '🏦', label: 'Net Banking / IMPS / NEFT', desc: 'Use account details below for bank transfer' },
  { icon: '💬', label: 'WhatsApp Confirmation', desc: 'Share your payment screenshot on WhatsApp' },
];

const bankDetails = [
  { label: 'Account Name', value: 'Jyoti Dogra' },
  { label: 'UPI ID', value: '9594541724@ptyes' },
  { label: 'Mobile', value: '+91 95945 41724' },
];

export default function PaymentPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Hero Banner ── */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroInner}`}>
            <span className="section-label">✦ Secure Payments</span>
            <h1 className={styles.heroTitle}>Pay for Your Dream Trip</h1>
            <p className={styles.heroSub}>
              Fast, safe and easy — scan the QR code and pay instantly via UPI
            </p>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className={`section-py ${styles.content}`}>
          <div className="container">
            <div className={styles.grid}>

              {/* ── QR Column ── */}
              <div className={styles.qrCard}>
                <div className={styles.qrGlow} />

                <div className={styles.qrHeader}>
                  <span className={styles.qrBadge}>✦ Scan &amp; Pay Instantly</span>
                  <h2 className={styles.qrTitle}>UPI Payment QR</h2>
                  <p className={styles.qrSub}>Open any UPI app and scan to pay</p>
                </div>

                {/* Actual QR Code image */}
                <div className={styles.qrFrame}>
                  <div className={styles.qrCorner} data-pos="tl" />
                  <div className={styles.qrCorner} data-pos="tr" />
                  <div className={styles.qrCorner} data-pos="bl" />
                  <div className={styles.qrCorner} data-pos="br" />
                  <Image
                    src="/images/payment-qr.png"
                    alt="Sai Holiday UPI QR Code — Scan to Pay — Jyoti Dogra"
                    width={320}
                    height={400}
                    className={styles.qrImage}
                    priority
                  />
                </div>

                {/* UPI ID row */}
                <div className={styles.upiRow}>
                  <span className={styles.upiId}>9594541724@ptyes</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy('9594541724@ptyes', 'upi')}
                    title="Copy UPI ID"
                  >
                    {copied === 'upi' ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>

                {/* App icons */}
                <div className={styles.appRow}>
                  <span className={styles.appLabel}>Works with</span>
                  <div className={styles.appIcons}>
                    {['G Pay', 'PhonePe', 'Paytm', 'BHIM', 'Any UPI'].map((app) => (
                      <span key={app} className={styles.appChip}>{app}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Info Column ── */}
              <div className={styles.infoCol}>

                {/* Payment Methods */}
                <div className={styles.methodsCard}>
                  <h2 className={styles.cardTitle}>How to Pay</h2>
                  <div className={styles.methods}>
                    {paymentMethods.map((m) => (
                      <div key={m.label} className={styles.methodItem}>
                        <span className={styles.methodIcon}>{m.icon}</span>
                        <div>
                          <strong className={styles.methodLabel}>{m.label}</strong>
                          <p className={styles.methodDesc}>{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className={styles.bankCard}>
                  <h2 className={styles.cardTitle}>Payment Details</h2>
                  <div className={styles.bankList}>
                    {bankDetails.map((d) => (
                      <div key={d.label} className={styles.bankRow}>
                        <span className={styles.bankLabel}>{d.label}</span>
                        <div className={styles.bankValueWrap}>
                          <span className={styles.bankValue}>{d.value}</span>
                          <button
                            className={styles.copyMini}
                            onClick={() => handleCopy(d.value, d.label)}
                            title={`Copy ${d.label}`}
                          >
                            {copied === d.label ? '✅' : '📋'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className={styles.stepsCard}>
                  <h2 className={styles.cardTitle}>Steps to Pay</h2>
                  <ol className={styles.steps}>
                    <li className={styles.stepItem}>
                      <span className={styles.stepNum}>1</span>
                      <div>
                        <strong>Open any UPI app</strong>
                        <p>Google Pay, PhonePe, Paytm, BHIM or any UPI app</p>
                      </div>
                    </li>
                    <li className={styles.stepItem}>
                      <span className={styles.stepNum}>2</span>
                      <div>
                        <strong>Scan the QR code</strong>
                        <p>Point your camera at the QR code shown on the left</p>
                      </div>
                    </li>
                    <li className={styles.stepItem}>
                      <span className={styles.stepNum}>3</span>
                      <div>
                        <strong>Enter the amount &amp; pay</strong>
                        <p>Enter the exact booking amount and confirm payment</p>
                      </div>
                    </li>
                    <li className={styles.stepItem}>
                      <span className={styles.stepNum}>4</span>
                      <div>
                        <strong>Share screenshot on WhatsApp</strong>
                        <p>Send payment confirmation to +91 95945 41724</p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* After Payment */}
                <div className={styles.afterCard}>
                  <span className={styles.afterIcon}>✅</span>
                  <div>
                    <h3 className={styles.afterTitle}>After Payment</h3>
                    <p className={styles.afterDesc}>
                      Please share your payment screenshot on WhatsApp so we can confirm your booking instantly. You can also email us at{' '}
                      <a href="mailto:info@saiholiday.in" className={styles.afterLink}>
                        info@saiholiday.in
                      </a>.
                    </p>
                    <div className={styles.afterBtns}>
                      <a
                        href="https://wa.me/919594541724?text=Hi Sai Holiday, I have completed the payment. Please find my screenshot attached."
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                      >
                        💬 Share on WhatsApp
                      </a>
                      <a href="mailto:info@saiholiday.in" className="btn btn-ghost-gold">
                        ✉ Send Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Reassurance strip ── */}
            <div className={styles.reassurance}>
              {[
                { icon: '🔒', text: '100% Secure Payments' },
                { icon: '⚡', text: 'Instant Confirmation' },
                { icon: '🤝', text: 'Trusted by 1000+ Travellers' },
                { icon: '📞', text: '24/7 Support Available' },
              ].map((r) => (
                <div key={r.text} className={styles.reassureItem}>
                  <span>{r.icon}</span>
                  <span>{r.text}</span>
                </div>
              ))}
            </div>

            {/* ── Help CTA ── */}
            <div className={styles.helpBanner}>
              <p>Need help with your payment? We&apos;re just a call away.</p>
              <div className={styles.helpBtns}>
                <a href="tel:+919594541724" className="btn btn-primary">📞 Call Us Now</a>
                <Link href="/" className={`btn ${styles.backBtn}`}>
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
