import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input, LoadingSpinner } from '../components/ui';

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('latest');
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [respectAmount, setRespectAmount] = useState(10);

  // Mock artist data - Tarkan as example
  const artist = {
    id: 'tarkan',
    name: 'Tarkan',
    username: 'tarkan_official',
    avatar: null,
    verified: true,
    bio: 'Türk Pop Müziğinin Kralı 👑 | 30+ yıllık müzik kariyeri | Dünya çapında tanınan sanatçı',
    totalRespect: 125840,
    followerCount: 2400000,
    monthlyListeners: 5600000,
    joinDate: '2019',
    website: 'tarkan.com',
    social: {
      spotify: 'tarkan_official',
      instagram: 'tarkanofficial',
      twitter: 'tarkanofficial'
    }
  };

  // Top respecters leaderboard
  const topRespecters = [
    {
      id: 1,
      user: { name: 'TarkanFan2024', username: 'tarkanfan2024', avatar: null },
      totalRespect: 12450,
      rank: 1,
      trend: 'up', // up, down, same
      badge: 'platinum'
    },
    {
      id: 2,
      user: { name: 'MüzikAşığı', username: 'muzikasigi', avatar: null },
      totalRespect: 8920,
      rank: 2,
      trend: 'same',
      badge: 'gold'
    },
    {
      id: 3,
      user: { name: 'PopSevdalısı', username: 'popsevdalisi', avatar: null },
      totalRespect: 7650,
      rank: 3,
      trend: 'down',
      badge: 'gold'
    },
    {
      id: 4,
      user: { name: 'Melomanyak', username: 'melomanyak', avatar: null },
      totalRespect: 6200,
      rank: 4,
      trend: 'up',
      badge: 'silver'
    },
    {
      id: 5,
      user: { name: 'SanatSever', username: 'sanatsever', avatar: null },
      totalRespect: 5100,
      rank: 5,
      trend: 'up',
      badge: 'silver'
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'respect',
      user: { name: 'YeniHayran', username: 'yenihayran', avatar: null },
      amount: 25,
      message: 'Şımarık şarkısı için ❤️',
      timestamp: '2 dakika önce'
    },
    {
      id: 2,
      type: 'respect',
      user: { name: 'MelodiAvcısı', username: 'melodiavcisi', avatar: null },
      amount: 50,
      message: 'Dudu harika bir şarkı!',
      timestamp: '8 dakika önce'
    },
    {
      id: 3,
      type: 'follow',
      user: { name: 'PopMüzik', username: 'popmuzik', avatar: null },
      timestamp: '15 dakika önce'
    },
    {
      id: 4,
      type: 'respect',
      user: { name: 'TarkanSevenler', username: 'tarkansevenler', avatar: null },
      amount: 100,
      message: 'Sen olsan bari için teşekkürler! 🎵',
      timestamp: '23 dakika önce'
    },
    {
      id: 5,
      type: 'respect',
      user: { name: 'EfsaneFan', username: 'efsanefan', avatar: null },
      amount: 15,
      timestamp: '35 dakika önce'
    }
  ];

  // Chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: { name: 'MüzikSevdalısı', username: 'muziksevdalisi', avatar: null },
      message: 'Yeni şarkı ne zaman geliyor? 🎤',
      timestamp: '1 dakika önce',
      respectBoost: false
    },
    {
      id: 2,
      user: { name: 'TarkanAşığı', username: 'tarkanasigi', avatar: null },
      message: 'Şımarık her dinlediğimde aynı heyecanı yaşıyorum! 🔥',
      timestamp: '3 dakika önce',
      respectBoost: true,
      respectAmount: 20
    },
    {
      id: 3,
      user: { name: 'PopKralı', username: 'popkrali', avatar: null },
      message: 'Konser planın var mı bu yıl?',
      timestamp: '5 dakika önce',
      respectBoost: false
    },
    {
      id: 4,
      user: { name: 'Hayran23', username: 'hayran23', avatar: null },
      message: 'Adını kalbime yazdım şarkısını çok seviyorum ❤️',
      timestamp: '7 dakika önce',
      respectBoost: true,
      respectAmount: 30
    }
  ]);

  // Discography data
  const discography = {
    latest: [
      { id: 1, title: 'Geççek', album: 'Geççek', year: 2017, respectCount: 8920, duration: '4:12' },
      { id: 2, title: 'Beni Çok Sev', album: 'Ahde Vefa', year: 2007, respectCount: 15640, duration: '4:28' },
      { id: 3, title: 'Bounce', album: 'Come Closer', year: 2006, respectCount: 12340, duration: '3:45' }
    ],
    mostRespected: [
      { id: 1, title: 'Şımarık', album: 'Ölürüm Sana', year: 1997, respectCount: 45670, duration: '4:02' },
      { id: 2, title: 'Dudu', album: 'Tarkan', year: 1999, respectCount: 38920, duration: '3:38' },
      { id: 3, title: 'Kiss Kiss', album: 'Come Closer', year: 2006, respectCount: 32180, duration: '3:57' },
      { id: 4, title: 'Kuzu Kuzu', album: 'Karma', year: 2001, respectCount: 28490, duration: '4:15' }
    ],
    recent: [
      { id: 1, title: 'Adını Kalbime Yazdım', album: 'Ahde Vefa', year: 2007, respectCount: 9840, duration: '4:33', lastRespect: '5 dakika önce' },
      { id: 2, title: 'Sen Olsan Bari', album: 'Metamorfoz', year: 2007, respectCount: 7620, duration: '3:52', lastRespect: '12 dakika önce' },
      { id: 3, title: 'Hop De', album: 'Karma', year: 2001, respectCount: 6780, duration: '3:41', lastRespect: '18 dakika önce' }
    ]
  };

  const handleRespectSend = () => {
    if (respectAmount > 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert(`${respectAmount}₺ respect gönderildi! 🎉`);
        // Update artist total respect (mock)
        artist.totalRespect += respectAmount;
      }, 1500);
    }
  };

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: { name: 'Sen', username: 'you', avatar: null },
        message: chatMessage,
        timestamp: 'şimdi',
        respectBoost: false
      };
      setChatMessages(prev => [newMessage, ...prev]);
      setChatMessage('');
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <span className="text-green-500">↗️</span>;
      case 'down': return <span className="text-red-500">↘️</span>;
      default: return <span className="text-gray-400">→</span>;
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'platinum': return '💎';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      default: return '🥉';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/feed')}
              >
                ← Geri
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {artist.name}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge.Online count={234} />
              <Button
                variant={isFollowing ? "outline" : "primary"}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Artist Header Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Artist Avatar & Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar 
                username={artist.name}
                size="3xl"
                src={artist.avatar}
                className="mb-4"
              />
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-4xl font-bold">{artist.name}</h1>
                  {artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                </div>
                <p className="text-purple-100 mb-4 max-w-md">{artist.bio}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <div className="text-2xl font-bold">
                      <Badge.Respect amount={artist.totalRespect} className="bg-white/20 text-white" />
                    </div>
                    <div className="text-purple-200">Toplam Respect</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{(artist.followerCount / 1000000).toFixed(1)}M</div>
                    <div className="text-purple-200">Takipçi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{(artist.monthlyListeners / 1000000).toFixed(1)}M</div>
                    <div className="text-purple-200">Aylık Dinleyici</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Respect Section */}
            <div className="flex-1 max-w-md">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <Card.Header>
                  <h3 className="text-white font-semibold">💝 Hızlı Respect Gönder</h3>
                </Card.Header>
                <Card.Body>
                  {/* Preset amounts */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[5, 10, 25, 50].map(amount => (
                      <Button
                        key={amount}
                        variant={respectAmount === amount ? "primary" : "outline"}
                        size="sm"
                        className={respectAmount === amount ? "" : "border-white/30 text-white hover:bg-white/10"}
                        onClick={() => setRespectAmount(amount)}
                      >
                        {amount}₺
                      </Button>
                    ))}
                  </div>
                  
                  {/* Custom amount */}
                  <Input.Amount
                    value={respectAmount}
                    onChange={(e) => setRespectAmount(Number(e.target.value))}
                    className="mb-4 bg-white/10 border-white/30 text-white placeholder-white/60"
                    placeholder="Özel miktar"
                  />
                  
                  <Button
                    variant="success"
                    size="lg"
                    className="w-full"
                    loading={loading}
                    onClick={handleRespectSend}
                  >
                    {respectAmount}₺ Respect Gönder
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Leaderboard & Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Respecters */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold flex items-center gap-2">
                  🏆 En Çok Respect Gönderenler
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {topRespecters.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2 min-w-[60px]">
                        <span className="text-lg font-bold text-gray-500">#{item.rank}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                      
                      <Avatar 
                        username={item.user.name}
                        size="sm"
                        src={item.user.avatar}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.user.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge.Respect amount={item.totalRespect} size="sm" />
                          <span className="text-lg">{getBadgeIcon(item.badge)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Tümünü Gör
                </Button>
              </Card.Body>
            </Card>

            {/* Recent Activity */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold flex items-center gap-2">
                  ⚡ Son Respectler
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar 
                        username={activity.user.name}
                        size="sm"
                        src={activity.user.avatar}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{activity.user.name}</span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                        
                        {activity.type === 'respect' && (
                          <div>
                            <Badge.Respect amount={activity.amount} size="sm" />
                            {activity.message && (
                              <p className="text-sm text-gray-600 mt-1">{activity.message}</p>
                            )}
                          </div>
                        )}
                        
                        {activity.type === 'follow' && (
                          <p className="text-sm text-gray-600">Takip etmeye başladı</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Right Column - Chat & Discography */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Chat */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    💬 Canlı Sohbet
                  </h3>
                  <Badge.Online count={chatMessages.length * 12} />
                </div>
              </Card.Header>
              <Card.Body>
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto mb-4 space-y-2 border rounded-lg p-3 bg-gray-50">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-2 ${msg.respectBoost ? 'bg-purple-50 border border-purple-200 rounded-lg p-2' : ''}`}>
                      <Avatar username={msg.user.name} size="xs" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{msg.user.name}</span>
                          {msg.respectBoost && (
                            <Badge.Respect amount={msg.respectAmount} size="sm" />
                          )}
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Mesajını yaz..."
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleChatSend} disabled={!chatMessage.trim()}>
                    Gönder
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  💡 Respect göndererek mesajını öne çıkarabilirsin!
                </p>
              </Card.Body>
            </Card>

            {/* Discography */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">🎵 Diskografi</h3>
                
                {/* Tabs */}
                <div className="flex gap-2 mt-3">
                  {[
                    { key: 'latest', label: 'Son Çıkanlar' },
                    { key: 'mostRespected', label: 'En Çok Respect Alan' },
                    { key: 'recent', label: 'Son Respect Alan' }
                  ].map(tab => (
                    <Button
                      key={tab.key}
                      variant={activeTab === tab.key ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </Card.Header>
              <Card.Body>
                <div className="space-y-2">
                  {discography[activeTab].map((song, index) => (
                    <div 
                      key={song.id} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/song/${song.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                      <span className="text-gray-400 font-mono text-sm min-w-[30px]">
                        {index + 1}.
                      </span>
                      
                      <div className="flex-1">
                        <button 
                          className="font-medium text-purple-600 hover:text-purple-800 transition-colors text-left"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/song/${song.title.toLowerCase().replace(/\s+/g, '-')}`);
                          }}
                        >
                          {song.title}
                        </button>
                        <p className="text-sm text-gray-600">
                          {song.album} • {song.year} • {song.duration}
                        </p>
                        {song.lastRespect && (
                          <p className="text-xs text-purple-600">Son respect: {song.lastRespect}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge.Respect amount={song.respectCount} size="sm" />
                        <Button size="sm" variant="outline">
                          ▶️ Dinle
                        </Button>
                        <Button size="sm" variant="primary">
                          Respect
                        </Button>
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

export default ArtistPage; 