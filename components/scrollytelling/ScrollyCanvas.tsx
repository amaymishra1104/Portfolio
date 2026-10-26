'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import Overlay from './Overlay';

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 90; // Approx 89 frames + 0

  // Preload images for high performance
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(2, '0');
      img.src = `/sequence/frame_${indexStr}_delay-0.067s.webp`;
      
      img.onload = () => {
        loadedCount++;
        // Render the very first frame to prevent white flash
        if (i === 0) {
          renderFrame(0, [img]);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number, imgArray = images) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = imgArray[index];
    if (!img || !img.complete) return;

    // object-fit: cover equivalent logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame on resize
        const currentFrame = Math.min(Math.floor(scrollYProgress.get() * (frameCount - 1)), frameCount - 1);
        renderFrame(currentFrame);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  useEffect(() => {
    // Map scroll progress (0 to 1) to image index
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        Math.floor(latest * (frameCount - 1)),
        frameCount - 1
      );
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => renderFrame(frameIndex));
    });
    
    return () => unsubscribe();
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
