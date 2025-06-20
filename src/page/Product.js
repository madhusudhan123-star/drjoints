import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import product from '../assets/product.webp';
import product1 from '../assets/product1.webp';
import product2 from '../assets/product2.webp';
import amazon from '../assets/icons/amazon.webp';
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
// import product4 from '../assets/images/six.webp';
import product5 from '../assets/images/nine.webp';



const Product = ({ translations, currentLang }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(0);    const [currency, setCurrency] = useState('INR'); // Default to INR
    const productPrice = currency === 'USD' ? 120 : 3990; // $120 for USD, ₹3990 for INR
    const originalPrice = currency === 'USD' ? 180 : 6990; // $180 for USD, ₹6990 for INR

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
    }, []);    const handleCheckout = () => {
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
                    </div>                    <a href={currency === 'USD' ? "https://www.amazon.in/" : "https://www.amazon.in/"} target="_blank" rel="noopener noreferrer" className='flex items-center gap-4 mb-6'>
                        <div className='flex items-center gap-4'>
                            <img src={amazon} alt="Amazon Logo" className="h-20" />
                            <img src={flipkart} alt="Flipkart Logo" className="h-20" />
                        </div>
                    </a>
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
                        <p className='text-blue-600 scada-regular text-sm'>Pain relief oils are therapeutic herbal oils created using time-tested formulations. These oils are typically made by infusing potent herbs into base oils. Each ingredient is selected for its specific healing properties, making these oils effective for managing pain without harmful chemicals.Try them for a natural and soothing way to feel better.</p>
                        <div className='flex items-center gap-2 my-4 scada-regular'>
                            <span className="text-lg font-medium text-gray-600">4.5/5</span>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                <span key={index} className={`text-2xl ${index < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                </span>
                                ))}
                            </div>
                        </div>
                        <div className=' flex items-start gap-5 flex-col'>
                            <div className='flex items-center gap-2'>
                                <p className='line-through text-gray-400 text-3xl'>{formatPrice(originalPrice)}</p>
                                <p className='text-xl font-bold text-red-600'>{formatPrice(productPrice)}</p>
                                <span className='bg-blue-500 text-white px-2 py-1 rounded-2xl text-sm'>Lowest price</span>
                            </div>                            <div className='flex items-center gap-4'>
                                <a href={currency === 'USD' ? "https://www.amazon.com/" : "https://www.amazon.in/"} target="_blank" rel="noopener noreferrer">
                                    <img src={amazon} alt="Amazon Logo" className="h-20" />
                                </a>
                                {/* <img src={flipkart} alt="Flipkart Logo" className="h-20" /> */}
                            </div>
                            <div className='w-full h-[1px] bg-black'></div>
                            {/* <div className='w-1/2'>
                                <p className='text-lg text-gray-500'>Select Variant</p>
                                <div className='flex items-center gap-2'>
                                    <div className='border border-green-600 rounded-lg border-2 w-full cursor-pointer'>
                                        <div className='bg-green-500 text-white p-2 rounded-t-lg'>
                                            100 ml
                                        </div>
                                        <div>
                                            <div className='flex items-center gap-2 p-2'>
                                                <p className='line-through text-gray-400 text-xl'>{formatPrice(originalPrice)}</p>
                                                <p className='text-lg text-black'>{formatPrice(productPrice)}</p>
                                            </div>
                                            <p className='text-2xl text-green-500'> 3 Bottles</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <img src={stamps} alt="Stamps" className="" />
                            </div>
                            {/* Desktop Quantity and Buy Button */}
                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="quantity" className="text-lg text-gray-700">Quantity:</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
                                >
                                    Buy Now 
                                </button>
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

                {/* Mobile: Price and Variant Selection - Shows after images on mobile */}
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
                        
                        {/* Mobile Buy Button */}
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4">
                                <label htmlFor="quantity-mobile" className="text-lg text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity-mobile"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-500 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
                            >
                                Buy Now
                            </button>
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