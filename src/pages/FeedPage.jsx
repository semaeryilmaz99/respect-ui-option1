import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input } from '../components/ui';

const FeedPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('topluluk');

  // Mock data - Topluluk feed
  const communityFeed = [
    {
      id: 1,
      type: 'high_respect',
      artist: 'Tarkan',
        username: 'tarkan_official',
      song: 'Şımarık',
      respectCount: 2485,
      timestamp: '2 saat önce',
      description: 'Bugün en çok respect alan şarkı',
      verified: true
    },
    {
      id: 2,
      type: 'new_release',
      artist: 'Hadise',
        username: 'hadiseofficial',
      song: 'Yeni Baştan',
      timestamp: '4 saat önce',
      description: 'Yeni şarkı yayınlandı',
      verified: true
    },
    {
      id: 3,
      type: 'artist_chat',
      artist: 'Sezen Aksu',
        username: 'sezenaksu',
      message: 'Sevgili hayranlarım, desteğiniz için çok teşekkür ederim! Yeni projemde sizlerle buluşacağız.',
      timestamp: '6 saat önce',
      likeCount: 892,
      verified: true
    },
    {
      id: 4,
      type: 'trending',
      artist: 'Murat Boz',
        username: 'muratbozofficial',
      song: 'Janti',
      position: 1,
      timestamp: '8 saat önce',
      description: 'Trending listesinin zirvesinde',
      verified: true
    },
    {
      id: 5,
      type: 'user_respect',
      sender: 'MüzikSevdalısı',
      senderUsername: 'musiksevdalisi',
      recipient: 'Ajda Pekkan',
      recipientUsername: 'ajdapekkan',
      amount: 250,
      timestamp: '1 gün önce'
    }
  ];

  // Mock data - Sana Özel feed  
  const personalFeed = [
    {
      id: 1,
      type: 'followed_respect',
      artist: 'Sertab Erener',
        username: 'sertaberener',
      song: 'Everyway That I Can',
      respectCount: 1250,
      timestamp: '1 saat önce',
      verified: true
    },
    {
      id: 2,
      type: 'followed_release',
      artist: 'Kenan Doğulu',
        username: 'kenandogulu',
      song: 'Aşk ile Yap',
      timestamp: '3 saat önce',
      verified: true
    },
    {
      id: 3,
      type: 'followed_chat',
      artist: 'Gülşen',
        username: 'gulsenofficial',
      message: 'Konserim için heyecanlıyım! Görüşmek üzere',
      originalQuestion: 'Konser ne zaman?',
      timestamp: '5 saat önce',
      verified: true
    },
    {
      id: 4,
      type: 'chat_reply',
      user: 'MelodiAvcısı',
      username: 'melodiavcisi',
      yourMessage: 'Bu şarkı efsane',
      reply: 'Aynen, bende çok seviyorum!',
      timestamp: '1 gün önce'
    }
  ];

  const renderCommunityItem = (item) => {
    const baseCardClasses = "group hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-8";
    
    switch (item.type) {
      case 'high_respect':
        return (
          <Card 
            key={item.id} 
            className={`${baseCardClasses} border-l-emerald-400`}
            style={{
              boxShadow: '0 0 20px rgba(102, 157, 254, 0.3), 0 0 40px rgba(30, 92, 196, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(102, 157, 254, 0.2)'
            }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                    </div>
                    <p className="text-gray-500 text-sm">@{item.username}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                    <h4 className="font-semibold text-emerald-800 mb-1">{item.song}</h4>
                    <p className="text-emerald-600 text-sm">{item.description}</p>
                    <div className="mt-2">
                      <Badge className="bg-emerald-100 text-emerald-700 font-semibold">
                        {item.respectCount.toLocaleString()} Respect
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    Dinle
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'new_release':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-blue-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                      <Badge className="bg-blue-100 text-blue-700">YENİ</Badge>
                    </div>
                    <p className="text-gray-500 text-sm">@{item.username}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                    <h4 className="font-semibold text-blue-800 mb-1">{item.song}</h4>
                    <p className="text-blue-600 text-sm">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                                         <Button 
                       variant="outline" 
                       size="sm" 
                       style={{
                         background: 'white',
                         color: '#1E5CC4',
                         border: '1px solid #669DFE',
                         boxShadow: '0 2px 6px rgba(102, 157, 254, 0.2)'
                       }}
                     >
                       Respect
                     </Button>
                    <Button variant="primary" size="sm">
                      Dinle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'artist_chat':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-purple-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                </div>
                    <p className="text-gray-500 text-sm">@{item.username}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-300">
                <p className="text-gray-700 leading-relaxed mb-3">{item.message}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">{item.likeCount} beğeni</span>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                    Yanıtla
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'trending':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-orange-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                      <Badge className="bg-orange-100 text-orange-700">TRENDİNG</Badge>
                    </div>
                    <p className="text-gray-500 text-sm">@{item.username}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        #{item.position}
                      </span>
                      <h4 className="font-semibold text-orange-800">{item.song}</h4>
                    </div>
                    <p className="text-orange-600 text-sm">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                    Dinle
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'user_respect':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-pink-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.sender} size="md" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.sender}</h3>
                    <p className="text-gray-500 text-sm">@{item.senderUsername}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold text-pink-700">{item.recipient}</span> 
                  <span className="text-gray-600"> sanatçısına respect gönderdi</span>
                </p>
                <Badge className="bg-pink-100 text-pink-700 font-semibold">
                  {item.amount} Respect
                </Badge>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderPersonalItem = (item) => {
    const baseCardClasses = "group hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-8";

    switch (item.type) {
      case 'followed_respect':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-teal-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                    </div>
                    <p className="text-gray-500 text-sm">Takip ediyorsun</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-teal-800 mb-1">{item.song}</h4>
                    <p className="text-teal-600 text-sm">Yeni respectler aldı</p>
                    <Badge className="bg-teal-100 text-teal-700 font-semibold mt-2">
                      +{item.respectCount.toLocaleString()} Respect
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                    Görüntüle
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'followed_release':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-indigo-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                      <Badge className="bg-indigo-100 text-indigo-700">YENİ ŞARKI</Badge>
                    </div>
                    <p className="text-gray-500 text-sm">Takip ediyorsun</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">{item.song}</h4>
                    <p className="text-indigo-600 text-sm">Yeni şarkı yayınlandı</p>
                  </div>
                  <div className="flex gap-2">
                                         <Button 
                       variant="outline" 
                       size="sm"
                       style={{
                         background: 'white',
                         color: '#1E5CC4',
                         border: '1px solid #669DFE',
                         boxShadow: '0 2px 6px rgba(102, 157, 254, 0.2)'
                       }}
                     >
                       Respect
                     </Button>
                    <Button variant="primary" size="sm">
                      Dinle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'followed_chat':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-violet-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.artist} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition-colors">
                        {item.artist}
                      </h3>
                      {item.verified && <Badge variant="primary" size="sm">Doğrulanmış</Badge>}
                    </div>
                    <p className="text-gray-500 text-sm">Takip ediyorsun</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">Soru: "{item.originalQuestion}"</p>
                </div>
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border-l-4 border-violet-300">
                    <p className="text-gray-700">{item.message}</p>
                  </div>
              </div>
            </div>
          </Card>
        );

      case 'chat_reply':
        return (
          <Card key={item.id} className={`${baseCardClasses} border-l-amber-400`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar username={item.user} size="md" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.user}</h3>
                    <p className="text-gray-500 text-sm">@{item.username}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-300">
                  <p className="text-sm text-blue-700">Sen: "{item.yourMessage}"</p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-gray-700">"{item.reply}"</p>
                  <p className="text-amber-600 text-sm mt-2">Mesajına yanıt verdi</p>
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
    <>
      {/* Pulse Animation CSS */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#FBFCFD' }}>
      {/* Header */}
      <header 
        className="bg-white sticky top-0 z-10" 
        style={{
          boxShadow: '0 2px 8px rgba(102, 157, 254, 0.15), 0 1px 4px rgba(30, 92, 196, 0.1)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold" style={{ 
                background: 'linear-gradient(90deg, #669DFE 0%, #1E5CC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Respect
              </h1>

            <div className="flex-1 max-w-md mx-8">
              <Input placeholder="Sanatçı, şarkı ara..." className="w-full" />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                  onClick={() => navigate('/send-respect')}
                  className="hidden md:flex"
                style={{ 
                    background: 'white',
                    color: '#1E5CC4',
                    border: '1px solid #669DFE',
                    boxShadow: '0 4px 12px rgba(102, 157, 254, 0.3), 0 2px 6px rgba(30, 92, 196, 0.2)',
                    animation: 'pulse 2s infinite'
                  }}
              >
                Respect Gönder
              </Button>

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
                 {/* Tab Navigation */}
         <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('topluluk')}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'topluluk'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Topluluk
          </button>
          <button
            onClick={() => setActiveTab('sana-ozel')}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'sana-ozel'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Sana Özel
          </button>
            </div>
            
        {/* Tab Content */}
        <div className="max-w-2xl mx-auto">
          {activeTab === 'topluluk' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Topluluk</h2>
                <p className="text-gray-600">Müzik dünyasından son gelişmeler</p>
              </div>
              
                {communityFeed.map(item => renderCommunityItem(item))}
              
              <div className="text-center py-8">
                <Button variant="outline" size="lg">
                  Daha Fazla Yükle
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'sana-ozel' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sana Özel</h2>
                <p className="text-gray-600">Takip ettiğin sanatçılardan güncellemeler</p>
            </div>

              {personalFeed.map(item => renderPersonalItem(item))}

            {/* Takip Önerileri */}
              <Card className="mt-8">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Keşfet</h3>
                  <div className="space-y-4">
                  {['Ebru Gündeş', 'İbrahim Tatlıses', 'Nil Karaibrahimgil'].map((artist, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar username={artist} size="sm" />
                        <div>
                            <p className="font-medium">{artist}</p>
                            <p className="text-sm text-gray-500">Önerilen sanatçı</p>
                          </div>
                        </div>
                      <Button size="sm" variant="outline">Takip Et</Button>
                    </div>
                  ))}
                </div>
                </div>
            </Card>
            </div>
          )}
        </div>
      </div>

             {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="xl"
           className="rounded-full h-16 w-16 transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          style={{ 
             background: 'white',
             color: '#1E5CC4',
             border: '2px solid #669DFE',
             boxShadow: '0 8px 24px rgba(102, 157, 254, 0.4), 0 4px 12px rgba(30, 92, 196, 0.3)',
             animation: 'pulse 2s infinite'
          }}
          onClick={() => navigate('/send-respect')}
        >
           <span className="text-lg font-bold">R</span>
        </Button>
      </div>
    </div>
    </>
  );
};

export default FeedPage; 