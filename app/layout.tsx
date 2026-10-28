import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import './container.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif-luxury',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Saltmere Living | Modern Hostel & Co-Living Residence ERP',
  description:
    'Modern residential living with fully-furnished rooms, 24/7 quiet co-working pods, high-speed Wi-Fi 6, chef-curated nutritious dining, and biometric security for residents.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${cormorant.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-linen text-primary font-roboto antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}

