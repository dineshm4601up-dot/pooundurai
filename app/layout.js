import { Mukta_Malar } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import { site } from '@/lib/site';
import './globals.css';

const muktaMalar = Mukta_Malar({
  subsets: ['tamil', 'latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-mukta-malar',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avalpoondurai-periyakandiamman.org';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.fullTitle,
    template: `%s - ${site.name}`,
  },
  description:
    'ஸ்ரீ பெரியகாண்டியம்மன் கோவில், அவல்பூந்துறை, ஈரோடு - வரலாறு, பூஜை நேரங்கள், திருவிழாக்கள், நிர்வாகம் மற்றும் புகைப்படங்கள்.',
  openGraph: {
    title: site.fullTitle,
    description: 'ஸ்ரீ பெரியகாண்டியம்மன் கோவில், அவல்பூந்துறை, ஈரோடு அதிகாரப்பூர்வ இணையதளம்.',
    locale: 'ta_IN',
    type: 'website',
    images: ['/assets/temple-2.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ta" className={muktaMalar.variable}>
      <body>
        <Header />
        <Marquee />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
