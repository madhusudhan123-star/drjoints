import React, { useEffect } from 'react'
import FAQ from '../components/FAQ';
import { ShieldCheck, Users, Heart, Award, Check, ArrowRight, Star, Activity, Leaf, Zap } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet'; // You may need to install this package
import about from '../assets/about2.webp'; // Adjust the path as necessary

const About = ({ currentLang, translations }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '100%', label: 'Natural Ingredients' },
        { number: '15+', label: 'Years Experience' },
        { number: '24/7', label: 'Customer Support' }
    ];

    const values = [
        {
            icon: ShieldCheck,
            title: 'Quality Assurance',
            description: 'We maintain highest standards in our products'
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your wellness is our top priority'
        },
        {
            icon: Heart,
            title: 'Natural Care',
            description: 'Pure Ayurvedic ingredients for better health'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Committed to delivering the best results'
        }
    ];
    
    const achievements = [
        "GMP Certified Manufacturing",
        "ISO 9001:2015 Certified",
        "Expert Ayurvedic Practitioners",
        "Advanced R&D Facility"
    ];

    const productBenefits = [
        { 
            icon: Activity, 
            title: 'Joint Pain Relief', 
            description: 'Effectively reduces inflammation and joint pain with natural ingredients' 
        },
        { 
            icon: Leaf, 
            title: 'All-Natural Formula', 
            description: 'Made with 100% natural Ayurvedic herbs and ingredients' 
        },
        { 
            icon: Zap, 
            title: 'Fast Acting', 
            description: 'Begin experiencing relief within days of consistent use' 
        },
        { 
            icon: ShieldCheck, 
            title: 'No Side Effects', 
            description: 'Safe for long-term use without harmful side effects' 
        }
    ];

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            position: 'Retired Teacher',
            quote: 'After 20 years of joint pain, I finally found relief with Dr. Joints products. My mobility has improved significantly.',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            position: 'Yoga Instructor',
            quote: 'I recommend Dr. Joints products to all my students who experience joint discomfort. The results speak for themselves!',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5
        },
        {
            name: 'Amitabh Singh',
            position: 'Sports Coach',
            quote: 'These Ayurvedic formulations have been a game-changer for my athletes. Quick recovery and effective pain management.',
            image: 'https://randomuser.me/api/portraits/men/67.jpg',
            rating: 4
        }
    ];

    const timelineEvents = [
        { year: '2005', title: 'Foundation', description: 'Established with a vision to bring Ayurvedic healing to modern lives' },
        { year: '2010', title: 'Product Innovation', description: 'Launched our flagship joint pain relief formulation' },
        { year: '2015', title: 'Manufacturing Excellence', description: 'Set up state-of-the-art GMP certified production facility' },
        { year: '2020', title: 'Global Expansion', description: 'Extended our reach to international markets with proven formulas' },
        { year: '2023', title: 'Digital Transformation', description: 'Enhanced accessibility through e-commerce and digital consultation' }
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            <Helmet>
                <title>About Dr. Joints | Premium Ayurvedic Joint Pain Solutions</title>
                <meta 
                    name="description" 
                    content="Learn about Dr. Joints' premium Ayurvedic formulations for joint pain relief. Discover our story, values, and commitment to natural healing through authentic Ayurvedic principles."
                />
                <meta 
                    name="keywords" 
                    content="Ayurvedic joint pain, natural joint relief, Dr. Joints, Ayurvedic medicine, GMP certified"
                />
            </Helmet>

            {/* Hero Section with Animated Overlay */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            {translations[currentLang].about.title}
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Transforming lives through natural healing solutions with the power of Ayurveda
                        </p>
                        {/* <div className="mt-8 flex justify-center gap-4">
                            <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all">
                                Learn More
                            </button>
                            <button className="px-8 py-3 border border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                                Contact Us
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Mission Section with Floating Cards */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative" data-aos="fade-right">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <img
                            src={translations[currentLang].aboutpage.img}
                            alt="Our mission"
                            className="relative rounded-2xl shadow-2xl"
                        />
                        {/* <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                            <p className="text-3xl font-bold text-blue-900">15+ Years</p>
                            <p className="text-gray-600">of Excellence</p>
                        </div> */}
                    </div>

                    <div className="space-y-8" data-aos="fade-left">
                        <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            Empowering Health Through <span className="text-blue-600">Natural Solutions</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {translations[currentLang].about.content1}
                        </p>
                        <div className="space-y-4">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Showcase Section */}
            {/* <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium mb-4">
                        Our Products
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Premium Ayurvedic Solutions for <span className="text-blue-600">Joint Health</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover our range of specialized formulations crafted from nature's finest ingredients
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="h-64 overflow-hidden">
                                <img 
                                    src={`https://source.unsplash.com/random/600x400/?ayurveda,herbs&sig=${index}`}
                                    alt={`Joint Relief Product ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-2">
                                    100% Natural
                                </div>
                                <h3 className="text-xl font-bold mb-2">Premium Joint Relief Formula {index + 1}</h3>
                                <p className="text-gray-600 mb-4">Advanced Ayurvedic formulation for long-lasting joint pain relief and improved mobility.</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Stats Section with Animation */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2" data-aos="zoom-in" data-aos-delay={index * 100}>
                                <div className="w-16 h-16 mx-auto bg-blue-800/50 rounded-xl flex items-center justify-center mb-4">
                                    <p className="text-4xl font-bold">{stat.number}</p>
                                </div>
                                <p className="text-blue-200 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8" data-aos="fade-right">
                        <div className="inline-block rounded-lg bg-green-50 px-3 py-1 text-sm text-green-600 font-medium">
                            Why Choose Us
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            The Natural Approach to <span className="text-green-600">Joint Health</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our scientifically backed Ayurvedic formulations address the root causes of joint pain rather than merely masking symptoms, providing lasting relief without side effects.
                        </p>
                        
                        <div className="space-y-6">
                            {productBenefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <benefit.icon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative" data-aos="fade-left">
                        <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <img
                            src={about}
                            alt="Natural ingredients for joint health"
                            className="relative rounded-2xl shadow-2xl w-full"
                        />
                        {/* <div className="absolute -top-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                            <p className="text-3xl font-bold text-green-600">100%</p>
                            <p className="text-gray-600">Natural Formula</p>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Manufacturing Process */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                        <div className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600 font-medium mb-4">
                            Our Process
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            From Nature to Wellness
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Our rigorous production process ensures the highest quality and efficacy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {['Ingredient Selection', 'Traditional Processing', 'Quality Testing', 'Sustainable Packaging'].map((step, index) => (
                            <div 
                                key={index} 
                                className="relative"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="bg-white rounded-xl p-6 shadow-lg relative z-10">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step}</h3>
                                    <p className="text-gray-600">
                                        {index === 0 && "We source the finest herbs from organic farms across India, ensuring purity and potency."}
                                        {index === 1 && "Following ancient Ayurvedic methods combined with modern technology for optimal extraction."}
                                        {index === 2 && "Rigorous quality checks at every stage to guarantee safety and effectiveness."}
                                        {index === 3 && "Eco-friendly packaging that preserves product integrity while protecting the environment."}
                                    </p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-blue-100 -translate-y-1/2 z-0" style={{width: "calc(100% - 2rem)"}} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            {/* <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <div className="inline-block rounded-lg bg-yellow-50 px-3 py-1 text-sm text-yellow-600 font-medium mb-4">
                        Success Stories
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Real experiences from people who transformed their lives with our products
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.position}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Company Timeline */}
            {/* <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                        <div className="inline-block rounded-lg bg-blue-800 px-3 py-1 text-sm text-blue-200 font-medium mb-4">
                            Our Journey
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Milestones in Our History
                        </h2>
                        <p className="text-blue-200 text-lg">
                            The evolution of our commitment to Ayurvedic excellence
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-700 transform -translate-x-1/2"></div>
                        
                        <div className="space-y-24">
                            {timelineEvents.map((event, index) => (
                                <div 
                                    key={index} 
                                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                                >
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 text-left'}`}>
                                        <div className="bg-blue-800/50 p-6 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-200 mb-2">{event.year}</div>
                                            <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                                            <p className="text-blue-100">{event.description}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute left-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-blue-300 transform -translate-x-1/2"></div>
                                    
                                    <div className="w-full md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Values Section with Hover Effects */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-gray-600">
                        Built on principles that prioritize your well-being and satisfaction
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay={index * 100} >
                            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                <value.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-24">
                <FAQ currentLang={currentLang} translations={translations} />
            </div>

            {/* Call to Action */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-blue-500 rounded-full opacity-20"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-blue-500 rounded-full opacity-20"></div>
                        
                        <div className="relative max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Experience the Natural Healing Power of Ayurveda Today
                            </h2>
                            <p className="text-blue-100 text-lg mb-8">
                                Join thousands of satisfied customers who've discovered effective, natural joint pain relief
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/product">
                                    <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all">
                                        Explore Products
                                    </button>
                                </a>
                                <a href="/contact">
                                    <button className="px-8 py-3 border border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                                        Contact Us
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;