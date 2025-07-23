import React, { useState } from 'react';
import { Button, Card, Badge } from './ui';

const OnboardingModal = ({ isOpen, onClose, onGetStarted }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Sanatı Destekleme Devrimi",
      subtitle: "Sevdiğin sanatçılara direkt destek ol",
      content: "Respect Platform, sanatçılara doğrudan finansal destek sağlayabileceğin yenilikçi bir platform. Geleneksel müzik endüstrisinin sınırlarını aşarak, sanatçılar ile hayranları arasında doğrudan bir köprü kuruyoruz.",
      features: [
        {
          icon: "💰",
          title: "Direkt Destek",
          description: "Sanatçılara dilediğin miktarda 'Respect' gönder"
        },
        {
          icon: "🎵",
          title: "Kaliteli İçerik",
          description: "Desteklediğin sanatçıların daha kaliteli eserler üretmesine katkı sağla"
        },
        {
          icon: "🌟",
          title: "Özel Deneyim",
          description: "Desteklediğin sanatçılardan özel içerikler ve mesajlar al"
        }
      ],
      gradient: "linear-gradient(135deg, #669DFE 0%, #B1CBE7 100%)",
      bgEmoji: "🎨"
    },
    {
      id: 2,
      title: "Keşfet & Etkileşim Kur",
      subtitle: "Müzik dünyasında yeni deneyimler yaşa",
      content: "Binlerce sanatçıyı keşfet, favori şarkılarını dinle ve toplulukla etkileşim kur. Spotify entegrasyonu sayesinde müzik deneyimin hiç olmadığı kadar zengin.",
      features: [
        {
          icon: "🔍",
          title: "Akıllı Keşif",
          description: "Zevkine uygun yeni sanatçıları keşfet"
        },
        {
          icon: "💬",
          title: "Canlı Sohbet",
          description: "Sanatçılar ve hayranlarla gerçek zamanlı sohbet et"
        },
        {
          icon: "🎧",
          title: "Spotify Entegrasyonu",
          description: "Favori şarkılarını direkt platformda dinle"
        }
      ],
      gradient: "linear-gradient(135deg, #1E5CC4 0%, #669DFE 100%)",
      bgEmoji: "🚀"
    },
    {
      id: 3,
      title: "Topluluk & Gelecek",
      subtitle: "Müziğin geleceğinin bir parçası ol",
      content: "1M+ kullanıcısı ile büyüyen topluluğumuzun bir parçası ol. Sanatçılara verdiğin destekle müzik endüstrisinin geleceğini şekillendirmeye katkı sağla.",
      features: [
        {
          icon: "👥",
          title: "Büyük Topluluk",
          description: "1M+ müziksever ile bağlan ve paylaş"
        },
        {
          icon: "📈",
          title: "Etki Gör",
          description: "Desteklediğin sanatçıların büyümesini izle"
        },
        {
          icon: "🏆",
          title: "Özel Rozet",
          description: "Desteklerinle özel rozetler ve statüler kazan"
        }
      ],
      gradient: "linear-gradient(135deg, #669DFE 0%, #1E5CC4 100%)",
      bgEmoji: "🌟"
    }
  ];

  const currentStepData = steps[currentStep];

  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const handleGetStarted = () => {
    handleClose();
    if (onGetStarted) {
      onGetStarted();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
      background: 'linear-gradient(135deg, rgba(102, 157, 254, 0.1) 0%, rgba(177, 203, 231, 0.15) 25%, rgba(30, 92, 196, 0.1) 50%, rgba(251, 252, 253, 0.2) 100%)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20" style={{
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.4)
        `
      }}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{ background: currentStepData.gradient }}
          />
          
                     <div className="relative z-10">
             <div className="flex items-center justify-between mb-4">
               <div className="flex-1 text-center">
                 <h2 className="text-xl font-bold" style={{ color: '#1E5CC4' }}>
                   {currentStepData.title}
                 </h2>
                 <p className="text-sm" style={{ color: '#669DFE' }}>
                   {currentStepData.subtitle}
                 </p>
               </div>
               
               <button
                 onClick={handleClose}
                 className="text-gray-400 hover:text-gray-600 transition-colors p-1 absolute top-0 right-0"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>

                         {/* Progress Indicators */}
             <div className="flex gap-2">
               {steps.map((_, index) => (
                 <div
                   key={index}
                   className="flex-1 h-2 rounded-full transition-all duration-300"
                   style={{
                     backgroundColor: index <= currentStep ? '#669DFE' : '#E5E7EB'
                   }}
                 />
               ))}
             </div>
          </div>
        </div>

                 {/* Body */}
         <div className="p-6 space-y-6">
           {/* Main Content */}
           <div 
             className={`text-center mb-6 transition-all duration-300 ease-in-out ${
               isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
             }`}
           >
             <p className="text-lg leading-relaxed" style={{ color: '#374151' }}>
               {currentStepData.content}
             </p>
           </div>

                     {/* Features Grid */}
           <div 
             className={`grid gap-4 transition-all duration-300 ease-in-out ${
               isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
             }`}
           >
             {currentStepData.features.map((feature, index) => (
               <Card
                 key={index}
                 className="p-4 transition-all duration-300 hover:shadow-lg border border-gray-200 text-center"
                 style={{
                   transform: `translateY(${index * 10}px)`,
                   animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                 }}
               >
                 <div>
                   <h4 className="font-semibold mb-1" style={{ color: '#1E5CC4' }}>
                     {feature.title}
                   </h4>
                   <p className="text-sm" style={{ color: '#6B7280' }}>
                     {feature.description}
                   </p>
                 </div>
               </Card>
             ))}
           </div>

                     {/* Stats for final step */}
           {currentStep === 2 && (
             <div 
               className={`rounded-xl p-6 text-center text-white transition-all duration-300 ease-in-out ${
                 isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
               }`}
               style={{ background: currentStepData.gradient }}
             >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">Sanatçı</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">₺2M+</div>
                  <div className="text-sm opacity-90">Respect Gönderildi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1M+</div>
                  <div className="text-sm opacity-90">Kullanıcı</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="min-w-24"
            >
              Geri
            </Button>

                         <div className="flex gap-2">
               {steps.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => {
                     setIsTransitioning(true);
                     setTimeout(() => {
                       setCurrentStep(index);
                       setIsTransitioning(false);
                     }, 150);
                   }}
                   className="w-2 h-2 rounded-full transition-all duration-200"
                   style={{
                     backgroundColor: index === currentStep ? '#669DFE' : '#D1D5DB'
                   }}
                 />
               ))}
             </div>

            {currentStep === steps.length - 1 ? (
                             <Button
                 variant="primary"
                 onClick={handleGetStarted}
                 className="min-w-24"
                 style={{
                   background: 'linear-gradient(90deg, #669DFE 0%, #1E5CC4 100%)',
                   border: 'none'
                 }}
               >
                 Başlayalım!
               </Button>
            ) : (
              <Button
                variant="primary"
                onClick={nextStep}
                className="min-w-24"
                style={{
                  background: currentStepData.gradient,
                  border: 'none'
                }}
              >
                İleri
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardingModal; 