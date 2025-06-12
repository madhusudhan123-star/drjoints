import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../assets/banner1.webp';
import banner2 from '../assets/banner2.webp';
import banner3 from '../assets/banner3.webp';
import card1 from '../assets/card1.webp';
import card2 from '../assets/card2.webp';
import card3 from '../assets/card3.webp';
import card4 from '../assets/card4.webp';
import product from '../assets/product.webp';
import FAQ from '../components/FAQ';
import producticon from '../assets/product_icons.webp';
import one from '../assets/t_one.webp';
import two from '../assets/t_two.webp';
import three from '../assets/t_three.webp';
import four from '../assets/t_four.webp';
import Secondsection from '../components/Secondsection';
import BlogSection from '../components/BlogSection';
import InstagramFeed from '../components/InstagramFeed';
import pr1 from '../assets/pr/card1.webp';
import pr2 from '../assets/pr/card2.webp';
import pr3 from '../assets/pr/card3.webp';
import pr4 from '../assets/pr/card4.webp';
import pr5 from '../assets/pr/card5.webp';
import pr6 from '../assets/pr/card6.webp';
import pr7 from '../assets/pr/card7.webp';
// YouTube related imports - add these images after taking screenshots
import youtubeThumb from '../assets/youtube_thumbnail.webp';
// import youtubeStats from '../assets/youtube_stats.webp';
// import youtubeSocialProof from '../assets/youtube_social_proof.webp';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        { url: banner1, alt: "Dr. Joints Pain Relief oil." },
        { url: banner2, alt: "Dr. Joints Muscles Pain Relief oils." },
        { url: banner3, alt: "Dr. Joints Body pain relief oil." }
    ];    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative">
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300
              ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const ProductSection = () => {
    const cards = [
        {
            id: 1,
            image: card1,
            title: "Pain Relief Oil",
            benefit: "Fast Acting Formula",
            description: "Instant relief for muscle & joint pain",
            alt: "Dr. Joints Pain Relief oil front view"
        },
        {
            id: 2,
            image: card2,
            title: "Pain Relief Oil",
            benefit: "Deep Penetration",
            description: "Reaches deep muscle tissues",
            alt: "Dr. Joints Pain Relief oil ingredients view"
        },
        {
            id: 3,
            image: card3,
            title: "Pain Relief Oil",
            benefit: "Natural Ingredients",
            description: "100% Ayurvedic formulation",
            alt: "Dr. Joints Pain Relief oil benefits view"
        },
        {
            id: 4,
            image: card4,
            title: "Pain Relief Oil",
            benefit: "Long Lasting Relief",
            description: "Sustained pain relief action",
            alt: "Dr. Joints Pain Relief oil usage view"
        }
    ];

    return (
        <div className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Dr. Joints Pain Relief Oil</h2>
            <p className="text-center text-gray-600 mb-12">One Solution for All Your Pain Relief Needs</p>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
                    >
                        <div className="relative h-full">
                            <img
                                src={card.image}
                                alt={card.alt}
                                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">{card.benefit}</h3>
                                <p className="text-gray-200 mb-3">{card.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-white">₹3,990</span>
                                    <a href="/product" 
                                       className="px-6 py-2 bg-blue-600 text-white rounded-full 
                                                hover:bg-blue-700 transform hover:scale-105 
                                                transition-all duration-300 flex items-center gap-2">
                                        Details
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full 
                                      transform -translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                            Featured
                        </div>
                    </div>
                ))}
            </div> */}
            {/* trusted icons */}
            <div className="w-full px-4 sm:px-8 py-8 md:py-12 mt-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center items-center mx-auto">
                    <div>
                        <img src={one} alt="Trusted Brand 1" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={two} alt="Trusted Brand 2" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={three} alt="Trusted Brand 3" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={four} alt="Trusted Brand 4" className="w-[8.5rem] h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoTrustSection = ({ currentLang, translations }) => {
    const [countUp, setCountUp] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Counter animation effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const end = 5000000; // 5 million
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // 60 FPS

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCountUp(end);
                    clearInterval(timer);
                } else {
                    setCountUp(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isVisible]);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        return num.toLocaleString();
    };

    const handleVideoClick = () => {
        window.open('https://youtu.be/1ahnXJEUb_w', '_blank');
    };

    return (
        <div ref={sectionRef} className="bg-gradient-to-br from-gray-900 via-red-900 to-black py-16 relative overflow-hidden">
            {/* YouTube Red Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-40 h-40 border-4 border-red-500 rounded-lg rotate-12 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-white rounded-lg -rotate-12 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-red-400 rounded-lg rotate-45 animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* YouTube Style Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center mb-6">
                        <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl flex items-center shadow-2xl">
                            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube Viral Hit
                        </div>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-red-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            🚀 5 MILLION+ VIEWS 🚀
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-6">
                        Watch Why India Trusts Dr. Joints Pain Relief Oil
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Video Thumbnail Section */}
                    <div className="relative group">
                        {/* YouTube Style Video Player */}
                        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 transform hover:scale-105 transition-all duration-300">
                            {/* Placeholder for YouTube thumbnail - replace with actual screenshot */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <img src={youtubeThumb} alt="YouTube Thumbnail" className="absolute inset-0 w-full h-full object-cover" />
                                {/* YouTube Play Button */}
                                <button 
                                    onClick={handleVideoClick}
                                    className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                >
                                    <div className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-2xl">
                                        <svg className="w-16 h-16 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            
                            {/* Video Stats Overlay */}
                            <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                                <span className="text-red-400">🔴 LIVE</span> • {formatNumber(countUp)} views
                            </div>
                            
                            {/* Duration Badge */}
                            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                                0:15
                            </div>
                        </div>
                        
                        {/* Video Description */}
                        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h3 className="text-white text-xl font-bold mb-2">Dr. Joints | Ayurvedic Pain Relief Oil</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Watch real customers share their amazing results with Dr. Joints Pain Relief Oil. 
                                See why millions trust our Ayurvedic solution for instant pain relief.
                            </p>
                        </div>
                    </div>

                    {/* Stats and Trust Indicators */}
                    <div className="space-y-8">
                        {/* Animated Counter */}
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 shadow-2xl border border-red-400">
                                <div className="text-6xl md:text-7xl font-bold text-white mb-2 font-mono">
                                    {formatNumber(countUp)}
                                </div>
                                <div className="text-2xl font-semibold text-yellow-300 mb-2">
                                    VIEWS & GROWING!
                                </div>
                                <div className="flex justify-center items-center space-x-2 text-white">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                    <span className="text-lg font-medium">TRENDING NOW</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof Grid */}
                        {/* <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                                <div className="text-4xl mb-3">👥</div>
                                <div className="text-2xl font-bold text-white">50K+</div>
                                <div className="text-gray-300 text-sm">Subscribers</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                                <div className="text-4xl mb-3">👍</div>
                                <div className="text-2xl font-bold text-white">89K</div>
                                <div className="text-gray-300 text-sm">Likes</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                                <div className="text-4xl mb-3">💬</div>
                                <div className="text-2xl font-bold text-white">12K</div>
                                <div className="text-gray-300 text-sm">Comments</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 text-center">
                                <div className="text-4xl mb-3">🔄</div>
                                <div className="text-2xl font-bold text-white">5K</div>
                                <div className="text-gray-300 text-sm">Shares</div>
                            </div>
                        </div> */}

                        {/* Testimonial Highlight */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    R
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Recent Comment</h4>
                                    <p className="text-gray-300 text-sm italic">
                                        "Amazing results! My knee pain is completely gone after using Dr. Joints oil for just 1 week. Highly recommended! 🙏"
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2">- Rajesh Kumar, 2 hours ago</p>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <a 
                                    href="/product" 
                                    className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 
                                             text-white text-lg font-bold rounded-full shadow-lg 
                                             hover:from-green-600 hover:to-green-700 transform hover:scale-105 
                                             transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>Order Now - Special YouTube Price!</span>
                                </a>
                                
                                <button 
                                    onClick={handleVideoClick}
                                    className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg 
                                             font-semibold rounded-full border-2 border-red-400 
                                             transform hover:scale-105 transition-all duration-300 
                                             flex items-center justify-center space-x-2"
                                >
                                    <span>Watch Full Video on YouTube</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Trust Banner */}
                {/* <div className="mt-16 text-center">
                    <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-4 px-8 rounded-full shadow-xl">
                        <div className="flex items-center space-x-3 text-lg font-bold">
                            <span>🏆</span>
                            <span>Most Watched Pain Relief Video in India</span>
                            <span>🔥</span>
                        </div>
                    </div>
                    <p className="text-gray-300 mt-4 text-sm">
                        Join millions who discovered the power of Ayurvedic pain relief
                    </p>
                </div> */}
            </div>
        </div>
    );
};

