import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, LoadingSpinner } from '../components/ui';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }

    // Register specific validations
    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = 'Kullanıcı adı gerekli';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Kullanıcı adı en az 3 karakter olmalı';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifre tekrarı gerekli';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(isLogin ? 'Login attempt:' : 'Register attempt:', formData);
      
      // TODO: Implement actual authentication logic
      alert(isLogin ? 'Giriş başarılı! (Demo)' : 'Kayıt başarılı! (Demo)');
      
      // Başarılı auth sonrası feed sayfasına yönlendir
      navigate('/feed');
      
    } catch (error) {
      console.error('Auth error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    console.log(`${provider} OAuth login attempt`);
    // TODO: Implement OAuth logic
    alert(`${provider} ile giriş (Demo)`);
    
    // Demo için direkt feed'e yönlendir
    navigate('/feed');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1E5CC4 0%, #669DFE 40%, #B1CBE7 80%, #FBFCFD 100%)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E5CC4' }}>
            Respect Platform
          </h1>
          <p style={{ color: '#669DFE' }}>
            {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
          </p>
        </div>

        <Card padding="lg" className="backdrop-blur-sm bg-white/90">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full transition-transform duration-300 ease-out"
              style={{ 
                borderColor: '#669DFE', 
                color: '#1E5CC4',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => handleOAuth('Spotify')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full transition-transform duration-300 ease-out"
              style={{ 
                borderColor: '#669DFE', 
                color: '#1E5CC4',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FBFCFD';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => handleOAuth('Google')}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Kullanıcı Adı"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="kullaniciadi"
                error={!!errors.username}
                errorMessage={errors.username}
                disabled={loading}
              />
            )}

            <Input
              label="E-posta"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@email.com"
              error={!!errors.email}
              errorMessage={errors.email}
              disabled={loading}
            />

            <Input.Password
              label="Şifre"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={!!errors.password}
              errorMessage={errors.password}
              disabled={loading}
            />

            {!isLogin && (
              <Input.Password
                label="Şifre Tekrarı"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                disabled={loading}
              />
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full transition-transform duration-300 ease-out hover:scale-105"
              style={{ 
                background: 'linear-gradient(90deg, #669DFE 0%, #1E5CC4 100%)',
                border: 'none',
                color: 'white'
              }}
              loading={loading}
              disabled={loading}
            >
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
          </form>

          {/* Continue Without Registration */}
          {isLogin && (
            <div className="mt-4">
                             <Button
                 variant="outline"
                 size="lg"
                 className="w-full transition-transform duration-300 ease-out"
                 style={{ 
                   borderColor: '#C7D0DA', 
                   color: '#669DFE',
                   backgroundColor: 'transparent'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.backgroundColor = '#FBFCFD';
                   e.target.style.transform = 'scale(1.05)';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.backgroundColor = 'transparent';
                   e.target.style.transform = 'scale(1)';
                 }}
                 onClick={() => navigate('/feed')}
                 disabled={loading}
               >
                👤 Üye Olmadan Devam Et
              </Button>
            </div>
          )}

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p style={{ color: '#669DFE' }}>
              {isLogin ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
              {' '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-medium transition-colors duration-200"
                style={{ color: '#1E5CC4' }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#1E5CC4';
                }}
                disabled={loading}
              >
                {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
              </button>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm" style={{ color: '#C7D0DA' }}>
          <p>
            {isLogin ? 'Giriş yaparak' : 'Kayıt olarak'}{' '}
            <a 
              href="#" 
              className="hover:underline transition-colors duration-200"
              style={{ color: '#669DFE' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1E5CC4';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#669DFE';
              }}
            >
              Kullanım Şartları
            </a>
            {' '}ve{' '}
            <a 
              href="#" 
              className="hover:underline transition-colors duration-200"
              style={{ color: '#669DFE' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1E5CC4';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#669DFE';
              }}
            >
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 