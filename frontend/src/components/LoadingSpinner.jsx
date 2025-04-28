import { useState, useEffect } from 'react'

const LoadingSpinner = () => {
  const [rotation, setRotation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Sports balls SVG data with enhanced designs
  const sportsBalls = [
    // Soccer/Football ball with enhanced design
    <svg key="soccer" viewBox="0 0 32 32" className="h-10 w-10">
      <defs>
        <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#soccerGradient)" stroke="#1E40AF" strokeWidth="1" />
      <path d="M16,1 L16,31 M1,16 L31,16 M6,6 L26,26 M6,26 L26,6" stroke="#1E40AF" strokeWidth="1" fill="none" />
      <path d="M8,16 A8,8 0 0,1 16,8 A8,8 0 0,1 24,16 A8,8 0 0,1 16,24 A8,8 0 0,1 8,16" stroke="#1E40AF" strokeWidth="1" fill="none" />
    </svg>,
    
    // Basketball with enhanced design
    <svg key="basketball" viewBox="0 0 32 32" className="h-10 w-10">
      <defs>
        <radialGradient id="basketballGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#basketballGradient)" stroke="#7C2D12" strokeWidth="1" />
      <path d="M16,1 L16,31 M1,16 L31,16" stroke="#7C2D12" strokeWidth="1.5" />
      <path d="M8,8 A12,16 0 0,1 24,8 M8,24 A12,16 0 0,0 24,24" stroke="#7C2D12" strokeWidth="1.5" fill="none" />
    </svg>,
    
    // Tennis ball with enhanced design
    <svg key="tennis" viewBox="0 0 32 32" className="h-10 w-10">
      <defs>
        <radialGradient id="tennisGradient" cx="50%" cy="50%" r="50%" fx="60%" fy="40%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#tennisGradient)" stroke="#92400E" strokeWidth="1" />
      <path d="M1,16 Q8,6 16,16 Q24,26 31,16" stroke="white" strokeWidth="2" fill="none" />
      <path d="M1,16 Q8,26 16,16 Q24,6 31,16" stroke="white" strokeWidth="2" fill="none" />
    </svg>,
    
    // Golf ball with enhanced design (replacing volleyball)
    <svg key="golf" viewBox="0 0 32 32" className="h-10 w-10">
      <defs>
        <linearGradient id="golfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#golfGradient)" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="10" cy="10" r="1" fill="#94A3B8" />
      <circle cx="14" cy="7" r="1" fill="#94A3B8" />
      <circle cx="18" cy="9" r="1" fill="#94A3B8" />
      <circle cx="22" cy="12" r="1" fill="#94A3B8" />
      <circle cx="8" cy="14" r="1" fill="#94A3B8" />
      <circle cx="12" cy="17" r="1" fill="#94A3B8" />
      <circle cx="16" cy="13" r="1" fill="#94A3B8" />
      <circle cx="20" cy="16" r="1" fill="#94A3B8" />
      <circle cx="24" cy="19" r="1" fill="#94A3B8" />
      <circle cx="10" cy="21" r="1" fill="#94A3B8" />
      <circle cx="14" cy="24" r="1" fill="#94A3B8" />
      <circle cx="18" cy="22" r="1" fill="#94A3B8" />
    </svg>
  ];
  
  useEffect(() => {
    // Rotation animation
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 30);
    
    // Progress animation (0-100%)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Simulate loading completion
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 20000); // 20 seconds before hiding
    
    return () => {
      clearInterval(rotationInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-50 to-white z-50">
      {/* Blue gradient background circle */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-blue-200 to-blue-50 opacity-60"></div>
      
      {/* Pulsing outer ring */}
      <div className="absolute w-80 h-80 rounded-full border-4 border-blue-400 opacity-20 animate-ping"></div>
      
      {/* Secondary rotating ring */}
      <div 
        className="absolute w-72 h-72 rounded-full border-2 border-dashed border-blue-500 opacity-30"
        style={{
          transform: `rotate(${-rotation/2}deg)`
        }}
      ></div>
      
      {/* Green accent elements */}
      <div className="absolute">
        <div className="w-2 h-16 bg-green-400 rounded-full opacity-20 blur-md"
          style={{
            transform: `rotate(${rotation*1.5}deg) translateY(-120px)`
          }}
        ></div>
        <div className="w-2 h-16 bg-green-400 rounded-full opacity-20 blur-md"
          style={{
            transform: `rotate(${rotation*1.5 + 180}deg) translateY(-120px)`
          }}
        ></div>
      </div>
      
      {/* Main rotating element with balls */}
      <div className="relative h-64 w-64">
        <div 
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          {sportsBalls.map((ball, i) => {
            // Calculate position around a circle
            const angle = (i / sportsBalls.length) * Math.PI * 2;
            const radius = 80; // pixels
            const top = 50 + Math.sin(angle) * radius;
            const left = 50 + Math.cos(angle) * radius;
            
            // Create a bouncing effect
            const bounce = Math.sin((rotation / 30) + (i * Math.PI / 2)) * 5;
            
            return (
              <div 
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  top: `${top + bounce}%`,
                  left: `${left}%`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`, // Counter-rotate to keep balls upright
                  filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.15))'
                }}
              >
                {ball}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Blue light trail effects */}
      <div 
        className="absolute w-20 h-2 bg-blue-500 rounded-full opacity-40 blur-md"
        style={{
          transform: `rotate(${rotation}deg) translateX(150px)`
        }}
      ></div>
      <div 
        className="absolute w-16 h-1 bg-blue-400 rounded-full opacity-60 blur-sm"
        style={{
          transform: `rotate(${rotation + 180}deg) translateX(150px)`
        }}
      ></div>
      
      {/* Loading text with shimmer effect */}
      <div className="relative mt-28">
        <div className="text-blue-600 text-2xl font-medium">
          Loading<span className="animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
        </div>
        
        {/* Progress bar */}
        <div className="relative w-48 h-2 mt-4 bg-blue-100 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Subtle percent indicator */}
        <div className="text-blue-400 text-xs font-medium text-center mt-2">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner