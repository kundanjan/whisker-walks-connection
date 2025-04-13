
import { Link } from "react-router-dom";
import { Walking, Scissors, Home, Dumbbell, HeartPulse } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, color }) => {
  return (
    <Link to={link} className="service-card group">
      <div className={`p-4 rounded-full ${color} inline-block mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <span className="text-brand-teal font-medium group-hover:underline mt-auto">Learn more &rarr;</span>
    </Link>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Walking className="h-6 w-6 text-white" />,
      title: "Dog Walking",
      description: "Regular walks to keep your dog healthy and happy, with GPS tracking and real-time updates.",
      link: "/services/walking",
      color: "bg-brand-teal",
    },
    {
      icon: <Scissors className="h-6 w-6 text-white" />,
      title: "Pet Grooming",
      description: "Professional grooming services tailored to your pet's breed, size, and specific needs.",
      link: "/services/grooming",
      color: "bg-brand-blue",
    },
    {
      icon: <Home className="h-6 w-6 text-white" />,
      title: "Pet Boarding",
      description: "Safe, comfortable overnight care in providers' homes with regular updates and photos.",
      link: "/services/boarding",
      color: "bg-brand-green",
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-white" />,
      title: "Pet Training",
      description: "Personalized training sessions from basic obedience to advanced tricks and behavior correction.",
      link: "/services/training",
      color: "bg-brand-purple",
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-white" />,
      title: "Veterinary Care",
      description: "Connect with trusted veterinarians for routine check-ups or specialized care.",
      link: "/services/veterinary",
      color: "bg-brand-orange",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of pet care services to meet all your furry friend's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
