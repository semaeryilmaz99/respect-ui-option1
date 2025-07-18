import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import AuthPage from './pages/AuthPage'
import FeedPage from './pages/FeedPage'
import ArtistPage from './pages/ArtistPage'
import SongPage from './pages/SongPage'
import SendRespectPage from './pages/SendRespectPage'
import UserProfilePage from './pages/UserProfilePage'
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
        <Route path="/feed" element={<FeedPage />} />
        
        <Route path="/artist/:id" element={<ArtistPage />} />
        
        <Route path="/song/:id" element={<SongPage />} />
        
        <Route path="/profile/:username" element={<UserProfilePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        
        <Route path="/send-respect" element={<SendRespectPage />} />
        
        {/* 404 sayfası */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-900 mb-4">❌ 404</h1><p className="text-gray-600">Sayfa bulunamadı</p><a href="/onboarding" className="text-purple-600 hover:underline mt-4 inline-block">Ana Sayfaya Dön</a></div></div>} />
      </Routes>
    </Router>
  )
}

export default App
