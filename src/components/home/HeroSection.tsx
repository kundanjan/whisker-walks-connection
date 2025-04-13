
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PawPrint, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Quality Pet Care <span className="text-brand-teal">When You Need It</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Connect with trusted, verified pet care professionals for walking, grooming, boarding, training, and veterinary services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                  Find Pet Services
                </Button>
              </Link>
              <Link to="/providers/apply">
                <Button size="lg" variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal/10">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -right-4 -bottom-8 w-72 h-72 bg-brand-yellow/20 rounded-full"></div>
            <div className="absolute -left-4 -top-8 w-64 h-64 bg-brand-blue/20 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Dog walker with dogs" 
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
