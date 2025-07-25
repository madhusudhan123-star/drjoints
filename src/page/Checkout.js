import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';

// API base URL that works in both development and production environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://drjoints-api.onrender.com' // Use `your actual production backend URL https://drjoints-api.onrender.com`
    : 'https://drjoints-api.onrender.com';

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1, basePrice: 3990 }, // ₹3990 per product
    'United States': { currency: 'USD', symbol: '$', rate: 1, basePrice: 120 } // $120 per product
};

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";

const Checkout = ({ translations, currentLang }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [state, handleFormspreeSubmit] = useForm("mvgobdev");
    const [orderNumber, setOrderNumber] = useState(1);
    const [userCountry, setUserCountry] = useState(DEFAULT_COUNTRY);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [selectedEmiOption, setSelectedEmiOption] = useState(null);

    // Detect user's location and set appropriate currency
    useEffect(() => {
        const detectUserLocation = async () => {
            try {
                // Try to get user's location via IP
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                if (data.country_name === 'India') {
                    setUserCountry('India');
                    setFormData(prev => ({ ...prev, country: 'India' }));
                } else {
                    // For all non-India locations, default to USD
                    setUserCountry('United States');
                    setFormData(prev => ({ ...prev, country: 'United States' }));
                }
            } catch (error) {
                console.error('Failed to detect location:', error);
                // Default to India if location detection fails
                setUserCountry('India');
                setFormData(prev => ({ ...prev, country: 'India' }));
            } finally {
                setIsLoadingLocation(false);
            }
        };

        detectUserLocation();
    }, []);

    useEffect(() => {
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);

    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        pinCode: '',
        phone: '',
        email: '',
        paymentMode: ''
    });

    // Initialize from product page state if available
    useEffect(() => {
        if (location.state) {
            const { quantity, paymentMode, emiOption } = location.state;
            if (quantity) {
                setOrderDetails({ quantity: parseInt(quantity) });
            }
            if (paymentMode) {
                setFormData(prev => ({ ...prev, paymentMode }));
            }
            if (emiOption) {
                setSelectedEmiOption(emiOption);
            }
        }
    }, [location.state]);

    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Use direct base price for each currency without any discounts
            const baseAmount = foundCurrency.basePrice * orderDetails.quantity;
            setConvertedAmount(baseAmount.toFixed(2));
        }
    }, [formData.country, orderDetails, formData.paymentMode]);

    // Original useEffects for initialization and script loading...
    useEffect(() => {
        if (!location.state) {
            navigate('/product/dr-joints-pain-relief-oil');
            return;
        }
        setOrderDetails(location.state);

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [location.state, navigate]);

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.townCity.trim()) errors.townCity = 'Town/City is required';
        if (!formData.pinCode.trim()) errors.pinCode = 'PIN/ZIP code is required';

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';
        if (formData.paymentMode === 'emi' && !selectedEmiOption) {
            errors.paymentMode = 'Please select an EMI option';
        }

        return errors;
    };

    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Use direct base price for each currency without any discounts
            const baseAmount = foundCurrency.basePrice * orderDetails.quantity;
            setConvertedAmount(baseAmount.toFixed(2));
        }
    }, [formData.country, orderDetails, formData.paymentMode]);

    const handlePromoCodeApply = () => {
        if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
        }
    };

    // Send order confirmation email
    const sendOrderConfirmationEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending order confirmation email to:', customerDetails.email);
            console.log('Order details:', orderDetails);
            
            const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                    customerPhone: customerDetails.phone,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send confirmation email:', data.message);
                return false;
            } else {
                console.log('Confirmation email sent successfully');
                return true;
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            return false;
        }
    };

    // Send abandoned order email notification
    const sendAbandonedOrderEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending abandoned order email to:', customerDetails.email);
            
            const response = await fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send abandoned order email:', data.message);
            } else {
                console.log('Abandoned order email sent successfully');
            }
        } catch (error) {
            console.error('Error sending abandoned order email:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                if (formData.paymentMode === 'online') {
                    handleRazorpayPayment();
                } else if (formData.paymentMode === 'emi') {
                    handleEmiPayment();
                } else if (formData.paymentMode === 'cod') {
                    // Prepare the data for COD orders
                    const customerDetails = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.streetAddress,
                        apartment: formData.apartment,
                        city: formData.townCity,
                        pinCode: formData.pinCode,
                        country: formData.country,
                    };
                    
                    const orderDetailsForEmail = {
                        orderNumber,
                        productName: orderDetails.productName,
                        quantity: orderDetails.quantity,
                        totalAmount: convertedAmount,
                        currency: currentCurrency.currency,
                        paymentMethod: "Cash on Delivery",
                        orderStatus: "Pending",
                    };

                    // Data for formspree submission
                    const formSubmitData = {
                        customerDetails,
                        orderDetails: orderDetailsForEmail
                    };

                    // First try sending the confirmation email
                    const emailSent = await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                    
                    if (!emailSent) {
                        console.log('Email failed, proceeding with form submission anyway');
                        // Consider notifying the user that email might not have been sent
                    }

                    // Make sure to await the Formspree submission
                    const formResponse = await handleFormspreeSubmit(formSubmitData);

                    // Check if the submission was successful
                    if (formResponse && !formResponse.error) {
                        // Update order number and show success
                        incrementOrderNumber();
                        setPaymentSuccess(true);
                    } else {
                        throw new Error('Failed to submit form to Formspree');
                    }

                    setIsSubmitting(false);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: 'Failed to process order. Please try again.'
                }));
                setIsSubmitting(false);
            }
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            setIsSubmitting(true);
            
            // Store customer details for potential abandoned order emails
            const customerDetails = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.townCity,
                pinCode: formData.pinCode,
                country: formData.country,
            };
            
            const tempOrderDetails = {
                orderNumber,
                productName: orderDetails.productName,
                quantity: orderDetails.quantity,
                totalAmount: convertedAmount,
                currency: currentCurrency.currency,
            };
            
            // First create order on server
            const response = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: convertedAmount,
                    currency: currentCurrency.currency,
                    receipt: `order_${orderNumber}`,
                    notes: {
                        productName: orderDetails.productName,
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email
                    }
                }),
            });
            
            const orderData = await response.json();
            
            if (!orderData.success) {
                throw new Error(orderData.message || "Failed to create order");
            }
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'Dr. Joints',
                description: `Order for ${orderDetails.productName}`,
                order_id: orderData.order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                handler: async function (response) {
                    try {
                        // Verify payment on server
                        const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });
                        
                        const verifyData = await verifyResponse.json();
                        
                        if (!verifyData.success) {
                            throw new Error("Payment verification failed");
                        }
                        
                        // Order details for email - add payment info
                        const orderDetailsForEmail = {
                            ...tempOrderDetails,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            orderStatus: "Paid",
                        };

                        // Send email confirmation immediately after payment verification
                        try {
                            await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                            console.log("Order confirmation email sent after successful payment");
                        } catch (emailError) {
                            console.error("Failed to send order confirmation email:", emailError);
                        }

                        // Proceed with form submission regardless of email status
                        const formSubmitData = {
                            customerDetails,
                            orderDetails: orderDetailsForEmail
                        };

                        const formResponse = await handleFormspreeSubmit(formSubmitData);

                        if (formResponse && !formResponse.error) {
                            incrementOrderNumber();
                            setPaymentSuccess(true);
                        } else {
                            throw new Error("Failed to submit form to Formspree");
                        }

                        setIsSubmitting(false);
                    } catch (error) {
                        console.error("Order submission error:", error);
                        setFormErrors(prev => ({
                            ...prev,
                            submit: "Payment successful but failed to send order details. Please contact support.",
                        }));
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        // Send abandoned order email when customer dismisses payment modal
                        console.log("Payment modal dismissed - sending abandoned order email");
                        sendAbandonedOrderEmail(customerDetails, {
                            ...tempOrderDetails,
                            orderStatus: "Abandoned",
                            paymentMethod: "Online Payment (Abandoned)"
                        });
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setFormErrors(prev => ({
                ...prev,
                submit: "Failed to initialize payment. Please try again."
            }));
            setIsSubmitting(false);
        }
    };

    const handleEmiPayment = async () => {
        try {
            setIsSubmitting(true);
            
            // Store customer details
            const customerDetails = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.townCity,
                pinCode: formData.pinCode,
                country: formData.country,
            };
            
            const tempOrderDetails = {
                orderNumber,
                productName: orderDetails.productName,
                quantity: orderDetails.quantity,
                totalAmount: convertedAmount,
                currency: currentCurrency.currency,
                emiOption: selectedEmiOption
            };
            
            // Create EMI order on server
            const response = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: convertedAmount,
                    currency: currentCurrency.currency,
                    receipt: `emi_order_${orderNumber}`,
                    notes: {
                        productName: orderDetails.productName,
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email,
                        paymentType: 'EMI',
                        emiMonths: selectedEmiOption.months,
                        emiAmount: selectedEmiOption.emiAmount
                    }
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create EMI order');
            }
            
            const order = await response.json();
            
            // Razorpay EMI options
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_your_key_id",
                amount: order.amount,
                currency: order.currency,
                name: 'Dr. Joints',
                description: `Pain Relief Oil - EMI ${selectedEmiOption.months} months`,
                order_id: order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: '#3399cc'
                },
                method: {
                    emi: true
                },
                handler: async function (response) {
                    try {
                        // Order details for email - add EMI info
                        const orderDetailsForEmail = {
                            orderNumber,
                            productName: orderDetails.productName,
                            quantity: orderDetails.quantity,
                            productPrice: currentCurrency.basePrice,
                            totalAmount: convertedAmount,
                            currency: currentCurrency.currency,
                            paymentMethod: `EMI Payment (${selectedEmiOption.months} months)`,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            emiDetails: {
                                months: selectedEmiOption.months,
                                emiAmount: selectedEmiOption.emiAmount,
                                totalAmount: selectedEmiOption.totalAmount,
                                rate: selectedEmiOption.rate,
                                description: selectedEmiOption.description
                            },
                            orderStatus: "Paid",
                            timestamp: new Date().toISOString()
                        };

                        // Send order confirmation email
                        try {
                            await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                            console.log("EMI order confirmation email sent after successful payment");
                        } catch (emailError) {
                            console.error("Failed to send EMI order confirmation email:", emailError);
                        }

                        // Proceed with form submission
                        const formSubmitData = {
                            customerDetails,
                            orderDetails: orderDetailsForEmail
                        };

                        const formResponse = await handleFormspreeSubmit(formSubmitData);

                        if (formResponse && !formResponse.error) {
                            incrementOrderNumber();
                            setPaymentSuccess(true);
                        } else {
                            throw new Error("Failed to submit EMI form to Formspree");
                        }

                        setIsSubmitting(false);
                    } catch (error) {
                        console.error("EMI order submission error:", error);
                        setFormErrors(prev => ({
                            ...prev,
                            submit: "EMI payment successful but failed to send order details. Please contact support.",
                        }));
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log("EMI payment modal dismissed - sending abandoned order email");
                        sendAbandonedOrderEmail(customerDetails, {
                            ...tempOrderDetails,
                            orderStatus: "Abandoned",
                            paymentMethod: "EMI Payment (Abandoned)"
                        });
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("EMI payment initialization error:", error);
            setFormErrors(prev => ({
                ...prev,
                submit: "Failed to initialize EMI payment. Please try again."
            }));
            setIsSubmitting(false);
        }
    };

    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-lg border ${formErrors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder={`Enter ${label.toLowerCase()}`}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors[name]}
                </p>
            )}
        </div>
    );

    const renderOrderSummary = () => (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 pb-4 border-b border-gray-200">
                {translations[currentLang].checkout.order}
            </h2>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-full">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="font-bold text-green-800 text-base sm:text-lg">Secure Checkout</span>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                    <div className="flex items-center space-x-3 p-2 bg-white bg-opacity-60 rounded-lg">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">SSL Encrypted Payment</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-white bg-opacity-60 rounded-lg">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Also available on Amazon</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-white bg-opacity-60 rounded-lg">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Money-back guarantee</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 space-y-3 sm:space-y-0">
                        <label className="text-gray-700 font-medium">
                            Promo Code
                        </label>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter promo code"
                                className="w-full sm:w-auto px-3 py-2 sm:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handlePromoCodeApply}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                    {formErrors.promoCode && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.promoCode}</p>
                    )}
                </div>

                {/* Alternative Purchase Options */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 sm:p-6">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center text-sm sm:text-base">
                        <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 2a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                        </svg>
                        Alternative Purchase Options
                    </h4>
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white bg-opacity-70 rounded-lg space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8H14.5l1.76-5.24c.15-.45-.24-.81-.69-.81-.23 0-.45.09-.61.24z"/>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700   font-medium">Amazon Prime eligible</span>
                            </div>
                            <a href={userCountry === 'USD' ? "https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB" : "https://www.amazon.in/Dr-Joints-Relief-Muscle-Muscles-Stress/dp/B0BLYHKJWB"} className="text-sm text-orange-600 hover:text-orange-700 underline font-medium">View on Amazon</a>
                        </div>
                        <p className="text-sm text-gray-600 italic">Same product, multiple trusted platforms</p>
                    </div>
                </div>

                {/* Rest of the order summary */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <div className="flex justify-between py-4 border-b border-gray-200">
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                            {translations[currentLang].checkout.total}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6 mt-6 sm:mt-8">
                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <div className="flex justify-between font-semibold pb-4 border-b border-gray-200">
                        <span className="text-gray-700">{translations[currentLang].checkout.product}</span>
                        <span className="text-gray-700">{translations[currentLang].checkout.subtotal}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-gray-100 space-y-2 sm:space-y-0">
                        <span className="text-gray-700">{orderDetails?.productName} x {orderDetails?.quantity}</span>
                        <span className="text-gray-700">
                            <span className="line-through text-gray-400 mr-2">{currentCurrency.symbol} {(currentCurrency.basePrice * 1.75 * orderDetails.quantity).toFixed(2)}</span> 
                            <span className="font-medium text-green-600">{currentCurrency.symbol} {convertedAmount}</span>
                        </span>
                    </div>

                    <div className="flex justify-between py-4 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{translations[currentLang].checkout.subtotal}</span>
                        <span className="text-gray-700">{currentCurrency.symbol} {convertedAmount}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-gray-100 space-y-2 sm:space-y-0">
                        <span className="font-medium text-gray-700">{translations[currentLang].checkout.shipping}</span>
                        <div className='flex flex-col items-start sm:items-end'>
                            <span className="text-green-600 font-medium">Free</span>
                            <span className="text-sm text-gray-500">Delivery within 5-7 business days</span>
                        </div>
                    </div>

                    <div className="flex justify-between py-6 border-t-2 border-gray-300">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">{translations[currentLang].checkout.total}</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                        {translations[currentLang].checkout.mode}<span className="text-red-500">*</span>
                    </label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Select Payment Method</option>
                        {userCountry === 'India' && <option value="cod">Cash on Delivery (COD)</option>}
                        <option value="online">Online Payment</option>
                    </select>
                    {formErrors.paymentMode && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.paymentMode}</p>
                    )}
                </div>

                {/* EMI Payment Cards for Indian Users */}
                {/* {userCountry === 'India' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Or Choose EMI Payment</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { 
                                    months: 3, 
                                    rate: 12,
                                    emiAmount: Math.round(convertedAmount / 3),
                                    totalAmount: Math.round(convertedAmount * 1.03),
                                    description: "No Cost EMI"
                                },
                                { 
                                    months: 6, 
                                    rate: 13,
                                    emiAmount: Math.round(convertedAmount / 6),
                                    totalAmount: Math.round(convertedAmount * 1.05),
                                    description: "Low Interest EMI"
                                },
                                { 
                                    months: 9, 
                                    rate: 15,
                                    emiAmount: Math.round(convertedAmount / 9),
                                    totalAmount: Math.round(convertedAmount * 1.08),
                                    description: "Flexible EMI"
                                },
                                { 
                                    months: 12, 
                                    rate: 18,
                                    emiAmount: Math.round(convertedAmount / 12),
                                    totalAmount: Math.round(convertedAmount * 1.12),
                                    description: "Easy Monthly EMI"
                                }
                            ].map((option, index) => (
                                <div 
                                    key={index}
                                    onClick={() => {
                                        setSelectedEmiOption(option);
                                        setFormData(prev => ({ ...prev, paymentMode: 'emi' }));
                                    }}
                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                                        selectedEmiOption?.months === option.months && formData.paymentMode === 'emi'
                                            ? 'border-purple-500 bg-purple-50 shadow-lg' 
                                            : 'border-gray-300 hover:border-purple-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="paymentOption"
                                                checked={selectedEmiOption?.months === option.months && formData.paymentMode === 'emi'}
                                                onChange={() => {
                                                    setSelectedEmiOption(option);
                                                    setFormData(prev => ({ ...prev, paymentMode: 'emi' }));
                                                }}
                                                className="text-purple-600 focus:ring-purple-500 w-4 h-4"
                                            />
                                            <div>
                                                <div className="font-bold text-lg text-purple-600">
                                                    ₹{option.emiAmount.toLocaleString('en-IN')}/month
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {option.months} months • {option.rate}% p.a.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">Total Amount</div>
                                            <div className="text-sm font-semibold text-gray-800">
                                                ₹{option.totalAmount.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-medium text-purple-700">
                                            {option.description}
                                        </div>
                                        {selectedEmiOption?.months === option.months && formData.paymentMode === 'emi' && (
                                            <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                                ✓ Selected
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-blue-800">
                                    <div className="font-medium mb-1">💳 EMI Information</div>
                                    <ul className="text-xs space-y-1">
                                        <li>• EMI available on Credit Cards and select Debit Cards</li>
                                        <li>• Final approval depends on your bank's eligibility criteria</li>
                                        <li>• Processing fee may apply as per bank's terms</li>
                                        <li>• EMI tenure starts from the date of purchase</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl
                        transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {translations[currentLang].checkout.processing}
                        </div>
                    ) : (
                        translations[currentLang].checkout.order
                    )}
                </button>

                {/* Additional Trust Elements */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-center">
                    <div className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                            </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">4.8 Rating</span>
                    </div>
                </div>
            </div>
        </div >
    );
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Get available countries based on user's detected location
    const getAvailableCountries = () => {
        if (userCountry === 'India') {
            return Object.keys(COUNTRY_CURRENCY_MAP);
        } else {
            // For non-India users, only show USD option
            return ['United States'];
        }
    };

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess || state.succeeded) {
        // Navigate to Thank You page with order data
        const orderData = {
            orderNumber: orderNumber,
            customerName: `${formData.firstName} ${formData.lastName}`,
            productName: orderDetails?.productName,
            quantity: orderDetails?.quantity,
            amount: `${currentCurrency.symbol} ${convertedAmount}`,
            currency: currentCurrency.currency,
            totalAmount: convertedAmount,
            paymentMethod: formData.paymentMode === 'cod' ? 'Cash on Delivery' : 'Online Payment',
            shippingAddress: `${formData.streetAddress}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.townCity}, ${formData.pinCode}, ${formData.country}`
        };

        navigate('/thank-you', { state: orderData });
        return null; // Return null since we're navigating away
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 bg-gray-50 min-h-screen">
            {formErrors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 sm:px-6 sm:py-4 rounded-xl mb-6 sm:mb-8 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.submit}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-6 sm:space-y-8 lg:pb-16">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 pb-4 border-b border-gray-200">
                            {translations[currentLang].checkout.sectitle}
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {renderFormField("firstName", translations[currentLang].checkout.firstname)}
                                {renderFormField("lastName", translations[currentLang].checkout.lastname)}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    {translations[currentLang].checkout.country}<span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200"
                                    disabled={isLoadingLocation}
                                >
                                    {getAvailableCountries().map(country => (
                                        <option key={country} value={country}>
                                            {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                        </option>
                                    ))}
                                </select>
                                {isLoadingLocation && (
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Detecting your location...
                                    </p>
                                )}
                            </div>

                            {renderFormField("streetAddress", translations[currentLang].checkout.address)}
                            {renderFormField("apartment", translations[currentLang].checkout.clientaddress, "text", false)}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {renderFormField("townCity", translations[currentLang].checkout.city)}
                                {renderFormField("pinCode", formData.country === 'India' ? "PIN Code" : "ZIP Code")}
                            </div>
                            {renderFormField("phone", translations[currentLang].checkout.phone, "tel")}
                            {renderFormField("email", translations[currentLang].checkout.email, "email")}
                        </div>
                    </div>
                </div>

                <div className="lg:sticky lg:top-8 lg:h-fit lg:self-start">
                    {renderOrderSummary()}
                </div>
            </div>
        </div>
    );
};


export default Checkout;