const Product = ({ currentLang, translations }) => {
    const [currentMediaSlide, setCurrentMediaSlide] = useState(0);
    const productRef = useRef(null);

    const mediaLinks = [
        { 
            title: 'Daily Hunt',
            link: 'http://m.dailyhunt.in/news/india/english/republic+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/dr+joints+pain+relief+oil+expanding+indian+ayurveda+to+uae-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_0195d5c0cd9611efbfff30234ee32bf7?sm=Y',
            icon: pr1,
            source: 'Daily Hunt'
        },
        { 
            title: 'Republic News India',
            link: 'https://republicnewsindia.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: pr2,
            source: 'Republic News'
        },
        { 
            title: 'Flipboard',
            link: 'https://flipboard.com/@republicnewsind/-dr-joints-pain-relief-oil-expanding-ind/a-V8D2Oej2QgGHtagao7JlCQ%3Aa%3A3544623556-7947af09c2%2Frepublicnewsindia.com',
            icon: pr3,
            source: 'Flipboard'
        },
        { 
            title: 'The Indian Bulletin',
            link: 'https://theindianbulletin.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: pr4,
            source: 'Indian Bulletin'
        },
        { 
            title: 'RD Times',
            link: 'https://rdtimes.in/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: pr5,
            source: 'RD Times'
        },
        { 
            title: 'Abhyuday Times',
            link: 'https://abhyudaytimes.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: pr6,
            source: 'Abhyuday Times'
        },
        { 
            title: 'Indian Sentinel',
            link: 'https://indiansentinel.in/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: pr7,
            source: 'Indian Sentinel'
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentMediaSlide((prev) => (prev + 1) % mediaLinks.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(slideTimer);
    }, [mediaLinks.length]);

    return (
        <div ref={productRef} className="min-h-screen bg-[#F0E7E5] relative">
            {/* Featured Media Coverage Slider */}
            <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-8 mb-8">
                <div className="text-center mb-6">
                    {/* Media Logos Row */}
                    <div className="flex justify-center items-center space-x-4 mb-4 overflow-hidden">
                        <div className="flex space-x-6 animate-pulse">
                            {[pr1, pr2, pr3, pr4, pr5].map((logo, index) => (
                                <div key={index} className=" flex items-center justify-center">
                                    <img 
                                        src={logo} 
                                        alt={`Media ${index + 1}`}
                                        className="w-6 h-6 md:w-24 md:h-24 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Trendy Title */}
                    <div className="relative">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 relative">
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                🔥 TRENDING NOW 
                            </span>
                            <span className="block text-2xl md:text-3xl mt-2">
                                Media Spotlight
                            </span>
                        </h3>
                        
                        {/* Animated underline */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse"></div>
                    </div>
                    
                    <p className="text-blue-100 mt-4 text-lg">
                        🌟 Dr. Joints making headlines across India's top news platforms
                    </p>
                    
                    {/* Live indicator */}
                    <div className="flex justify-center items-center mt-3">
                        <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-bounce">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <span className="font-medium">LIVE COVERAGE</span>
                        </div>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div 
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentMediaSlide * 100}%)` }}
                    >
                        {mediaLinks.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-4">
                                <a 
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block"
                                >
                                    <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 border border-gray-100 
                                                  transform hover:scale-105 transition-all duration-300 
                                                  hover:shadow-2xl shadow-xl relative overflow-hidden">
                                        
                                        {/* Trending badge */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 
                                                      text-white px-3 py-1 rounded-full text-xs font-bold 
                                                      animate-pulse shadow-lg">
                                            🔥 TRENDING
                                        </div>
                                        
                                        <div className="text-center">
                                            {/* Icon Image */}
                                            <div className="flex justify-center mb-6">
                                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full 
                                                              bg-gradient-to-br from-blue-50 to-purple-50 
                                                              flex items-center justify-center shadow-lg
                                                              group-hover:shadow-xl transition-all duration-300
                                                              border-4 border-white">
                                                    <img 
                                                        src={item.icon} 
                                                        alt={item.source}
                                                        className="w-24 h-24 md:w-32 md:h-32 object-contain
                                                                 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Enhanced Title */}
                                            {/* <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 
                                                         group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h4> */}
                                            
                                            {/* Subtitle with highlights */}
                                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                <span className="font-semibold text-blue-600">Dr. Joints Pain Relief Oil</span> 
                                                <br />
                                                {/* <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-medium">
                                                    Expanding Indian Ayurveda to UAE
                                                </span> */}
                                            </p>
                                            
                                            {/* Source and CTA */}
                                            <div className="flex items-center justify-center space-x-4">
                                                {/* <span className="bg-gradient-to-r from-blue-500 to-purple-500 
                                                               text-white text-sm py-2 px-4 rounded-full font-medium
                                                               shadow-lg transform group-hover:scale-105 transition-all">
                                                    📰 {item.source}
                                                </span> */}
                                                <span className="text-blue-600 font-medium flex items-center
                                                               group-hover:text-blue-800 transition-colors
                                                               bg-blue-50 px-4 py-2 rounded-full">
                                                    Read Full Story
                                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                              d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                            
                                            {/* Breaking news effect */}
                                            <div className="mt-4 flex justify-center">
                                                <div className="flex items-center space-x-2 text-red-600 text-sm font-medium">
                                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                                                    <span>Breaking: National Coverage</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Slider Indicators */}
                <div className="flex justify-center mt-6 space-x-3">
                    {mediaLinks.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                                index === currentMediaSlide 
                                    ? 'bg-yellow-300 scale-125 shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                            }`}
                            onClick={() => setCurrentMediaSlide(index)}
                        />
                    ))}
                </div>

                {/* Enhanced Navigation Arrows */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                    <button
                        onClick={() => setCurrentMediaSlide(
                            currentMediaSlide === 0 ? mediaLinks.length - 1 : currentMediaSlide - 1
                        )}
                        className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full
                                 backdrop-blur-sm transition-all duration-300 hover:scale-110
                                 border border-white/30 shadow-lg"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
                
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <button
                        onClick={() => setCurrentMediaSlide((currentMediaSlide + 1) % mediaLinks.length)}
                        className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full
                                 backdrop-blur-sm transition-all duration-300 hover:scale-110
                                 border border-white/30 shadow-lg"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Rest of the Product section */}
            <div className="p-8">
                <div className="text-center mb-8">
                    <h1 className="text-blue-900 text-4xl font-bold mb-4">{translations[currentLang].product.title}</h1>
                    <h2 className="text-amber-800 text-2xl font-semibold">{translations[currentLang].product.subtitle}</h2>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6 pr-4">
                        <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content1}</p>
                        <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content2}</p>
                        <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content3}</p>
                        <button className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                            <a href="/product">Buy Now</a>
                        </button>
                    </div>

                    <div className="relative">
                        <img
                            src={product}
                            alt="Dr. Joints Pain Relief Oil Product"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const About = ({ currentLang, translations }) => {
    return (
        <div id="video-section" className="">
            <div className="w-screen">
                <div className="relative h-0 pb-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/xFQblbvIjwU"
                        title="Dr.Joints | Ayurvedic Pain Relief Oil"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                {/* <div className="w-full py-10 md:py-20 relative">
                    <img
                        src={pain3}
                        className={`w-screen md: lg:h-[50vh] sm:h-full }`}
                    />
                    <h1 className="text-center text-4xl mt-3 text-white">Buy Now</h1>
                </div> */}
            </div>
        </div>
    );
};

