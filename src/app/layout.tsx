import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sai Holiday — Premium Travel Experiences | saiholiday.in',
  description:
    'Discover handcrafted domestic & international travel packages. Kashmir, Bali, Maldives, Dubai & more. Honeymoon specials, adventure tours, and luxury retreats — all curated by Sai Holiday.',
  keywords:
    'Sai Holiday, travel packages, Kashmir tour, Bali package, Maldives honeymoon, luxury travel India, international tours, domestic packages',
  openGraph: {
    title: 'Sai Holiday — Your World, Your Way',
    description: 'Premium travel experiences curated for every kind of traveler.',
    url: 'https://saiholiday.in',
    siteName: 'Sai Holiday',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
