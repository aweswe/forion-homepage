'use client'

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return (
    <ReactLenis root options={{ 
      lerp: 0.075, 
      duration: 1.2, 
      smoothWheel: true,
      syncTouch: false,
    }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
