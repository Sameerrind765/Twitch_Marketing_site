import { useState } from 'react';
import ContactForm from './components/ContactForm';
import {
  Zap,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Star,
  BarChart3,
  CreditCard,
  Smartphone,
  Wallet,
  ArrowRight,
  Award,
  Rocket,
  Calendar,
  ExternalLink
} from 'lucide-react';

function App() {
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormPlan, setContactFormPlan] = useState('');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Tier',
      price: '$200',
      description: 'Perfect for streamers starting their journey',
      features: [
        'Meta ad launch setup with budget',
        'Stream optimization guidance',
        'Twitch Affiliate status guidance',
        'Basic monetization setup',
        'Email support'
      ],
      highlight: false
    },
    {
      id: 'growth',
      name: 'Growth Tier',
      price: '$500',
      description: 'Most popular choice for serious streamers',
      features: [
        'Everything in Basic Tier',
        'Full ad campaign management',
        'Stream branding & overlays',
        'Content strategy planning',
        'Community building guidance',
        'Priority support'
      ],
      highlight: true
    },
    {
      id: 'premium',
      name: 'Premium Tier',
      price: '$800+',
      description: 'Complete solution for professional streamers',
      features: [
        'All Growth Tier features',
        'Ongoing campaign support',
        'Personal growth coaching',
        'Advanced monetization strategies',
        'Networking opportunities',
        '24/7 dedicated support'
      ],
      highlight: false
    }
  ];

  const roadmapSteps = [
    {
      title: 'Twitch Affiliate',
      description: 'Meet the requirements: 50+ followers, 500+ minutes streamed, 7+ unique broadcast days, 3+ concurrent viewers',
      icon: Target,
      status: 'guaranteed'
    },
    {
      title: 'Channel Growth',
      description: 'Scale your audience with targeted ads, community engagement, and content optimization',
      icon: TrendingUp,
      status: 'active'
    },
    {
      title: 'Twitch Partner',
      description: 'Achieve Partner status with consistent growth and professional presentation',
      icon: Award,
      status: 'goal'
    }
  ];

  const proofMetrics = [
    { label: 'Channels Grown', value: '250+', icon: Users },
    { label: 'Affiliates Created', value: '189', icon: Award },
    { label: 'Average Growth Rate', value: '340%', icon: TrendingUp },
    { label: 'Client Satisfaction', value: '98%', icon: Star }
  ];

  const paymentMethods = [
    { name: 'PayPal', icon: Wallet, color: 'bg-blue-500' },
    { name: 'CashApp', icon: Smartphone, color: 'bg-green-500' },
    { name: 'Apple Pay', icon: Smartphone, color: 'bg-gray-800' },
    { name: 'Card Payment', icon: CreditCard, color: 'bg-purple-500' }
  ];

  const handleStartGrowing = (plan?: string) => {
    setContactFormPlan(plan || '');
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6 w-[100px] mx-auto">
                <img src="/logo.png" alt="" />
              {/* <div className="bg-purple-500/20 p-4 rounded-full">
                <Zap className="w-12 h-12 text-purple-300" />
              </div> */}
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              Grow Your Twitch Channel with<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Proven Monetization
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Welcome to  <strong>GrowStreamers</strong> – the one-stop solution for streamers who want to go from 0 to Twitch Affiliate. We use laser-focused Meta ads, expert branding, and smart analytics to get you there. Fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => handleStartGrowing()}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-base md:text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Get Started with GrowStreamers
              </button>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Guaranteed Affiliate</h3>
                <p className="text-sm text-purple-200">100% success rate reaching Affiliate status</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Target className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Targeted Meta Ads</h3>
                <p className="text-sm text-purple-200">Strategic advertising for real growth</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Users className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Community Growth</h3>
                <p className="text-sm text-purple-200">Build engaged viewer communities</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <BarChart3 className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Growth Analytics</h3>
                <p className="text-sm text-purple-200">Track your streaming progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Growth Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every plan guarantees Affiliate status. Select the tier that matches your growth ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${plan.highlight
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-purple-600'}`}>
                    {plan.price}
                  </div>
                  <p className={`${plan.highlight ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-green-300' : 'text-green-500'
                        }`} />
                      <span className={`${plan.highlight ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleStartGrowing(plan.id)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${plan.highlight
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}>
                  Get Started
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real clients, real results. Click to visit their Twitch channels and see the growth for yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/8efe124e-56db-4677-9402-2f370c0002ab-profile_image-150x150.png"
                  alt="tnt891"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">tnt891</h3>
                  <span className="bg-purple-100 text-purple-800 px-2 rounded-full text-sm font-semibold">
                    Premium Tier
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-600">Followers</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">
                    15 → 2,847
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-lg lg:text-sm font-semibold text-gray-600">Revenue</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">$890/month</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">4 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Twitch Partner</span>
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "Started with zero viewers, now I consistently get 90+ concurrent viewers every stream. The targeted ads brought exactly the gaming community I needed!"
              </blockquote>

              <a
                href="https://www.twitch.tv/tnt891"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Twitch Channel
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/433250a2-f489-49b1-b6a5-4a236a4a86f7-profile_image-70x70 copy.png"
                  alt="YvngOllieStreams"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">YvngOllieStreams</h3>
                  <span className="bg-purple-100 text-purple-800 px-2 rounded-full text-sm font-semibold">
                    Growth Tier
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600">Followers</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">
                    45 → 1,890
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-lg lg:text-sm font-semibold text-gray-600">Revenue</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 lg:text-2xl">$650/month</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">3 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Twitch Affiliate + Growing Fast</span>
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "Amazing growth! From barely any followers to a solid community. The affiliate program helped me start earning from my passion!"
              </blockquote>

              <a
                href="https://www.twitch.tv/YvngOllieStreams"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Twitch Channel
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/713c4931-45d2-4246-868d-0692bbed5483-profile_image-70x70 copy.png"
                  alt="ilyjump"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">ilyjump</h3>
                  <span className="bg-purple-100 text-purple-800 px-2 rounded-full text-sm font-semibold">
                    Growth Tier
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600">Followers</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">
                    78 → 2,340
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-600">Revenue</span>
                  </div>
                  <div className="text-lg lg:text-xl font-bold text-gray-900">$780/month</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">3 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Twitch Affiliate</span>
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "Perfect service! The growth was organic and my community loves the content. Reached affiliate faster than I ever imagined!"
              </blockquote>

              <a
                href="https://www.twitch.tv/ilyjump"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Twitch Channel
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://static-cdn.jtvnw.net/jtv_user_pictures/d26eb54b-33ed-4876-9335-cb14d7097daf-profile_image-70x70.png"
                  alt="faronova"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">faronova</h3>
                  <span className="bg-purple-100 text-purple-800 px-2 rounded-full text-sm font-semibold">
                    Premium Tier
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600">Followers</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">
                    92 → 3,120
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-600">Revenue</span>
                  </div>
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">$1,120/month</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">4 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Twitch Affiliate + Partner Track</span>
                </div>
              </div>

              <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                "Exceptional results! My channel grew beyond expectations and the community engagement is incredible. Highly recommend their services!"
              </blockquote>

              <a
                href="https://www.twitch.tv/faronova"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Twitch Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Zone */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real metrics from real clients. Our track record speaks for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {proofMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-lg text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Tracking</h3>
              <p className="text-lg text-gray-600 mb-6">
                Monitor your Twitch growth with detailed follower analytics, viewer engagement metrics,
                and streaming performance insights.
              </p>
              <button
                onClick={() => handleStartGrowing()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Start Growing Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold">TwitchGrowth Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional Twitch growth services with guaranteed results.
                From Affiliate to Partner, we're your growth partner.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitch Affiliate Guarantee</li>
                <li>Meta Ad Campaigns</li>
                <li>Stream Optimization</li>
                <li>Growth Analytics</li>
                <li>Community Building</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@twitchgrowth.pro</li>
                <li>Discord: Available 24/7</li>
                <li>Response time: Under 24 hours</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GrowStreamers. All rights reserved. This site is not affiliated with or endorsed by Twitch Interactive, Inc. Results may vary and depend on individual content, consistency, and Twitch platform policies.</p>
          </div>
        </div>
      </footer>

      <ContactForm
        key={showContactForm ? contactFormPlan : 'closed'}
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
        selectedPlan={contactFormPlan}
      />
    </div>
  );
}

export default App;