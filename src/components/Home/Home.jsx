import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from 'components/Tile/Tile';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Tile title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Looker Embed Template
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the power of Looker's embedding capabilities through this interactive template application.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "IFrame Embedding",
              description: "Seamlessly embed Looker dashboards and explores using iframe integration."
            },
            {
              title: "JavaScript Events",
              description: "Interact with embedded content through JavaScript event handling."
            },
            {
              title: "Embed SDK",
              description: "Leverage the full power of Looker's Embed SDK for enhanced functionality."
            },
            {
              title: "API Integration",
              description: "Connect to Looker's API for custom data visualization with Chart.js."
            },
            {
              title: "Interactive Communication",
              description: "Experience bi-directional communication between parent and embedded frames."
            },
            {
              title: "Developer Tools",
              description: "Access comprehensive tools and examples for embedding implementation."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-gray-900/70"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => navigate('/reports')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Explore Embed Flavors
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Tile>
  );
};

export default Home;