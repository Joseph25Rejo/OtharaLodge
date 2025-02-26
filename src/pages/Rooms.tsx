import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from '../components/ui/carousel';
import { Bed, Users, Wifi, Coffee, MapPin } from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  price: string;
  description: string;
  capacity: number;
  size: string;
  amenities: string[];
  images: { title: string; src: string; }[];
}

const Rooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const rooms: RoomType[] = [
    {
      id: 'standard',
      name: 'Standard Room',
      price: '₹1,500',
      description: 'Comfortable and cozy room perfect for solo travelers or couples.',
      capacity: 2,
      size: '200 sq ft',
      amenities: [
        'Single bed',
        'Air conditioning',
        'Private bathroom',
        'TV with cable channels',
        'Work desk',
        'Daily housekeeping'
      ],
      images: [
        {
          title: 'Standard Room',
          src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
        {
          title: 'Bathroom',
          src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        }
      ]
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: '₹2,000',
      description: 'Spacious room with modern amenities and elegant furnishings.',
      capacity: 3,
      size: '300 sq ft',
      amenities: [
        'Double bed',
        'Air conditioning',
        'Private bathroom with shower',
        '32-inch flat-screen TV',
        'Mini fridge',
        'Tea/coffee maker',
        'Work desk with chair',
        'Daily housekeeping'
      ],
      images: [
        {
          title: 'Deluxe Room',
          src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
        {
          title: 'Sitting Area',
          src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        }
      ]
    },
    {
      id: 'family',
      name: 'Family Suite',
      price: '₹3,000',
      description: 'Perfect for families, featuring separate living and sleeping areas.',
      capacity: 4,
      size: '400 sq ft',
      amenities: [
        'One double bed and one single bed',
        'Air conditioning',
        'Spacious private bathroom',
        '40-inch flat-screen TV',
        'Mini fridge',
        'Tea/coffee maker',
        'Dining area',
        'Balcony with view',
        'Daily housekeeping'
      ],
      images: [
        {
          title: 'Family Suite',
          src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        },
        {
          title: 'Living Area',
          src: 'https://images.unsplash.com/photo-1566665801639-c8edc1d55d9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        }
      ]
    }
  ];

  const createWhatsAppLink = (roomType: string, price: string) => {
    const message = `Hello, I would like to book a ${roomType} at ${price}/night. Please provide availability details.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/918431187843?text=${encodedMessage}`;
  };

  const RoomCard: React.FC<{ room: RoomType }> = ({ room }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-64">
          <img
            src={room.images[0].src}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full">
            {room.price}/night
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-indigo-600 mr-2" />
              <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{room.size}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedRoom(room)}
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              View Details
            </button>
            <a
              href={createWhatsAppLink(room.name, room.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Book on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Our Rooms</h1>
          <p className="mt-4 text-xl text-center">Choose your perfect stay</p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selectedRoom.name}</h2>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Image Carousel */}
              <div className="mb-8 carousel-container">
                <Carousel
                    slides={selectedRoom.images.map(img => ({
                    title: img.title,
                    src: img.src,
                    button: 'View Image'
                    }))}
                />
                <br /> <br />
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Room Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-indigo-600 mr-3" />
                      <span>Up to {selectedRoom.capacity} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-indigo-600 mr-3" />
                      <span>{selectedRoom.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 text-indigo-600 mr-3" />
                      <span>Room Service Available</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-indigo-600 mr-3" />
                      <span>Free Wi-Fi</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-indigo-600">{selectedRoom.price}</span>
                  <span className="text-gray-600 ml-2">per night</span>
                </div>
                <a
                  href={createWhatsAppLink(selectedRoom.name, selectedRoom.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Rooms;