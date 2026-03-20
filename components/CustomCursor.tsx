'use client'

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Track actual mouse position (target)
  const mousePos = useRef({ x: -100, y: -100 });
  // Track animated position (delayed)
  const delayedPos = useRef({ x: -100, y: -100 });
  // Store animation frame ID for cleanup
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update target position
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Handle pointer state
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    const animateCursor = () => {
      // Interpolate current position toward target position
      // Formula: current += (target - current) * lerpFactor
      const lerpFactor = 1.0; // Set to 1.0 for zero delay
      
      delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * lerpFactor;
      delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        // Apply transform via translate3d for GPU acceleration
        cursorRef.current.style.transform = `translate3d(${delayedPos.current.x}px, ${delayedPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      rafId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{ willChange: "transform" }}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center transition-[scale] duration-300 ease-out ${
        isPointer ? "scale-[2.5]" : "scale-100"
      }`}
    >
      <div className="w-1 h-1 bg-black rounded-full opacity-20" />
    </div>
  );
};

export default CustomCursor;
