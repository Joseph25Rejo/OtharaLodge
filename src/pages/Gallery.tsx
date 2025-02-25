import React from "react";
import { motion } from "framer-motion";
import frontview1 from "../assets/frontview1.jpg";
import frontview2 from "../assets/frontview2.jpg";
import familybedroom1 from "../assets/family_bedroom1.jpg";
import familybedroom2 from "../assets/family_bedroom2.jpg";

const Gallery = () => {
  const images = [
    { url: frontview1, title: "Road Side View Exterior" },
    { url: frontview2, title: "Overall View" },
    { url: familybedroom1, title: "Family Bedroom" },
    { url: familybedroom2, title: "Family Bedroom" },
    { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", title: "Swimming Pool" },
    { url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", title: "Restaurant" },
    { url: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", title: "Spa" },
    { url: "https://images.unsplash.com/photo-1572715376701-98568319fd0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", title: "Gym" },
    { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", title: "Conference Room" },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-indigo-600 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Photo Gallery</h1>
          <p className="mt-4 text-xl text-center">Take a visual tour of our luxurious facilities</p>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
