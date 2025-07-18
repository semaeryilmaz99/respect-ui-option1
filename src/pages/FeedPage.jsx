import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input, LoadingSpinner, RespectWidget } from '../components/ui';

const FeedPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notifications] = useState(3);

  // Mock data - Topluluk aktiviteleri
  const communityFeed = [
    {
      id: 1,
      type: 'high_respect',
      artist: {
        name: 'Tarkan',
        username: 'tarkan_official',
        avatar: null,
        verified: true
      },
      song: {
        title: 'Şımarık',
        respectCount: 1250
      },
      timestamp: '2 saat önce',
      description: 'Bu şarkı bugün en çok respect alan şarkı oldu! 🔥'
    },
    {
      id: 2,
      type: 'new_song',
      artist: {
        name: 'Hadise',
        username: 'hadiseofficial',
        avatar: null,
        verified: true
      },
      song: {
        title: 'Yeni Baştan',
        isNew: true
      },
      timestamp: '4 saat önce',
      description: 'Yeni şarkısını yayınladı!'
    },
    {
      id: 3,
      type: 'artist_response',
      artist: {
        name: 'Sezen Aksu',
        username: 'sezenaksu',
        avatar: null,
        verified: true
      },
      message: 'Sevgili hayranlarım, desteğiniz için çok teşekkür ederim! ❤️',
      timestamp: '6 saat önce',
      respectCount: 890
    },
    {
      id: 4,
      type: 'trending',
      artist: {
        name: 'Murat Boz',
        username: 'muratbozofficial',
        avatar: null,
        verified: true
      },
      song: {
        title: 'Janti',
        trendingPosition: 1
      },
      timestamp: '8 saat önce',
      description: 'Trending #1 şarkı oldu! 📈'
    },
    {
      id: 5,
      type: 'user_respect',
      user: {
        name: 'MüzikSevdalısı',
        username: 'musiksevdalisi',
        avatar: null
      },
      artist: {
        name: 'Ajda Pekkan',
        username: 'ajdapekkan'
      },
      amount: 150,
      timestamp: '1 gün önce'
    }
  ];

  // Mock data - Sana özel aktiviteler
  const personalFeed = [
    {
      id: 1,
      type: 'followed_artist_respect',
      artist: {
        name: 'Sertab Erener',
        username: 'sertaberener',
        avatar: null,
        verified: true
      },
      song: {
        title: 'Everyway That I Can',
        respectCount: 450
      },
      timestamp: '1 saat önce',
      description: 'Takip ettiğin sanatçıya yeni respectler geldi'
    },
    {
      id: 2,
      type: 'followed_new_song',
      artist: {
        name: 'Kenan Doğulu',
        username: 'kenandogulu',
        avatar: null,
        verified: true
      },
      song: {
        title: 'Aşk ile Yap',
        isNew: true
      },
      timestamp: '3 saat önce',
      description: 'Takip ettiğin sanatçıdan yeni şarkı!'
    },
    {
      id: 3,
      type: 'followed_chat_response',
      artist: {
        name: 'Gülşen',
        username: 'gulsenofficial',
        avatar: null,
        verified: true
      },
      message: 'Konserim için heyecanlıyım! Görüşmek üzere 🎤',
      timestamp: '5 saat önce',
      originalMessage: 'Konser ne zaman?'
    },
    {
      id: 4,
      type: 'chat_reply',
      user: {
        name: 'MelodiAvcısı',
        username: 'melodiavcisi'
      },
      artist: {
        name: 'Barış Manço',
        username: 'barismancoofficial'
      },
      message: 'Harika bir şarkı! 👏',
      timestamp: '1 gün önce',
      yourMessage: 'Bu şarkı efsane'
    }
  ];

  const renderCommunityItem = (item) => {
    switch (item.type) {
      case 'high_respect':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <button 
                    className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                    onClick={() => navigate(`/artist/${item.artist.username}`)}
                  >
                    {item.artist.name}
                  </button>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <span className="text-gray-500 text-sm">@{item.artist.username}</span>
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">🎵 {item.song.title}</h4>
                      <p className="text-sm text-gray-600">
                        <Badge.Respect amount={item.song.respectCount} className="mr-2" />
                        Bu şarkıya gönderildi
                      </p>
                    </div>
                    <Button size="sm" variant="primary">Dinle</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'new_song':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <Badge.New />
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">🎶 {item.song.title}</h4>
                      <p className="text-sm text-gray-600">Yeni yayınlandı</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Respect Gönder</Button>
                      <Button size="sm" variant="primary">Dinle</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'artist_response':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <span className="text-gray-500 text-sm">@{item.artist.username}</span>
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
                  <p className="text-gray-700 mb-2">💬 {item.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Badge.Respect amount={item.respectCount} />
                    <span>👥 156 kişi beğendi</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'trending':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <Badge.Trending />
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">🔥 #{item.song.trendingPosition} {item.song.title}</h4>
                      <p className="text-sm text-gray-600">Trending şarkılar listesinde</p>
                    </div>
                    <Button size="sm" variant="primary">Dinle</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'user_respect':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.user.name} 
                size="md"
                src={item.user.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.user.name}</span>
                  <span className="text-gray-500 text-sm">@{item.user.username}</span>
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">
                  <Badge.Respect amount={item.amount} className="mr-2" />
                  <span className="font-medium">{item.artist.name}</span> sanatçısına respect gönderdi
                </p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderPersonalItem = (item) => {
    switch (item.type) {
      case 'followed_artist_respect':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <h4 className="font-medium">🎵 {item.song.title}</h4>
                  <Badge.Respect amount={item.song.respectCount} />
                </div>
              </div>
            </div>
          </Card>
        );

      case 'followed_new_song':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <Badge.New />
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="font-medium">🎶 {item.song.title}</h4>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">Respect Gönder</Button>
                    <Button size="sm" variant="primary">Dinle</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'followed_chat_response':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.artist.name} 
                size="md"
                src={item.artist.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.artist.name}</span>
                  {item.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 mb-2 text-sm text-gray-600">
                  📝 Soru: "{item.originalMessage}"
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
                  <p className="text-gray-700">💬 {item.message}</p>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'chat_reply':
        return (
          <Card key={item.id} className="mb-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <Avatar 
                username={item.user.name} 
                size="md"
                src={item.user.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.user.name}</span>
                  <span className="text-gray-500 text-sm">@{item.user.username}</span>
                  <span className="text-gray-400 text-sm">• {item.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">Mesajına yanıt verdi:</p>
                <div className="bg-blue-50 rounded-lg p-2 mb-2 text-sm">
                  📝 Sen: "{item.yourMessage}"
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700">💬 {item.message}</p>
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎵 Respect
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <Input.Search placeholder="Sanatçı, şarkı ara..." />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Respect Gönder CTA Button - Desktop Only */}
              <Button
                variant="primary"
                size="md"
                className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                onClick={() => navigate('/send-respect')}
              >
                💝 Respect Gönder
              </Button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a7 7 0 1 0-9.96-9.96A7 7 0 0 0 13 7.5L17 11z" />
                </svg>
                {notifications > 0 && (
                  <Badge 
                    variant="danger" 
                    size="sm" 
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center p-0"
                  >
                    {notifications}
                  </Badge>
                )}
              </button>

              {/* Profile */}
              <Avatar 
                username="Kullanıcı" 
                size="sm"
                onClick={() => navigate('/profile')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Topluluk Bölümü */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">🌍 Topluluk</h2>
              <Badge.Online count={1247} />
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <LoadingSpinner.Skeleton lines={3} />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {communityFeed.map(item => renderCommunityItem(item))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1500);
                }}
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" /> : 'Daha Fazla Yükle'}
              </Button>
            </div>
          </div>

          {/* Sana Özel Bölümü */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">⭐ Sana Özel</h2>
              <Badge variant="info" size="sm">Kişiselleştirilmiş</Badge>
            </div>

            <div className="space-y-4">
              {personalFeed.map(item => renderPersonalItem(item))}
            </div>

            {/* Takip Önerileri */}
            <Card className="mt-6">
              <Card.Header>
                <h3 className="font-semibold text-gray-900">👥 Takip Önerileri</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {['Ebru Gündeş', 'İbrahim Tatlıses', 'Nil Karaibrahimgil'].map((artist, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar username={artist} size="sm" />
                        <div>
                          <p className="font-medium text-sm">{artist}</p>
                          <p className="text-xs text-gray-500">Önerilen sanatçı</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Takip Et</Button>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Ana Respect CTA */}
            <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
              <Card.Header>
                <h3 className="font-semibold text-purple-800 text-center">💝 Sanatçılara Destek Ol</h3>
              </Card.Header>
              <Card.Body>
                <div className="text-center space-y-4">
                  <p className="text-sm text-purple-700">
                    Sevdiğin sanatçılara respect göndererek onları destekle!
                  </p>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transform hover:scale-105 transition-all duration-200 font-bold"
                    onClick={() => navigate('/send-respect')}
                  >
                    🚀 Respect Gönder
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-center">
                    <div className="bg-white/70 rounded-lg p-2 shadow-sm">
                      <div className="font-bold text-purple-600">2.1M₺</div>
                      <div className="text-purple-500">Bu ay</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-2 shadow-sm">
                      <div className="font-bold text-purple-600">15K+</div>
                      <div className="text-purple-500">Destekçi</div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-purple-600 italic">
                    💡 En kolay way to support artists!
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Hızlı Respect Widget'ları */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-gray-900">⚡ Hızlı Respect</h3>
              
              {/* Full Card Widget - Tarkan */}
              <RespectWidget
                target={{ id: 'tarkan', name: 'Tarkan', totalRespect: 125840, verified: true }}
                type="artist"
                variant="card"
                showStats={true}
              />
              
              {/* Inline Widget - Şımarık */}
              <RespectWidget
                target={{ id: 'simarik', title: 'Şımarık', artist: 'Tarkan', totalRespect: 45670 }}
                type="song"
                variant="inline"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile ve Desktop için */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="xl"
          className="rounded-full h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          onClick={() => navigate('/send-respect')}
        >
          <span className="text-2xl">💝</span>
        </Button>
        
        {/* Floating button tooltip */}
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Respect Gönder
        </div>
      </div>
    </div>
  );
};

export default FeedPage; 