import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from 'next-themes';
import wallpaper from '../../../assets/wallpaper.jpg'
import plane from '../../../assets/plan.png'

interface NavItemProps {
  item: string;
}

interface FeatureCardProps {
  item: string;
}

// StarField Component
const StarField: React.FC = () => (
  <div className="absolute inset-0">
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: "loop",
          delay: Math.random() * 2,
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

// NavItem Component with type annotations
const NavItem: React.FC<NavItemProps> = ({ item }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <a href={`/${item.toLowerCase()}`}>
      <Button
        variant="outline"
        className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
      >
        {item}
      </Button>
    </a>
  </motion.li>
);

// FeatureCard Component with type annotations
const FeatureCard: React.FC<FeatureCardProps> = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-lg transition-all duration-300"
  >
    <h2 className="text-2xl font-bold mb-4 text-yellow-400">{item}</h2>
    <p className="mb-4">Discover the {item.toLowerCase()} that shape the Star Wars saga.</p>
    <Button
      variant="outline"
      className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
    >
      Explore {item}
    </Button>
  </motion.div>
);

// Main LandingPage Component
const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center"
        >
          <motion.img
            src={plane}
            alt="Star Wars plane"
            className="w-48" // Smaller image size
            animate={{
              rotate: 360,
              x: [0, 150, 0, -150, 0], // Moves on the x-axis in a circular path
              y: [0, 100, 200, 100, 0], // Moves on the y-axis in a circular path
            }}
            transition={{
              duration: 4, // Duration of one full circle
              ease: "linear",
              repeat: Infinity, // Loop the animation infinitely
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-black text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('/space-background.jpg')] bg-cover bg-center opacity-50"></div>
          <StarField />

          <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <img src={wallpaper} alt="Star Wars background" className="w-64 mx-auto" />
            </motion.div>

            <nav className="mb-16">
              <ul className="flex justify-center space-x-6">
                {['Home', 'Characters', 'Planets', 'Vehicles'].map((item) => (
                  <NavItem key={item} item={item} />
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400" style={{ textShadow: '0 0 10px rgba(255,215,0,0.7)' }}>
                Explore the Galaxy
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Embark on an epic journey through the Star Wars universe
              </p>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-3 transition-colors duration-300">
                Start Your Adventure
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Characters', 'Planets', 'Vehicles'].map((item) => (
                <FeatureCard key={item} item={item} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
