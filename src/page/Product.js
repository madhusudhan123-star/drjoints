import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import product1 from '../assets/product1.webp';
import product2 from '../assets/product2.webp';
import amazon from '../assets/images/amazon.webp';
import flipkart from '../assets/icons/flipkart.webp';
import stamps from '../assets/icons/stamps.webp';

import one from '../assets/ing/8.webp';
import two from '../assets/ing/4.webp';
import three from '../assets/ing/4.webp';
import four from '../assets/ing/3.webp';
import five from '../assets/ing/6.webp';
import six from '../assets/ing/5.webp';
import seven from '../assets/ing/11.webp';
import eight from '../assets/ing/12.webp';
import nine from '../assets/ing/7.webp';
import ten from '../assets/ing/1.webp';
import eleven from '../assets/ing/2.webp';
import twelve from '../assets/ing/9.webp';

import product3 from '../assets/images/eight.webp';
import product5 from '../assets/images/nine.webp';



const Product = ({ translations, currentLang }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
    const [currency, setCurrency] = useState('INR');
    const productPrice = currency === 'USD' ? 120 : 3990;
    const originalPrice = currency === 'USD' ? 180 : 6990;

    // Format price based on detected currency
    const formatPrice = (price) => {
        if (currency === 'USD') {
            return `$${price}`;
        }
        return `₹${price}`;
    };

    // Detect user's country and set currency
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                if (data.country !== 'IN') {
                    setCurrency('USD');
                }
            })
            .catch(error => {
                console.error('Error detecting location:', error);
            });
    }, []);

    // Auto-slide offers every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedOffer((prev) => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 23, minutes: 59, seconds: 59 }; // Reset
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckout = () => {
        const currentProductPrice = currency === 'USD' ? 120 : 3990;
        navigate('/checkout', {
            state: {
                quantity,
                totalAmount: quantity * currentProductPrice,
                productName: 'Pain Relief Oil For Muscles',
                unitPrice: currentProductPrice,
                currency: currency
            }
        });
    };
    const handleCheckout2 = () => {
        navigate('https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB')
    }

    const productImages = [product1, product2, product3, product5];

    return (
        <div className="w-full">
            {/* Trust Indicators Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-lg p-6 mb-8 md:block hidden ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-gray-800">COD Available</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-gray-800">Quick Delivery</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-gray-800">World-wide Shipping</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile: Title, Description, Reviews - Shows first on mobile only */}
                <div className="md:hidden w-full">
                    <h1 className="text-3xl font-bold montserrat text-gray-800 mb-2">Pain Relief Oil For Muscles</h1>
                    <p className='text-blue-600 scada-regular text-sm mb-4'>Helps Relieve All Types of Joint & Nerve Pain | With Castor Oil, Gaultheria Oil, Eucalyptus Oil, Arnica Oil & Myrrh Oil | 100% Natural</p>
                    <div className='flex items-center gap-2 mb-6 scada-regular'>
                        <span className="text-lg font-medium text-gray-600">4.5/5</span>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                            <span key={index} className={`text-2xl ${index < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                            </span>
                            ))}
                        </div>
                    </div>                    
                    {/* <a href={currency === 'USD' ? "https://www.amazon.in/" : "https://www.amazon.in/"} target="_blank" rel="noopener noreferrer" className='flex items-center gap-4 mb-6'> */}
                        <div className='flex items-center gap-4'>
                            {/* <img src={amazon} alt="Amazon Logo" className="h-20" /> */}
                            {/* <img src={flipkart} alt="Flipkart Logo" className="h-20" /> */}
                        </div>
                    {/* </a> */}
                </div>

                {/* Product Images Section */}
                <div className="md:w-1/2 w-full md:order-1">
                    {/* Main Image */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={productImages[selectedImage]}
                            alt="DR. Joints Pain Relief Oil"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                            >
                                <img
                                    src={img}
                                    alt={`Product view ${index + 1}`}
                                    className="w-full h-auto object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop: Complete Product Info Section */}
                <div className="hidden md:block md:w-1/2 w-full md:order-2">
                    <div>
                        <h1 className="text-3xl font-bold montserrat text-gray-800 mb-2">Pain Relief Oil For Muscles</h1>
                        <p className='text-black text-sm'>Pain relief oils are therapeutic herbal oils created using time-tested formulations. These oils are typically made by infusing potent herbs into base oils. Each ingredient is selected for its specific healing properties, making these oils effective for managing pain without harmful chemicals.Try them for a natural and soothing way to feel better.</p>
                        
                        {/* <div className='flex items-center gap-2 my-4 scada-regular'>
                            <span className="text-lg font-medium text-gray-600">4.5/5</span>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                <span key={index} className={`text-2xl ${index < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                </span>
                                ))}
                            </div>
                        </div> */}

                        <div className='flex items-start gap-5 flex-col'>
                            {/* <div className='flex items-center gap-2'>
                                <p className='line-through text-gray-400 text-3xl'>{formatPrice(originalPrice)}</p>
                                <p className='text-xl font-bold text-red-600'>{formatPrice(productPrice)}</p>
                                <span className='bg-blue-500 text-white px-2 py-1 rounded-2xl text-sm'>Discounted Price</span>
                            </div> */}
                            
                            <div className='w-full h-[1px] bg-gray-300'></div>
                            <div>
                                <img src={stamps} alt="Stamps" className="" />
                            </div>

                            {/* Enhanced Desktop Buy Section with Urgency */}
                            <div className="w-full mt-6 overflow-x-hidden">
                                {/* Urgency Banner */}
                                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg mb-4 animate-pulse">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-bold text-sm">LIMITED TIME OFFER!</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs opacity-90">Ends in:</div>
                                            <div className="flex space-x-1 text-sm font-mono">
                                                <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                                                <span>:</span>
                                                <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                                <span>:</span>
                                                <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stock Alert */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                        <span className="text-yellow-800 font-medium text-sm">⚡ Only 7 bottles left in stock!</span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '15%' }}></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">85% sold out today</p>
                                    </div>
                                </div>

                                {/* Enhanced Buy Now Section */}
                                <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-2xl border-4 border-green-300 relative overflow-hidden">
                                    {/* Animated Background Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                                    
                                        {/* Main CTA Button */}
                                        <div className='flex gap-5'>
                                            <button onClick={handleCheckout} className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-800 py-4 rounded-xl text-xl font-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group" >
                                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                                    <span>BUY NOW </span>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                            </button>
                                            <button id="amazon" onClick={handleCheckout2} className="w-full flex items-center justify-center bg-white hover:bg-white text-black py-4 rounded-xl text-xl font-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group" >
                                                <a href="https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB" target="_blank" rel="noopener noreferrer">
                                                    <img src={amazon} alt="Amazon Logo" className="w-20" />
                                                    <span className="relative z-10 flex items-center justify-center space-x-2">
                                                        <span>Amazon</span>
                                                    </span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                </a>
                                            </button>
                                        </div>

                                    <div className="relative z-10">
                                        {/* Special Offer Badge */}
                                        <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12 animate-bounce">
                                            SAVE 43%
                                        </div>

                                        <div className="text-center mb-4">
                                            <h3 className="text-2xl font-bold mb-2">🔥 FLASH SALE ACTIVE 🔥</h3>
                                            <p className="text-green-100 text-sm">Get instant relief at the lowest price ever!</p>
                                        </div>

                                        {/* Price Display */}
                                        <div className="text-center mb-6">
                                            <div className="flex items-center justify-center space-x-3 mb-2">
                                                <span className="text-3xl font-bold line-through text-red-200">{formatPrice(originalPrice)}</span>
                                                <span className="text-4xl font-black text-yellow-300">{formatPrice(productPrice)}</span>
                                            </div>
                                            <div className="bg-yellow-400 text-green-800 px-4 py-1 rounded-full inline-block text-sm font-bold">
                                                You Save {formatPrice(originalPrice - productPrice)}!
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="flex items-center justify-center space-x-4 mb-6">
                                            <label className="text-white font-medium">Quantity:</label>
                                            <div className="flex items-center bg-white rounded-lg">
                                                <button 
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="text-green-600 px-3 py-2 font-bold hover:bg-gray-100 rounded-l-lg"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                    className="w-16 text-center py-2 text-green-800 font-bold border-0 focus:outline-none"
                                                />
                                                <button 
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="text-green-600 px-3 py-2 font-bold hover:bg-gray-100 rounded-r-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                       

                                        {/* Trust Badges */}
                                        <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                                            <div className="text-center">
                                                <div className="text-green-200">🚚</div>
                                                <div>FREE Shipping</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-green-200">💰</div>
                                                <div>COD Available</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-green-200">🔄</div>
                                                <div>15-Day Return</div>
                                            </div>
                                        </div>

                                        {/* Social Proof */}
                                        <div className="mt-4 text-center">
                                            <div className="flex items-center justify-center space-x-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="text-yellow-300 text-lg">⭐</span>
                                                ))}
                                            </div>
                                            <p className="text-green-100 text-sm">🔥 2,847 customers bought this today!</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bonus Offers */}
                                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-bold text-blue-800 mb-2">🎁 EXCLUSIVE BONUSES:</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>✅ FREE Pain Relief Guide (₹299 value)</li>
                                        <li>✅ FREE Consultation Call (₹500 value)</li>
                                        <li>✅ Priority Customer Support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Desktop slider section */}
                    <div className="bg-white rounded-lg p-4 mt-6 overflow-hidden relative">
                        <div className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${selectedOffer * 100}%)`,
                                width: '400%'
                            }}>
                            { [
                                {
                                    title: "Available Offer",
                                    subtitle: "45 Days Course",
                                    description: "Complete course designed for 45 days of use",
                                    color: "bg-white"
                                },                                  
                                {
                                    title: "Available offer",
                                    subtitle: "15 Days Return Policy",
                                    description: "Hassle-free returns within 15 days",
                                    color: "bg-white"
                                },
                                {
                                    title: "Available Offer",
                                    subtitle: "Buy 3 Cans Pack (11 fl oz each)",
                                    description: "Best value for money deal — enjoy three convenient 11 fl oz cans.",
                                    color: "bg-white"
                                }                                  
                            ].map((offer, index) => (
                                <div key={index} className={`w-full flex-shrink-0 ${offer.color} p-4 rounded-lg border border-gray-200`}>
                                    <div className="pdp-coupon">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{offer.title}</h3>
                                        <h4 className="text-xl text-gray-900 mb-2">{offer.subtitle}</h4>
                                        <p className="text-gray-700">{offer.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Enhanced Buy Section */}
                <div className="md:hidden w-full">
                    <div className=' flex items-start gap-5 flex-col'>
                        <div className='flex items-center gap-2'>
                            <p className='line-through text-gray-400 text-3xl'>{formatPrice(originalPrice)}</p>
                            <p className='text-xl font-bold text-red-600'>{formatPrice(productPrice)}</p>
                            <span className='bg-blue-500 text-white px-2 py-1 rounded-2xl text-sm'>Lowest price</span>
                        </div>
                        <p className='text-gray-500'>Incl. of all taxes</p>
                        <div>
                            <img src={stamps} alt="Stamps" className="" />
                        </div>
                        
                        {/* Mobile Urgency Section */}
                        <div className="w-full">
                            {/* Mobile Urgency Banner */}
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg mb-4 animate-pulse">
                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-2 mb-1">
                                        <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-bold text-sm">FLASH SALE!</span>
                                    </div>
                                    <div className="flex justify-center space-x-1 text-sm font-mono">
                                        <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                                        <span>:</span>
                                        <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                        <span>:</span>
                                        <span className="bg-white bg-opacity-20 px-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Stock Alert */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                    <span className="text-yellow-800 font-medium text-sm">Only 7 left!</span>
                                </div>
                            </div>

                            {/* Mobile Enhanced Buy Button */}
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-xl relative overflow-hidden">
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-bold mb-1">🔥 GET INSTANT RELIEF! 🔥</h3>
                                    <div className="bg-yellow-400 text-green-800 px-3 py-1 rounded-full inline-block text-xs font-bold">
                                        SAVE {formatPrice(originalPrice - productPrice)}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center space-x-3 mb-4">
                                    <label className="text-white font-medium text-sm">Qty:</label>
                                    <div className="flex items-center bg-white rounded-lg">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="text-green-600 px-2 py-1 font-bold"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                            className="w-12 text-center py-1 text-green-800 font-bold border-0 focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="text-green-600 px-2 py-1 font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-800 py-4 rounded-xl text-lg font-black transform active:scale-95 transition-all duration-200 shadow-lg"
                                    >
                                        BUY NOW - INSTANT RELIEF!
                                    </button>
                                    <button
                                        id="amazon"
                                        className="w-full bg-white hover:bg-white text-black py-4 rounded-xl text-lg font-black transform active:scale-95 transition-all duration-200 shadow-lg">
                                        <a href="https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB" target="_blank" rel="noopener noreferrer">
                                            <img src={amazon} alt="Amazon Logo" className="w-20 mx-auto mb-2" />
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                <span>Buy on Amazon</span>
                                            </span>
                                        </a>
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-center">
                                    <div>🚚 FREE Ship</div>
                                    <div>💰 COD</div>
                                    <div>🔄 15-Day Return</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile slider section */}
                    <div className="bg-white rounded-lg p-4 mt-6 overflow-hidden relative">
                        <div className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${selectedOffer * 100}%)`,
                                width: '400%'
                            }}>
                            { [
                                {
                                    title: "Available offer",
                                    subtitle: "10% Off on Online Payment",
                                    description: "Extra discount on prepaid orders",
                                    color: "bg-white"
                                },
                                {
                                    title: "Available offer",
                                    subtitle: "15 Days Return Policy",
                                    description: "Hassle-free returns within 15 days",
                                    color: "bg-white"
                                },
                                {
                                    title: "Available offer",
                                    subtitle: "Buy 3 Bottles Pack",
                                    description: "Best value for money deal",
                                    color: "bg-white"
                                }
                            ].map((offer, index) => (
                                <div key={index} className={`w-full flex-shrink-0 ${offer.color} p-4 rounded-lg border border-gray-200`}>
                                    <div className="pdp-coupon">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{offer.title}</h3>
                                        <h4 className="text-xl text-gray-900 mb-2">{offer.subtitle}</h4>
                                        <p className="text-gray-700">{offer.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Benefits Section */}
          

            {/* Key Ingredients Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Ingredients</h2>
                        <p className="text-xl text-gray-600">Powerful natural ingredients with precise quantities for maximum effectiveness</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        { [
                            { name: "Madar", quantity: "400 mg", benefit: "Anti-inflammatory", description: "Reduces inflammation and swelling", image: one },
                            // { name: "Sonth (Ginger)", quantity: "350 mg", benefit: "Pain relief", description: "Natural analgesic properties", image: two },
                            { name: "Giloy", quantity: "1200 mg", benefit: "Immunity booster", description: "Enhances natural healing process", image: three },
                            { name: "Ajwain", quantity: "800 mg", benefit: "Muscle relaxant", description: "Relieves muscle tension and spasms", image: four },
                            { name: "Ashwagandha", quantity: "600 mg", benefit: "Stress relief", description: "Reduces stress-related pain", image: five },
                            { name: "Suranjan Talkh", quantity: "650 mg", benefit: "Joint health", description: "Supports joint mobility and flexibility", image: six },
                            // { name: "Gule Bebuna", quantity: "600 mg", benefit: "Anti-rheumatic", description: "Effective against rheumatic pain", image: "https://via.placeholder.com/500x500/10b981/ffffff?text=" },
                            { name: "Narkachur", quantity: "400 mg", benefit: "Nerve pain", description: "Soothes nerve-related discomfort", image: seven },
                            { name: "Kalonji", quantity: "1400 mg", benefit: "Healing properties", description: "Promotes faster tissue repair", image: eight },
                            { name: "Methi (Fenugreek)", quantity: "850 mg", benefit: "Anti-inflammatory", description: "Reduces chronic inflammation", image: nine },
                            // { name: "Bhasm Phasphoras", quantity: "1.00 mg", benefit: "Bone health", description: "Strengthens bones and joints", image: "https://via.placeholder.com/500x500/10b981/ffffff?text=" },
                            { name: "Til Oil (Sesame)", quantity: "7.50 ml", benefit: "Deep penetration", description: "Carrier oil for better absorption", image: ten },
                            { name: "Alsi (Flaxseed)", quantity: "20 ml", benefit: "Omega fatty acids", description: "Nourishes and repairs tissues", image: eleven },
                            { name: "Peppermint", quantity: "2.5 ml", benefit: "Cooling effect", description: "Provides instant cooling relief", image: twelve },
                            // { name: "Arandi Oil (Castor)", quantity: "q.s to 100 ml", benefit: "Base oil", description: "Primary carrier with healing properties", image: "https://via.placeholder.com/500x500/10b981/ffffff?text=" }
                        ].map((ingredient, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
                                {/* Ingredient Image */}
                                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
                                    <img 
                                        src={ingredient.image} 
                                        alt={ingredient.name}
                                        className="w-full h-full  hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/500x500/10b981/ffffff?text=' + encodeURIComponent(ingredient.name);
                                        }}
                                    />
                                </div>
                                
                                <div className="flex items-start justify-between mb-3">
                                    <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                        {ingredient.quantity}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{ingredient.name}</h3>
                                <p className="text-green-600 font-semibold mb-2">{ingredient.benefit}</p>
                                <p className="text-gray-600 text-sm">{ingredient.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Ingredient Summary */}
                    <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete Natural Formula</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Our pain relief oil contains 15 carefully selected natural ingredients, 
                            each in precise quantities for optimal therapeutic effect.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">15</div>
                                <div className="text-sm text-gray-600">Natural Ingredients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">100ml</div>
                                <div className="text-sm text-gray-600">Total Volume</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">0%</div>
                                <div className="text-sm text-gray-600">Chemical Additives</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600">100%</div>
                                <div className="text-sm text-gray-600">Natural & Safe</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Pain-Free Life?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who have found relief with Dr. Joints Pain Relief Oil</p>
                    <button
                        onClick={handleCheckout}
                        className="bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors shadow-xl"
                    >
                        Order Now
                    </button>
                    <div className="flex items-center justify-center mt-6 gap-8 text-blue-100">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>15 Days Return</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>100% Natural</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;


            // {/* How to Use Section */}
            // <div className="py-16">
            //     <div className="container mx-auto px-4">
            //         <div className="text-center mb-12">
            //             <h2 className="text-4xl font-bold text-gray-800 mb-4">How to Use</h2>
            //             <p className="text-xl text-gray-600">Simple steps for maximum effectiveness</p>
            //         </div>
                    
            //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            //             { [
            //                 {
            //                     step: "2",
            //                     title: "Apply Oil",
            //                     description: "Take 3-4 drops and apply to the painful area",
            //                     image: "https://via.placeholder.com/500x500/10b981/ffffff?text=Repeat+Daily"
            //                 },
            //                 {
            //                     step: "3",
            //                     title: "Massage Gently",
            //                     description: "Massage in circular motions for 5-10 minutes",
            //                     image: "https://via.placeholder.com/500x500/10b981/ffffff?text=Repeat+Daily"
            //                 },
            //                 {
            //                     step: "4",
            //                     title: "Repeat Daily",
            //                     description: "Use 2-3 times daily for best results",
            //                     image: "https://via.placeholder.com/500x500/10b981/ffffff?text=Repeat+Daily"
            //                 }
            //             ].map((step, index) => (
            //                 <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            //                     {/* Step Image */}
            //                     <div className="w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-100">
            //                         <img 
            //                             src={step.image} 
            //                             alt={step.title}
            //                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            //                             style={{ width: '500px', height: '500px', objectFit: 'cover' }}
            //                             onError={(e) => {
            //                                 e.target.src = 'https://via.placeholder.com/500x500/3b82f6/ffffff?text=Step+' + step.step;
            //                             }}
            //                         />
            //                     </div>
                                
            //                     <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            //                         {step.step}
            //                     </div>
            //                     <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
            //                     <p className="text-gray-600">{step.description}</p>
            //                 </div>
            //             ))}
            //         </div>
            //     </div>
            // </div>