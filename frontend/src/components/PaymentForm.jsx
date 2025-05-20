import { motion } from "framer-motion";
import { ArrowLeft, Banknote, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Conversion rate: 1 USD = 1,600 NGN (as of May 2025, approximate for demo)
  const conversionRate = 1600;
  const isPremium = location.pathname.includes("premium");
  const plan = isPremium
    ? {
        name: "Premium",
        priceUSD: 5000,
        priceNGN: (5000 * conversionRate).toLocaleString("en-NG", { style: "currency", currency: "NGN" }),
        description: "Complete transfer management solution",
      }
    : {
        name: "Basic",
        priceUSD: 2500,
        priceNGN: (2500 * conversionRate).toLocaleString("en-NG", { style: "currency", currency: "NGN" }),
        description: "Essential tools for player transfers",
      };

  // Fetch authUser
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  // Form state
  const [formData, setFormData] = useState({
    fullName: authUser?.name || "",
    email: authUser?.email || "",
    phone: "",
    organization: "",
    billingAddress: "",
    paymentMethod: "bankTransfer",
    transactionRef: `FUT${Date.now()}${Math.floor(Math.random() * 1000)}`,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form

  // Pre-fill form with authUser data
  useEffect(() => {
    if (authUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: authUser.name || "",
        email: authUser.email || "",
      }));
    }
  }, [authUser]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.fullName || formData.fullName.length < 3) {
      toast.error("Full name must be at least 3 characters.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!/^\+?\d{10,14}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number (10-14 digits).");
      return false;
    }
    if (!formData.organization) {
      toast.error("Please enter your organization/club name.");
      return false;
    }
    if (!formData.billingAddress) {
      toast.error("Please enter your billing address.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please log in to proceed.");
      return;
    }
    if (step === 1) {
      if (validateForm()) {
        setStep(2);
      }
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/payment/success", {
          state: {
            plan,
            message: "Transaction initiated! Please complete the bank transfer within 10 minutes.",
            transactionRef: formData.transactionRef,
          },
        });
      }, 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delay: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className={`flex-1 text-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              Step 1: Details
            </div>
            <div className={`flex-1 text-center ${step === 2 ? "text-blue-600" : "text-gray-400"}`}>
              Step 2: Payment
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
        </div>

        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => (step === 1 ? navigate("/pricing") : setStep(1))}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {step === 1 ? "Back to Pricing" : "Back to Details"}
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{plan.name} Plan</h1>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">{plan.priceNGN}</span>
              <span className="ml-2 text-gray-600">per year</span>
            </div>
            <p className="text-sm text-gray-500">Equivalent to ${plan.priceUSD} USD</p>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  whileFocus={{ scale: 1.01 }}
                  placeholder="John Doe"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  whileFocus={{ scale: 1.01 }}
                  placeholder="john.doe@example.com"
                />
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  whileFocus={{ scale: 1.01 }}
                  placeholder="+2341234567890"
                />
              </motion.div>

              {/* Organization/Club */}
              <motion.div variants={itemVariants}>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization/Club Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  whileFocus={{ scale: 1.01 }}
                  placeholder="FC Elite"
                />
              </motion.div>

              {/* Billing Address */}
              <motion.div variants={itemVariants}>
                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address <span className="text-red-500">*</span>
                </label>
                <motion.textarea
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  whileFocus={{ scale: 1.01 }}
                  placeholder="123 Football Ave, Lagos, Nigeria"
                  rows={4}
                />
              </motion.div>

              {/* Continue Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isProcessing || !authUser}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg transition-all ${
                    isProcessing || !authUser ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  Continue to Payment
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Payment Method Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "bankTransfer" }))}
                    className={`flex-1 p-4 rounded-lg border ${
                      formData.paymentMethod === "bankTransfer"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Banknote className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <span>Bank Transfer</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: "card" }))}
                    className={`flex-1 p-4 rounded-lg border ${
                      formData.paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CreditCard className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <span>Credit/Debit Card</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Payment Details */}
              <motion.div variants={itemVariants}>
                {formData.paymentMethod === "bankTransfer" ? (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Transfer Details</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please transfer {plan.priceNGN} to the following account. Use the transaction reference below to ensure we can track your payment.
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Bank Name:</strong> Providus Bank</p>
                      <p><strong>Account Number:</strong> 355464647372</p>
                      <p><strong>Account Name:</strong> Futbol Conect</p>
                      <p><strong>Transaction Reference:</strong> {formData.transactionRef}</p>
                    </div>
                    <p className="text-sm text-red-500 mt-4">
                      Note: Complete the transfer within 10 minutes to avoid delays in processing.
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600">
                      This is a simulated card payment. Click below to complete your subscription.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isProcessing || !authUser}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg transition-all ${
                    isProcessing || !authUser ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : formData.paymentMethod === "bankTransfer"
                    ? "Initiate Bank Transfer"
                    : "Complete Payment"}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;