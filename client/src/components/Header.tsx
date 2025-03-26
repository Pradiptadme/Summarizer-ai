import React from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="material-icons text-primary mr-2">summarize</span>
            <h1 className="text-xl font-bold text-dark">YoutubeSummarizer</h1>
          </div>
          <nav className="hidden sm:block">
            <Link href="/">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Home</a>
            </Link>
            <Link href="#how-it-works">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">How It Works</a>
            </Link>
            <Link href="#about">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">About</a>
            </Link>
          </nav>
          <div className="sm:hidden">
            <button 
              type="button"
              className="text-gray-600 hover:text-primary"
              aria-label="Toggle menu"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
