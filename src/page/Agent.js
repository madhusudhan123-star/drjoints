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

const Agent = ({ translations = {}, currentLang = 'en' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
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
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

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

    // Add reset form function
    const resetForm = () => {
        setFormData({
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
        setQuantity(1);
        setTotalOrderAmount(3999);
        setAdvanceAmount(0);
        setCallNotes("");
        setCustomerSource("");
        setAgentName("");
        setFormErrors({});
        setPaymentSuccess(false);
        setOrderPlaced(false);
        setIsSubmitting(false);
        setPromoCode("");
        setIsPromoApplied(false);
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

    // Update the script loading useEffect
    useEffect(() => {
        if (!location.state) {
            // Instead of redirecting, set default order details for direct navigation
            setOrderDetails({
                productName: '',
                totalAmount: 3999, // Default price in INR
                description: ''
            });
        } else {
            setOrderDetails(location.state);
        }

        // Load Razorpay script with proper error handling
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                // Check if Razorpay is already loaded
                if (window.Razorpay) {
                    setIsRazorpayLoaded(true);
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                
                script.onload = () => {
                    setIsRazorpayLoaded(true);
                    resolve();
                };
                
                script.onerror = () => {
                    console.error('Failed to load Razorpay script');
                    reject(new Error('Failed to load Razorpay script'));
                };
                
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript().catch(error => {
            console.error('Razorpay script loading error:', error);
            setFormErrors(prev => ({ ...prev, submit: 'Payment system unavailable. Please try again later.' }));
        });

        return () => {
            // Clean up script if component unmounts
            const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (existingScript && document.body.contains(existingScript)) {
                document.body.removeChild(existingScript);
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
        // Removed agentName validation since we removed the agent section
        if (totalOrderAmount <= 0) {
            errors.totalOrderAmount = 'Order amount must be greater than 0';
        } else if (totalOrderAmount < 2500) {
            errors.totalOrderAmount = 'Negotiated price must be at least ₹2,500';
        }
        if (advanceAmount <= 0) {
            errors.advanceAmount = 'Advance payment amount is required and must be greater than 0';
        } else if (advanceAmount > totalOrderAmount) {
            errors.advanceAmount = 'Advance amount cannot exceed negotiated unit price';
        }

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
            </h2>

            <div className="space-y-4">
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
                            Negotiated Unit Price ({currentCurrency.currency}) *
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
                                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                    totalOrderAmount > 0 && totalOrderAmount < 2500 
                                        ? 'border-red-500 text-red-600 bg-red-50' 
                                        : 'border-gray-300'
                                }`}
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
                        <p className={`text-xs ${
                            totalOrderAmount > 0 && totalOrderAmount < 2500 
                                ? 'text-red-600' 
                                : 'text-green-600'
                        }`}>
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
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            💳 Advance Payment Amount ({currentCurrency.currency}) *
                        </label>
                        <input
                            type="number"
                            value={advanceAmount === 0 ? '' : advanceAmount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                    setAdvanceAmount(0);
                                } else {
                                    const numericValue = parseInt(value);
                                    if (!isNaN(numericValue) && numericValue >= 0) {
                                        setAdvanceAmount(numericValue);
                                    }
                                }
                            }}
                            min="1"
                            step="1"
                            max={totalOrderAmount}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter advance amount (required)"
                            required
                        />
                        {formErrors.advanceAmount && (
                            <p className="text-red-500 text-xs">{formErrors.advanceAmount}</p>
                        )}
                        <p className="text-xs text-gray-600">
                            💰 Advance: ₹{advanceAmount} | 🚚 Remaining per unit: ₹{(totalOrderAmount - advanceAmount)}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                            * Advance payment cannot exceed negotiated unit price (₹{totalOrderAmount})
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
                            <span>Remaining Amount:</span>
                            <span>₹{((totalOrderAmount * quantity) - advanceAmount).toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                            <span>To Collect Now:</span>
                            <span className="text-green-700">₹{advanceAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Balance Amount:</span>
                            <span className="text-orange-600">₹{((totalOrderAmount * quantity) - advanceAmount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Generate Payment Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isRazorpayLoaded || advanceAmount <= 0 || orderPlaced}
                    className={`w-full font-medium py-3 px-6 rounded-lg
                        transition-all duration-200 transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                        orderPlaced 
                            ? 'bg-green-600 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {orderPlaced ? (
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            ✅ Order Placed Successfully!
                        </div>
                    ) : isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing Payment...
                        </div>
                    ) : !isRazorpayLoaded ? (
                        'Loading Payment System...'
                    ) : advanceAmount <= 0 ? (
                        'Enter Advance Amount to Continue'
                    ) : (
                        `🔗 Generate Payment Link for ₹${advanceAmount}`
                    )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    {orderPlaced 
                        ? "Order placed successfully! Form will reset in 2 seconds..."
                        : !isRazorpayLoaded 
                        ? "Loading payment system..."
                        : advanceAmount <= 0
                        ? "Please enter advance payment amount to proceed"
                        : "Customer will receive payment link via SMS/WhatsApp to pay advance amount"
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
            // Only handle advance payment with Razorpay (COD option removed)
            await handleRazorpayPayment();
        } catch (error) {
            console.error('Order submission error:', error);
            setFormErrors(prev => ({ ...prev, submit: 'Order submission failed. Please try again.' }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            // Check if Razorpay is loaded
            if (!window.Razorpay || !isRazorpayLoaded) {
                throw new Error('Payment system is not ready. Please refresh the page and try again.');
            }

            console.log('Creating order with amount:', advanceAmount);
            console.log('API Base URL:', API_BASE_URL);

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
                    paymentMethod: {
                        type: 'advance_payment',
                        advanceAmount: advanceAmount,
                        totalOrderAmount: totalOrderAmount * quantity,
                        remainingAmount: (totalOrderAmount * quantity) - advanceAmount,
                        currency: currentCurrency.currency,
                        paymentMode: 'online'
                    },
                    notes: {
                        agent_name: agentName || 'Call Center Agent',
                        customer_source: customerSource || 'call_center',
                        call_notes: callNotes || 'Direct order',
                        order_type: 'call_center_order',
                        order_number: orderNumber,
                        customer_name: `${formData.firstName} ${formData.lastName}`,
                        customer_phone: formData.phone,
                        total_order_value: totalOrderAmount * quantity,
                        advance_amount: advanceAmount,
                        remaining_amount: (totalOrderAmount * quantity) - advanceAmount,
                        payment_method: 'advance_payment'
                    }
                })
            });

            console.log('Order response status:', orderResponse.status);

            if (!orderResponse.ok) {
                const errorText = await orderResponse.text();
                console.error('Order creation failed with response:', errorText);
                
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    errorData = { message: errorText };
                }
                
                throw new Error(errorData.message || `HTTP error! status: ${orderResponse.status}`);
            }

            const orderData = await orderResponse.json();

            if (!orderData.success || !orderData.order || !orderData.key) {
                throw new Error('Invalid order response from server');
            }

            // Use the order ID from backend
            const options = {
                key: orderData.key,
                amount: Math.round(advanceAmount * 100), // Amount in paise
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
                                razorpay_signature: response.razorpay_signature,
                                paymentMethod: {
                                    type: 'advance_payment',
                                    advanceAmount: advanceAmount,
                                    totalOrderAmount: totalOrderAmount * quantity,
                                    remainingAmount: (totalOrderAmount * quantity) - advanceAmount,
                                    currency: currentCurrency.currency,
                                    paymentMode: 'online'
                                },
                                orderDetails: {
                                    orderNumber,
                                    customerName: `${formData.firstName} ${formData.lastName}`,
                                    customerPhone: formData.phone,
                                    agentName: agentName || 'Call Center Agent'
                                }
                            })
                        });

                        const verificationData = await verificationResponse.json();

                        if (verificationResponse.ok && verificationData.success) {
                            // Send order confirmation email
                            await sendOrderConfirmationEmail(response.razorpay_payment_id);
                            // Submit to Formspree
                            await submitOrderToFormspree(response.razorpay_payment_id);
                            incrementOrderNumber();
                            setPaymentSuccess(true);
                            setOrderPlaced(true);
                            
                            // Auto-reset after 2 seconds
                            setTimeout(() => {
                                resetForm();
                            }, 2000);
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
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Order creation error:', error);
            setFormErrors(prev => ({ ...prev, submit: error.message || 'Failed to initiate payment. Please try again.' }));
            setIsSubmitting(false);
            throw error;
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
                    paymentMethod: 'Partial Payment (Advance + Remaining)',
                    paymentId: paymentId || 'Advance Payment'
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

    const submitOrderToFormspree = async (paymentId = null) => {
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
            paymentMethod: {
                type: 'advance_payment',
                advanceAmount: advanceAmount,
                totalOrderAmount: totalOrderAmount * quantity,
                remainingAmount: (totalOrderAmount * quantity) - advanceAmount,
                currency: currentCurrency.currency,
                paymentMode: 'online'
            },
            advanceAmount,
            remainingAmount: (totalOrderAmount * quantity) - advanceAmount,
            paymentType: 'partial_advance',
            paymentId: paymentId || 'N/A',
            
            // Call Center Details
            agentName: agentName || 'Call Center Agent',
            customerSource: customerSource || 'call_center',
            callNotes: callNotes || 'Direct order',
            orderType: 'call_center_order',
            
            // System Details
            currency: currentCurrency.currency,
            promoCodeApplied: isPromoApplied,
            orderDate: new Date().toISOString(),
            createdBy: 'call_center'
        };

        console.log('Submitting to Formspree:', orderData);
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

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <p className="text-gray-600">
                    Create orders for customers with price negotiation and advance payment collection
                </p>
            </div>

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
                            
                            {renderFormField("country", "Delivery Country")}

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