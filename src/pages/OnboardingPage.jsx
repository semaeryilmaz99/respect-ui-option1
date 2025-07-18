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

  const features = [
    {
      id: 1,
      title: "Sanatçıları Keşfet",
      description: "Yeni yetenekleri keşfedin, favorilerinizi takip edin ve müzik yolculuğunuza başlayın.",
      icon: "🎵",
      gradient: "linear-gradient(135deg, #669DFE 0%, #B1CBE7 100%)",
      stats: "50K+ Sanatçı"
    },
    {
      id: 2,
      title: "Respect Gönder",
      description: "Sevdiğiniz sanatçılara küçük miktarlarda destek olun, onların sanatlarını destekleyin.",
      icon: "💝",
      gradient: "linear-gradient(135deg, #1E5CC4 0%, #669DFE 100%)",
      stats: "₺2M+ Gönderildi"
    },
    {
      id: 3,
      title: "Canlı Sohbet",
      description: "Sanatçılarla ve diğer hayranlarla gerçek zamanlı sohbet edin, özel mesajlar gönderin.",
      icon: "💬",
      gradient: "linear-gradient(135deg, #669DFE 0%, #1E5CC4 100%)",
      stats: "24/7 Aktif"
    },
    {
      id: 4,
      title: "Müzik Deneyimi",
      description: "Spotify entegrasyonu ile favori şarkılarınızı dinleyin ve yeni müzikler keşfedin.",
      icon: "🎧",
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
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
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
              Sevdiğiniz sanatçıları destekleyin,<br />
              Onların koruyucu melekleri olun.
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
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
              Etkinizi Görün
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#C7D0DA' }}>
              Hayatınıza dokunan sanatçıların müziğine ne kadar dokunduğunuzu görün.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className={`text-center cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  currentFeature === index ? 'shadow-2xl' : 'hover:shadow-xl'
                } ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  ...(currentFeature === index ? { 
                    borderColor: '#669DFE', 
                    borderWidth: '2px', 
                    borderStyle: 'solid' 
                  } : {})
                }}
                onClick={() => setCurrentFeature(index)}
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
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#000000' }}>
                  {features[currentFeature].title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#C7D0DA' }}>
                  {features[currentFeature].description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#669DFE' }}></div>
                    <span style={{ color: '#000000' }}>Kolay ve güvenli</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#669DFE' }}></div>
                    <span style={{ color: '#000000' }}>Anında işlem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#669DFE' }}></div>
                    <span style={{ color: '#000000' }}>7/24 destek</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="w-full h-64 rounded-xl flex items-center justify-center transform transition-all duration-500"
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
                      onClick={() => setCurrentFeature(index)}
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
                className={`text-center transform transition-all duration-700 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
      <section className="py-20 text-white text-center" style={{ background: 'linear-gradient(90deg, #669DFE 0%, #1E5CC4 100%)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Müzik Yolculuğuna Başla
          </h2>
          <p className="text-xl mb-8" style={{ color: '#B1CBE7' }}>
            Sevdiğin sanatçılara destek ol, yeni müzikler keşfet ve toplulukla etkileşim kur.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl"
              className="border-none shadow-xl transform hover:scale-110 transition-all duration-500 ease-out"
              style={{ 
                backgroundColor: '#FBFCFD', 
                color: '#1E5CC4',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center left'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C7D0DA';
                e.target.style.color = '#000000';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.color = '#1E5CC4';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => navigate('/auth')}
            >
              Ücretsiz Başla
            </Button>
            <Button 
              size="xl"
              className="border-none shadow-xl transform hover:scale-110 transition-all duration-500 ease-out"
              style={{ 
                backgroundColor: '#FBFCFD', 
                color: '#1E5CC4',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center right'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C7D0DA';
                e.target.style.color = '#000000';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.color = '#1E5CC4';
                e.target.style.transform = 'scale(1)';
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