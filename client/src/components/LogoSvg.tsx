import React from 'react';

const LogoSvg: React.FC = () => {
  return (
    <svg 
      width="38" 
      height="38" 
      viewBox="0 0 38 38" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="12" fill="url(#logo-gradient)" />
      <path 
        d="M10 12C10 10.8954 10.8954 10 12 10H26C27.1046 10 28 10.8954 28 12V26C28 27.1046 27.1046 28 26 28H12C10.8954 28 10 27.1046 10 26V12Z" 
        fill="white" 
        fillOpacity="0.2"
      />
      <path 
        d="M15 17H23M15 21H23" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoSvg;