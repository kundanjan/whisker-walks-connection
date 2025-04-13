
import Layout from '../components/layout/Layout';
import ServicesList from '../components/services/ServicesList';
import { services } from '@/data/mockData';

const ServicesPage = () => {
  return (
    <Layout>
      <div className="bg-brand-teal/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Pet Care Services</h1>
          <p className="text-lg text-gray-600">
            Browse our wide range of professional pet care services
          </p>
        </div>
      </div>
      <ServicesList services={services} />
    </Layout>
  );
};

export default ServicesPage;
