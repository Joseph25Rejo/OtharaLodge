import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Users, BedDouble, Mail } from 'lucide-react';

// Room types data
const roomTypes = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: '$200',
    description: 'Spacious room with city views'
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    price: '$350',
    description: 'Luxury suite with separate living area'
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: '$500',
    description: 'Ultimate luxury with panoramic views'
  }
];

// Function to send notification using external API
interface NotificationData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
}

async function sendNotification(data: NotificationData) {
  const NOTIFICATION_API = 'https://api.emailjs.com/api/v1.0/email/send';
  const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  try {
    const response = await fetch(NOTIFICATION_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAIL_SERVICE_ID,
        template_id: EMAIL_TEMPLATE_ID,
        user_id: EMAIL_PUBLIC_KEY,
        template_params: {
          to_email: 'joseph25rejo@gmail.com',
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          phone: data.phone
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }

    return true;
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
}

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    roomType: 'deluxe',
    guests: 2,
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const formattedCheckIn = bookingData.checkIn.toLocaleDateString();
      const formattedCheckOut = bookingData.checkOut.toLocaleDateString();
      const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType);
      
      const subject = `New Booking Request from ${bookingData.name}`;
      const message = `
        Booking Details:
        Check-in: ${formattedCheckIn}
        Check-out: ${formattedCheckOut}
        Room: ${selectedRoom?.name} (${selectedRoom?.price}/night)
        Guests: ${bookingData.guests}
        Guest Details:
        - Name: ${bookingData.name}
        - Email: ${bookingData.email}
        - Phone: ${bookingData.phone}
        Special Requests: ${bookingData.specialRequests || 'None'}
      `;

      await sendNotification({
        name: bookingData.name,
        email: bookingData.email,
        subject,
        message,
        phone: bookingData.phone
      });

      setMessage({
        text: 'Booking request sent successfully!',
        type: 'success'
      });
      
      // Reset form
      setBookingData({
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
        roomType: 'deluxe',
        guests: 2,
        specialRequests: '',
        name: '',
        email: '',
        phone: ''
      });

    } catch (error) {
      console.error('Booking submission error:', error);
      setMessage({
        text: 'Failed to send booking request. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-700">Processing your booking...</p>
            </div>
          </div>
        </div>
      )}

      {/* Status Message */}
      {message.text && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {message.text}
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Book Your Stay</h1>
          <p className="mt-4 text-xl text-center">Experience luxury and comfort at Othara Lodge</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Reservation Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                    <div className="mt-1 relative">
                      <DatePicker
                        selected={bookingData.checkIn}
                        onChange={(date) => setBookingData({ ...bookingData, checkIn: date || new Date() })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                    <div className="mt-1 relative">
                      <DatePicker
                        selected={bookingData.checkOut}
                        onChange={(date) => setBookingData({ ...bookingData, checkOut: date || new Date() })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Type</label>
                  <select
                    value={bookingData.roomType}
                    onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {roomTypes.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - {room.price}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <Users className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 relative">
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                        <Mail className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Any special requirements or requests..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>

          {/* Room Information */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Room Types</h2>
              <div className="space-y-6">
                {roomTypes.map((room) => (
                  <div key={room.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{room.name}</h3>
                      <span className="text-indigo-600 font-semibold">{room.price}/night</span>
                    </div>
                    <p className="mt-2 text-gray-600">{room.description}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Up to 4 guests</span>
                      </div>
                      <div className="flex items-center">
                        <BedDouble className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">King bed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;