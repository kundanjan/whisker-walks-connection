
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 bg-brand-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Provide the Best Care for Your Pet?</h2>
            <p className="text-white/90 text-lg mb-6">
              Join thousands of pet owners who trust WhiskerWalks for reliable, professional pet care services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-teal hover:bg-gray-100">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end">
            <img 
              src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Happy dog with owner" 
              className="rounded-lg shadow-xl w-4/5 h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
