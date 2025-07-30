import React from 'react';
import CategoriesSection from '../components/sections/CategoriesSection';
import KeepGoingSection from '../components/sections/KeepGoingSection';
import SpecialRequestsSection from '../components/sections/SpecialRequestsSection';
import AffiliatedCommandersSection from '../components/sections/AffiliatedCommandersSection';

export default function MyChallengesPage() {
  return (
    <div className="pb-6">
      <CategoriesSection />
      <KeepGoingSection />
      <SpecialRequestsSection />
      <AffiliatedCommandersSection />
    </div>
  );
}