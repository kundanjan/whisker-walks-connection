
import Layout from '../components/layout/Layout';
import ServicesList from '../components/services/ServicesList';
import { useEffect, useState } from 'react';
import { fetchServices } from '@/services/api';
import { Service } from '@/types';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

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
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p>Loading services...</p>
        </div>
      ) : (
        <ServicesList services={services} />
      )}
    </Layout>
  );
};

export default ServicesPage;
