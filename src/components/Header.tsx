import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Sun, Moon, Plus } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenWhatsAppOrder: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  isDarkMode,
  toggleDarkMode,
  onOpenWhatsAppOrder
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    setIsOpen(false);
    if (view === 'testimonials' || view === 'faq') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(view);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-lg shadow-md border-white/20 dark:border-slate-800/40 py-3'
          : 'bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-white/35 dark:border-slate-900/30 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            id="header-brand"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Plus className="w-6 h-6 stroke-[3]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
                {BUSINESS_INFO.name}
              </span>
              <p className="text-[9px] text-gray-500 dark:text-gray-400 tracking-wider uppercase font-semibold leading-none mt-0.5">
                Pharmacy & Store
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative ${
                    isActive
                      ? 'text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-teal-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call actions & Toggles */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              id="desktop-dark-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Call Now */}
            <a
              id="header-call-btn"
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-teal-600/30 text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-400/30 dark:hover:bg-teal-950/30 text-sm font-semibold transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp Order Button */}
            <button
              id="header-whatsapp-btn"
              onClick={onOpenWhatsAppOrder}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-sm font-semibold shadow-md shadow-emerald-500/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 fill-white/10" />
              <span>WhatsApp Order</span>
            </button>
          </div>

          {/* Mobile Hamburguer / Toggle Area */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Dark Mode for Mobile */}
            <button
              id="mobile-dark-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Menu Trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-5">
          <div className="px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 font-bold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800 pt-4 flex flex-col sm:flex-row gap-2.5">
              <a
                id="mobile-menu-call"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg border border-teal-500 text-teal-600 dark:text-teal-400 dark:border-teal-400/40 font-semibold text-center text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 84090 52410</span>
              </a>

              <button
                id="mobile-menu-whatsapp"
                onClick={() => {
                  setIsOpen(false);
                  onOpenWhatsAppOrder();
                }}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 font-semibold text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-white/15" />
                <span>WhatsApp Medicine Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
