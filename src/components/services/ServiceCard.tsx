
import { Link } from 'react-router-dom';
import { Service } from '@/types';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="service-card">
      {service.imageUrl && (
        <div className="mb-4 h-48 overflow-hidden rounded-md">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <div className="text-lg font-bold text-brand-teal">${service.price}</div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <span>{service.duration} min</span>
        <span className="mx-2">•</span>
        <span className="capitalize">{service.type}</span>
      </div>

      <p className="text-gray-700 mb-4 flex-grow">{service.description}</p>

      <div className="mt-auto">
        <Link to={`/services/${service.id}`}>
          <Button className="w-full">Book Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
