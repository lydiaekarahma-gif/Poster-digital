import React from 'react';
import { AppTab } from '../types';
import { Activity, MessageCircle, Calculator } from 'lucide-react';

interface NavbarProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab }) => {
  const navItems = [
    { id: AppTab.POSTER, label: 'Edukasi ABCD', icon: <Activity className="w-5 h-5" /> },
    { id: AppTab.BMI, label: 'Cek BMI', icon: <Calculator className="w-5 h-5" /> },
    { id: AppTab.CHAT, label: 'Tanya Dokter AI', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentTab === item.id
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              {item.icon}
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;