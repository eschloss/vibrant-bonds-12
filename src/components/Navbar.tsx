import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 
        flex items-center justify-between 
        sm:px-6 
        md:px-8 md:max-w-4xl 
        lg:px-12 lg:max-w-6xl 
        xl:px-16"
      >
        <Link to="/" className="flex items-center">
          {/* Logo */}
        </Link>

        <div className="hidden md:flex space-x-6">
          {/* Navigation links */}
        </div>

        <div>
          {/* CTA or authentication buttons */}
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
