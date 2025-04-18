import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchProviders, fetchUsers } from '@/services/api';
import { Provider, User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const ProvidersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: providers = [], isLoading: isLoadingProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: fetchProviders,
  });

  if (providers.length > 0) {
    console.log('Providers fetched successfully:', providers.length);
  }

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (users.length > 0) {
    console.log('Users fetched successfully:', users.length);
  }

  const providersWithUsers = providers.map(provider => {
    const user = users.find(u => u.id === provider.userId);
    return { ...provider, user };
  }).filter(p => p.user);

  const filteredProviders = providersWithUsers.filter(provider => {
    const searchMatch = searchTerm === '' || 
      provider.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      provider.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const serviceMatch = !serviceFilter || serviceFilter === 'all' || provider.specialties.some(s => 
      s.toLowerCase().includes(serviceFilter.toLowerCase())
    );
    
    return searchMatch && serviceMatch;
  });

  const serviceTypes = [
    { label: 'All Services', value: null },
    { label: 'Dog Walking', value: 'dog walking' },
    { label: 'Pet Grooming', value: 'grooming' },
    { label: 'Pet Training', value: 'training' },
    { label: 'Veterinary', value: 'veterinary' },
  ];

  const isLoading = isLoadingProviders || isLoadingUsers;

  return (
    <>
      <div className="bg-brand-blue/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Pet Care Providers</h1>
          <p className="text-lg text-gray-600">
            Find certified and trusted pet care professionals in your area
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search providers by name or specialty..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map(type => (
                <Button
                  key={type.label}
                  variant={serviceFilter === type.value ? "default" : "outline"}
                  onClick={() => setServiceFilter(type.value)}
                  className={serviceFilter === type.value ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <p>Loading providers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.length > 0 ? (
              filteredProviders.map(provider => (
                <Link key={provider.id} to={`/providers/${provider.id}`}>
                  <div className="provider-card h-full hover:border-brand-blue">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={provider.user?.avatar || '/placeholder.svg'}
                        alt={provider.user?.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{provider.user?.name}</h3>
                          {provider.verified && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{provider.rating}</span>
                          <span className="text-gray-500 ml-1">({provider.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>{provider.serviceArea}</span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">{provider.bio}</p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No providers match your criteria</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
                <Button variant="outline" onClick={() => { setSearchTerm(''); setServiceFilter(null); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProvidersPage;