const TestimonialCard = ({ image, text, name, role }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
                {image && (
                    <div className="w-12 h-12 rounded-full bg-gray-300">
                        <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                    <p className="text-gray-600">{role}</p>
                </div>
            </div>
            <p className="mt-4 text-gray-700">{text}</p>
        </div>
    );
};

const Testimonials = ({ currentLang, translations }) => {


    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">{translations[currentLang].testimonials.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {translations[currentLang].testimonials.testimonial.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            image={testimonial.image}
                            text={testimonial.text}
                            name={testimonial.name}
                            role={testimonial.role}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Home = ({ currentLang, translations }) => {
    return (
        <div className={currentLang === 'ar' ? 'rtl' : 'ltr'
        }>
            <div className='overflow-x-hidden'>
                <a href='/product'>
                    <img src={producticon} className='fixed z-10 bottom-14 md:bottom-0 left-0 w-48' alt="Dr. Joints Product Icon" />
                </a>                <Hero currentLang={currentLang} />
                <ProductSection currentLang={currentLang} />
                <Secondsection />
                <Product currentLang={currentLang} translations={translations} />
                <VideoTrustSection currentLang={currentLang} translations={translations} />
                <About currentLang={currentLang} translations={translations} />
                <FAQ currentLang={currentLang} translations={translations} />
                <Testimonials currentLang={currentLang} translations={translations} />
                <InstagramFeed />
                <BlogSection 
                    translations={translations}
                    currentLang={currentLang}
                    blogPosts={translations.en.blogPosts}
                />
            </div>
        </div >
    );
};

export default Home;