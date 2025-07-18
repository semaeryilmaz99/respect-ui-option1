import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';

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
      gradient: "from-purple-500 to-pink-500",
      stats: "50K+ Sanatçı"
    },
    {
      id: 2,
      title: "Respect Gönder",
      description: "Sevdiğiniz sanatçılara küçük miktarlarda destek olun, onların sanatlarını destekleyin.",
      icon: "💝",
      gradient: "from-blue-500 to-purple-500",
      stats: "₺2M+ Gönderildi"
    },
    {
      id: 3,
      title: "Canlı Sohbet",
      description: "Sanatçılarla ve diğer hayranlarla gerçek zamanlı sohbet edin, özel mesajlar gönderin.",
      icon: "💬",
      gradient: "from-green-500 to-blue-500",
      stats: "24/7 Aktif"
    },
    {
      id: 4,
      title: "Müzik Deneyimi",
      description: "Spotify entegrasyonu ile favori şarkılarınızı dinleyin ve yeni müzikler keşfedin.",
      icon: "🎧",
      gradient: "from-orange-500 to-red-500",
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Respect
              </span>
              <br />
              <span className="text-white">Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
              Sanatçılara destek ol, müziğin gücünü hisset.<br />
              Sevdiğin müzisyenlere respect gönder, onlarla etkileşim kur.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50K+</div>
              <div className="text-purple-200">Sanatçı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">₺2M+</div>
              <div className="text-purple-200">Respect Gönderildi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">1M+</div>
              <div className="text-purple-200">Kullanıcı</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="xl" 
              className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white border-none shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              🚀 Hemen Başla
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-purple-900 transition-all duration-300"
              onClick={scrollToFeatures}
            >
              📖 Daha Fazla Öğren
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button 
              onClick={scrollToFeatures}
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50" data-animate>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Respect Platform ile müzik dünyasında yeni bir deneyim yaşayın
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className={`text-center cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  currentFeature === index ? 'ring-4 ring-purple-500 shadow-2xl' : 'hover:shadow-xl'
                } ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setCurrentFeature(index)}
                hoverable
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Badge variant="primary" className="inline-flex">
                  {feature.stats}
                </Badge>
              </Card>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {features[currentFeature].title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {features[currentFeature].description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Kolay ve güvenli</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Anında işlem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">7/24 destek</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className={`w-full h-64 rounded-xl bg-gradient-to-r ${features[currentFeature].gradient} flex items-center justify-center transform transition-all duration-500`}>
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
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentFeature === index ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-purple-900 text-white" data-animate id="testimonials">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4">Kullanıcılarımız Ne Diyor?</h2>
            <p className="text-purple-200 text-lg">Respect Platform deneyimleri</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="dark"
                className={`text-center transform transition-all duration-700 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-purple-300 font-medium">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Müzik Yolculuğuna Başla
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Sevdiğin sanatçılara destek ol, yeni müzikler keşfet ve toplulukla etkileşim kur.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl"
              className="bg-white text-purple-600 hover:bg-gray-100 border-none shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              🎵 Ücretsiz Başla
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              💬 İletişime Geç
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingPage; 