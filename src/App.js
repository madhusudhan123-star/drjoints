import React, { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import './App.css';

// Keep only essential imports
import Navbar from './components/Navbar';
import MinimalNavbar from './components/MinimalNavbar';
import Footer from './components/Footer';

// Move translations to separate file to reduce bundle size
import { translations, blogPosts } from './data/translations';

// Lazy load page components with better error boundaries
const Home = lazy(() => import(/* webpackChunkName: "home" */ './page/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './page/About'));
const Product = lazy(() => import(/* webpackChunkName: "product" */ './page/Product'));
const Return = lazy(() => import(/* webpackChunkName: "policies" */ './page/Return'));
const Privacy = lazy(() => import(/* webpackChunkName: "policies" */ './page/Privacy'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './page/Contact'));
const Checkout = lazy(() => import(/* webpackChunkName: "checkout" */ './page/Checkout'));
const TermsAndConditions = lazy(() => import(/* webpackChunkName: "policies" */ './page/Terms'));
const CancelPolicy = lazy(() => import(/* webpackChunkName: "policies" */ './page/Cancel'));
const ShippingPolicy = lazy(() => import(/* webpackChunkName: "policies" */ './page/Shipping'));
const Checkout_two = lazy(() => import(/* webpackChunkName: "checkout" */ './page/Checkout_two'));
const Checkout_test1 = lazy(() => import(/* webpackChunkName: "checkout-tests" */ './page/Checkout_test1'));
const Checkout_test2 = lazy(() => import(/* webpackChunkName: "checkout-tests" */ './page/Checkout_test2'));
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ './page/Blog'));
const BlogDetail = lazy(() => import(/* webpackChunkName: "blog" */ './page/BlogDetail'));
const Landing = lazy(() => import(/* webpackChunkName: "landing" */ './page/Landing'));
const ThankYou = lazy(() => import(/* webpackChunkName: "misc" */ './page/ThankYou'));
const Landing_two = lazy(() => import(/* webpackChunkName: "landing" */ './page/Landing_two'));
const Landing_three = lazy(() => import(/* webpackChunkName: "landing" */ './page/Landing_three'));


// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
);

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Simplified language options
const languages = [{ code: 'en', name: 'English' }];

const App = () => {
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleCall = () => {
    window.location.href = 'tel:+919908016333';
  };

  // Component to conditionally render Navbar
  const ConditionalNavbar = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/Drjoints';
    const isLandingPage2 = location.pathname === '/Drjoints2';
    const isLandingPage3 = location.pathname === '/Drjoints3';
    const isAgentPage = location.pathname === '/agent';
    
    if (isLandingPage || isLandingPage2 || isLandingPage3 || isAgentPage) {
      return (isLandingPage || isLandingPage2 || isLandingPage3) ? <MinimalNavbar /> : null;
    } else {
      return <Navbar currentLang={currentLang} setCurrentLang={handleLanguageChange} translations={translations || {}} languages={languages} />;
    }
  };

  // Component to conditionally render Footer
  const ConditionalFooter = () => {
    const location = useLocation();
    const shouldShowFooter = location.pathname !== '/Drjoints' && 
                           location.pathname !== '/Drjoints2' && 
                           location.pathname !== '/Drjoints3' && 
                           location.pathname !== '/agent';
    
    return shouldShowFooter ? (
      <Footer currentLang={currentLang} translations={translations || {}} />
    ) : null;
  };

  return (
    <div>
      {/* Mobile call button - only load on mobile */}
      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 
                        flex justify-around items-center py-3 px-4 space-x-4">
        <button
          onClick={handleCall}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-full 
                       flex items-center justify-center space-x-2 shadow-md
                       active:scale-95 transition-transform"
        >
          <FaPhoneAlt className="text-lg" />
          <span className="text-sm font-medium">Call Now</span>
        </button>
      </div> */}

      <BrowserRouter>
        <ScrollToTop />
        <ConditionalNavbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path='/' element={<Home currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/about' element={<About currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/product' element={<Product currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/return' element={<Return currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/privacy' element={<Privacy currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/contact' element={<Contact currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/checkout' element={<Checkout currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/checkouts' element={<Checkout_two currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/terms' element={<TermsAndConditions currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/cancel' element={<CancelPolicy currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/shipping' element={<ShippingPolicy currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/checkout_test_two' element={<Checkout_test1 currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/checkout_test_three' element={<Checkout_test2 currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/blog' element={<Blog currentLang={currentLang} translations={translations || {}} blogPosts={blogPosts || []} />} />
            <Route path='/blog/:id' element={<BlogDetail currentLang={currentLang} translations={translations || {}} blogPosts={blogPosts || []} />} />
            <Route path='/Drjoints' element={<Landing currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/Drjoints2' element={<Landing_two currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/Drjoints3' element={<Landing_three currentLang={currentLang} translations={translations || {}} />} />
            <Route path='/thank-you' element={<ThankYou />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <ConditionalFooter />
      </BrowserRouter>
    </div>
  )
}

export default App




