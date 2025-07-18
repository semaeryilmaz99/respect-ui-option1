import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input, LoadingSpinner } from '../components/ui';

const SendRespectPage = () => {
  const { artistId, songId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);

  // URL'den gelen parametreleri al
  const targetType = searchParams.get('type') || 'artist'; // 'artist' veya 'song'
  const targetId = searchParams.get('target') || artistId || songId;

  // Mock data based on target
  const targetData = {
    artist: {
      id: 'tarkan',
      name: 'Tarkan',
      username: 'tarkan_official',
      avatar: null,
      verified: true,
      totalRespect: 125840,
      type: 'artist'
    },
    song: {
      id: 'simarik',
      title: 'Şımarık',
      artist: 'Tarkan',
      album: 'Ölürüm Sana',
      year: 1997,
      artwork: null,
      totalRespect: 45670,
      type: 'song'
    }
  };

  const currentTarget = targetType === 'song' ? targetData.song : targetData.artist;

  // Preset amounts with descriptions
  const presetAmounts = [
    { amount: 5, label: '5₺', description: 'Küçük Destek', emoji: '☕', popularity: 25 },
    { amount: 10, label: '10₺', description: 'Standart', emoji: '🎵', popularity: 45, recommended: true },
    { amount: 25, label: '25₺', description: 'Güçlü Destek', emoji: '❤️', popularity: 20 },
    { amount: 50, label: '50₺', description: 'Büyük Destek', emoji: '🔥', popularity: 8 },
    { amount: 100, label: '100₺', description: 'Süper Destek', emoji: '⭐', popularity: 2 }
  ];

  // Statistics and gamification data
  const stats = {
    todaysSenders: 47,
    averageAmount: 18,
    totalToday: 850,
    recentSenders: [
      { name: 'MüzikSevdalısı', amount: 25, time: '2 dakika önce' },
      { name: 'PopFan2024', amount: 10, time: '5 dakika önce' },
      { name: 'SanatAşığı', amount: 50, time: '8 dakika önce' },
      { name: 'NostaljikRuh', amount: 15, time: '12 dakika önce' },
      { name: 'YetiAşığı', amount: 30, time: '15 dakika önce' }
    ],
    yourRank: null,
    achievements: [
      { id: 1, title: 'İlk Respect', description: 'İlk respect\'ini gönder', unlocked: false },
      { id: 2, title: 'Destekçi', description: '50₺ ve üzeri gönder', unlocked: false },
      { id: 3, title: 'Günlük Aktif', description: 'Bugün respect gönder', unlocked: false }
    ]
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseFloat(value) || 0);
    }
  };

  const getFinalAmount = () => {
    return customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  const handleSendRespect = async () => {
    const finalAmount = getFinalAmount();
    
    if (finalAmount < 1) {
      alert('Minimum 1₺ respect gönderebilirsiniz.');
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      setShowSuccess(true);
      
      // Update statistics (mock)
      stats.todaysSenders += 1;
      stats.totalToday += finalAmount;
      stats.yourRank = Math.floor(Math.random() * 20) + 1;
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate(targetType === 'song' ? `/song/${targetId}` : `/artist/${targetId}`);
      }, 3000);
      
    } catch (error) {
      alert('Respect gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Respect Gönderildi!</h1>
          <p className="text-gray-600 mb-4">
            <Badge.Respect amount={getFinalAmount()} className="mr-2" />
            {targetType === 'song' ? currentTarget.title : currentTarget.name} için gönderildi
          </p>
          
          {stats.yourRank && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-700">
                🏆 Bugün bu {targetType === 'song' ? 'şarkıya' : 'sanatçıya'} respect gönderen <strong>{stats.yourRank}. kişisiniz!</strong>
              </p>
            </div>
          )}
          
          <LoadingSpinner.Dots />
          <p className="text-sm text-gray-500 mt-2">Sayfaya yönlendiriliyorsunuz...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                ← Geri
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                Respect Gönder
              </h1>
            </div>
            
            <Badge variant="info" size="sm">
              💳 Güvenli Ödeme
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Respect Sending Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Target Info */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-4">
                  {targetType === 'song' ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl">
                      🎵
                    </div>
                  ) : (
                    <Avatar 
                      username={currentTarget.name}
                      size="xl"
                      src={currentTarget.avatar}
                    />
                  )}
                  
                  <div>
                    <h2 className="text-xl font-bold">
                      {targetType === 'song' ? currentTarget.title : currentTarget.name}
                    </h2>
                    {targetType === 'song' && (
                      <p className="text-gray-600">{currentTarget.artist} • {currentTarget.album}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge.Respect amount={currentTarget.totalRespect} />
                      {currentTarget.verified && <Badge variant="primary" size="sm">✓</Badge>}
                    </div>
                  </div>
                </div>
              </Card.Header>
            </Card>

            {/* Amount Selection */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">💰 Respect Miktarı Seç</h3>
              </Card.Header>
              <Card.Body>
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset.amount}
                      onClick={() => handleAmountSelect(preset.amount)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedAmount === preset.amount && !customAmount
                          ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-2xl mb-1">{preset.emoji}</div>
                      <div className="font-bold text-lg">{preset.label}</div>
                      <div className="text-xs text-gray-600">{preset.description}</div>
                      
                      {/* Popularity indicator */}
                      <div className="mt-2 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${preset.popularity}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">%{preset.popularity}</div>
                      
                      {preset.recommended && (
                        <Badge variant="primary" size="sm" className="absolute -top-2 -right-2">
                          Önerilen
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3">🎯 Özel Miktar</h4>
                  <div className="flex gap-3">
                    <Input.Amount
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Özel miktar girin"
                      className="flex-1"
                    />
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Ortalama</div>
                      <div className="font-bold text-purple-600">{stats.averageAmount}₺</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Bugünün ortalaması {stats.averageAmount}₺ - İstediğin miktarı gönderebilirsin!
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Message */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">💬 Mesaj (İsteğe Bağlı)</h3>
              </Card.Header>
              <Card.Body>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sanatçıya mesajın..."
                  maxLength={100}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">
                  {message.length}/100 karakter • Mesajın sanatçının sayfasında görüntülenecek
                </p>
              </Card.Body>
            </Card>

            {/* Payment Method */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">💳 Ödeme Yöntemi</h3>
              </Card.Header>
              <Card.Body>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Kredi Kartı', icon: '💳', description: 'Visa, Mastercard' },
                    { id: 'wallet', name: 'Dijital Cüzdan', icon: '📱', description: 'Apple Pay, Google Pay' },
                    { id: 'bank', name: 'Banka Transferi', icon: '🏦', description: 'IBAN ile' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{method.icon}</div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs text-gray-600">{method.description}</div>
                    </button>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Send Button */}
            <Card>
              <Card.Body>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    Toplam: <Badge.Respect amount={getFinalAmount()} />
                  </div>
                  
                  <Button
                    size="xl"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    loading={loading}
                    onClick={handleSendRespect}
                    disabled={getFinalAmount() < 1}
                  >
                    {loading ? 'İşleniyor...' : `${getFinalAmount()}₺ Respect Gönder`}
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    🔒 256-bit SSL ile güvenli ödeme • Para iadesi garantisi
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Sidebar - Statistics & Gamification */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Stats */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">📊 Bugünün İstatistikleri</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.todaysSenders}</div>
                    <div className="text-sm text-gray-600">Kişi respect gönderdi</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{stats.totalToday}₺</div>
                    <div className="text-sm text-gray-600">Bugün toplam</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 text-center">
                    <div className="text-sm text-purple-700">
                      Respect göndererek bugün destek veren <strong>{stats.todaysSenders + 1}. kişi</strong> olacaksın! 🎉
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Recent Senders */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">👥 Son Respect Gönderenler</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {stats.recentSenders.map((sender, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar username={sender.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{sender.name}</p>
                        <p className="text-xs text-gray-500">{sender.time}</p>
                      </div>
                      <Badge.Respect amount={sender.amount} size="sm" />
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Achievements */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">🏆 Başarımlar</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {stats.achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-3 rounded-lg border ${
                      achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{achievement.unlocked ? '🏆' : '🔒'}</span>
                        <div>
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRespectPage; 