import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ABCDCards from './components/ABCDCards';
import BMICalculator from './components/BMICalculator';
import AIChat from './components/AIChat';
import { AppTab } from './types';
import { HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.POSTER);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.POSTER:
        return <ABCDCards />;
      case AppTab.BMI:
        return <BMICalculator />;
      case AppTab.CHAT:
        return <AIChat />;
      default:
        return <ABCDCards />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] font-sans">
      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-40 hidden md:block">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-100 p-2 rounded-full">
               <HeartPulse className="text-red-600 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Smart Poster <span className="text-red-600">Hipertensi</span></h1>
          </div>
          <p className="text-sm text-gray-500 italic">Universitas Brawijaya - Fakultas Kedokteran</p>
        </div>
      </header>

      {/* Mobile Header (simplified) */}
      <header className="md:hidden bg-white p-4 shadow-sm border-b border-green-100 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <HeartPulse className="text-red-600 w-5 h-5" />
          <span className="font-bold text-gray-800">Cegah Hipertensi</span>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">ABCD</span>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 mb-20 md:mb-0">
        <div className="animate-fade-in-up">
           {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <Navbar currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
};

export default App;