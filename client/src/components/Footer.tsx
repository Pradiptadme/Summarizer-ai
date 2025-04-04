import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Globe, Mail } from 'lucide-react';
import LogoSvg from './LogoSvg';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-2 logo-svg">
                <LogoSvg />
              </div>
              <h4 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                SummarizerAI
              </h4>
            </div>
            <p className="text-indigo-200 text-sm">
              Get concise summaries from YouTube videos and text paragraphs instantly.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4 text-purple-300">Quick Links</h5>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors duration-300"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('features');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4 text-purple-300">Legal</h5>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <button className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4 text-purple-300">Connect</h5>
            <div className="flex space-x-4 mb-4">
              <button className="text-indigo-300 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <Facebook size={20} />
              </button>
              <button className="text-indigo-300 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <Twitter size={20} />
              </button>
              <button className="text-indigo-300 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <Globe size={20} />
              </button>
              <button className="text-indigo-300 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <Mail size={20} />
              </button>
            </div>
            <p className="text-indigo-200 text-sm">
              Sign up for our newsletter for updates.
            </p>
            <form className="mt-2 flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-indigo-900 border-indigo-700 text-indigo-100 rounded-l-md rounded-r-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500" aria-label="Subscribe">
                <span className="material-icons text-white">send</span>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-indigo-800 text-center text-indigo-300 text-sm">
          <p>&copy; {new Date().getFullYear()} SummarizerAI. All rights reserved.</p>
          <p className="mt-2">Developed by <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Pradip Tadme</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
