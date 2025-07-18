import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input, LoadingSpinner } from '../components/ui';

const SongPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [respectAmount, setRespectAmount] = useState(10);

  // Mock song data - Şımarık as example
  const song = {
    id: 'simarik',
    title: 'Şımarık',
    artist: {
      id: 'tarkan',
      name: 'Tarkan',
      username: 'tarkan_official',
      verified: true,
      avatar: null
    },
    album: {
      name: 'Ölürüm Sana',
      year: 1997,
      artwork: null // Mock album artwork URL
    },
    duration: '4:02',
    genre: 'Türk Pop',
    totalRespect: 45670,
    totalLikes: 892400,
    totalPlays: 156000000,
    lyrics: 'Öp de yanak yanağa değsin...',
    spotifyUrl: 'https://open.spotify.com/track/...',
    releaseDate: '1997-07-15'
  };

  // Top respecters for this song
  const topRespecters = [
    {
      id: 1,
      user: { name: 'ŞımarıkFan', username: 'simarikfan', avatar: null },
      totalRespect: 3450,
      rank: 1,
      trend: 'up',
      lastRespect: '1 saat önce'
    },
    {
      id: 2,
      user: { name: 'NostaljikMüzik', username: 'nostaljikmusik', avatar: null },
      totalRespect: 2890,
      rank: 2,
      trend: 'same',
      lastRespect: '3 saat önce'
    },
    {
      id: 3,
      user: { name: '90larAşığı', username: '90larasigi', avatar: null },
      totalRespect: 2340,
      rank: 3,
      trend: 'up',
      lastRespect: '6 saat önce'
    },
    {
      id: 4,
      user: { name: 'TürkPopSever', username: 'turkpopsever', avatar: null },
      totalRespect: 1980,
      rank: 4,
      trend: 'down',
      lastRespect: '8 saat önce'
    },
    {
      id: 5,
      user: { name: 'EfsaneParça', username: 'efsaneparca', avatar: null },
      totalRespect: 1650,
      rank: 5,
      trend: 'up',
      lastRespect: '12 saat önce'
    }
  ];

  // Recent activity for this song
  const recentActivity = [
    {
      id: 1,
      type: 'respect',
      user: { name: 'YeniDinleyici', username: 'yenidinleyici', avatar: null },
      amount: 25,
      message: 'Bu şarkı hiç eskimiyor! ❤️',
      timestamp: '3 dakika önce'
    },
    {
      id: 2,
      type: 'respect',
      user: { name: 'KlasikSevgili', username: 'klasiksevgili', avatar: null },
      amount: 50,
      message: 'Çocukluğumun şarkısı 🎵',
      timestamp: '12 dakika önce'
    },
    {
      id: 3,
      type: 'respect',
      user: { name: 'TarkanHayranı', username: 'tarkanhayrani', avatar: null },
      amount: 15,
      timestamp: '18 dakika önce'
    },
    {
      id: 4,
      type: 'respect',
      user: { name: 'PopMüzikçi', username: 'popmuzikci', avatar: null },
      amount: 100,
      message: 'Bu şarkıyla tanıştığım için şanslıyım! 🙏',
      timestamp: '25 dakika önce'
    },
    {
      id: 5,
      type: 'respect',
      user: { name: 'MelodiAvcısı', username: 'melodiavcisi', avatar: null },
      amount: 30,
      message: 'Her dinlediğimde daha çok seviyorum',
      timestamp: '32 dakika önce'
    }
  ];

  // Chat messages for this song
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: { name: 'RetroSevda', username: 'retrosevda', avatar: null },
      message: 'Bu şarkı beni hep 90lara götürüyor! 🕺',
      timestamp: '2 dakika önce',
      respectBoost: false
    },
    {
      id: 2,
      user: { name: 'TarkanSevenler', username: 'tarkansevenler', avatar: null },
      message: 'Şımarık ile dünya çapında tanındı Tarkan ⭐',
      timestamp: '4 dakika önce',
      respectBoost: true,
      respectAmount: 25
    },
    {
      id: 3,
      user: { name: 'PopKralicesi', username: 'popkralicesi', avatar: null },
      message: 'Kim bu şarkıyı dinlerken dans etmiyor ki? 💃',
      timestamp: '7 dakika önce',
      respectBoost: false
    },
    {
      id: 4,
      user: { name: 'MüzikAşığı', username: 'muzikasigi', avatar: null },
      message: 'Video klip de efsaneydi! 📺',
      timestamp: '9 dakika önce',
      respectBoost: true,
      respectAmount: 15
    }
  ]);

  // Related songs from the same artist
  const relatedSongs = [
    { id: 'dudu', title: 'Dudu', album: 'Tarkan', year: 1999, respectCount: 38920, duration: '3:38' },
    { id: 'kuzu-kuzu', title: 'Kuzu Kuzu', album: 'Karma', year: 2001, respectCount: 28490, duration: '4:15' },
    { id: 'kiss-kiss', title: 'Kiss Kiss', album: 'Come Closer', year: 2006, respectCount: 32180, duration: '3:57' },
    { id: 'beni-cok-sev', title: 'Beni Çok Sev', album: 'Ahde Vefa', year: 2007, respectCount: 15640, duration: '4:28' }
  ];

  const handleRespectSend = () => {
    if (respectAmount > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`${respectAmount}₺ respect gönderildi! 🎉`);
        song.totalRespect += respectAmount;
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
                onClick={() => navigate(`/artist/${song.artist.username}`)}
              >
                ← {song.artist.name}
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {song.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge.Online count={187} />
              <Button
                variant={isLiked ? "danger" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? '❤️ Beğenildi' : '🤍 Beğen'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Song Header Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Album Artwork */}
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-2xl flex items-center justify-center">
                {song.album.artwork ? (
                  <img 
                    src={song.album.artwork} 
                    alt={`${song.title} album artwork`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">🎵</div>
                    <p className="text-sm opacity-80">Album Kapağı</p>
                  </div>
                )}
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-5xl font-bold mb-2">{song.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <button 
                    className="text-2xl font-semibold text-purple-100 hover:text-white transition-colors"
                    onClick={() => navigate(`/artist/${song.artist.username}`)}
                  >
                    {song.artist.name}
                  </button>
                  {song.artist.verified && <Badge variant="primary" size="sm">✓</Badge>}
                </div>
                
                <div className="flex flex-wrap gap-6 text-purple-100 mb-6">
                  <span>📀 {song.album.name}</span>
                  <span>📅 {song.album.year}</span>
                  <span>⏱️ {song.duration}</span>
                  <span>🎭 {song.genre}</span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm mb-6">
                  <div>
                    <div className="text-2xl font-bold">
                      <Badge.Respect amount={song.totalRespect} className="bg-white/20 text-white" />
                    </div>
                    <div className="text-purple-200">Toplam Respect</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{(song.totalLikes / 1000).toFixed(0)}K</div>
                    <div className="text-purple-200">Beğeni</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{(song.totalPlays / 1000000).toFixed(0)}M</div>
                    <div className="text-purple-200">Dinlenme</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 border-none"
                    onClick={() => window.open(song.spotifyUrl, '_blank')}
                  >
                    ▶️ Spotify'da Dinle
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    📋 Sözler
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    📤 Paylaş
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Respect Widget */}
            <div className="flex-shrink-0 w-full md:w-80">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <Card.Header>
                  <h3 className="text-white font-semibold">💝 Bu Şarkıya Respect Gönder</h3>
                </Card.Header>
                <Card.Body>
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
                    {respectAmount}₺ Gönder
                  </Button>
                  
                  <p className="text-xs text-purple-200 mt-2 text-center">
                    💡 Respect göndererek sanatçıya destek ol!
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Respecters & Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Respecters for this song */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold flex items-center gap-2">
                  🏆 En Çok Respect Gönderenler
                </h3>
                <p className="text-sm text-gray-600">Bu şarkıya özel sıralama</p>
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
                        <div className="flex items-center justify-between">
                          <Badge.Respect amount={item.totalRespect} size="sm" />
                          <span className="text-xs text-gray-500">{item.lastRespect}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Recent Activity for this song */}
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
                        
                        <div>
                          <Badge.Respect amount={activity.amount} size="sm" />
                          {activity.message && (
                            <p className="text-sm text-gray-600 mt-1">{activity.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Right Column - Chat & Related Songs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Song-specific Chat */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    💬 Şarkı Sohbeti
                  </h3>
                  <Badge.Online count={chatMessages.length * 8} />
                </div>
                <p className="text-sm text-gray-600">{song.title} hakkında konuşun</p>
              </Card.Header>
              <Card.Body>
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
                
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Bu şarkı hakkında ne düşünüyorsun?"
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleChatSend} disabled={!chatMessage.trim()}>
                    Gönder
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Related Songs */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">🎵 {song.artist.name}'dan Diğer Şarkılar</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-2">
                  {relatedSongs.map((relatedSong, index) => (
                    <div 
                      key={relatedSong.id} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/song/${relatedSong.id}`)}
                    >
                      <span className="text-gray-400 font-mono text-sm min-w-[30px]">
                        {index + 1}.
                      </span>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{relatedSong.title}</h4>
                        <p className="text-sm text-gray-600">
                          {relatedSong.album} • {relatedSong.year} • {relatedSong.duration}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge.Respect amount={relatedSong.respectCount} size="sm" />
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
                
                <Button variant="outline" className="w-full mt-4">
                  Tüm Şarkıları Gör
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongPage; 