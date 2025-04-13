
import { Search, Calendar, Star } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10 text-brand-teal" />,
    title: "Find the Right Provider",
    description: "Browse verified providers by location, service, and reviews. Filter by specific needs and availability.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-brand-blue" />,
    title: "Book Your Service",
    description: "Select the service, date, and time that works for you. Provide details about your pet's needs.",
  },
  {
    icon: <Star className="h-10 w-10 text-brand-yellow" />,
    title: "Get Quality Care",
    description: "Receive professional pet care with real-time updates. Leave a review after your service is completed.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting quality pet care is simple with our easy-to-use platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-gray-50 rounded-full p-6 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
