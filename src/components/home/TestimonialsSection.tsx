
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Dog Owner',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    quote: 'WhiskerWalks has been a lifesaver for me and my busy schedule. The dog walkers are professional, and I love getting photo updates during walks!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Cat Owner',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote: 'Finding reliable cat sitters was always difficult until I discovered WhiskerWalks. Now I can travel with peace of mind knowing my cats are in great hands.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Dog Walker',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'Being a provider on WhiskerWalks has allowed me to turn my passion for animals into a flexible career. The platform makes scheduling and payments seamless.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Dog & Cat Owner',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    quote: 'The quality of care my pets receive through WhiskerWalks is outstanding. The verification process gives me confidence in each provider I book.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-teal/10 to-brand-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from pet owners and service providers who use our platform
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center overflow-hidden">
            <div className="w-full max-w-3xl transition-transform duration-300">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex mb-2">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                      {Array.from({ length: 5 - testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                    </div>
                    <p className="text-lg italic text-gray-600 mb-4">"{testimonials[currentIndex].quote}"</p>
                    <div>
                      <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-brand-teal' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
