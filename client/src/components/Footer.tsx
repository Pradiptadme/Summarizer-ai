import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Globe, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons text-primary mr-2">summarize</span>
              <h4 className="font-bold text-xl">YoutubeSummarizer</h4>
            </div>
            <p className="text-gray-400 text-sm">
              Get concise summaries from YouTube videos and text paragraphs instantly.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/">
                  <a className="hover:text-primary">Home</a>
                </Link>
              </li>
              <li>
                <Link href="#how-it-works">
                  <a className="hover:text-primary">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Cookie Policy</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Sign up for our newsletter for updates.
            </p>
            <form className="mt-2 flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-gray-800 bg-gray-100 rounded-l-md rounded-r-none focus:ring-1 focus:ring-primary"
              />
              <Button className="rounded-l-none" aria-label="Subscribe">
                <span className="material-icons text-white">send</span>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} YoutubeSummarizer. All rights reserved.</p>
          <p className="mt-2">Developed by <span className="text-primary font-semibold">Pradip Tadme</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
