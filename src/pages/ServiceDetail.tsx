
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from '@/components/ui/dialog';
import { services, providers, users } from '@/data/mockData';
import { Clock, MapPin, Star, CheckCircle, Calendar as CalendarIcon, User, DollarSign } from 'lucide-react';
import NotFound from './NotFound';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState(1);
  
  if (!service) {
    return <NotFound />;
  }
  
  const provider = providers.find(p => p.id === service.providerId);
  const user = provider ? users.find(u => u.id === provider.userId) : undefined;
  
  if (!provider || !user) {
    return <NotFound />;
  }
  
  const handleBookNow = () => {
    setBookingModalOpen(true);
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // In a real app, this would submit the booking
      setBookingModalOpen(false);
      setStep(1);
      // Show success message
    }
  };
  
  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumbs */}
            <nav className="mb-4">
              <ol className="flex text-sm">
                <li className="text-gray-500">
                  <Link to="/" className="hover:text-brand-teal">Home</Link>
                </li>
                <li className="mx-2 text-gray-500">/</li>
                <li className="text-gray-500">
                  <Link to="/services" className="hover:text-brand-teal">Services</Link>
                </li>
                <li className="mx-2 text-gray-500">/</li>
                <li className="text-brand-teal font-medium">{service.title}</li>
              </ol>
            </nav>
            
            {/* Service Image */}
            {service.imageUrl && (
              <div className="rounded-lg overflow-hidden h-[300px] mb-6">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            {/* Service Title & Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> {service.duration} minutes
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {provider.serviceArea}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> ${service.price}
                </span>
              </div>
            </div>
            
            {/* Service Description */}
            <div className="prose max-w-none mb-8">
              <h2>Service Description</h2>
              <p>{service.description}</p>
              
              <h2>What to Expect</h2>
              <p>
                This service is provided by professional pet care specialists who have undergone 
                thorough background checks and training verification. Our {service.type} services 
                are designed to provide the best care for your pet while giving you peace of mind.
              </p>
              
              <h2>Requirements</h2>
              <ul>
                <li>Your pet must have up-to-date vaccinations</li>
                <li>Please have a leash and collar available for dog walking services</li>
                <li>It helps to provide information about any special needs or behaviors</li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Provider Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Provider Information</CardTitle>
                <CardDescription>Learn more about the service provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img 
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.name}</h3>
                      {provider.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{provider.rating} ({provider.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-1">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty, index) => (
                      <span key={index} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link to={`/providers/${provider.id}`} className="text-brand-teal hover:underline text-sm">
                    View full profile
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Book this Service</CardTitle>
                <CardDescription>
                  ${service.price} • {service.duration} minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Select a date and time that works for you to book this service.
                </p>
                <Button className="w-full" onClick={handleBookNow}>
                  Book Now
                </Button>
              </CardContent>
              <CardFooter className="border-t text-xs text-gray-500 pt-4">
                <p>You won't be charged until the service is confirmed.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {service.title}</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule your pet care service.
            </DialogDescription>
          </DialogHeader>
          
          {/* Step 1: Choose Date */}
          {step === 1 && (
            <>
              <div className="py-4">
                <h3 className="font-medium mb-2">Select a Date:</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    const today = new Date();
                    return date < today || date > new Date(today.setMonth(today.getMonth() + 3));
                  }}
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setBookingModalOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="button" onClick={handleNextStep}>Next: Select Time</Button>
              </DialogFooter>
            </>
          )}
          
          {/* Step 2: Choose Time */}
          {step === 2 && (
            <>
              <div className="py-4">
                <h3 className="font-medium mb-2">Selected Date: {date?.toLocaleDateString()}</h3>
                <h3 className="font-medium mb-2">Select a Time:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => (
                    <Button key={time} variant="outline" className="w-full" onClick={() => {}}>
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button type="button" onClick={handleBackStep} variant="outline">
                  Back
                </Button>
                <Button type="button" onClick={handleNextStep}>Next: Pet Details</Button>
              </DialogFooter>
            </>
          )}
          
          {/* Step 3: Pet Details */}
          {step === 3 && (
            <>
              <div className="py-4">
                <h3 className="font-medium mb-2">Service Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{date?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span>10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span>{service.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span>{user.name}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${service.price}</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button type="button" onClick={handleBackStep} variant="outline">
                  Back
                </Button>
                <Button type="button" onClick={handleNextStep}>Confirm Booking</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ServiceDetail;
