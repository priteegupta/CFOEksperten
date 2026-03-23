import { Playfair_Display, Inter } from 'next/font/google';
import '../globals.css';
import { Navbar } from '@/components/navbar';
import Footer from "@/components/footer";
import { ScrollToTop } from '@/components/scroll-to-top';
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: "CFO Eksperten",
  description:
    "Expert CFO services tailored to scale your modern enterprise. Offering operating budgets, liquidity management, and virtual CFO solutions.",
  icons: {
    icon: "/logo_provided.png",
  },
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as Locale);

    return (
      <html
        lang={lang}
        className={`${playfair.variable} ${inter.variable} scroll-smooth`}
        suppressHydrationWarning // This MUST be here to ignore extension interference
      >
        <body
          className={`antialiased min-h-screen flex flex-col ${inter.className}`}
          suppressHydrationWarning // Add it here too just to be safe
        >
          <ScrollToTop />
          {/* We will render Navbar as a Client Component that takes the locale and dictionary */}
          <Navbar lang={lang as Locale} dictionary={dictionary.navbar} />
          <main className="flex-1">{children}</main>

          {/* Explicitly set z-index and width for the Footer */}
          <div className="relative z-30 w-full mt-auto">
            <Footer dictionary={dictionary} lang={lang} />
          </div>
        </body>
      </html>
    );
}
