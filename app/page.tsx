import React, { Suspense } from 'react';
import { HomeBanner } from '../components/HomeBanner';
import { WelcomeSection } from '../components/WelcomeSection';
import { RoomsSection } from '../components/RoomsSection';
import { ExperiencesSection } from '../components/ExperiencesSection';
import { DiningSection } from '../components/DiningSection';
import { OffersSection } from '../components/OffersSection';
import { Footer } from '../components/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-linen text-primary font-roboto selection:bg-primary selection:text-white">
      {/* 1. Header & Residential Hero Banner */}
      <HomeBanner />

      {/* 2. Welcome Editorial Section (Furnished Beds, Wi-Fi 6, 4-Meal Dining, Biometrics) */}
      <WelcomeSection />

      {/* 3. Rooms & Living Spaces Swiper Carousel Section */}
      <Suspense fallback={null}>
        <RoomsSection />
      </Suspense>

      {/* 4. Resident Life & Amenities (Co-Working Pods, Residents Lounge, Biometric Safety) */}
      <ExperiencesSection />

      {/* 5. Dining & Nutrition (Nutritious 4-meal daily dining & weekly menu) */}
      <DiningSection />

      {/* 6. Residency & Stay Plans */}
      <OffersSection />

      {/* 7. Footer (Residence Bulletins, Resident ERP links, Residence Desk) */}
      <Footer />
    </main>
  );
}
