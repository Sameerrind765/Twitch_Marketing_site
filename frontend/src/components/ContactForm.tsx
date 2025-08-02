import React, { useState, useEffect, useCallback } from 'react';
import { X, Send, User, Mail, MessageSquare, Twitch, CheckCircle, CreditCard, Smartphone, Wallet, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import FileUploadDiv from './fileuploaddiv';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

interface FormData {
  name: string;
  email: string;
  twitchUsername: string;
  currentFollowers: string;
  plan: string;
  message: string;
  goals: string[];
  sheetName: string;
  url: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  twitchUsername?: string;
  currentFollowers?: string;
  general?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    twitchUsername: '',
    currentFollowers: '',
    plan: selectedPlan || 'growth',
    message: '',
    goals: [],
    sheetName: "Twitch",
    url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ fileName: string; url: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploadTriggered, setIsUploadTriggered] = useState(false);

  const api = import.meta.env.VITE_API_BASE_URL;

  const goals = [
    { label: 'Reach Twitch Affiliate', tier: 'basic' },
    { label: 'Grow follower count', tier: 'basic' },
    { label: 'Increase concurrent viewers', tier: 'growth' },
    { label: 'Build community engagement', tier: 'growth' },
    { label: 'Monetize my stream', tier: 'growth' },
    { label: 'Become Twitch Partner', tier: 'premium' }
  ];

  const paymentMethods = [
    { name: 'PayPal', icon: Wallet, color: 'bg-blue-500', link: "https://paypal.me/saroshfarrukh" },
    { name: 'CashApp', icon: Smartphone, color: 'bg-green-500', link: "https://cash.app/$AgatesServices" },
    { name: 'Apple Pay', icon: Smartphone, color: 'bg-gray-800', link: "https://cash.app/$AgatesServices" },
    { name: 'Card Payment', icon: CreditCard, color: 'bg-purple-500', link: "https://cash.app/$AgatesServices" }
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTwitchUsername = (username: string): boolean => {
    const twitchRegex = /^[a-zA-Z0-9_]{4,25}$/;
    return twitchRegex.test(username);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.twitchUsername.trim()) {
      newErrors.twitchUsername = 'Twitch username is required';
    } else if (!validateTwitchUsername(formData.twitchUsername)) {
      newErrors.twitchUsername = 'Invalid Twitch username (4-25 characters, letters/numbers/_)';
    }

    if (!formData.currentFollowers) {
      newErrors.currentFollowers = 'Please select your follower range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };


  const submitFormData = useCallback(async (dataToSubmit: FormData) => {
    try {
      const response = await fetch(`${api}/api/twitch-form/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setIsSubmitted(true);
      setShowPayment(true);
      setErrors({});
      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("API error:", error);
      setErrors(prev => ({
        ...prev,
        general: 'Failed to submit form. Please check your connection and try again.'
      }));
    }
  }, [api]);

  const handleUploadComplete = useCallback(async (result: { fileName: string; url: string } | null) => {
    setIsUploadTriggered(false); // Reset trigger regardless

    if (result) {
      const finalData = {
        ...formData,
        url: result.url,
      };

      setUploadedFile(result);
      setFormData(finalData);

      await submitFormData(finalData);
    } else {
      setErrors(prev => ({
        ...prev,
        general: 'File upload failed. Please try again.'
      }));
    }

    setIsSubmitting(false); // ✅ Hide loading no matter what
  }, [formData, submitFormData, onClose]);




  useEffect(() => {
    if (uploadedFile?.url) {
      setFormData(prev => ({
        ...prev,
        url: uploadedFile.url
      }));
    }
  }, [uploadedFile]);

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleNext = () => {
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handleFinalSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true); // ✅ Show loading immediately on submit

    if (!uploadedFile && !formData.url) {
      setIsUploadTriggered(true); // ✅ This tells FileUploadDiv to start upload
      return; // Wait for handleUploadComplete to proceed
    }

    await submitFormData({ ...formData, url: uploadedFile?.url || formData.url });
    setIsSubmitting(false);
  };


  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setShowPayment(false);
      setUploadedFile(null);
      setErrors({});
      setFormData({
        name: '',
        email: '',
        twitchUsername: '',
        currentFollowers: '',
        plan: selectedPlan || 'growth',
        message: '',
        goals: [],
        sheetName: "Twitch",
        url: "",
      });
    }
  }, [isOpen, selectedPlan]);

  // Error display component
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    );
  };

  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        setIsSubmitted(false);
        onClose(); // Auto-close the modal after showing success
      }, 4000); // Show success message for 4 seconds

      return () => clearTimeout(timeout); // Cleanup on unmount
    }
  }, [isSubmitted, onClose]);


  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest! We'll review your information and get back to you within 24 hours with a customized growth plan.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-800 font-semibold">Next Steps:</p>
            <ul className="text-purple-700 text-sm mt-2 space-y-1">
              <li>• Check your email for confirmation</li>
              <li>• We'll analyze your current channel</li>
              <li>• Receive your custom strategy within 24h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    const selectedPlanDetails = {
      basic: { name: 'Basic Tier', price: '$200' },
      growth: { name: 'Growth Tier', price: '$500' },
      premium: { name: 'Premium Tier', price: '$800+' }
    }[formData.plan];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-3xl font-bold text-gray-900">Complete Payment</h2>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-40"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <ErrorMessage error={errors.general} />
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{selectedPlanDetails?.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-purple-600">{selectedPlanDetails?.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Twitch Channel:</span>
                <span className="font-semibold">{formData.twitchUsername}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-8">Choose Payment Method</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {paymentMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => {
                    window.open(method.link);
                  }}
                  disabled={isSubmitting}
                  className="flex items-center gap-4 p-6 border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-lg">{method.name}</div>
                    <div className="text-gray-500 text-sm">Secure & Instant</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-1 gap-6 mb-8">
              <FileUploadDiv
                startUpload={isUploadTriggered}
                // fileName={uploadedFile}
                onUploadComplete={handleUploadComplete}
              />

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
              >
                {isSubmitting ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>


              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">100% Secure Payments</span>
                </div>
                <p className="text-gray-600 text-sm">
                  All transactions are encrypted and processed securely. 30-day money-back guarantee if you don't reach Affiliate status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-gray-900">Start Growing Now</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <ErrorMessage error={errors.general} />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your full name"
              />
              <ErrorMessage error={errors.name} />
            </div>

            <div>
              <label className="text-left block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="your@email.com"
              />
              <ErrorMessage error={errors.email} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-left block text-sm font-semibold text-gray-700 mb-2">
                <Twitch className="w-4 h-4 inline mr-2" />
                Twitch Username
              </label>
              <input
                type="text"
                name="twitchUsername"
                value={formData.twitchUsername}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.twitchUsername ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="YourTwitchName"
              />
              <ErrorMessage error={errors.twitchUsername} />
            </div>

            <div>
              <label className="text-left block text-sm font-semibold text-gray-700 mb-2">
                Current Followers
              </label>
              <select
                name="currentFollowers"
                value={formData.currentFollowers}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.currentFollowers ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select range</option>
                <option value="0-50">0-50 followers</option>
                <option value="51-100">51-100 followers</option>
                <option value="101-500">101-500 followers</option>
                <option value="500+">500+ followers</option>
              </select>
              <ErrorMessage error={errors.currentFollowers} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose Your Plan
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {['basic', 'growth', 'premium'].map((plan) => (
                <label key={plan} className="cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value={plan}
                    checked={formData.plan === plan}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${formData.plan === plan
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                    }`}>
                    <div className="font-semibold capitalize">{plan} Tier</div>
                    <div className="text-sm text-gray-600">
                      {plan === 'basic' && '$200'}
                      {plan === 'growth' && '$500'}
                      {plan === 'premium' && '$800+'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Goals (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {goals
                .filter((goal) => {
                  const plan = formData.plan;
                  if (plan === 'premium') return true;
                  if (plan === 'growth') return goal.tier !== 'premium';
                  return goal.tier === 'basic';
                })
                .map((goal) => (
                  <label key={goal.label} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal.label)}
                      onChange={() => handleGoalToggle(goal.label)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{goal.label}</span>
                  </label>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Additional Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Tell us about your streaming goals, current challenges, or any specific questions..."
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Next
          </button>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-800 text-sm font-semibold mb-2">What happens next?</p>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• We'll analyze your current Twitch channel</li>
              <li>• Create a custom growth strategy for your goals</li>
              <li>• Send you a detailed proposal within 24 hours</li>
              <li>• Schedule a call to discuss your plan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo wrapper to show the component in action
export default function Demo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Contact Form Demo</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Open Contact Form
        </button>

        <ContactForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selectedPlan="growth"
        />
      </div>
    </div>
  );
}