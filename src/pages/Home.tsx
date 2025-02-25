import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Coffee, Wifi, MapPin, School as Pool, ChevronRight, Navigation } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import logo from "../assets/logo.png";
// Interfaces
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fromLeft?: boolean;
}

interface TestimonialProps {
  text: string;
  author: string;
  role: string;
  delay: number;
}

interface AttractionCardProps {
  title: string;
  description: string;
  distance: string;
  mapUrl: string;
  fromLeft?: boolean;
  url: string;
}

interface CardProps extends React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}> {}

// Styles
const styles = {
  animations: `
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
};

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles.animations;
document.head.appendChild(styleSheet);

// Components
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', style, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

const Feature: React.FC<FeatureProps> = ({ icon, title, description, fromLeft = true }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`group p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 opacity-0 transform ${
        inView
          ? 'opacity-100 translate-x-0'
          : fromLeft
          ? '-translate-x-10'
          : 'translate-x-10'
      }`}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">
          <div className="p-2 sm:p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonial: React.FC<TestimonialProps> = ({ text, author, role, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card
      ref={ref}
      className={`overflow-hidden transition-all duration-1000 opacity-0 transform ${
        inView ? 'opacity-100 translate-x-0'
          : '-translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-sm sm:text-base text-gray-600 italic mb-4 sm:mb-6">{text}</p>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold text-xs sm:text-sm">
              {author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-gray-900">{author}</p>
            <p className="text-xs sm:text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AttractionCard: React.FC<AttractionCardProps> = ({ title, description, distance, mapUrl, fromLeft = true, url }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-1000 opacity-0 transform cursor-pointer ${
        inView
          ? 'opacity-100 translate-x-0'
          : fromLeft
          ? '-translate-x-10'
          : 'translate-x-10'
      }`}
    >
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={mapUrl}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${title}`}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-indigo-600 text-xs sm:text-sm">
            <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
            <span>{distance}</span>
          </div>
          <div className="text-indigo-600 flex items-center text-xs sm:text-sm">
            <span className="mr-1">Get directions</span>
            <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 opacity-0 animate-[fadeInLeft_1s_ease-out_forwards]">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight animate-[fadeInUp_1s_ease-out_0.2s_forwards] opacity-0">
                  Experience Authentic
                  <span className="text-gray-900"> Kerala</span> Hospitality
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 animate-[fadeInUp_1s_ease-out_0.4s_forwards] opacity-0">
                  Nestled in the serene landscapes of Kerala, Othara Lodge offers a perfect blend of comfort and authenticity at budget-friendly prices.
                </p>
              </div>
              
              <div className="space-y-2 sm:space-y-4 text-sm sm:text-base text-gray-600">
                {[
                  'Minutes away from the stunning Aruvickal Waterfalls',
                  'Traditional Kerala architecture with modern amenities',
                  'Perfect for both leisure and business travelers',
                  'Tailored to suit all age groups and preferences'
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2 opacity-0"
                    style={{
                      animation: `fadeInLeft 1s ease-out ${0.6 + index * 0.2}s forwards`
                    }}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 hover:scale-105 transform text-sm sm:text-base"
                >
                  Book Your Stay
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors duration-300 text-sm sm:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative mt-8 lg:mt-0 lg:ml-8 opacity-0 animate-[fadeInRight_1s_ease-out_0.5s_forwards]">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
              <img
                src={logo}
                alt="Othara Lodge"
                className="relative w-full max-w-xs sm:max-w-md mx-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Why Choose Othara Lodge?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Experience the perfect blend of comfort, convenience, and authentic Kerala hospitality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Feature
              icon={<Star className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Budget-Friendly"
              description="Quality accommodation at competitive prices without compromising on comfort"
              fromLeft={true}
            />
            <Feature
              icon={<Coffee className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="24/7 Service"
              description="Round-the-clock assistance ensuring a comfortable and worry-free stay"
              fromLeft={true}
            />
            <Feature
              icon={<Wifi className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Free Wi-Fi"
              description="Stay connected with high-speed internet throughout your stay"
              fromLeft={false}
            />
            <Feature
              icon={<Pool className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Local Experience"
              description="Immerse yourself in authentic Kerala culture and hospitality"
              fromLeft={false}
            />
          </div>
        </div>
      </div>

      {/* Nearby Attractions */}
      <div className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Explore Nearby Attractions</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Discover the natural beauty and cultural heritage around Othara Lodge</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AttractionCard
              title="Aruvickal Waterfalls"
              description="Experience the serene beauty of Aruvickal Waterfalls, just a short walk from our lodge."
              distance="35 min walk"
              mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.601167318423!2d76.7588833!3d9.3968668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0639396f9ff74d%3A0xbcb110d66c1067f7!2sAruvickal%20Waterfalls!5e0!3m2!1sen!2sin!4v1708600000000"
              fromLeft={true}
              url="https://www.google.com/maps/dir/Aruvickal+Waterfalls,+Angadi,+Kerala/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/@9.3912549,76.7637172,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3b0639396f9ff74d:0xbcb110d66c1067f7!2m2!1d76.7614582!2d9.3968668!1m5!1m1!1s0x3b063f46e6c8dd39:0x2e215de637b7d46!2m2!1d76.7835627!2d9.383295!3e0?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
            />
            <AttractionCard
              title="Plankamon"
              description="Discover the natural beauty of Plankamon, a perfect spot for nature lovers and photographers."
              distance="Nearby attraction"
              mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.898037504638!2d76.78127067499454!3d9.36894508830745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0629d8bfbbaaab%3A0x90c0c3ef82f87219!2sPlankamon!5e0!3m2!1sen!2sin!4v1709561245749!5m2!1sen!2sin"
              fromLeft={false}
              url="https://www.google.com/maps/dir/Plankamon,+Kerala/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/@9.380003,76.7539149,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3b063ead426e8d4d:0x791c56efd7a1d163!2m2!1d76.7448556!2d9.3810054!1m5!1m1!1s0x3b063f46e6c8dd39:0x2e215de637b7d46!2m2!1d76.7835627!2d9.383295!3e0?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">What Our Guests Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Don't just take our word for it - hear from our satisfied guests</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Testimonial
              text="Great value for money! The location is perfect for exploring local attractions, and the staff was incredibly helpful throughout our stay."
              author="Rahul Kumar"
              role="Tourist"
              delay={0}
            />
            <Testimonial
              text="വൃത്തിയുള്ള മുറികൾ, സൗഹൃദ സേവനം, താങ്ങാനാവുന്ന നിരക്കുകൾ. കേരളത്തിലെ ഒരു വാരാന്ത്യ അവധിക്ക് അനുയോജ്യമായ തിരഞ്ഞെടുപ്പ്. തീർച്ചയായും മടങ്ങിവരും!"
              author="Priya Nair"
              role="Local Visitor"
              delay={200}
            />
            <Testimonial
              text="The proximity to Aruvickal Waterfalls made our stay even more special. The authentic Kerala experience was unforgettable!"
              author="John Thomas"
              role="Nature Enthusiast"
              delay={400}
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 sm:py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2 sm:mb-4">Ready to Experience Kerala?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">Book your stay now and create unforgettable memories</p>
            <Link
              to="/booking"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300 hover:scale-105 transform text-sm sm:text-base"
            >
              Book Your Stay
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
