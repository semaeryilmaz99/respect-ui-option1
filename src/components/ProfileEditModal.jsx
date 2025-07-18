import React, { useState } from 'react';
import { Button, Card, Avatar, Badge, Input } from './ui';

const ProfileEditModal = ({ 
  isOpen, 
  onClose, 
  userData,
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userData.displayName || '',
    username: userData.username || '',
    bio: userData.bio || '',
    location: userData.location || '',
    website: userData.website || '',
    email: userData.email || '',
    avatar: userData.avatar || null,
    
    // Privacy settings
    privacy: {
      showEmail: userData.privacy?.showEmail || false,
      showActivity: userData.privacy?.showActivity || true,
      showStats: userData.privacy?.showStats || true,
      allowMessages: userData.privacy?.allowMessages || true
    },
    
    // Notification settings
    notifications: {
      email: userData.notifications?.email || true,
      push: userData.notifications?.push || true,
      respect: userData.notifications?.respect || true,
      newFollowers: userData.notifications?.newFollowers || true,
      artistUpdates: userData.notifications?.artistUpdates || true
    }
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Display name validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Görünen ad gerekli';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Görünen ad en az 2 karakter olmalı';
    } else if (formData.displayName.length > 50) {
      newErrors.displayName = 'Görünen ad en fazla 50 karakter olabilir';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gerekli';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalı';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Kullanıcı adı en fazla 20 karakter olabilir';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Kullanıcı adı sadece harf, rakam ve _ içerebilir';
    }

    // Bio validation
    if (formData.bio.length > 200) {
      newErrors.bio = 'Bio en fazla 200 karakter olabilir';
    }

    // Website validation
    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website adresi http:// veya https:// ile başlamalı';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarUpload = () => {
    // Simulate file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Simulate image upload
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            avatar: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call parent save handler
      onSave({
        ...formData,
        privacy: formData.privacy,
        notifications: formData.notifications
      });
      
      alert('Profil başarıyla güncellendi! 🎉');
      
    } catch {
      alert('Profil güncellenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">⚙️ Profil Ayarları</h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { key: 'personal', label: '👤 Kişisel' },
              { key: 'privacy', label: '🔒 Gizlilik' },
              { key: 'notifications', label: '🔔 Bildirimler' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar 
                    username={formData.displayName}
                    size="3xl"
                    src={formData.avatar}
                  />
                  <button
                    onClick={handleAvatarUpload}
                    disabled={loading}
                    className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Profil fotoğrafını değiştirmek için tıkla</p>
              </div>

              {/* Personal Info Form */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Görünen Ad"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  error={!!errors.displayName}
                  errorMessage={errors.displayName}
                  disabled={loading}
                  placeholder="Adın ve soyadın"
                />
                
                <Input
                  label="Kullanıcı Adı"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                  error={!!errors.username}
                  errorMessage={errors.username}
                  disabled={loading}
                  placeholder="kullaniciadi"
                  leftIcon={<span className="text-gray-400">@</span>}
                />
              </div>

              <Input
                label="Bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                error={!!errors.bio}
                errorMessage={errors.bio}
                disabled={loading}
                placeholder="Kendini tanıt..."
              />
              <p className="text-xs text-gray-500 -mt-4">
                {formData.bio.length}/200 karakter
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Konum"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={loading}
                  placeholder="Şehir, Ülke"
                  leftIcon={<span className="text-gray-400">📍</span>}
                />
                
                <Input
                  label="Website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  error={!!errors.website}
                  errorMessage={errors.website}
                  disabled={loading}
                  placeholder="https://website.com"
                  leftIcon={<span className="text-gray-400">🌐</span>}
                />
              </div>

              <Input
                label="E-posta"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={true}
                placeholder="email@example.com"
                leftIcon={<span className="text-gray-400">📧</span>}
              />
              <p className="text-xs text-gray-500 -mt-4">
                E-posta adresi değiştirilemez
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">🔒 Gizlilik Ayarları</h3>
                <div className="space-y-4">
                  {[
                    {
                      key: 'showEmail',
                      label: 'E-posta adresini göster',
                      description: 'Diğer kullanıcılar e-posta adresini görebilir'
                    },
                    {
                      key: 'showActivity',
                      label: 'Aktiviteyi göster',
                      description: 'Son aktiviteleriniz profilinizde görünür'
                    },
                    {
                      key: 'showStats',
                      label: 'İstatistikleri göster',
                      description: 'Respect istatistikleriniz herkese açık'
                    },
                    {
                      key: 'allowMessages',
                      label: 'Mesajlara izin ver',
                      description: 'Diğer kullanıcılar size mesaj gönderebilir'
                    }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{setting.label}</h4>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={formData.privacy[setting.key]}
                          onChange={(e) => handleNestedChange('privacy', setting.key, e.target.checked)}
                          disabled={loading}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">🔔 Bildirim Ayarları</h3>
                <div className="space-y-4">
                  {[
                    {
                      key: 'email',
                      label: 'E-posta bildirimleri',
                      description: 'Önemli güncellemeler e-posta ile gelsin'
                    },
                    {
                      key: 'push',
                      label: 'Anlık bildirimler',
                      description: 'Tarayıcı bildirimleri aktif olsun'
                    },
                    {
                      key: 'respect',
                      label: 'Respect bildirimleri',
                      description: 'Respect gönderildiğinde bildirim al'
                    },
                    {
                      key: 'newFollowers',
                      label: 'Yeni takipçi bildirimleri',
                      description: 'Yeni takipçilerin haber verilsin'
                    },
                    {
                      key: 'artistUpdates',
                      label: 'Sanatçı güncellemeleri',
                      description: 'Takip ettiğin sanatçılardan haberler'
                    }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{setting.label}</h4>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={formData.notifications[setting.key]}
                          onChange={(e) => handleNestedChange('notifications', setting.key, e.target.checked)}
                          disabled={loading}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            💡 Değişiklikler anında aktif olacak
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal; 