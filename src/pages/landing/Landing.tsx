import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from 'next-themes';
import VanillaTilt from 'vanilla-tilt';
import wallpaper from '../../../assets/wallpaper.jpg'
import plane from '../../../assets/plan.png'
import useStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Meteors } from '@/components/ui/meteors';
import { Cover } from '@/components/ui/cover';

interface NavItemProps {
  item: string;
}

interface FeatureCardProps {
  item: string;
  onSelect: () => void
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
const FeatureCard: React.FC<FeatureCardProps> = ({ item, onSelect }) => {

  const navigate = useNavigate();
  
  const handleSignIn = (e: any): void => {
    navigate('/auth');
  };
  
  return (<motion.div
    whileHover={{ scale: 1.05 }}
    className="relative bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-lg transition-all duration-300"
  >
    {/* Meteor Effect */}
    <div className="absolute inset-0 z-0">
      <Meteors number={5} />
    </div>

    {/* Content of the Feature Card */}
    <div className="relative z-10">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">{item}</h2>
      <p className="mb-4">Discover the {item.toLowerCase()} that shape the Star Wars saga.</p>

      <SignedIn>
        <Button
          variant="outline"
          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
          onClick={onSelect}
        >
          Explore {item}
        </Button>
      </SignedIn>

      <SignedOut>
        <Button
          variant="outline"
          onClick={handleSignIn}
        >
          Sign in to Explore {item}
        </Button>
      </SignedOut>
    </div>
  </motion.div>)
};


const TiltComponent = () => {
  useEffect(() => {
    const element = document.querySelector('.box') as HTMLElement;

    if (element) {
      // Initialize VanillaTilt on the element
      VanillaTilt.init(element, {
        max: 10,
        speed: 200,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        reverse: true,
        glare: true,
        'max-glare': 0.1,
      });
    }

    return () => {
      if (element && (element as any).vanillaTilt) {
        (element as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center mb-8"
    >
      <img src={wallpaper} alt="Star Wars background" className="bg-blend-lighten w-auto md:w-96 mx-auto box" />
    </motion.div>
  );
};


// Main LandingPage Component
const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const setSelectedCategory = useStore((state) => state.setSelectedCategory)
  const words = `Embark on an epic journey through the Star Wars universe`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories: { [key: string]: string } = {
    Characters: 'people',
    Planets: 'planets',
    Vehicles: 'vehicles',
  }
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {
    setSelectedCategory(categories[category])
    navigate('/dashboard')
  }

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
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            animate={{
              x: [0, 80,150, 100, 0, -80, -150, -100, 0],
              y: [0, 100, 0, -100, -200, -100, 0, 100, 0], 
              rotate: 270, 
            }}
            transition={{
              duration: 5, 
              ease: "linear",
              repeat: Infinity, 
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
          <TiltComponent />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="h-[20rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
                <h1 className="md:text-7xl text-6xl lg:text-9xl font-bold text-center text-yellow-400 relative z-20" >
                  Star Wars
                </h1>
                <div className="w-[40rem] h-40 relative">
                  {/* Gradients */}
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          
                  {/* Core component */}
                  <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                  />
          
                  {/* Radial Gradient to prevent sharp edges */}
                  <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
              </div>
              <p className="text-xl md:text-2xl mb-8">
                <TextGenerateEffect words={words} />
              </p>
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>Start Your Adventure</Cover>
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Characters', 'Planets', 'Vehicles'].map((item) => (
                <FeatureCard key={item} item={item} onSelect={() => handleCardClick(item)} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
