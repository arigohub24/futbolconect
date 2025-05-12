import { useState, useEffect } from 'react'

const LoadingSpinner = () => {
  const [rotation, setRotation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Sports balls SVG data
  const sportsBalls = [
    // Soccer ball
    <svg key="soccer" viewBox="0 0 32 32" className="h-10 w-10">
      <circle cx="16" cy="16" r="15" fill="white" stroke="#1E40AF" strokeWidth="1" />
      <path d="M16,1 L16,31 M1,16 L31,16 M6,6 L26,26 M6,26 L26,6" stroke="#1E40AF" strokeWidth="1" fill="none" />
      <path d="M8,16 A8,8 0 0,1 16,8 A8,8 0 0,1 24,16 A8,8 0 0,1 16,24 A8,8 0 0,1 8,16" stroke="#1E40AF" strokeWidth="1" fill="none" />
    </svg>,
    
    // Basketball
    <svg key="basketball" viewBox="0 0 32 32" className="h-10 w-10">
      <circle cx="16" cy="16" r="15" fill="#FDBA74" stroke="#7C2D12" strokeWidth="1" />
      <path d="M16,1 L16,31 M1,16 L31,16" stroke="#7C2D12" strokeWidth="1.5" />
      <path d="M8,8 A12,16 0 0,1 24,8 M8,24 A12,16 0 0,0 24,24" stroke="#7C2D12" strokeWidth="1.5" fill="none" />
    </svg>,
    
    // Tennis ball
    <svg key="tennis" viewBox="0 0 32 32" className="h-10 w-10">
      <circle cx="16" cy="16" r="15" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
      <path d="M1,16 Q8,6 16,16 Q24,26 31,16" stroke="white" strokeWidth="2" fill="none" />
      <path d="M1,16 Q8,26 16,16 Q24,6 31,16" stroke="white" strokeWidth="2" fill="none" />
    </svg>,
    
    // Baseball
    <svg key="baseball" viewBox="0 0 32 32" className="h-10 w-10">
      <circle cx="16" cy="16" r="15" fill="white" stroke="#92400E" strokeWidth="1" />
      <path d="M16,1 Q24,8 16,16 Q8,24 16,31" stroke="#92400E" strokeWidth="1.5" fill="none" />
      <path d="M16,1 Q8,8 16,16 Q24,24 16,31" stroke="#92400E" strokeWidth="1.5" fill="none" />
    </svg>
  ];
  
  useEffect(() => {
    // Rotation animation
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-50 z-50">
      {/* Main rotating element with balls */}
      <div className="relative h-64 w-64 flex items-center justify-center">
        <div 
          className="absolute"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          {sportsBalls.map((ball, i) => {
            // Calculate position around a circle
            const angle = (i / sportsBalls.length) * Math.PI * 2;
            const radius = 80; // pixels
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={i}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`, // Counter-rotate to keep balls upright
                }}
              >
                {ball}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Loading text */}
      <div className="text-blue-600 text-xl font-medium mt-8">
        Loading {Math.round(progress)}%
      </div>
      
      {/* Progress bar */}
      <div className="w-48 h-2 mt-4 bg-blue-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default LoadingSpinner