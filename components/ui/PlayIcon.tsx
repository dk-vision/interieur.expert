/**
 * Custom Play Icon Component
 * 
 * To use your own icon:
 * 1. Replace the SVG code below with your own
 * 2. Or use an image: <img src="/icons/play-icon.svg" alt="Play" className={className} />
 */

interface PlayIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PlayIcon({ className = "", size = "md" }: PlayIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 73 73" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Circle: transparent white stroke by default, blue fill on hover */}
        <circle 
          cx="36.5" 
          cy="36.5" 
          r="35" 
          className="fill-none stroke-white stroke-2 opacity-70 group-hover:fill-[#0000FF] group-hover:stroke-[#0000FF] transition-all duration-300"
        />
        {/* Triangle: transparent by default, white on hover */}
        <path 
          className="fill-transparent group-hover:fill-white transition-colors duration-300"
          d="M32.1094004,24.0729336 L49.0038491,35.3358994 C49.9229065,35.9486043 50.1712542,37.190343 49.5585493,38.1094004 C49.4120796,38.329105 49.2235537,38.5176309 49.0038491,38.6641006 L32.1094004,49.9270664 C31.190343,50.5397713 29.9486043,50.2914236 29.3358994,49.3723662 C29.1168761,49.0438312 29,48.6578158 29,48.2629658 L29,25.7370342 C29,24.6324647 29.8954305,23.7370342 31,23.7370342 C31.39485,23.7370342 31.7808654,23.8539102 32.1094004,24.0729336 Z" 
        />
      </g>
    </svg>
  );
}
