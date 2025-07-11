
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    {...props}
  >
    <path d="M9.93 13.5a2.5 2.5 0 1 1 3.54-3.54 2.5 2.5 0 0 1-3.54 3.54z" />
    <path d="M20 6.66 17.34 4l-1.42 1.42" />
    <path d="M18.75 11.25 17.5 10l-1.42 1.42" />
    <path d="m14.81 16.5-1.42 1.42L12 16.5l1.42-1.42" />
    <path d="M6.66 20 4 17.34l1.42-1.42" />
    <path d="M11.25 18.75 10 17.5l-1.42 1.42" />
    <path d="m16.5 14.81-1.42 1.42L13.67 17.5l1.42-1.42" />
    <path d="m4 6.66 2.66 2.66" />
    <path d="M6.25 11.25 5 10l1.42-1.42" />
  </svg>
);
