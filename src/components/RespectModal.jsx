import React, { useState } from 'react';
import { Button, Card, Avatar, Badge, Input } from './ui';

const RespectModal = ({ 
  isOpen, 
  onClose, 
  target, 
  type = 'artist', // 'artist' or 'song'
  onSuccess 
}) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [
    { amount: 5, emoji: '☕', label: 'Küçük Destek' },
    { amount: 10, emoji: '🎵', label: 'Standart' },
    { amount: 25, emoji: '❤️', label: 'Güçlü Destek' },
    { amount: 50, emoji: '🔥', label: 'Büyük Destek' }
  ];

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
      // Simulate respect sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update target respect (mock)
      if (target.totalRespect) {
        target.totalRespect += finalAmount;
      }
      
      // Call success callback
      if (onSuccess) {
        onSuccess(finalAmount, message);
      }
      
      // Reset form and close
      setSelectedAmount(10);
      setCustomAmount('');
      setMessage('');
      onClose();
      
      alert(`${finalAmount}₺ respect gönderildi! 🎉`);
      
    } catch {
      alert('Respect gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedAmount(10);
      setCustomAmount('');
      setMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">💝 Respect Gönder</h2>
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
          
          {/* Target Info */}
          <div className="flex items-center gap-3 mt-4">
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
            
            <div>
              <h3 className="font-semibold">
                {type === 'song' ? target.title : target.name}
              </h3>
              {type === 'song' && target.artist && (
                <p className="text-sm text-gray-600">{target.artist}</p>
              )}
              {target.totalRespect && (
                <Badge.Respect amount={target.totalRespect} size="sm" />
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Quick Amount Selection */}
          <div>
            <h4 className="font-medium mb-3">💰 Miktar Seç</h4>
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((preset) => (
                <button
                  key={preset.amount}
                  onClick={() => handleAmountSelect(preset.amount)}
                  disabled={loading}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAmount === preset.amount && !customAmount
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{preset.emoji}</span>
                    <div>
                      <div className="font-bold">{preset.amount}₺</div>
                      <div className="text-xs text-gray-600">{preset.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <h4 className="font-medium mb-3">🎯 Özel Miktar</h4>
            <Input.Amount
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Özel miktar girin"
              disabled={loading}
            />
          </div>

          {/* Message */}
          <div>
            <h4 className="font-medium mb-3">💬 Mesaj (İsteğe Bağlı)</h4>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sanatçıya mesajın..."
              maxLength={100}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              {message.length}/100 karakter
            </p>
          </div>

          {/* Current Selection */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                <Badge.Respect amount={getFinalAmount()} />
              </div>
              <p className="text-sm text-gray-600">
                {type === 'song' ? target.title : target.name} için gönderilecek
              </p>
              {message && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  "'{message}'"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
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
              onClick={handleSendRespect}
              loading={loading}
              disabled={getFinalAmount() < 1}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Gönderiliyor...' : `${getFinalAmount()}₺ Gönder`}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Güvenli ödeme sistemi ile korunur
          </p>
        </div>
      </div>
    </div>
  );
};

export default RespectModal; 