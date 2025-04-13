
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeaturedProviders from '../components/home/FeaturedProviders';
import CtaSection from '../components/home/CtaSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FeaturedProviders />
      <CtaSection />
    </Layout>
  );
};

export default Index;
