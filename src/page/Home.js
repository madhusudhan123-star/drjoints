import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
import card1 from '../assets/card1.jpeg';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.jpeg';
import card4 from '../assets/card4.jpeg';
import product from '../assets/product.png';
import FAQ from '../components/FAQ';
import producticon from '../assets/product_icons.png';
import one from '../assets/t_one.svg';
import two from '../assets/t_two.svg';
import three from '../assets/t_three.svg';
import four from '../assets/t_four.png';
import pain3 from '../assets/home3.jpg';
import Secondsection from '../components/Secondsection';
import BlogSection from '../components/BlogSection';
import InstagramFeed from '../components/InstagramFeed';






const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        { url: banner1, alt: "Dr. Joints Pain Relief oil." },
        { url: banner2, alt: "Dr. Joints Muscles Pain Relief oils." },
        { url: banner3, alt: "Dr. Joints Body pain relief oil." }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

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


const Product = ({ currentLang, translations }) => {
    const [showPopup, setShowPopup] = useState(false);
    const productRef = useRef(null);

    const mediaLinks = [
        { 
            title: 'Daily Hunt',
            link: 'http://m.dailyhunt.in/news/india/english/republic+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/dr+joints+pain+relief+oil+expanding+indian+ayurveda+to+uae-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_0195d5c0cd9611efbfff30234ee32bf7?sm=Y',
            icon: '📰',
            source: 'Daily Hunt'
        },
        { 
            title: 'Republic News India',
            link: 'https://republicnewsindia.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: '📰',
            source: 'Republic News'
        },
        { 
            title: 'Flipboard',
            link: 'https://flipboard.com/@republicnewsind/-dr-joints-pain-relief-oil-expanding-ind/a-V8D2Oej2QgGHtagao7JlCQ%3Aa%3A3544623556-7947af09c2%2Frepublicnewsindia.com',
            icon: '🔖',
            source: 'Flipboard'
        },
        { 
            title: 'The Indian Bulletin',
            link: 'https://theindianbulletin.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: '📰',
            source: 'Indian Bulletin'
        },
        { 
            title: 'RD Times',
            link: 'https://rdtimes.in/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: '📰',
            source: 'RD Times'
        },
        { 
            title: 'Abhyuday Times',
            link: 'https://abhyudaytimes.com/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: '📰',
            source: 'Abhyuday Times'
        },
        { 
            title: 'Indian Sentinel',
            link: 'https://indiansentinel.in/dr-joints-pain-relief-oil-expanding-indian-ayurveda-to-uae/',
            icon: '📰',
            source: 'Indian Sentinel'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowPopup(true);
                }
            },
            { threshold: 0.3 }
        );

        if (productRef.current) {
            observer.observe(productRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={productRef} className="min-h-screen bg-[#F0E7E5] p-8 relative">
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl p-6 z-50 
                            transition-all duration-500 w-[90%] max-w-2xl border border-blue-100
                            ${showPopup ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="relative">
                    <button 
                        onClick={() => setShowPopup(false)}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2
                                 hover:bg-red-600 transition-colors z-10 shadow-lg"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 
                                     text-transparent bg-clip-text">Featured Media Coverage</h3>
                        <p className="text-gray-600">Dr. Joints in the news</p>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {mediaLinks.map((item, index) => (
                            <a 
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white hover:bg-blue-50 rounded-xl p-4 mb-3 block
                                         transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl 
                                         border border-gray-100 hover:border-blue-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 text-blue-700 p-3 rounded-full flex-shrink-0
                                                  group-hover:bg-blue-200 transition-colors">
                                        <span className="text-2xl">{item.icon}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 
                                                     transition-colors text-lg">{item.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            Dr. Joints Pain Relief Oil: Expanding Indian Ayurveda to UAE
                                        </p>
                                        <div className="mt-1 flex items-center">
                                            <span className="bg-blue-50 text-blue-700 text-xs py-1 px-2 rounded-full">
                                                {item.source}
                                            </span>
                                            <span className="text-xs text-gray-400 ml-auto flex items-center">
                                                View Article 
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">Expanding Indian Ayurveda to UAE and beyond</p>
                    </div>
                </div>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-blue-900 text-4xl font-bold mb-4">{translations[currentLang].product.title}</h1>
                <h2 className="text-amber-800 text-2xl font-semibold">{translations[currentLang].product.subtitle}</h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 pr-4">
                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content1}</p>

                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content2}</p>

                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content3}</p>
                    <button className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" ><a href="/product">Buy Now</a></button>
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
    );
};


const About = ({ currentLang, translations }) => {
    return (
        <div className="">
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
                    <img src={producticon} className='fixed z-10 bottom-14 md:bottom-0 left-0 w-48' />
                </a>
                <Hero currentLang={currentLang} />
                <ProductSection currentLang={currentLang} />
                <Secondsection />
                <Product currentLang={currentLang} translations={translations} />
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