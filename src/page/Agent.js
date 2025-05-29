import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '@formspree/react';

// API base URL that works in both development and production environments
const API_BASE_URL = 'https://razorpaybackend-wgbh.onrender.com' // Use your actual production backend URL https://razorpaybackend-wgbh.onrender.com

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 }
};

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";
const ACCESS_PASSWORD = "630979"; // Password to access the page

const Agent = ({ translations = {}, currentLang = 'en' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Password protection state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
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
    const [quantity, setQuantity] = useState(1);
    const [totalOrderAmount, setTotalOrderAmount] = useState(3999);
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const [callNotes, setCallNotes] = useState("");
    const [customerSource, setCustomerSource] = useState("");
    const [agentName, setAgentName] = useState("");

    useEffect(() => {
        // Simulate fetching the latest order number from the backend
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);

    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber); // Persist order number locally
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        pincode: '',
        phone: '',
        paymentMode: ''
    });

    // Update currency and convert amount when country changes
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Convert amount from INR to selected currency
            const baseAmount = orderDetails.totalAmount; // Total amount in INR
            const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails]);

    // Original useEffects for initialization and script loading...
    useEffect(() => {
        if (!location.state) {
            // Instead of redirecting, set default order details for direct navigation
            setOrderDetails({
                productName: 'Dr. Joints Pain Relief Supplement',
                totalAmount: 3999, // Default price in INR
                description: 'Natural joint pain relief supplement'
            });
        } else {
            setOrderDetails(location.state);
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [location.state]);

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'Customer first name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Customer last name is required';
        if (!formData.phone.trim()) {
            errors.phone = 'Customer phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Delivery address is required';
        if (!formData.townCity.trim()) errors.townCity = 'City is required';
        if (!formData.pincode.trim()) {
            errors.pincode = 'Pin code is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            errors.pincode = 'Pin code must be exactly 6 digits';
        }
        if (!agentName.trim()) errors.agentName = 'Agent name is required';
        if (totalOrderAmount <= 0) {
            errors.totalOrderAmount = 'Order amount must be greater than 0';
        } else if (totalOrderAmount < 2500) {
            errors.totalOrderAmount = 'Negotiated price must be at least ₹2,500';
        }
        if (advanceAmount > totalOrderAmount * quantity) errors.advanceAmount = 'Advance amount cannot exceed total order amount';

        return errors;
    };

    // Update the useEffect for amount calculation to use local quantity state
    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            let baseAmount = totalOrderAmount; // Use custom total order amount
            let discountPercentage = 10;

            // Calculate total for selected quantity
            let totalAmount = baseAmount * quantity;

            // Apply 10% discount for online payment
            if (formData.paymentMode === 'online') {
                totalAmount *= (1 - discountPercentage / 100);
            }

            const convertedValue = (totalAmount * foundCurrency.rate).toFixed(2);
            setConvertedAmount(convertedValue);
        }
    }, [formData.country, orderDetails, formData.paymentMode, quantity, totalOrderAmount]);

    // Add quantity change handler
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    // Add fallback translations to prevent undefined errors
    const getTranslation = (path) => {
        try {
            const keys = path.split('.');
            let result = translations[currentLang];
            for (const key of keys) {
                result = result?.[key];
            }
            return result || path; // Return the path as fallback if translation not found
        } catch (error) {
            return path; // Return the path as fallback if any error occurs
        }
    };

    // Update renderOrderSummary to include quantity selector
    const renderOrderSummary = () => (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📞 Call Center Order Summary
            </h2>

            <div className="space-y-4">
                {/* Agent Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Agent Information</h4>
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            placeholder="Agent Name *"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {formErrors.agentName && (
                            <p className="text-red-500 text-xs">{formErrors.agentName}</p>
                        )}
                    </div>
                </div>

                {/* Product & Pricing Details */}
                <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{orderDetails?.productName}</h3>
                            <p className="text-sm text-gray-600">Negotiated Unit Price: {currentCurrency.symbol} {(totalOrderAmount * currentCurrency.rate).toFixed(2)}</p>
                        </div>
                    </div>

                                        {/* Negotiated Price Input */}
                    <div className="space-y-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            💰 Negotiated Unit Price ({currentCurrency.currency}) *
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                value={totalOrderAmount === 0 ? '' : totalOrderAmount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '') {
                                        setTotalOrderAmount(0);
                                    } else {
                                        const numericValue = parseFloat(value);
                                        if (!isNaN(numericValue) && numericValue >= 0) {
                                            setTotalOrderAmount(numericValue);
                                        }
                                    }
                                }}
                                min="2500"
                                step="0.01"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter negotiated price per unit (min ₹2,500)"
                            />
                            <button
                                type="button"
                                onClick={() => setTotalOrderAmount(3999)}
                                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                            >
                                Reset to MRP
                            </button>
                        </div>
                        {formErrors.totalOrderAmount && (
                            <p className="text-red-500 text-xs">{formErrors.totalOrderAmount}</p>
                        )}
                        <p className="text-xs text-green-600">
                            MRP: ₹4,999 | Current: ₹{totalOrderAmount} | Discount: ₹{3999 - totalOrderAmount} | Min Required: ₹2,500
                        </p>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-l border-r border-gray-300 text-center min-w-[3rem]">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800"
                            >
                                +
                            </button>
                        </div>
                        <span className="text-sm text-gray-600">
                            Total: {currentCurrency.symbol} {(totalOrderAmount * quantity * currentCurrency.rate).toFixed(2)}
                        </span>
                    </div>



                    {/* Advance Payment Section */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            💳 Advance Payment Amount ({currentCurrency.currency})
                        </label>
                        <input
                            type="number"
                            value={advanceAmount === 0 ? '' : advanceAmount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                    setAdvanceAmount(0);
                                } else {
                                    const numericValue = parseFloat(value);
                                    if (!isNaN(numericValue) && numericValue >= 0) {
                                        setAdvanceAmount(numericValue);
                                    }
                                }
                            }}
                            min="0"
                            step="0.01"
                            max={totalOrderAmount * quantity}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter advance amount to collect now"
                        />
                        {formErrors.advanceAmount && (
                            <p className="text-red-500 text-xs">{formErrors.advanceAmount}</p>
                        )}
                        <p className="text-xs text-gray-600">
                            💰 Advance: ₹{advanceAmount} | 🚚 COD: ₹{((totalOrderAmount * quantity) - advanceAmount).toFixed(2)}
                        </p>
                    </div>
                </div>
                {/* Payment Summary */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">💸 Payment Breakdown</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Total Order Value:</span>
                            <span>₹{(totalOrderAmount * quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Advance Payment:</span>
                            <span className="font-semibold text-green-700">₹{advanceAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cash on Delivery:</span>
                            <span>₹{((totalOrderAmount * quantity) - advanceAmount).toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                            <span>To Collect Now:</span>
                            <span className="text-green-700">₹{advanceAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Balance Amount (COD):</span>
                            <span className="text-orange-600">₹{((totalOrderAmount * quantity) - advanceAmount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Generate Payment Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || advanceAmount <= 0}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg
                        transition-all duration-200 transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing Order...
                        </div>
                    ) : advanceAmount > 0 ? (
                        `🔗 Generate Payment Link for ₹${advanceAmount}`
                    ) : (
                        '📋 Create COD Order'
                    )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    {advanceAmount > 0 
                        ? "Customer will receive payment link via SMS/WhatsApp to pay advance amount"
                        : "Complete COD order will be created without advance payment"
                    }
                </p>
            </div>
        </div>
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

    const handlePromoCodeApply = () => {
        if (promoCode === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: '' }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: 'Invalid promo code' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            if (advanceAmount > 0) {
                // Handle advance payment with Razorpay
                await handleRazorpayPayment();
            } else {
                // Handle full COD order
                await handleCODOrder();
            }
        } catch (error) {
            console.error('Order submission error:', error);
            setFormErrors(prev => ({ ...prev, submit: 'Order submission failed. Please try again.' }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            // Create order on backend first
            const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: advanceAmount,
                    currency: currentCurrency.currency,
                    receipt: `CC_${orderNumber}_${Date.now()}`,
                    notes: {
                        agent_name: agentName,
                        customer_source: customerSource,
                        call_notes: callNotes,
                        order_type: 'call_center_order',
                        order_number: orderNumber,
                        customer_name: `${formData.firstName} ${formData.lastName}`,
                        customer_email: formData.email,
                        customer_phone: formData.phone
                    }
                })
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.message || 'Failed to create order');
            }

            // Use the order ID from backend
            const options = {
                key: orderData.key,
                amount: Math.round(advanceAmount * 100),
                currency: currentCurrency.currency,
                name: 'Dr. Joints - Call Center Order',
                description: `${orderDetails.productName} - Advance Payment`,
                order_id: orderData.order.id,
                handler: async (response) => {
                    try {
                        // Verify payment on backend
                        const verificationResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verificationData = await verificationResponse.json();

                        if (verificationResponse.ok && verificationData.success) {
                            // Send order confirmation email
                            await sendOrderConfirmationEmail(response.razorpay_payment_id);
                            // Submit to Formspree
                            await submitOrderToFormspree();
                            incrementOrderNumber();
                            setPaymentSuccess(true);
                        } else {
                            throw new Error(verificationData.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        setFormErrors(prev => ({ ...prev, submit: 'Payment verification failed. Please contact support.' }));
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    contact: formData.phone
                },
                theme: {
                    color: '#16a34a'
                },
                modal: {
                    ondismiss: () => {
                        setFormErrors(prev => ({ ...prev, submit: 'Payment cancelled by customer' }));
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Order creation error:', error);
            setFormErrors(prev => ({ ...prev, submit: error.message || 'Failed to initiate payment. Please try again.' }));
            throw error;
        }
    };

    const handleCODOrder = async () => {
        try {
            // Send order confirmation email for COD orders
            await sendOrderConfirmationEmail();
            await submitOrderToFormspree();
            incrementOrderNumber();
            setPaymentSuccess(true);
        } catch (error) {
            console.error('COD order creation error:', error);
            setFormErrors(prev => ({ ...prev, submit: 'Failed to create COD order. Please try again.' }));
        }
    };

    const sendOrderConfirmationEmail = async (paymentId = null) => {
        try {
            const emailData = {
                customerEmail: `${formData.firstName}.${formData.lastName}@drjoints.com`, // Use a default email format
                orderDetails: {
                    orderNumber,
                    productName: orderDetails.productName,
                    quantity,
                    totalAmount: (totalOrderAmount * quantity).toFixed(2),
                    currency: currentCurrency.symbol,
                    paymentMethod: advanceAmount > 0 ? 'Partial Payment (Advance + COD)' : 'Cash on Delivery',
                    paymentId: paymentId || 'COD Order'
                },
                customerDetails: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: `${formData.firstName}.${formData.lastName}@drjoints.com`,
                    phone: formData.phone,
                    address: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.townCity,
                    state: '', // Add state if needed
                    zip: formData.pincode,
                    country: formData.country
                }
            };

            const emailResponse = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });

            if (!emailResponse.ok) {
                console.error('Failed to send confirmation email');
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    };

    const submitOrderToFormspree = async () => {
        const orderData = {
            // Customer Details
            ...formData,
            
            // Order Details
            orderNumber,
            productName: orderDetails.productName,
            quantity,
            unitPrice: totalOrderAmount,
            totalOrderValue: totalOrderAmount * quantity,
            
            // Payment Details
            advanceAmount,
            codAmount: (totalOrderAmount * quantity) - advanceAmount,
            paymentType: advanceAmount > 0 ? 'partial_advance' : 'full_cod',
            
            // Call Center Details
            agentName,
            customerSource,
            callNotes,
            orderType: 'call_center_order',
            
            // System Details
            currency: currentCurrency.currency,
            promoCodeApplied: isPromoApplied,
            orderDate: new Date().toISOString(),
            createdBy: 'call_center'
        };

        return handleFormspreeSubmit(orderData);
    };

    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm">{formErrors[name]}</p>
            )}
        </div>
    );

    // Check for stored authentication on component mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('agentPageAuth');
        if (storedAuth === ACCESS_PASSWORD) {
            setIsAuthenticated(true);
        }
    }, []);

    // Password verification function
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === ACCESS_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('agentPageAuth', ACCESS_PASSWORD);
            setPasswordError("");
        } else {
            setPasswordError("Invalid password. Please try again.");
            setPasswordInput("");
        }
    };

    // Logout function
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('agentPageAuth');
        setPasswordInput("");
    };

    // Password protection screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            🔒 Access Required
                        </h1>
                        <p className="text-gray-600">
                            Enter the password to access the Call Center Order System
                        </p>
                    </div>
                    
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter access password"
                                required
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            Access System
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                            ← Back to Website
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Add logout button to the main page header
    const renderHeader = () => (
        <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    📞 Call Center Order Creation
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    🔒 Logout
                </button>
            </div>
            <p className="text-gray-600">
                Create orders for customers over phone with price negotiation and advance payment collection
            </p>
        </div>
    );

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess || state.succeeded) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        {getTranslation('checkout.successfully') || 'Order Placed Successfully!'}
                    </h2>
                    <p className="text-gray-600 mb-2">
                        {getTranslation('checkout.orderNumber') || 'Order Number'}: {orderNumber}
                    </p>
                    <p className="text-gray-600 mb-6">
                        {getTranslation('checkout.thank') || 'Thank you for your order!'}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        {getTranslation('checkout.continue') || 'Continue Shopping'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {renderHeader()}

            {formErrors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                    {formErrors.submit}
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            👤 Customer Information
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {renderFormField("firstName", "Customer First Name")}
                                {renderFormField("lastName", "Customer Last Name")}
                            </div>
                            {renderFormField("phone", "Customer Phone Number", "tel")}
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Delivery Country<span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                        <option key={country} value={country}>
                                            {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {renderFormField("streetAddress", "Delivery Address")}
                            {renderFormField("apartment", "Apartment/Suite/Floor", "text", false)}
                            <div className="grid grid-cols-2 gap-4">
                                {renderFormField("townCity", "City")}
                                {renderFormField("pincode", "Pin Code", "text")}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {renderOrderSummary()}
                </div>
            </div>
        </div>
    );
};

export default Agent;