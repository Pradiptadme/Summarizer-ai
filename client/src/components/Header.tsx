import React from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="material-icons text-white text-3xl mr-3">play_circle_filled</span>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              YoutubeSummarizer
            </h1>
          </div>
          <nav className="hidden sm:block">
            <Link href="/">
              <a className="text-indigo-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Home</a>
            </Link>
            <Link href="#how-it-works">
              <a className="text-indigo-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">How It Works</a>
            </Link>
            <Link href="#features">
              <a className="text-indigo-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Features</a>
            </Link>
            <Link href="#about">
              <a className="text-indigo-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">About</a>
            </Link>
            <Link href="#contact">
              <a className="text-indigo-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">Contact</a>
            </Link>
          </nav>
          <div className="sm:hidden">
            <button 
              type="button"
              className="text-white hover:text-indigo-200"
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
