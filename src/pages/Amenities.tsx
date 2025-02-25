import React, { useEffect, useRef } from 'react';
import { Wifi, Coffee, Utensils, Car, MapPin, Map, ShoppingBag, Navigation, Bed, LocateIcon, Rotate3DIcon, LocateFixedIcon, BusFront } from 'lucide-react';

const useIntersectionObserver = (options = {}): [React.MutableRefObject<null>, boolean] => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const AnimatedSection: React.FC<{ className?: string; animation?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ children, className = "", animation = "fade-up", style }) => {
  const [ref, isVisible] = useIntersectionObserver() as [React.MutableRefObject<null>, boolean];
  
  return (
    <div 
      ref={ref}
      className={`${className} opacity-0 ${isVisible ? `animate-${animation}` : ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

const Amenities = () => {
  // WhatsApp business phone number - replace with your actual number
  const whatsappNumber = "918431187843"; // Format: country code + number without +
  
  // Function to create WhatsApp booking link
  const createWhatsAppLink = (roomType: string, price: string) => {
    const message = `Hello, I would like to book a ${roomType} at ${price}/night. Please provide availability details.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  const amenities = [
    {
      icon: <Wifi className="h-8 w-8" />,
      title: 'Free Wi-Fi',
      description: 'Stay connected with complimentary high-speed internet'
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Room Service',
      description: 'Convenient in-room services avaiable, just a phone call away'
    },
    {
      icon: <LocateFixedIcon className="h-8 w-8" />,
      title: 'Location',
      description: 'Located near popular restaurants and shopping centers'
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Parking',
      description: 'Parking available for guests outside the premise'
    }
  ];

  const rules = [
    "No pets allowed on the premises",
    "No smoking or drinking on site",
    "Check-in time: 12:00 PM",
    "Check-out time: 11:00 AM",
    "Quiet hours: 10:00 PM - 6:00 AM",
    "Keep your valuables in the provided lockers",
    "Maintain cleanliness in common areas",
    "Follow COVID-19 safety protocols"
  ];

  const rooms = [
    {
      type: "Standard Room",
      price: "₹1,500",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      features: [
        "Single bed",
        "Air conditioning",
        "Private bathroom",
        "TV with cable channels",
        "Work desk",
        "Daily housekeeping"
      ]
    },
    {
      type: "Deluxe Room",
      price: "₹2,000",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      features: [
        "Double bed",
        "Air conditioning",
        "Private bathroom with shower",
        "32-inch flat-screen TV",
        "Mini fridge",
        "Tea/coffee maker",
        "Work desk with chair",
        "Daily housekeeping"
      ]
    },
    {
      type: "Family Suite",
      price: "₹3,000",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      features: [
        "One double bed and one single bed",
        "Air conditioning",
        "Spacious private bathroom",
        "40-inch flat-screen TV",
        "Mini fridge",
        "Tea/coffee maker",
        "Dining area",
        "Balcony with view",
        "Daily housekeeping"
      ]
    }
  ];

  const nearbyPlaces = {
    restaurants: [
      {
        name: "The Happy Dine Restaurant",
        description: "Local dining spot serving Kerala cuisine",
        distance: "0.2 km",
        location: "Pazhavangadi, Mamukku, Ranni",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/The+Happy+Dine+Restaurant,+P.O,+Pazhavangadi,+Mamukku,+Ranni+-+PonthenPuzha+Forest+Road,+Ranni,+Kerala+689673"
      },
      {
        name: "Tandoor House",
        description: "Specializing in North Indian cuisine and barbecue",
        distance: "0.8 km",
        location: "Ranni, Pazhavangadi",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Tandoor+House,+Ranni,+Kerala"
      },
      {
        name: "Shaker spear food court",
        description: "Famous for authentic biryanis",
        distance: "0.5 km",
        location: "Ranni",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Shaker+spear+food+court,+Ranni,+Kerala"
      }
    ],
    attractions: [
      {
        name: "Aruvickal Waterfalls",
        description: "Scenic waterfall perfect for nature lovers",
        distance: "5 km",
        location: "Ranni",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Aruvickal+Waterfalls,+Kerala"
      },
      {
        name: "Perunthenaruvi Waterfalls",
        description: "Popular waterfall and picnic spot",
        distance: "12 km",
        location: "Kerala 689675",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Perunthenaruvi+Waterfalls,+Kerala+689675"
      },
      {
        name: "Naagappara",
        description: "Historic landmark with panoramic views",
        distance: "8 km",
        location: "Kerala 689675",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Naagappara,+Kerala+689675"
      }
    ],
    shopping: [
      {
        name: "Golden Hyper Market",
        description: "Large supermarket with variety of products",
        distance: "0.3 km",
        location: "Ranni, Pazhavangadi",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Golden+Hyper+Market,+Ranni,+Pazhavangadi,+Kerala+689673"
      },
      {
        name: "TRENDS",
        description: "Fashion and lifestyle store",
        distance: "0.4 km",
        location: "Ranni, Pazhavangadi",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/TRENDS,+Ranni,+Pazhavangadi,+Kerala+689673"
      }
    ],
    convenience: [
      {
        name: "Ranni Bus Stand",
        description: "Main transportation hub for local and intercity buses",
        distance: "0.6 km",
        location: "Ranni, Pazhavangadi",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Ranni+Bus+Stand,+Ranni,+Pazhavangadi,+Kerala+689673"
      },
      {
        name: "Petrol Pump",
        description: " Fuel station for vehicles, offering petrol and diesel services.",
        distance: "73 m",
        location: "Ranni, Pazhavangadi",
        mapUrl: "https://www.google.com/maps/dir/Othara+lodge,+SH8,+Ranni,+Pazhavangadi,+Kerala+689673/Bharat+Petroleum,+Petrol+Pump+-K+C+Jacob+&+Sons,+Ranni,+Pazhavangadi,+Kerala+689673"
      }
    ]
  };

  return (
    <div className="pt-16"> {/* Added padding for navbar */}
      {/* Hero Section */}
      <AnimatedSection className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Amenities</h1>
          <p className="mt-4 text-xl text-center">Comfortable and affordable accommodations in Ranni</p>
        </div>
      </AnimatedSection>

      {/* Rooms Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Rooms</h2>
            <p className="mt-4 text-xl text-gray-600">Choose from our comfortable accommodations</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <AnimatedSection
                key={index}
                animation="fade-left"
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{room.type}</h3>
                    <span className="text-lg font-bold text-indigo-600">{room.price}/night</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Bed className="h-4 w-4 mr-2 text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={createWhatsAppLink(room.type, room.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 text-center"
                  >
                    <div className="flex items-center justify-center">
                      {/* WhatsApp Icon (simplified SVG) */}
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Book on WhatsApp
                    </div>
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <AnimatedSection 
              key={index}
              animation="fade-left"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-indigo-600 mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lodge Rules */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-3xl font-bold text-center mb-12">
            Lodge Rules
          </AnimatedSection>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rules.map((rule, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  className="flex items-center space-x-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
                  <p className="text-gray-700">{rule}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Places Nearby */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Places Nearby</h2>
            <p className="text-xl text-gray-600">Explore the best of what Ranni has to offer</p>
          </AnimatedSection>

          {/* Restaurants Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-bold">Restaurants</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.restaurants.map((place, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold mb-2 text-indigo-600">{place.name}</h4>
                  <p className="text-gray-600 mb-3">{place.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-indigo-600 font-medium">{place.distance} from lodge</span>
                  </div>
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Shopping Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-bold">Shopping</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyPlaces.shopping.map((place, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold mb-2 text-indigo-600">{place.name}</h4>
                  <p className="text-gray-600 mb-3">{place.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-indigo-600 font-medium">{place.distance} from lodge</span>
                  </div>
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BusFront className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-bold">Convenience</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbyPlaces.convenience.map((place, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold mb-2 text-indigo-600">{place.name}</h4>
                  <p className="text-gray-600 mb-3">{place.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-indigo-600 font-medium">{place.distance} from lodge</span>
                  </div>
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
          {/* Tourist Attractions */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Map className="h-8 w-8 text-indigo-600" />
              <h3 className="text-2xl font-bold">Tourist Attractions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.attractions.map((place, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-left"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h4 className="text-xl font-semibold mb-2 text-indigo-600">{place.name}</h4>
                  <p className="text-gray-600 mb-3">{place.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-indigo-600 font-medium">{place.distance} from lodge</span>
                  </div>
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  .animate-fade-up {
    animation: fadeUp 0.6s ease-out forwards;
  }

  .animate-fade-left {
    animation: fadeLeft 0.6s ease-out forwards;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

export default Amenities;
