import React, { useState, useEffect } from 'react';
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
import whatsappLogo from '../assets/whats.png';






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
            alt: "Dr. Joints Body pain relief oil"
        },
        {
            id: 2,
            image: card2,
            alt: "Dr. Joints Ayurvedic Body joints & Muscles Pain relief oil."
        },
        {
            id: 3,
            image: card3,
            alt: "Dr. Joints Ayurvedic Pain Relief oil."
        },
        {
            id: 4,
            image: card4,
            alt: "Dr. Joints Ayurvedic Body joints & Muscles Pain relief oil."
        }
    ];

    return (
        <div className="w-full py-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-20">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    >
                        <div className="aspect-w-4 aspect-h-3">
                            <a href='/product'>
                                <img
                                    src={card.image}
                                    alt={card.alt}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full px-4 sm:px-8 py-8 md:py-12 bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center items-center mx-auto">
                    <div data-aos="fade-right" data-aos-delay="0">
                        <img src={one} alt="Trusted Brand 1" className="max-w-full h-auto" />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="200">
                        <img src={two} alt="Trusted Brand 2" className="max-w-full h-auto" />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="400">
                        <img src={three} alt="Trusted Brand 3" className="max-w-full h-auto" />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="600">
                        <img src={four} alt="Trusted Brand 4" className="w-[8.5rem] h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};


const Product = ({ currentLang, translations }) => {
    return (
        <div className="min-h-screen bg-[#F0E7E5] p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-blue-900 text-4xl font-bold mb-4">{translations[currentLang].product.title}</h1>
                <h2 className="text-amber-800 text-2xl font-semibold">{translations[currentLang].product.subtitle}</h2>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="space-y-6 pr-4">
                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content1}</p>

                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content2}</p>

                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].product.content3}</p>
                    <button className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" ><a href="/product">Buy Now</a></button>
                </div>

                {/* Product Image */}
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
            {/* Header */}
            {/* <h1 className="text-4xl font-bold text-blue-900 text-center mb-10">{translations[currentLang].about.title}</h1> */}

            {/* Main Content Grid */}
            <div className="w-screen">  {/* grid grid-cols-1 lg:grid-cols-2 gap-8 */}
                {/* Left Column - Text Content */}
                {/* <div className="space-y-6">
                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].about.content1}</p>

                    <p className="text-gray-800 leading-relaxed">{translations[currentLang].about.content2}</p>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {translations[currentLang].about.question1}
                        </h2>

                        <ul className="space-y-4">
                            <li>
                                <strong className="text-gray-900">{translations[currentLang].about.question2}</strong>
                                <span className="text-gray-800">{translations[currentLang].about.answer1}</span>
                            </li>

                            <li>
                                <strong className="text-gray-900">{translations[currentLang].about.question3}</strong>
                                <span className="text-gray-800">{translations[currentLang].about.answer2}</span>
                            </li>

                            <li>
                                <strong className="text-gray-900">{translations[currentLang].about.question4}</strong>
                                <span className="text-gray-800">{translations[currentLang].about.answer3}</span>
                            </li>
                        </ul>
                    </div>
                </div> */}

                {/* Right Column - Video */}
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
                <div className="w-full py-10 md:py-20 relative">
                    <img
                        src={pain3}
                        className={`w-screen md: lg:h-[50vh] sm:h-full }`}
                    />
                    <h1 className="text-center text-4xl mt-3 text-white">Buy Now</h1>
                </div>
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
                    <img src={producticon} className='fixed bottom-0 left-0 w-1/5' />
                </a>
                <Hero currentLang={currentLang} />
                <ProductSection currentLang={currentLang} />
                <Product currentLang={currentLang} translations={translations} />
                <About currentLang={currentLang} translations={translations} />
                <FAQ currentLang={currentLang} translations={translations} />
                <Testimonials currentLang={currentLang} translations={translations} />
                <div className="fixed bottom-10 right-10 animate-bounce-slow">
                    <a
                        href="https://wa.me/9908016333"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={whatsappLogo}
                            alt="WhatsApp"
                            className="w-20 hover:scale-110 transition-transform duration-300"
                        />
                    </a>
                </div>
            </div>
        </div >
    );
};

export default Home;