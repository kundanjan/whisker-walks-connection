import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { providers, users, services, reviews } from '@/data/mockData';
import { 
  MapPin, 
  Star, 
  Check, 
  CheckCircle,
  Mail,
  Phone,
  Clock,
  Calendar as CalendarIcon
} from 'lucide-react';
import ServiceCard from '@/components/services/ServiceCard';
import NotFound from './NotFound';

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find(p => p.id === id);
  
  if (!provider) {
    return <NotFound />;
  }
  
  const user = users.find(u => u.id === provider.userId);
  
  if (!user) {
    return <NotFound />;
  }
  
  // Get services offered by this provider
  const providerServices = services.filter(s => s.providerId === provider.id);
  
  // Get reviews for this provider
  const providerReviews = reviews.filter(r => r.providerId === provider.id);
  
  // Function to format availability hours
  const formatAvailability = (hours: {start: string, end: string}[]) => {
    if (hours.length === 0) return 'Not available';
    return hours.map(h => `${h.start} - ${h.end}`).join(', ');
  };
  
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="md:w-1/4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-auto rounded-lg shadow-sm mb-4"
            />
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button className="flex-1 bg-brand-blue hover:bg-brand-blue/90">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              {provider.verified && (
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  Verified Provider
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-gray-500 ml-1">({provider.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{provider.serviceArea}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-700">{provider.bio}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Specialties</h2>
                <ul className="space-y-2">
                  {provider.specialties.map((specialty, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Certifications</h2>
                <ul className="space-y-2">
                  {provider.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-brand-teal mr-2" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Provider Tabs */}
        <Tabs defaultValue="services" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="p-4 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
            {providerServices.length === 0 ? (
              <p className="text-gray-500">This provider hasn't added any services yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providerServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="availability" className="p-4 bg-white rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Monday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.monday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Tuesday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.tuesday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Wednesday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.wednesday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Thursday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.thursday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Friday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.friday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Saturday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.saturday)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Sunday</h3>
                    <p className="text-gray-600">
                      {formatAvailability(provider.availabilityHours.sunday)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-gray-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  All times are in your local timezone. Book a service to request an appointment during these hours.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Client Reviews</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-gray-500 ml-1">({provider.reviewCount} reviews)</span>
              </div>
            </div>
            
            {providerReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet for this provider.</p>
            ) : (
              <div className="space-y-6">
                {providerReviews.map(review => {
                  const reviewer = users.find(u => u.id === review.userId);
                  if (!reviewer) return null;
                  
                  return (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <img 
                          src={reviewer.avatar} 
                          alt={reviewer.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{reviewer.name}</h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm ml-2">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProviderDetail;
