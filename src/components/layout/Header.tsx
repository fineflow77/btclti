// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Info, Wallet, BarChart2, Newspaper, ChevronDown, ChevronRight } from 'lucide-react';
import { ChartLineUp } from 'phosphor-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const colors = {
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
  },
  infoLink: 'text-gray-300 hover:text-white',
  border: 'border-[#2c333e]/50',
  focus: 'focus:outline-none focus:ring-2 focus:ring-[#3B82F6]',
  accent: 'text-[#3B82F6]',
  accentBg: 'bg-[#3B82F6] hover:bg-[#2b6cb0]',
};

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navItems: NavItem[] = [
    {
      to: '#',
      label: '学ぶ',
      icon: <Info className="h-4 w-4 mr-2" />,
      children: [
        { to: '/bitcoin-basics', label: 'ビットコイン投資の基礎', icon: <Info className="h-4 w-4 mr-2" /> },
        { to: '/power-law-explanation', label: 'パワーロー解説', icon: <Info className="h-4 w-4 mr-2" /> },
        { to: '/analysis-news', label: 'ニュース', icon: <Newspaper className="h-4 w-4 mr-2" /> },
      ],
    },
    {
      to: '#',
      label: 'シミュレーター',
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
      children: [
        { to: '/simulators/investment', label: '積み立てシミュレーター', icon: <ChartLineUp className="h-4 w-4 mr-2" /> },
        { to: '/simulators/withdrawal', label: '取り崩しシミュレーター', icon: <Wallet className="h-4 w-4 mr-2" /> },
      ],
    },
  ];

  return (
    <header className="bg-[#1a202c]/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-[#2c333e]/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* ロゴ */}
        <NavLink
          to="/"
          className="flex items-center hover:opacity-90 transition-opacity duration-300"
          aria-label="ビットコイン長期投資研究所 - ホームページへ"
        >
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              ビットコイン長期投資研究所
            </span>
          </div>
        </NavLink>

        {/* ナビゲーション */}
        {isMobile ? (
          <div className="relative">
            <button
              onClick={toggleMobileMenu}
              className={`text-white p-2 rounded-full transition-all duration-300 ${colors.focus} hover:bg-gray-700/50`}
              aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {isMobileMenuOpen && (
              <nav className="absolute right-0 mt-2 bg-[#1a202c]/95 backdrop-blur-md rounded-lg shadow-xl w-64 z-50 overflow-hidden border ${colors.border} animate-slideDown">
                {navItems.map((item) =>
                  item.children ? (
                    <details key={item.label} className="group">
                      <summary className="flex items-center justify-between px-4 py-3 hover:bg-gray-700/50 transition-all duration-300 text-gray-200 cursor-pointer">
                        <div className="flex items-center">
                          {item.icon}
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform duration-300" />
                      </summary>
                      {item.children.map((subItem) => (
                        <NavLink
                          key={subItem.to}
                          to={subItem.to}
                          className={({ isActive }) =>
                            `flex items-center px-6 py-2 hover:bg-gray-700/50 transition-all duration-300 ${isActive ? 'bg-gray-700/50 text-[#3B82F6] font-medium' : 'text-gray-200'
                            }`
                          }
                        >
                          {subItem.icon}
                          <span className="text-sm">{subItem.label}</span>
                        </NavLink>
                      ))}
                    </details>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 hover:bg-gray-700/50 transition-all duration-300 ${isActive ? 'bg-gray-700/50 text-[#3B82F6] font-medium' : 'text-gray-200'
                        }`
                      }
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  )
                )}
              </nav>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-8">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 cursor-pointer rounded-lg">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute left-0 mt-2 w-48 bg-[#1a202c]/95 backdrop-blur-md rounded-lg shadow-xl z-50 overflow-hidden border ${colors.border} opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-1">
                    {item.children.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 hover:bg-gray-700/50 transition-all duration-300 ${isActive ? 'bg-gray-700/50 text-[#3B82F6] font-medium' : 'text-gray-200'
                          }`
                        }
                      >
                        {subItem.icon}
                        <span className="text-sm">{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${colors.infoLink} transition-all duration-300 px-3 py-2 text-sm flex items-center hover:bg-gray-700/50 rounded-lg ${isActive ? 'text-[#3B82F6] font-medium border-b-2 border-[#3B82F6]' : ''
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

const globalStyles = `
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
}
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

export default Header;