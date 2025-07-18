import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge, Input, LoadingSpinner } from '../components/ui';
import ProfileEditModal from '../components/ProfileEditModal';

const UserProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - kendi profilimiz
  const [userData, setUserData] = useState({
    id: 'user123',
    username: 'musiksevdalisi',
    displayName: 'Müzik Sevdalısı',
    email: 'user@example.com',
    avatar: null,
    bio: 'Türk pop müziğinin tutkun takipçisiyim 🎵 | Her gün yeni şarkılar keşfediyorum | Sanatçıları desteklemeyi seviyorum ❤️',
    joinDate: '2023-03-15',
    location: 'İstanbul, Türkiye',
    website: 'https://musikblog.com',
    isVerified: false,
    
    // Stats
    stats: {
      totalRespectSent: 2470,
      totalRespectReceived: 0, // Normal kullanıcı için 0
      followingCount: 42,
      followersCount: 18,
      favoriteGenres: ['Türk Pop', 'Rock', 'Indie'],
      memberSince: '1 yıl 4 ay'
    },

    // Current listening (Spotify simulation)
    currentlyListening: {
      song: 'Şımarık',
      artist: 'Tarkan',
      album: 'Ölürüm Sana',
      isPlaying: true,
      timestamp: '2:34 / 4:02'
    },

    // Privacy settings
    privacy: {
      showEmail: false,
      showActivity: true,
      showStats: true,
      allowMessages: true
    },

    // Notification settings
    notifications: {
      email: true,
      push: true,
      respect: true,
      newFollowers: true,
      artistUpdates: true
    }
  });

  // Respect history data
  const respectHistory = [
    {
      id: 1,
      type: 'sent',
      target: { name: 'Tarkan', type: 'artist' },
      amount: 25,
      message: 'Harika müzikler! 🎵',
      timestamp: '2 saat önce'
    },
    {
      id: 2,
      type: 'sent',
      target: { name: 'Şımarık', artist: 'Tarkan', type: 'song' },
      amount: 15,
      timestamp: '1 gün önce'
    },
    {
      id: 3,
      type: 'sent',
      target: { name: 'Sezen Aksu', type: 'artist' },
      amount: 50,
      message: 'Efsane sanatçı ❤️',
      timestamp: '2 gün önce'
    },
    {
      id: 4,
      type: 'sent',
      target: { name: 'Dudu', artist: 'Tarkan', type: 'song' },
      amount: 10,
      timestamp: '3 gün önce'
    },
    {
      id: 5,
      type: 'sent',
      target: { name: 'Hadise', type: 'artist' },
      amount: 20,
      message: 'Yeni şarkın çok güzel!',
      timestamp: '1 hafta önce'
    }
  ];

  // Top respected artists
  const topArtists = [
    { name: 'Tarkan', totalRespect: 150, avatar: null, rank: 1 },
    { name: 'Sezen Aksu', totalRespect: 120, avatar: null, rank: 2 },
    { name: 'Hadise', totalRespect: 85, avatar: null, rank: 3 },
    { name: 'Murat Boz', totalRespect: 70, avatar: null, rank: 4 },
    { name: 'Gülşen', totalRespect: 45, avatar: null, rank: 5 }
  ];

  // Top respected songs
  const topSongs = [
    { title: 'Şımarık', artist: 'Tarkan', totalRespect: 75, rank: 1 },
    { title: 'Dudu', artist: 'Tarkan', totalRespect: 50, rank: 2 },
    { title: 'Everyway That I Can', artist: 'Sertab Erener', totalRespect: 40, rank: 3 },
    { title: 'Yeni Baştan', artist: 'Hadise', totalRespect: 35, rank: 4 },
    { title: 'Kiss Kiss', artist: 'Tarkan', totalRespect: 30, rank: 5 }
  ];

  // Activity timeline
  const activityTimeline = [
    {
      id: 1,
      type: 'respect_sent',
      content: 'Tarkan\'a 25₺ respect gönderdi',
      details: '"Harika müzikler! 🎵"',
      timestamp: '2 saat önce',
      icon: '💝'
    },
    {
      id: 2,
      type: 'song_liked',
      content: 'Şımarık şarkısını beğendi',
      timestamp: '5 saat önce',
      icon: '❤️'
    },
    {
      id: 3,
      type: 'artist_followed',
      content: 'Nil Karaibrahimgil\'i takip etmeye başladı',
      timestamp: '1 gün önce',
      icon: '👥'
    },
    {
      id: 4,
      type: 'respect_sent',
      content: 'Sezen Aksu\'ya 50₺ respect gönderdi',
      details: '"Efsane sanatçı ❤️"',
      timestamp: '2 gün önce',
      icon: '💝'
    },
    {
      id: 5,
      type: 'playlist_created',
      content: 'Yeni playlist oluşturdu: "90\'lar Nostalji"',
      timestamp: '3 gün önce',
      icon: '🎵'
    }
  ];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleProfileUpdate = (updatedData) => {
    setUserData(prev => ({
      ...prev,
      ...updatedData
    }));
    setShowEditModal(false);
  };

  const isOwnProfile = username === userData.username || !username;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/feed')}
              >
                ← Ana Sayfa
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {isOwnProfile ? 'Profilim' : `@${username}`}
              </h1>
            </div>
            
            {isOwnProfile && (
              <Button
                variant="outline"
                onClick={handleEditProfile}
              >
                ⚙️ Profili Düzenle
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar 
                username={userData.displayName}
                size="3xl"
                src={userData.avatar}
                className="mb-4"
              />
              
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{userData.displayName}</h1>
                  {userData.isVerified && <Badge variant="primary" size="sm">✓</Badge>}
                </div>
                
                <p className="text-purple-100 text-lg mb-2">@{userData.username}</p>
                
                {userData.bio && (
                  <p className="text-purple-100 mb-4 max-w-md leading-relaxed">{userData.bio}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-purple-200">
                  <span>📍 {userData.location}</span>
                  <span>📅 {userData.stats.memberSince} önce katıldı</span>
                  {userData.website && (
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      🌐 Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              <div className="text-center bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">
                  <Badge.Respect amount={userData.stats.totalRespectSent} className="bg-white/20 text-white" />
                </div>
                <div className="text-purple-200 text-sm">Gönderilen Respect</div>
              </div>
              
              <div className="text-center bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{userData.stats.followingCount}</div>
                <div className="text-purple-200 text-sm">Takip Edilen</div>
              </div>
              
              <div className="text-center bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{userData.stats.followersCount}</div>
                <div className="text-purple-200 text-sm">Takipçi</div>
              </div>
              
              <div className="text-center bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{respectHistory.length}</div>
                <div className="text-purple-200 text-sm">Aktivite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Listening */}
      {userData.currentlyListening.isPlaying && (
        <section className="bg-green-600 text-white py-3">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
              <span className="text-sm">🎵 Şu an dinliyor:</span>
              <span className="font-medium">
                {userData.currentlyListening.song} - {userData.currentlyListening.artist}
              </span>
              <span className="text-green-200 text-sm">({userData.currentlyListening.timestamp})</span>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { key: 'overview', label: 'Genel Bakış' },
            { key: 'activity', label: 'Aktivite' },
            { key: 'stats', label: 'İstatistikler' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-600 border-transparent hover:text-purple-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Artists */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold">🎤 En Çok Respect Gönderilen Sanatçılar</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-3">
                    {topArtists.slice(0, 5).map((artist) => (
                      <div key={artist.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <span className="text-lg font-bold text-gray-400 min-w-[30px]">#{artist.rank}</span>
                        <Avatar username={artist.name} size="sm" src={artist.avatar} />
                        <div className="flex-1">
                          <p className="font-medium">{artist.name}</p>
                        </div>
                        <Badge.Respect amount={artist.totalRespect} size="sm" />
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Top Songs */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold">🎵 En Çok Respect Gönderilen Şarkılar</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-3">
                    {topSongs.slice(0, 5).map((song) => (
                      <div key={song.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <span className="text-lg font-bold text-gray-400 min-w-[30px]">#{song.rank}</span>
                        <div className="flex-1">
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                        </div>
                        <Badge.Respect amount={song.totalRespect} size="sm" />
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold">⚡ Son Aktiviteler</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {activityTimeline.slice(0, 8).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <span className="text-lg">{activity.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700">{activity.content}</p>
                          {activity.details && (
                            <p className="text-xs text-gray-500 italic mt-1">"{activity.details}"</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Quick Stats */}
              <Card>
                <Card.Header>
                  <h3 className="font-semibold">📊 Hızlı İstatistikler</h3>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Favori Türler</span>
                      <div className="flex flex-wrap gap-1">
                        {userData.stats.favoriteGenres.map((genre, index) => (
                          <Badge key={index} variant="primary" size="sm">{genre}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bu ay gönderilen</span>
                      <Badge.Respect amount={245} size="sm" />
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">En aktif gün</span>
                      <span className="font-medium">Pazartesi</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="max-w-4xl">
            <Card>
              <Card.Header>
                <h3 className="font-semibold">📈 Aktivite Geçmişi</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  {respectHistory.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">💝</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">
                            {item.target.type === 'song' 
                              ? `${item.target.name} - ${item.target.artist}` 
                              : item.target.name
                            }
                          </span>
                          <Badge variant={item.target.type === 'song' ? 'info' : 'primary'} size="sm">
                            {item.target.type === 'song' ? 'Şarkı' : 'Sanatçı'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge.Respect amount={item.amount} size="sm" />
                          <span className="text-gray-500 text-sm">{item.timestamp}</span>
                        </div>
                        {item.message && (
                          <p className="text-sm text-gray-600 mt-2 italic">"{item.message}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Chart Placeholder */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">📊 Aylık Respect Gönderimleri</h3>
              </Card.Header>
              <Card.Body>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600">Grafik Placeholder</p>
                    <p className="text-sm text-gray-500">Son 6 ay analizi</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Genre Distribution */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold">🎭 Tür Dağılımı</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  {[
                    { genre: 'Türk Pop', percentage: 45, amount: 1112 },
                    { genre: 'Rock', percentage: 25, amount: 618 },
                    { genre: 'Indie', percentage: 20, amount: 494 },
                    { genre: 'Jazz', percentage: 10, amount: 247 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.genre}</span>
                        <Badge.Respect amount={item.amount} size="sm" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">%{item.percentage}</div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        userData={userData}
        onSave={handleProfileUpdate}
      />
    </div>
  );
};

export default UserProfilePage; 