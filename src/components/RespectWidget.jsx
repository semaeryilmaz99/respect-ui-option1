import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Avatar, Badge } from './ui';

const RespectWidget = ({ 
  target, 
  type = 'artist', // 'artist' or 'song'
  variant = 'card', // 'card', 'compact', 'inline'
  showStats = true,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [loading, setLoading] = useState(false);

  const quickAmounts = [5, 10, 25, 50];

  const handleQuickRespect = async (amount) => {
    setLoading(true);
    setSelectedAmount(amount);
    
    try {
      // Simulate quick respect sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success and update UI
      alert(`${amount}₺ respect gönderildi! 🎉`);
      
      // Update target respect (mock)
      if (target.totalRespect) {
        target.totalRespect += amount;
      }
      
    } catch {
      alert('Respect gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleFullRespectPage = () => {
    const url = `/send-respect?type=${type}&target=${target.id || target.username}`;
    navigate(url);
  };

  // Compact variant for small spaces
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex gap-1">
          {quickAmounts.slice(0, 3).map(amount => (
            <Button
              key={amount}
              size="sm"
              variant="outline"
              onClick={() => handleQuickRespect(amount)}
              disabled={loading}
              className="text-xs"
            >
              {amount}₺
            </Button>
          ))}
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={handleFullRespectPage}
        >
          Daha Fazla
        </Button>
      </div>
    );
  }

  // Inline variant for embedded use
  if (variant === 'inline') {
    return (
      <div className={`flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200 ${className}`}>
        <div>
          <p className="font-medium text-sm">💝 Respect Gönder</p>
          <p className="text-xs text-gray-600">
            {type === 'song' ? target.title : target.name} için
          </p>
        </div>
        <div className="flex gap-2">
          {quickAmounts.slice(0, 2).map(amount => (
            <Button
              key={amount}
              size="sm"
              variant={selectedAmount === amount ? "primary" : "outline"}
              onClick={() => handleQuickRespect(amount)}
              loading={loading && selectedAmount === amount}
            >
              {amount}₺
            </Button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleFullRespectPage}
          >
            ...
          </Button>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className={`${className}`}>
      <Card.Header>
        <div className="flex items-center gap-3">
          {type === 'song' ? (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white">
              🎵
            </div>
          ) : (
            <Avatar 
              username={target.name}
              size="md"
              src={target.avatar}
            />
          )}
          
          <div className="flex-1">
            <h3 className="font-semibold">
              {type === 'song' ? target.title : target.name}
            </h3>
            {type === 'song' && target.artist && (
              <p className="text-sm text-gray-600">{target.artist}</p>
            )}
            {showStats && target.totalRespect && (
              <Badge.Respect amount={target.totalRespect} size="sm" />
            )}
          </div>
        </div>
      </Card.Header>
      
      <Card.Body>
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map(amount => (
            <Button
              key={amount}
              size="sm"
              variant={selectedAmount === amount ? "primary" : "outline"}
              onClick={() => handleQuickRespect(amount)}
              loading={loading && selectedAmount === amount}
              className="flex-col py-3"
            >
              <span className="text-lg">{amount === 5 ? '☕' : amount === 10 ? '🎵' : amount === 25 ? '❤️' : '🔥'}</span>
              <span className="text-xs">{amount}₺</span>
            </Button>
          ))}
        </div>

        {/* More Options */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleFullRespectPage}
          >
            Özel Miktar
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => handleQuickRespect(selectedAmount)}
            loading={loading}
          >
            {selectedAmount}₺ Gönder
          </Button>
        </div>

        {showStats && (
          <p className="text-xs text-gray-500 mt-3 text-center">
            💡 Bugün {Math.floor(Math.random() * 50) + 20} kişi respect gönderdi
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default RespectWidget; 