import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';

// CSS Animations for stage lights effect
const stageAnimations = `
  @keyframes stageLight1 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    25% { transform: translate(100px, -50px) scale(1.2); opacity: 0.6; }
    50% { transform: translate(-50px, 80px) scale(0.8); opacity: 0.4; }
    75% { transform: translate(150px, 120px) scale(1.1); opacity: 0.7; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  }
  
  @keyframes stageLight2 {
    0% { transform: translate(0, 0) scale(1.1) rotate(0deg); opacity: 0.4; }
    30% { transform: translate(-120px, 60px) scale(0.9) rotate(120deg); opacity: 0.8; }
    60% { transform: translate(80px, -40px) scale(1.3) rotate(240deg); opacity: 0.3; }
    100% { transform: translate(0, 0) scale(1.1) rotate(360deg); opacity: 0.4; }
  }
  
  @keyframes stageLight3 {
    0% { transform: translate(0, 0) scale(0.8); opacity: 0.5; }
    40% { transform: translate(200px, 100px) scale(1.4); opacity: 0.2; }
    70% { transform: translate(-80px, -60px) scale(1); opacity: 0.9; }
    100% { transform: translate(0, 0) scale(0.8); opacity: 0.5; }
  }
  
  @keyframes stageLight4 {
    0% { transform: translate(0, 0) scale(1.2) rotate(0deg); opacity: 0.3; }
    20% { transform: translate(-150px, -80px) scale(0.7) rotate(90deg); opacity: 0.7; }
    50% { transform: translate(120px, 150px) scale(1.5) rotate(180deg); opacity: 0.2; }
    80% { transform: translate(-60px, 40px) scale(1) rotate(270deg); opacity: 0.6; }
    100% { transform: translate(0, 0) scale(1.2) rotate(360deg); opacity: 0.3; }
  }
  
  @keyframes stageLight5 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    25% { transform: translate(-80px, 120px) scale(1.3); opacity: 0.8; }
    50% { transform: translate(160px, -40px) scale(0.6); opacity: 0.3; }
    75% { transform: translate(-40px, -100px) scale(1.1); opacity: 0.9; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  }
  
  @keyframes stageLight6 {
    0% { transform: translate(0, 0) scale(0.9) rotate(0deg); opacity: 0.6; }
    35% { transform: translate(100px, 80px) scale(1.6) rotate(150deg); opacity: 0.2; }
    65% { transform: translate(-120px, -120px) scale(0.8) rotate(300deg); opacity: 0.8; }
    100% { transform: translate(0, 0) scale(0.9) rotate(360deg); opacity: 0.6; }
  }
  
  .stage-light-1 { animation: stageLight1 12s ease-in-out infinite; }
  .stage-light-2 { animation: stageLight2 15s ease-in-out infinite; }
  .stage-light-3 { animation: stageLight3 10s ease-in-out infinite; }
  .stage-light-4 { animation: stageLight4 18s ease-in-out infinite; }
  .stage-light-5 { animation: stageLight5 14s ease-in-out infinite; }
  .stage-light-6 { animation: stageLight6 16s ease-in-out infinite; }
  
  @keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    30% { transform: scale(1.02); opacity: 0.8; }
    60% { transform: scale(0.98); opacity: 0.9; }
    80% { transform: scale(1.01); opacity: 0.95; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .bounce-effect { animation: bounceIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  
  /* Musical Notes Animations */
  @keyframes floatingNote1 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.7; }
    25% { transform: translate(50px, -30px) rotate(90deg) scale(1.2); opacity: 0.9; }
    50% { transform: translate(-30px, -60px) rotate(180deg) scale(0.8); opacity: 0.6; }
    75% { transform: translate(80px, -20px) rotate(270deg) scale(1.1); opacity: 0.8; }
    100% { transform: translate(0, 0) rotate(360deg) scale(1); opacity: 0.7; }
  }
  
  @keyframes floatingNote2 {
    0% { transform: translate(0, 0) rotate(0deg) scale(0.8); opacity: 0.6; }
    30% { transform: translate(-60px, -40px) rotate(120deg) scale(1.3); opacity: 0.9; }
    60% { transform: translate(40px, -80px) rotate(240deg) scale(0.7); opacity: 0.5; }
    100% { transform: translate(0, 0) rotate(360deg) scale(0.8); opacity: 0.6; }
  }
  
  @keyframes floatingNote3 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1.1); opacity: 0.8; }
    40% { transform: translate(70px, -50px) rotate(160deg) scale(0.9); opacity: 0.4; }
    70% { transform: translate(-50px, -30px) rotate(280deg) scale(1.4); opacity: 0.9; }
    100% { transform: translate(0, 0) rotate(360deg) scale(1.1); opacity: 0.8; }
  }
  
  @keyframes floatingNote4 {
    0% { transform: translate(0, 0) rotate(0deg) scale(0.9); opacity: 0.5; }
    20% { transform: translate(-40px, -70px) rotate(80deg) scale(1.5); opacity: 0.8; }
    50% { transform: translate(90px, -10px) rotate(200deg) scale(0.6); opacity: 0.3; }
    80% { transform: translate(-20px, -90px) rotate(320deg) scale(1.2); opacity: 0.9; }
    100% { transform: translate(0, 0) rotate(360deg) scale(0.9); opacity: 0.5; }
  }
  
  .music-note-1 { animation: floatingNote1 8s ease-in-out infinite; }
  .music-note-2 { animation: floatingNote2 12s ease-in-out infinite; }
  .music-note-3 { animation: floatingNote3 10s ease-in-out infinite; }
  .music-note-4 { animation: floatingNote4 14s ease-in-out infinite; }
  
  /* Testimonial Cards Pulse Animation */
  @keyframes testimonialPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .testimonial-pulse-1 { 
    animation: testimonialPulse 3s ease-in-out infinite;
    animation-delay: 0s;
  }
  .testimonial-pulse-2 { 
    animation: testimonialPulse 3s ease-in-out infinite;
    animation-delay: 1s;
  }
  .testimonial-pulse-3 { 
    animation: testimonialPulse 3s ease-in-out infinite;
    animation-delay: 2s;
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = stageAnimations;
  document.head.appendChild(styleSheet);
}

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [bounceKey, setBounceKey] = useState(0);

  const features = [
    {
      id: 1,
      title: "Sanatçıları Keşfet",
      description: "Yeni yetenekleri keşfedin, favorilerinizi takip edin ve müzik yolculuğunuza başlayın.",
      gradient: "linear-gradient(135deg, #669DFE 0%, #B1CBE7 100%)",
      stats: "50K+ Sanatçı"
    },
    {
      id: 2,
      title: "Respect Gönder",
      description: "Sevdiğiniz sanatçılara dilediğiniz miktarda destek olun, onların sanatlarını destekleyin.",
      gradient: "linear-gradient(135deg, #1E5CC4 0%, #669DFE 100%)",
      stats: "₺2M+ Gönderildi"
    },
    {
      id: 3,
      title: "Canlı Sohbet",
      description: "Sanatçılarla ve diğer hayranlarla gerçek zamanlı sohbet edin, özel mesajlar gönderin.",
      gradient: "linear-gradient(135deg, #669DFE 0%, #1E5CC4 100%)",
      stats: "24/7 Aktif"
    },
    {
      id: 4,
      title: "Müzik Deneyimi",
      description: "Spotify entegrasyonu ile favori şarkılarınızı dinleyin ve yeni müzikler keşfedin.",
      gradient: "linear-gradient(135deg, #B1CBE7 0%, #669DFE 100%)",
      stats: "10M+ Şarkı"
    }
  ];

  const testimonials = [
    {
      name: "Art lover",
      text: "Sevdiğim sanatçılara destek olmak hiç bu kadar kolay olmamıştı!",
      avatar: "AL"
    },
    {
      name: "Indie Artist",
      text: "Hayranlarımdan aldığım destek sayesinde müziğime odaklanabiliyorum.",
      avatar: "IA"
    },
    {
      name: "Producer",
      text: "Respect Platform sayesinde yeni yetenekler keşfediyorum.",
      avatar: "PR"
    }
  ];

  // Auto-advance features every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
      setBounceKey(prev => prev + 1); // Trigger bounce effect
    }, 4000); // 4000ms = 4 seconds - perfect reading time
    return () => clearInterval(interval);
  }, [features.length]);

  // Bounce effect when manually clicking feature
  const handleFeatureClick = (index) => {
    setCurrentFeature(index);
    setBounceKey(prev => prev + 1);
  };

  // Intersection Observer for continuous animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Always update visibility state based on intersection
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { 
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '-10% 0px -10% 0px' // Add some margin for better triggering
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBFCFD' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden" style={{ 
        background: `
          radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%),
          linear-gradient(135deg, #000000 0%, #1E5CC4 25%, #669DFE 60%, #B1CBE7 85%, #000000 100%),
          radial-gradient(ellipse at top left, rgba(0,0,0,0.8) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(0,0,0,0.8) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(0,0,0,0.8) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(0,0,0,0.8) 0%, transparent 50%)
        `
      }}>
        {/* Stage Lights Animation */}
        <div className="absolute inset-0">
          {/* Main Stage Lights */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-xl stage-light-1" 
               style={{ backgroundColor: '#669DFE', opacity: 0.4 }}></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-2xl stage-light-2" 
               style={{ backgroundColor: '#B1CBE7', opacity: 0.5 }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full mix-blend-screen filter blur-xl stage-light-3" 
               style={{ backgroundColor: '#1E5CC4', opacity: 0.6 }}></div>
          
          {/* Additional Floating Lights */}
          <div className="absolute top-1/6 right-1/3 w-64 h-64 rounded-full mix-blend-screen filter blur-2xl stage-light-4" 
               style={{ backgroundColor: '#669DFE', opacity: 0.3 }}></div>
          <div className="absolute bottom-1/3 right-1/6 w-56 h-56 rounded-full mix-blend-screen filter blur-xl stage-light-5" 
               style={{ backgroundColor: '#B1CBE7', opacity: 0.4 }}></div>
          <div className="absolute top-2/3 left-1/6 w-48 h-48 rounded-full mix-blend-screen filter blur-2xl stage-light-6" 
               style={{ backgroundColor: '#1E5CC4', opacity: 0.5 }}></div>
          
          {/* Smaller Accent Lights */}
          <div className="absolute top-1/5 left-2/3 w-40 h-40 rounded-full mix-blend-screen filter blur-xl stage-light-1" 
               style={{ backgroundColor: '#669DFE', opacity: 0.3, animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/5 left-1/2 w-44 h-44 rounded-full mix-blend-screen filter blur-2xl stage-light-2" 
               style={{ backgroundColor: '#B1CBE7', opacity: 0.4, animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/8 w-36 h-36 rounded-full mix-blend-screen filter blur-xl stage-light-3" 
               style={{ backgroundColor: '#1E5CC4', opacity: 0.6, animationDelay: '6s' }}></div>
          
          {/* Spotlight Effects */}
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full mix-blend-screen filter blur-2xl stage-light-4" 
               style={{ backgroundColor: '#FBFCFD', opacity: 0.2, animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-1/3 w-28 h-28 rounded-full mix-blend-screen filter blur-xl stage-light-5" 
               style={{ backgroundColor: '#FBFCFD', opacity: 0.3, animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-0 w-24 h-24 rounded-full mix-blend-screen filter blur-2xl stage-light-6" 
               style={{ backgroundColor: '#669DFE', opacity: 0.4, animationDelay: '5s' }}></div>
        </div>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 z-10" style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)
          `
        }}></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span style={{ 
                background: 'linear-gradient(90deg, #669DFE 0%, #B1CBE7 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text',
                fontSize: '1.2em'
              }}>
                Respect
              </span>
              <br />
              <span className="text-white">Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: '#B1CBE7' }}>
              Sevdiğiniz sanatçılara destek olarak<br />
              nitelikli sanat ürünlerini finanse edin.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#B1CBE7' }}>50K+</div>
              <div style={{ color: '#FBFCFD' }}>Sanatçı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#669DFE' }}>₺2M+</div>
              <div style={{ color: '#FBFCFD' }}>Respect Gönderildi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#FBFCFD' }}>1M+</div>
              <div style={{ color: '#B1CBE7' }}>Kullanıcı</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="xl" 
              className="border-none shadow-2xl transform hover:scale-110 transition-all duration-500 ease-out"
              style={{ 
                background: 'linear-gradient(90deg, #669DFE 0%, #B1CBE7 100%)', 
                color: 'white',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center left'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #1E5CC4 0%, #669DFE 100%)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #669DFE 0%, #B1CBE7 100%)';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => navigate('/auth')}
            >
              Hemen Başla
            </Button>
            
            <Button 
              size="xl"
              className="border-none shadow-2xl transform hover:scale-110 transition-all duration-500 ease-out"
              style={{ 
                background: 'linear-gradient(90deg, #669DFE 0%, #B1CBE7 100%)', 
                color: 'white',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center right'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #1E5CC4 0%, #669DFE 100%)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(90deg, #669DFE 0%, #B1CBE7 100%)';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={scrollToFeatures}
            >
              Daha Fazla Öğren
            </Button>
          </div>


        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20" style={{ backgroundColor: '#FBFCFD' }} data-animate>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center gap-2" style={{ color: '#1E5CC4' }}>
              <span className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-10 -translate-y-5'}`} 
                    style={{ transitionDelay: '200ms' }}>
                Etkinizin
              </span>
              <span className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-10 -translate-y-5'}`} 
                    style={{ transitionDelay: '400ms' }}>
                Farkında
              </span>
              <span className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-y-10'}`} 
                    style={{ transitionDelay: '600ms' }}>
                Olun
              </span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
               style={{ color: '#C7D0DA', transitionDelay: '800ms' }}>
              Hayatınıza dokunan sanatçıların müziğine ne kadar dokunduğunuzu görün.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className={`text-center cursor-pointer transform transition-all duration-1000 hover:scale-105 hover:transition-transform hover:duration-200 ${
                  currentFeature === index ? 'shadow-2xl' : 'hover:shadow-xl'
                } ${isVisible.features ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${
                  index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'
                } translate-y-10`}`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  ...(currentFeature === index ? { 
                    borderColor: '#669DFE', 
                    borderWidth: '2px', 
                    borderStyle: 'solid' 
                  } : {})
                }}
                onClick={() => handleFeatureClick(index)}
                hoverable
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: feature.gradient }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
                  {feature.title}
                </h3>
                <p className="mb-4" style={{ color: '#C7D0DA' }}>
                  {feature.description}
                </p>
                <Badge variant="primary" className="inline-flex" style={{ backgroundColor: '#669DFE', color: 'white' }}>
                  {feature.stats}
                </Badge>
              </Card>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className={`bg-white rounded-2xl p-8 md:p-12 transition-all duration-1000 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`} style={{ 
            transitionDelay: '800ms',
            boxShadow: `
              0 35px 70px -15px rgba(0, 0, 0, 0.4),
              0 25px 45px -10px rgba(30, 92, 196, 0.35),
              0 15px 25px -5px rgba(0, 0, 0, 0.2),
              0 8px 15px -3px rgba(30, 92, 196, 0.25),
              0 4px 8px -1px rgba(0, 0, 0, 0.15)
            `
          }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`text-center transition-all duration-1000 ${
                isVisible.features ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'
              }`} style={{ transitionDelay: '1000ms' }}>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#000000' }}>
                  {features[currentFeature].title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ 
                  background: 'linear-gradient(135deg, #1E5CC4 0%, #4B5563 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '500'
                }}>
                  {features[currentFeature].description}
                </p>
               
              </div>
              
              <div className={`relative transition-all duration-1000 ${
                isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`} style={{ transitionDelay: '1200ms' }}>
                <div 
                  key={bounceKey}
                  className="w-full h-64 rounded-xl flex items-center justify-center transform transition-all duration-500 bounce-effect"
                  style={{ background: features[currentFeature].gradient }}
                >
                  <div className="text-6xl">
                    {features[currentFeature].icon}
                  </div>
                </div>
                
                {/* Feature Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleFeatureClick(index)}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: currentFeature === index ? '#669DFE' : '#C7D0DA' 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 text-white" style={{ backgroundColor: '#1E5CC4' }} data-animate id="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4">Kullanıcılarımız Ne Diyor?</h2>
            <p className="text-lg" style={{ color: '#B1CBE7' }}>Respect Platform deneyimleri</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="dark"
                className={`text-center transform transition-all duration-700 testimonial-pulse-${index + 1} ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  backgroundColor: '#669DFE',
                  borderColor: '#B1CBE7'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: 'linear-gradient(135deg, #B1CBE7 0%, #669DFE 100%)' }}
                >
                  {testimonial.avatar}
                </div>
                <p className="mb-4 italic" style={{ color: '#FBFCFD' }}>"{testimonial.text}"</p>
                <p className="font-medium" style={{ color: '#B1CBE7' }}>{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white text-center overflow-hidden" style={{ background: 'linear-gradient(90deg, #669DFE 0%, #1E5CC4 100%)' }} data-animate id="finalCTA">
        {/* Floating Musical Notes */}
        <div className={`absolute inset-0 transition-all duration-1500 ${isVisible.finalCTA ? 'opacity-100' : 'opacity-0'}`}>
          {/* Large Notes */}
          <div className="absolute top-1/4 left-1/6 text-4xl music-note-1" style={{ color: '#B1CBE7', mixBlendMode: 'screen' }}>♪</div>
          <div className="absolute top-1/3 right-1/5 text-5xl music-note-2" style={{ color: '#FBFCFD', mixBlendMode: 'screen' }}>♫</div>
          <div className="absolute bottom-1/4 left-1/4 text-6xl music-note-3" style={{ color: '#669DFE', mixBlendMode: 'screen' }}>♬</div>
          <div className="absolute top-1/2 right-1/3 text-3xl music-note-4" style={{ color: '#B1CBE7', mixBlendMode: 'screen' }}>♩</div>
          
          {/* Medium Notes */}
          <div className="absolute top-1/6 right-1/6 text-3xl music-note-2" style={{ color: '#FBFCFD', mixBlendMode: 'screen', animationDelay: '2s' }}>♪</div>
          <div className="absolute bottom-1/3 right-1/4 text-4xl music-note-1" style={{ color: '#669DFE', mixBlendMode: 'screen', animationDelay: '3s' }}>♫</div>
          <div className="absolute top-3/4 left-1/3 text-2xl music-note-3" style={{ color: '#B1CBE7', mixBlendMode: 'screen', animationDelay: '1s' }}>♯</div>
          <div className="absolute bottom-1/6 right-1/8 text-5xl music-note-4" style={{ color: '#FBFCFD', mixBlendMode: 'screen', animationDelay: '4s' }}>♬</div>
          
          {/* Small Accent Notes */}
          <div className="absolute top-1/5 left-1/2 text-2xl music-note-1" style={{ color: '#669DFE', mixBlendMode: 'screen', animationDelay: '1.5s' }}>♭</div>
          <div className="absolute bottom-1/5 left-1/8 text-3xl music-note-3" style={{ color: '#B1CBE7', mixBlendMode: 'screen', animationDelay: '2.5s' }}>♪</div>
          <div className="absolute top-2/3 right-1/6 text-2xl music-note-2" style={{ color: '#FBFCFD', mixBlendMode: 'screen', animationDelay: '3.5s' }}>♩</div>
          <div className="absolute top-1/8 left-1/3 text-4xl music-note-4" style={{ color: '#669DFE', mixBlendMode: 'screen', animationDelay: '0.5s' }}>♫</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1200 ${
            isVisible.finalCTA ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
          }`} style={{ transitionDelay: '400ms' }}>
            Müzik Yolculuğuna Başla
          </h2>
          <p className={`text-xl mb-8 transition-all duration-1200 ${
            isVisible.finalCTA ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`} style={{ color: '#B1CBE7', transitionDelay: '600ms' }}>
            Sevdiğin sanatçılara destek ol, yeni müzikler keşfet ve toplulukla etkileşim kur.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl"
              className={`border-none shadow-xl transform hover:scale-110 transition-all duration-1200 ease-out ${
                isVisible.finalCTA ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-20 translate-y-10'
              }`}
              style={{ 
                backgroundColor: '#FBFCFD', 
                color: '#1E5CC4',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center left',
                transitionDelay: '800ms'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C7D0DA';
                e.target.style.color = '#000000';
                e.target.style.transform = 'scale(1.1) translate(0, 0)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.color = '#1E5CC4';
                e.target.style.transform = 'scale(1) translate(0, 0)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
              }}
              onClick={() => navigate('/auth')}
            >
              Ücretsiz Başla
            </Button>
            <Button 
              size="xl"
              className={`border-none shadow-xl transform hover:scale-110 transition-all duration-1200 ease-out ${
                isVisible.finalCTA ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-20 translate-y-10'
              }`}
              style={{ 
                backgroundColor: '#FBFCFD', 
                color: '#1E5CC4',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center right',
                transitionDelay: '1000ms'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C7D0DA';
                e.target.style.color = '#000000';
                e.target.style.transform = 'scale(1.1) translate(0, 0)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.color = '#1E5CC4';
                e.target.style.transform = 'scale(1) translate(0, 0)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
              }}
            >
              İletişime Geç
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingPage; 