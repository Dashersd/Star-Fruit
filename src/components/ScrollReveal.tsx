'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animationDelay?: string;
  className?: string;
}

export function ScrollReveal({ children, animationDelay = '0ms', className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        // Trigger slightly before it comes fully into view
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`h-full ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}
