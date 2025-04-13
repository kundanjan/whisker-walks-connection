
import { Link } from 'react-router-dom';
import { providers } from '@/data/mockData';
import { users } from '@/data/mockData';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedProviders = () => {
  // Get first 3 providers
  const featuredProviders = providers.slice(0, 3);
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Providers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet some of our top-rated pet care professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProviders.map((provider) => {
            const user = users.find(u => u.id === provider.userId);
            if (!user) return null;
            
            return (
              <div key={provider.id} className="provider-card">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400 mr-1">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-gray-700">{provider.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({provider.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  {provider.verified && (
                    <span className="flex items-center text-xs font-medium text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-4">{provider.bio}</p>
                
                <div className="mb-4">
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
                
                <Link to={`/providers/${provider.id}`} className="mt-auto">
                  <Button className="w-full" variant="outline">View Profile</Button>
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/providers">
            <Button variant="default" className="bg-brand-blue hover:bg-brand-blue/90">
              View All Providers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
