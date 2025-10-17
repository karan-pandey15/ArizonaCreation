import React from 'react';
import { Package, MousePointerClick, Shirt, RefreshCw } from 'lucide-react';

export default function LittleboxLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-2 transition-all duration-300 hover:scale-105">
            ArizonaCreation
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-black">#GoBeYou</p>
        </div>

        {/* Description */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 px-2">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            The ultimate fashion destination for trendsetters who want the insta ready, celeb worthy looks & they want them 
            now. With daily drops of fresh styles, fast free delivery & easy peasy returns, your best fit is right here.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Fast Delivery */}
          <div className="flex flex-col items-center text-center group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <div className="mb-4 sm:mb-6 p-4 rounded-full transition-all duration-300 group-hover:bg-gray-100 group-hover:shadow-lg">
              <Package className="w-16 h-16 sm:w-20 sm:h-20 text-black transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black transition-colors duration-300 group-hover:text-blue-600">Fast Delivery</h3>
          </div>

          {/* New Styles */}
          <div className="flex flex-col items-center text-center group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <div className="mb-4 sm:mb-6 p-4 rounded-full transition-all duration-300 group-hover:bg-gray-100 group-hover:shadow-lg">
              <MousePointerClick className="w-16 h-16 sm:w-20 sm:h-20 text-black transition-all duration-300 group-hover:text-purple-600 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black transition-colors duration-300 group-hover:text-purple-600">New Styles</h3>
          </div>

          {/* Best fit */}
          <div className="flex flex-col items-center text-center group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <div className="mb-4 sm:mb-6 p-4 rounded-full transition-all duration-300 group-hover:bg-gray-100 group-hover:shadow-lg">
              <Shirt className="w-16 h-16 sm:w-20 sm:h-20 text-black transition-all duration-300 group-hover:text-green-600 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black transition-colors duration-300 group-hover:text-green-600">Best fit</h3>
          </div>

          {/* Easy exchange */}
          <div className="flex flex-col items-center text-center relative group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <div className="mb-4 sm:mb-6 p-4 rounded-full transition-all duration-300 group-hover:bg-gray-100 group-hover:shadow-lg">
              <RefreshCw className="w-16 h-16 sm:w-20 sm:h-20 text-black transition-all duration-300 group-hover:text-orange-600 group-hover:scale-110 group-hover:rotate-180" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black transition-colors duration-300 group-hover:text-orange-600">Easy exchange</h3>
            
          
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t-2 border-gray-200 mt-8"></div>
    </div>
  );
}