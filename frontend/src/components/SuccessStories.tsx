import React from 'react';
import { X, Users, TrendingUp, DollarSign, Calendar, ExternalLink } from 'lucide-react';

interface SuccessStoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ isOpen, onClose }) => {
  const successStories = [
    {
      id: 1,
      streamerName: "tnt891",
      beforeFollowers: 15,
      afterFollowers: 2847,
      timeframe: "4 months",
      plan: "Premium Tier",
      achievement: "Twitch Partner",
      revenue: "$890/month",
      testimonial: "Started with zero viewers, now I consistently get 90+ concurrent viewers every stream. The targeted ads brought exactly the gaming community I needed!",
      avatar: "/d26eb54b-33ed-4876-9335-cb14d7097daf-profile_image-150x150.png",
      twitchUrl: "https://www.twitch.tv/tnt891"
    },
    {
      id: 2,
      streamerName: "YvngOllieStreams",
      beforeFollowers: 45,
      afterFollowers: 1890,
      timeframe: "3 months",
      plan: "Growth Tier",
      achievement: "Twitch Affiliate + Growing Fast",
      revenue: "$650/month",
      testimonial: "Amazing growth! From barely any followers to a solid community. The affiliate program helped me start earning from my passion!",
      avatar: "/8efe124e-56db-4677-9402-2f370c0002ab-profile_image-150x150.png",
      twitchUrl: "https://www.twitch.tv/YvngOllieStreams"
    },
    {
      id: 3,
      streamerName: "ilyjump",
      beforeFollowers: 78,
      afterFollowers: 2340,
      timeframe: "3 months",
      plan: "Growth Tier",
      achievement: "Twitch Affiliate",
      revenue: "$780/month",
      testimonial: "Perfect service! The growth was organic and my community loves the content. Reached affiliate faster than I ever imagined!",
      avatar: "/433250a2-f489-49b1-b6a5-4a236a4a86f7-profile_image-70x70 copy.png",
      twitchUrl: "https://www.twitch.tv/ilyjump"
    },
    {
      id: 4,
      streamerName: "faronova",
      beforeFollowers: 92,
      afterFollowers: 3120,
      timeframe: "4 months",
      plan: "Premium Tier",
      achievement: "Twitch Affiliate + Partner Track",
      revenue: "$1,120/month",
      testimonial: "Exceptional results! My channel grew beyond expectations and the community engagement is incredible. Highly recommend their services!",
      avatar: "/713c4931-45d2-4246-868d-0692bbed5483-profile_image-70x70 copy.png",
      twitchUrl: "https://www.twitch.tv/faronova"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {successStories.map((story) => (
              <div key={story.id} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={story.avatar} 
                    alt={story.streamerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.streamerName}</h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {story.plan}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-600">Followers</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {story.beforeFollowers} → {story.afterFollowers.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-gray-600">Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{story.revenue}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{story.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">{story.achievement}</span>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{story.testimonial}"
                </blockquote>
                
                <a 
                  href={story.twitchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Twitch Channel
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Be Our Next Success Story?</h3>
              <p className="text-purple-100 mb-6 text-lg">
                Join 250+ streamers who have transformed their Twitch channels with our proven strategies.
              </p>
              <button 
                onClick={onClose}
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Choose Your Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;