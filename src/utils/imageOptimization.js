// Utility function to generate WebP version of images
export const getOptimizedImageSrc = (src, width = null, quality = 80) => {
  if (!src) return src;
  
  // If using a CDN or image optimization service, modify URL accordingly
  // For now, we'll assume WebP versions exist alongside original images
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();
  
  return supportsWebP ? webpSrc : src;
};

// Generate responsive image sizes
export const getResponsiveImageSizes = () => {
  return {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '25vw'
  };
};

// Create picture element for responsive images
export const createPictureElement = (src, alt, className) => {
  return {
    webp: getOptimizedImageSrc(src),
    fallback: src,
    sizes: getResponsiveImageSizes(),
    alt,
    className
  };
};

/**
 * Handles portrait images with specific cropping options
 * @param {string} src - Image source URL
 * @param {boolean} crop - Whether to crop to landscape (400x300)
 * @param {string} focusArea - Where to focus when cropping ('top', 'center', 'bottom')
 * @returns {object} - Image properties for the TestimonialCard
 */
export const getTestimonialImageProps = (src, crop = false, focusArea = 'center') => {
  if (!src) return { src: null, style: {} };
  
  // Define dimensions
  const portraitDimensions = { width: 700, height: 1000 };
  const landscapeDimensions = { width: 400, height: 300 };
  
  // Determine object-position based on focus area
  let objectPosition = 'center';
  if (focusArea === 'top') objectPosition = 'center top';
  if (focusArea === 'bottom') objectPosition = 'center bottom';
  
  if (crop) {
    // Return cropped landscape configuration
    return {
      src: getOptimizedImageSrc(src),
      alt: "Testimonial image",
      width: landscapeDimensions.width,
      height: landscapeDimensions.height,
      style: {
        objectFit: 'cover',
        objectPosition,
        width: '100%',
        height: '100%'
      }
    };
  } else {
    // Return full portrait configuration
    return {
      src: getOptimizedImageSrc(src),
      alt: "Testimonial image",
      width: portraitDimensions.width,
      height: portraitDimensions.height,
      style: {
        objectFit: 'contain',
        width: '100%',
        height: 'auto',
        maxHeight: '500px'
      }
    };
  }
};
