import { useEffect } from 'react';

const usePreloadCriticalResources = () => {
  useEffect(() => {
    // Preload critical fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = font;
      link.onload = function() {
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload critical images (hero images, logos)
    const criticalImages = [
      // Add your critical image paths here
    ];

    criticalImages.forEach(imageSrc => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      document.head.appendChild(link);
    });
  }, []);
};

export default usePreloadCriticalResources;
