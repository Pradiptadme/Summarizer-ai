import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="25" cy="25" r="23" fill="url(#gradient)" />
      
      {/* Text "S" stylized */}
      <path
        d="M20 15C20 15 25 15 30 15C35 15 35 20 30 22C25 24 20 26 20 30C20 34 25 35 30 35"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Play button triangle */}
      <path
        d="M35 25L22 32L22 18L35 25Z"
        fill="white"
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D28D9" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;