import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import PartnerStats from '@/components/partner-stats';
import ChallengeSection from '@/components/challenge-section';
import AudienceSection from '@/components/audience-section';
import AboutSection from "@/components/about-section";
import ServicesSection from '@/components/services-section';
import BookingSection from "@/components/booking-section";
import FAQSection from "@/components/FAQSection";
import PackagesSection from "@/components/packages-section";
import CustomerStories from "@/components/customer-stories";
import { HeroContent } from '@/components/hero-content';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dictionary = await getDictionary(resolvedParams.lang as Locale);

  return (
    <div className="flex flex-col bg-brand-light">
      <HeroContent dictionary={dictionary} lang={resolvedParams.lang} />

      {/* Partner Logos & Stats */}
      <PartnerStats dictionary={dictionary} />

      {/* The Challenge Section */}
      <ChallengeSection dictionary={dictionary} />

      {/* For Whom / Audience Section */}
      <AudienceSection dictionary={dictionary} />

      {/* Services Section (Moved Above Team per request) */}
      <ServicesSection dictionary={dictionary} />

      {/* About Section  */}
      <AboutSection dictionary={dictionary} />

      {/* Customer Stories Section */}
      <CustomerStories dictionary={dictionary} />

      {/* PACKAGES SECTION  */}
      <PackagesSection dictionary={dictionary} lang={resolvedParams.lang} />

      {/* Booking Section */}
      <BookingSection dictionary={dictionary} />

      {/* ADD THE FAQ HERE */}
      <FAQSection dictionary={dictionary} lang={resolvedParams.lang} />
    </div>
  );
}
