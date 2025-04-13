import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ServiceCard from './ServiceCard';
import { ServiceType, Service } from '@/types';
import { fetchServices } from '@/services/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServicesListProps {
  services?: Service[];
}

const ServiceTypeOptions: { value: ServiceType; label: string }[] = [
  { value: 'walking', label: 'Dog Walking' },
  { value: 'grooming', label: 'Grooming' },
  { value: 'boarding', label: 'Boarding' },
  { value: 'training', label: 'Training' },
  { value: 'veterinary', label: 'Veterinary' },
];

const ServicesList: React.FC<ServicesListProps> = ({ services: propServices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ServiceType | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 180]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(!propServices);

  useEffect(() => {
    if (propServices) {
      setServices(propServices);
      return;
    }

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
  }, [propServices]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === '' || service.type === selectedType;
      
      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
      
      const matchesDuration = service.duration >= durationRange[0] && service.duration <= durationRange[1];
      
      return matchesSearch && matchesType && matchesPrice && matchesDuration;
    });
  }, [services, searchTerm, selectedType, priceRange, durationRange]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-4 sticky top-20">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {ServiceTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration: {durationRange[0]} - {durationRange[1]} minutes
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={durationRange[0]}
                    onChange={(e) => setDurationRange([parseInt(e.target.value), durationRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={durationRange[1]}
                    onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedType('');
                  setPriceRange([0, 200]);
                  setDurationRange([0, 180]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal size={18} />
              Filters
            </Button>
          </div>
          
          {showMobileFilters && (
            <Accordion type="single" collapsible className="md:hidden mb-6 bg-white rounded-lg border">
              <AccordionItem value="filters">
                <AccordionTrigger className="px-4">Filters</AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Services</SelectItem>
                          {ServiceTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Duration: {durationRange[0]} - {durationRange[1]} minutes
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="180"
                          value={durationRange[0]}
                          onChange={(e) => setDurationRange([parseInt(e.target.value), durationRange[1]])}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="180"
                          value={durationRange[1]}
                          onChange={(e) => setDurationRange([durationRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedType('');
                        setPriceRange([0, 200]);
                        setDurationRange([0, 180]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          <h2 className="text-lg font-semibold mb-4">
            {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Available
          </h2>
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No services match your criteria</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
