import React from 'react';
import { getTestimonialImageProps } from '../utils/imageOptimization';
import '../styles/TestimonialCard.css';

const TestimonialSection = ({ testimonials }) => {
  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {testimonials && testimonials.map((testimonial, index) => (
        <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg h-[30rem] transition-transform duration-300 hover:shadow-xl hover:scale-105">
          {/* Testimonial Image */}
          <div className="absolute inset-0 w-full h-full">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s testimonial`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl text-white font-bold opacity-30">
                  {testimonial.name ? testimonial.name.charAt(0) : "T"}
                </span>
              </div>
            )}
          </div>
          
          {/* Overlay with Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 text-white">
            {/* Star Rating */}
            <div className="flex items-center mb-2">
              {renderStars(testimonial.rating || 5)}
            </div>
            
            {/* Review Text - Limited to 2 lines */}
            <p className="line-clamp-2 text-sm mb-3 text-white/90">
              {testimonial.text}
            </p>
            
            {/* Name and Location */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-xs text-white/80">{testimonial.location}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSection;
