import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import AuthPage from './pages/AuthPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa - Onboarding'e yönlendir */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        
        {/* Onboarding sayfası */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Auth sayfası (Login/Register) */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Gelecekteki sayfalar için placeholder'lar */}
        <Route path="/feed" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">📱 Feed Sayfası</h1><p className="text-gray-600">Yakında gelecek...</p></div></div>} />
        
        <Route path="/artist/:id" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">🎵 Sanatçı Sayfası</h1><p className="text-gray-600">Yakında gelecek...</p></div></div>} />
        
        <Route path="/song/:id" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">🎧 Şarkı Sayfası</h1><p className="text-gray-600">Yakında gelecek...</p></div></div>} />
        
        <Route path="/profile/:username" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">👤 Profil Sayfası</h1><p className="text-gray-600">Yakında gelecek...</p></div></div>} />
        
        <Route path="/send-respect" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">💝 Respect Gönder</h1><p className="text-gray-600">Yakında gelecek...</p></div></div>} />
        
        {/* 404 sayfası */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">❌ 404</h1><p className="text-gray-600">Sayfa bulunamadı</p><a href="/onboarding" className="text-purple-600 hover:underline mt-4 inline-block">Ana Sayfaya Dön</a></div></div>} />
      </Routes>
    </Router>
  )
}

export default App
