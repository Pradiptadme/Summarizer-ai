import React, { useEffect, useState } from 'react';

const LogoSvg: React.FC = () => {
  const [rotate, setRotate] = useState(0);
  const [pulse, setPulse] = useState(1);
  
  useEffect(() => {
    // Slower rotation
    const rotateInterval = setInterval(() => {
      setRotate(prev => (prev + 0.5) % 360);
    }, 50);
    
    // Pulsing effect
    const pulseInterval = setInterval(() => {
      setPulse(prev => prev === 1 ? 1.05 : 1);
    }, 1500);
    
    return () => {
      clearInterval(rotateInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <svg 
      width="38" 
      height="38" 
      viewBox="0 0 38 38" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(156, 85, 247, 0.5))',
        transform: `scale(${pulse})`,
        transition: 'transform 0.5s ease-in-out'
      }}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
          <animate 
            attributeName="x1" 
            values="0%;100%;0%" 
            dur="10s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="y1" 
            values="0%;100%;0%" 
            dur="10s" 
            repeatCount="indefinite" 
          />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g 
        style={{
          transformOrigin: 'center',
          transform: `rotate(${rotate}deg)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <rect width="38" height="38" rx="12" fill="url(#logo-gradient)" />
        <path 
          d="M19 9L9 19L19 29L29 19L19 9Z" 
          fill="rgba(255, 255, 255, 0.15)" 
          filter="url(#glow)"
        />
        <circle cx="19" cy="19" r="5" fill="white" fillOpacity="0.9">
          <animate 
            attributeName="r" 
            values="5;5.5;5" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* Tech-style grid lines */}
        <path 
          d="M19 9V19M19 19L29 19M19 19L19 29M19 19L9 19" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeDasharray="1 3"
        />
        
        {/* Digital dots at corners */}
        <circle cx="9" cy="9" r="1.5" fill="#4ade80" />
        <circle cx="29" cy="9" r="1.5" fill="#f472b6" />
        <circle cx="9" cy="29" r="1.5" fill="#60a5fa" />
        <circle cx="29" cy="29" r="1.5" fill="#facc15" />
      </g>
    </svg>
  );
};

export default LogoSvg;