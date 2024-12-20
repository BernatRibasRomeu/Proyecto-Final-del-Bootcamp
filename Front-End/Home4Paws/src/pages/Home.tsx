import React from 'react';
import HelpSection from '../components/Home/HelpSection';
import AdoptSection from '../components/Home/AdoptSection';
import CrowdfundingSection from '../components/Home/CrowdfundingSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sección de ayuda */}
      <HelpSection />

      {/* Sección Adoptar o Introducir animal */}
      <AdoptSection />

      {/* Sección de Crowdfunding */}
      <CrowdfundingSection />
    </div>
  );
};

export default Home;