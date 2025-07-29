import React, { useState } from 'react';
import { X, Send, User, Mail, MessageSquare, Twitch, CheckCircle, CreditCard, Smartphone, Wallet, ArrowRight, Shield } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    twitchUsername: '',
    currentFollowers: '',
    plan: selectedPlan || 'growth',
    message: '',
    goals: [] as string[],
    sheetName: "Twitch"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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
    { name: 'PayPal', icon: Wallet, color: 'bg-blue-500' },
    { name: 'CashApp', icon: Smartphone, color: 'bg-green-500' },
    { name: 'Apple Pay', icon: Smartphone, color: 'bg-gray-800' },
    { name: 'Card Payment', icon: CreditCard, color: 'bg-purple-500' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoalToggle = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter(g => g !== goal)
        : [...formData.goals, goal]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${api}/api/twitch-form/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API response:", data);

      setShowPayment(true);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handlePayment = async (method: string) => {
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset everything after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setShowPayment(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        twitchUsername: '',
        currentFollowers: '',
        plan: 'growth',
        message: '',
        goals: [],
        sheetName: 'Twitch'
      });
    }, 3000);
  };

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
      basic: { name: 'Basic Tier', price: '$100-$200' },
      growth: { name: 'Growth Tier', price: '$300-$500' },
      premium: { name: 'Premium Tier', price: '$600-$800+' }
    }[formData.plan];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-3xl font-bold text-gray-900">Complete Payment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
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
                  onClick={() => handlePayment(method.name)}
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
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  )}
                </button>
              ))}
            </div>

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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Twitch className="w-4 h-4 inline mr-2" />
                Twitch Username
              </label>
              <input
                type="text"
                name="twitchUsername"
                value={formData.twitchUsername}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="YourTwitchName"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Followers
              </label>
              <select
                name="currentFollowers"
                value={formData.currentFollowers}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select range</option>
                <option value="0-50">0-50 followers</option>
                <option value="51-100">51-100 followers</option>
                <option value="101-500">101-500 followers</option>
                <option value="500+">500+ followers</option>
              </select>
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
                      {plan === 'basic' && '$100-$200'}
                      {plan === 'growth' && '$300-$500'}
                      {plan === 'premium' && '$600-$800+'}
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
                  return goal.tier === 'basic'; // basic only sees basic
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
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send My Information
              </>
            )}
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
        </form>
      </div>
    </div>
  );
};

export default ContactForm;