import { useState, useEffect, FormEvent } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Search,
  CheckCircle,
  Users,
  Tag,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  Percent,
  Plus,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  ThumbsUp,
  X,
  Send,
  Download,
  Info,
  ExternalLink,
  Mail
} from 'lucide-react';

import {
  BUSINESS_INFO,
  SERVICES,
  FEATURED_CATEGORIES,
  TESTIMONIALS,
  FAQS,
  OFFERS,
  HEALTH_TIPS,
  GALLERY_ITEMS,
  TIMELINE,
  BUSINESS_VALUES
} from './data';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppOrderModal from './components/WhatsAppOrderModal';
import SEOMeta from './components/SEOMeta';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWhatsAppOrderOpen, setIsWhatsAppOrderOpen] = useState(false);
  
  // Search & Availability States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [activeMedicineInquiry, setActiveMedicineInquiry] = useState<string | null>(null);

  // Accordion active index
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  // Health tip active detail modal
  const [activeHealthTipId, setActiveHealthTipId] = useState<string | null>(null);

  // Gallery view state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'store' | 'medicines' | 'equipment' | 'products'>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Contact form submission
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '', message: '' });

  // Quick Prescription checklist
  const [prescriptionChecklist, setPrescriptionChecklist] = useState({
    doctorSignature: false,
    patientName: false,
    dateCurrent: false,
    clearDosage: false
  });

  // Dark Mode side effects
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Global Tracking Hook Integration for SPA Page Changes
  useEffect(() => {
    const TRACKING_ENDPOINT = 'https://tools.cprajapati.com/tracker/track.php';
    const urlParams = new URLSearchParams(window.location.search);
    let cid = urlParams.get('cid') || localStorage.getItem('wmit_active_cid');
    
    if (urlParams.get('cid')) {
      localStorage.setItem('wmit_active_cid', urlParams.get('cid') || '');
    }
    
    if (!cid) return;
    
    let visitorId = localStorage.getItem('wmit_visitor_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wmit_visitor_id', visitorId);
    
    let sessionId = sessionStorage.getItem('wmit_session_id') || 'wmit_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wmit_session_id', sessionId);
    
    const getPageName = () => {
      if (currentView) {
        return currentView.charAt(0).toUpperCase() + currentView.slice(1);
      }
      const path = window.location.pathname;
      const segment = path.replace(/\/$/, "").split("/").pop();
      return segment ? segment.split('?')[0] : 'Home';
    };
    
    const sendInitPayload = () => {
      const payload = {
        cid: cid,
        visitor_id: visitorId,
        session_id: sessionId,
        page_name: getPageName(),
        referrer: document.referrer || '',
        device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
        browser: navigator.userAgent,
        action: 'init'
      };
      
      fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    };
    
    const sendExitPayload = () => {
      const payload = {
        cid: cid,
        session_id: sessionId,
        page_name: getPageName(),
        action: 'page_change'
      };
      
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(TRACKING_ENDPOINT, blob);
      } else {
        fetch(TRACKING_ENDPOINT, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    };
    
    sendInitPayload();
    
    const handleLocationChange = () => {
      sendExitPayload();
      setTimeout(sendInitPayload, 100);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pagehide', sendExitPayload);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendExitPayload();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      sendExitPayload();
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pagehide', sendExitPayload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentView]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Medicine Search Auto-suggest handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }
    
    // Find matching items from all categories popular list
    const results: string[] = [];
    FEATURED_CATEGORIES.forEach(cat => {
      cat.popularItems.forEach(item => {
        if (item.toLowerCase().includes(query.toLowerCase()) && !results.includes(item)) {
          results.push(item);
        }
      });
    });
    setSearchSuggestions(results.slice(0, 5));
  };

  const triggerMedicineInquiry = (medName: string) => {
    setActiveMedicineInquiry(medName);
    setSearchQuery('');
    setSearchSuggestions([]);
  };

  // Format WhatsApp Link for a single medicine inquiry
  const getInquiryWhatsAppUrl = (medName: string) => {
    const messageText = `Hello Nitish Medical, I am inquiring about the availability of the following medicine:\n\n*Medicine Name:* ${medName}\n\nPlease let me know if it is currently in stock at your Tekari store. Thank you!`;
    return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(messageText)}`;
  };

  // Contact Form submit handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API storage / WhatsApp forward
    setContactSubmitted(true);
    setContactData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => {
      setContactSubmitted(false);
    }, 5000);
  };

  // Gallery Filters
  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  const openLightbox = (imageUrl: string, index: number) => {
    setActiveLightboxImage(imageUrl);
    setLightboxIndex(index);
  };

  const handleLightboxNav = (direction: 'next' | 'prev') => {
    let nextIdx = lightboxIndex;
    if (direction === 'next') {
      nextIdx = (lightboxIndex + 1) % filteredGallery.length;
    } else {
      nextIdx = (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
    }
    setLightboxIndex(nextIdx);
    setActiveLightboxImage(filteredGallery[nextIdx].imageUrl);
  };

  const activeHealthTip = HEALTH_TIPS.find(tip => tip.id === activeHealthTipId);

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 antialiased selection:bg-teal-500 selection:text-white">
      {/* SEO metadata tags injected */}
      <SEOMeta currentView={currentView} />

      {/* EMERGENCY RUNNING ANNOUNCEMENT BANNER */}
      <div id="emergency-banner" className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white text-xs sm:text-sm py-2 px-4 font-semibold text-center flex items-center justify-center space-x-2 relative z-50">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
        </span>
        <span>⚡ 24/7 Support in Tekari: Need emergency medical supplies? Call directly at <strong>{BUSINESS_INFO.phoneFormatted}</strong></span>
        <a href={`tel:${BUSINESS_INFO.phone}`} className="ml-2 underline hover:text-green-200 transition">Call Now</a>
      </div>

      {/* Sticky Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenWhatsAppOrder={() => setIsWhatsAppOrderOpen(true)}
      />

      {/* MAIN RENDER ENGINE */}
      <main className="flex-grow pt-24 pb-12">
        {currentView === 'home' && (
          <div id="view-home" className="space-y-16">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-white/20 dark:bg-slate-950/20 py-16 sm:py-24 border-b border-white/10 dark:border-slate-900/10">
              {/* Abstract decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text details */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-100/80 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/40 rounded-full text-xs font-bold text-teal-700 dark:text-teal-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Certified Genuine Pharmacy Store</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                      {BUSINESS_INFO.name} <br />
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
                        Your Trusted Pharmacy
                      </span> in Tekari
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      {BUSINESS_INFO.tagline}. Serving Tekari with authenticated prescription drugs, daily OTC medicines, surgical supplies, baby toiletries, and home care devices at honest prices.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                      <a
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="w-full sm:w-auto px-6 py-3.5 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 text-center flex items-center justify-center space-x-2 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call +91 84090 52410</span>
                      </a>

                      <button
                        onClick={() => setIsWhatsAppOrderOpen(true)}
                        className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 text-center flex items-center justify-center space-x-2 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <MessageSquare className="w-4 h-4 fill-white/10" />
                        <span>Upload Prescription</span>
                      </button>

                      <a
                        href={BUSINESS_INFO.googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:text-white dark:border-slate-700 rounded-xl font-semibold text-center flex items-center justify-center space-x-2 transition-all"
                      >
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>Get Directions</span>
                      </a>
                    </div>

                    {/* Quick trust metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-slate-900 max-w-md mx-auto lg:mx-0">
                      <div className="text-center lg:text-left">
                        <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">100%</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Genuine Meds</p>
                      </div>
                      <div className="text-center lg:text-left border-x border-gray-100 dark:border-slate-900 px-2">
                        <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">5000+</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Patients Served</p>
                      </div>
                      <div className="text-center lg:text-left">
                        <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">24h</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Fast Arranging</p>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Interactive Search & Fast Upload Board */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-emerald-500/10 rounded-3xl blur-2xl -z-10" />
                    
                    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-850 pb-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="p-2 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-xl">
                            <Search className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">Check Medicine Stock</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Search popular tablets & brands</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-green-100 dark:bg-green-950/80 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">Online</span>
                      </div>

                      {/* Search Input and suggestion engine */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                          <Search className="w-4.5 h-4.5" />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          placeholder="Search e.g., Dolo 650, Amoxyclav, Metformin..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                        
                        {/* Auto-suggestions panel */}
                        {searchSuggestions.length > 0 && (
                          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg z-30 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800">
                            {searchSuggestions.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => triggerMedicineInquiry(item)}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-slate-800 flex items-center justify-between"
                              >
                                <span>{item}</span>
                                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">Inquire Stock</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Display quick search pill tags */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Popular items search:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['Dolo 650', 'Amoxyclav 625', 'Lantus Insulin', 'Becosules Plus', 'Omron BP'].map((pill) => (
                            <button
                              key={pill}
                              onClick={() => triggerMedicineInquiry(pill)}
                              className="text-xs bg-gray-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-600 dark:hover:text-teal-400 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-lg font-medium transition"
                            >
                              {pill}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Instruction Banner */}
                      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 p-3.5 rounded-xl flex items-start space-x-3 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-amber-850 dark:text-amber-300">
                          <strong>Prescription Policy:</strong> Schedule H or antibiotic medicines require an authorized physical prescription upload prior to collection/delivery at our store.
                        </div>
                      </div>

                      {/* Fast Upload trigger */}
                      <button
                        onClick={() => setIsWhatsAppOrderOpen(true)}
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md hover:from-emerald-700 hover:to-teal-700 transition"
                      >
                        <FileText className="w-4.5 h-4.5" />
                        <span>Send WhatsApp Prescription Directly</span>
                      </button>

                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Why Choose Us</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight">
                  Your Trusted Local Pharmacy Partner
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Providing complete peace of mind with authentic drugs, constant availability, and professional support.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
                {[
                  { title: '100% Genuine Medicines', desc: 'Sourced directly from authorized distributors. Zero grey-market risk.', icon: 'CheckCircle' },
                  { title: 'Experienced Staff', desc: 'Led by qualified pharmacist Nitish Kumar, ensuring absolute prescription accuracy.', icon: 'Users' },
                  { title: 'Affordable Prices', desc: 'Fair, transparent rates with generous discounts on chronic prescription packs.', icon: 'Tag' },
                  { title: 'Easy WhatsApp Support', desc: 'Send prescription photo on 8409052410 and have it compiled in minutes.', icon: 'MessageSquare' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-6 rounded-2xl group duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {item.icon === 'CheckCircle' && <CheckCircle className="w-6 h-6" />}
                      {item.icon === 'Users' && <Users className="w-6 h-6" />}
                      {item.icon === 'Tag' && <Tag className="w-6 h-6" />}
                      {item.icon === 'MessageSquare' && <MessageSquare className="w-6 h-6" />}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FEATURED CATEGORIES / MEDICINES */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Featured Categories</span>
                    <h2 className="text-3xl font-bold text-gray-950 dark:text-white tracking-tight">Our Medicine & Device Shelves</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explore fully-stocked healthcare products organized for high safety.</p>
                  </div>
                  <button
                    onClick={() => { setCurrentView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-bold text-sm"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FEATURED_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.01] transition-all duration-300"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                        
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Popular Items in Store:</span>
                          <div className="flex flex-wrap gap-1">
                            {cat.popularItems.slice(0, 4).map((item, index) => (
                              <span
                                key={index}
                                className="text-[10px] bg-gray-55 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded font-semibold"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => triggerMedicineInquiry(cat.name)}
                            className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                          >
                            Check Availability
                          </button>
                          
                          <button
                            onClick={() => setIsWhatsAppOrderOpen(true)}
                            className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
                          >
                            Order via Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* SPECIAL OFFERS & DISCOUNTS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-teal-950/60 to-slate-950/75 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Decorative background vectors */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-teal-500/15 rounded-full blur-2xl" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-xs text-teal-300 font-semibold">
                      <Percent className="w-3.5 h-3.5" />
                      <span>Nitish Medical Healthcare Savings</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      Special Discounts on <br />
                      Monthly Prescription Medicines
                    </h2>
                    <p className="text-sm text-teal-100/80 leading-relaxed">
                      We offer a flat discount rate for lifelong illness treatments such as blood pressure control, insulin, diabetic medications, and cardiovascular drugs. Send us a photo of your prescription to avail special rates immediately.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center space-x-1.5 text-xs text-teal-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Up to 15% Off Chronic Meds</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-teal-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Free Home Delivery in Tekari</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side offers layout */}
                  <div className="lg:col-span-6 space-y-4">
                    {OFFERS.map((off) => (
                      <div
                        key={off.id}
                        className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                            {off.discount}
                          </span>
                          <h4 className="font-bold text-white text-sm sm:text-base">{off.title}</h4>
                          <p className="text-xs text-slate-300 leading-tight">{off.description}</p>
                          <p className="text-[10px] text-slate-400">Valid Till: {off.expiry}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(off.code);
                              alert(`Offer code "${off.code}" copied to clipboard! Share this code with us on WhatsApp.`);
                            }}
                            className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-100 transition flex items-center space-x-1"
                          >
                            <span>Copy Code</span>
                          </button>
                          <span className="text-[10px] font-mono text-teal-300 block mt-1.5">{off.code}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* WORKING PROCESS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Order Process</span>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">How It Works in 4 Simple Steps</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">We make buying medicine simple, secure, and hassle-free.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 relative">
                {/* Horizontal connection line for desktop */}
                <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal-200 via-emerald-200 to-teal-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 -z-10" />

                {[
                  { step: '01', title: 'Visit Store or Upload', desc: 'Come directly to Khachiya Road store, or fill our quick WhatsApp Prescription Form.' },
                  { step: '02', title: 'Prescription Verification', desc: 'Our qualified pharmacist checks the prescription details for dosage safety.' },
                  { step: '03', title: 'Compile Medicines', desc: 'We systematically pack your tablets, capsules, baby syrups, or equipment.' },
                  { step: '04', title: 'Safe Payment & Delivery', desc: 'Pay safely via Cash/UPI on counter or receive home delivery across Tekari.' }
                ].map((proc, index) => (
                  <div key={index} className="text-center space-y-3 group">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-400/30 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-xl mx-auto group-hover:scale-105 transition-transform duration-200 shadow-md">
                      {proc.step}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{proc.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[240px] mx-auto leading-relaxed">{proc.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE PRESCRIPTION VERIFICATION REMINDER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-card p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-3 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl w-fit">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">Prescription Checklist Tool</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Under Indian government regulations, certain medications cannot be sold without a compliant medical slip. Tick the items below to verify if your doctor slip is fully valid for dispensing.
                  </p>
                  
                  {/* Warning Box */}
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200/50 dark:border-red-900/30 rounded-xl flex items-center space-x-2 text-[11px] text-red-700 dark:text-red-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Incomplete slips will be politely turned down to comply with safety acts.</span>
                  </div>
                </div>

                <div className="lg:col-span-7 glass-panel p-6 rounded-2xl space-y-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Interactive Verification:</span>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'doctorSignature', label: 'Doctor signature, registration seal, or letterhead printed' },
                      { key: 'patientName', label: 'Patient full name and age clearly legible' },
                      { key: 'dateCurrent', label: 'Prescription date is valid (within 3-6 months for chronic meds)' },
                      { key: 'clearDosage', label: 'Specific tablet count and dosage instructions written' }
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-900 cursor-pointer transition select-none"
                      >
                        <input
                          type="checkbox"
                          checked={prescriptionChecklist[item.key as keyof typeof prescriptionChecklist]}
                          onChange={(e) => setPrescriptionChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="mt-1 accent-teal-500 rounded focus:ring-teal-500 w-4.5 h-4.5 cursor-pointer"
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Checklist Summary */}
                  <div className="pt-4 border-t border-gray-200/60 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Completed: <strong className="text-teal-600 dark:text-teal-400">
                        {Object.values(prescriptionChecklist).filter(Boolean).length}/4
                      </strong> Checklist Items
                    </div>

                    {Object.values(prescriptionChecklist).every(Boolean) ? (
                      <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold">
                        ✓ Prescription Ready to Dispense!
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full font-semibold">
                        Please check missing details
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* TRUST CRITERIA SECTION (Why customers trust us) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-panel py-12 rounded-3xl">
              <div className="text-center space-y-3 mb-10 max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">The Nitish Guarantee</span>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">Why Customers Trust Our Pharmacist</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Experienced Pharmacist', desc: 'We review dosage schedules and warn against potentially dangerous drug interactions.', icon: Award },
                  { title: 'Quality Cold-Chain Storing', desc: 'Our refrigerators preserve vulnerable insulins, vaccines, and liquid syrups at constant temperatures.', icon: ShieldCheck },
                  { title: 'Reasonable Pricing', desc: 'No hidden taxes. Honest, genuine pricing with official sales bills.', icon: Tag },
                  { title: 'Quick & Dedicated Service', desc: 'Packed and prepared swiftly to minimize waiting time for sick patient families.', icon: Clock },
                  { title: 'Convenient Location', desc: 'Centrally situated on Khachiya Road in Tekari town with easy vehicle parking space.', icon: MapPin },
                  { title: 'Highly Polite Staff', desc: 'Always smiling, patient, and eager to answer dosage query concerns properly.', icon: ThumbsUp }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3.5 p-4 rounded-xl bg-white/60 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition">
                    <div className="p-2 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-lg shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center space-y-3 max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Local Testimonials</span>
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">What Residents of Tekari Say</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hear from local doctors, families, and regular medicine buyers.</p>
              </div>

              {/* Grid representation of 6 testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                {TESTIMONIALS.map((test) => (
                  <div
                    key={test.id}
                    className="glass-card glass-card-hover p-5 rounded-2xl relative flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Rating stars */}
                      <div className="flex text-amber-400">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                        "{test.comment}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-5 border-t border-gray-50 dark:border-slate-800 mt-5">
                      <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                        {test.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{test.name}</h4>
                        <p className="text-[10px] text-gray-400">{test.role}</p>
                      </div>
                      <span className="text-[9px] text-gray-400 ml-auto shrink-0">{test.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* FAQ Left Block */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Common FAQ</span>
                  <h2 className="text-3xl font-bold text-gray-950 dark:text-white tracking-tight">Frequently Asked Pharmacy Questions</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Have queries regarding drug regulations, cold storage, order delivery, or returns? Read our compiled common pharmacy guides.
                  </p>
                  <div className="p-4 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-900/30 rounded-2xl flex items-center space-x-3 text-xs text-teal-800 dark:text-teal-300">
                    <Info className="w-5 h-5 shrink-0 text-teal-600" />
                    <span>Can't find your answer? Call our pharmacist directly on 8409052410 for instant support.</span>
                  </div>
                </div>

                {/* FAQ Interactive Accordions */}
                <div className="lg:col-span-7 space-y-3">
                  {FAQS.map((faq) => {
                    const isOpen = activeFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="glass-card rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-gray-900 dark:text-white focus:outline-none hover:bg-gray-50 dark:hover:bg-slate-800/40"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-teal-500 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-2" />}
                        </button>

                        <div
                          className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? 'max-h-44 pb-4 border-t border-gray-50 dark:border-slate-850 pt-3' : 'max-h-0'
                          }`}
                        >
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* HEALTH TIPS & BLOG MINI VIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-panel py-12 rounded-3xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Health Awareness</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white">Pharmacist's Corner: Latest Health Tips</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Expert health habits for chronic illness safety, written by Nitish Kumar.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {HEALTH_TIPS.map((tip) => (
                  <div
                    key={tip.id}
                    className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-40 overflow-hidden">
                        <img src={tip.imageUrl} alt={tip.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block">
                          {tip.category}
                        </span>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                          {tip.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {tip.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">{tip.readTime}</span>
                      <button
                        onClick={() => setActiveHealthTipId(tip.id)}
                        className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* GOOGLE MAPS DIRECT STORE LINK SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-card p-4 sm:p-6 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Map Text panel */}
                  <div className="lg:col-span-4 space-y-4 p-2">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center">
                      <MapPin className="w-4 h-4 mr-1 shrink-0" />
                      <span>Live GPS Navigation</span>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Locate Us in Tekari</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      We are situated on the active <strong>Khachiya Road</strong>, near Tekari center. Easy access for patients visiting local clinical hubs. Use the map for exact navigation routes.
                    </p>
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      <p>📍 <strong>Plus Code:</strong> WRRV+V5G, Tekari, Bihar</p>
                      <p>📞 <strong>Phone Contact:</strong> 8409052410</p>
                    </div>
                    <a
                      href={BUSINESS_INFO.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
                    >
                      <span>Open in Google Maps App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Embedded Iframe */}
                  <div className="lg:col-span-8 h-80 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
                    <iframe
                      src={BUSINESS_INFO.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nitish Medical Google Map"
                    />
                  </div>

                </div>
              </div>
            </section>

            {/* CONTACT CTA BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center text-white space-y-5 shadow-lg shadow-emerald-600/10">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need Medicines Urgently?</h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
                  Call our local pharmacy counter or send your required list directly via WhatsApp for swift packing and quick home delivery.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-teal-700 font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md hover:bg-teal-50 transition"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>Call 8409052410</span>
                  </a>

                  <button
                    onClick={() => setIsWhatsAppOrderOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md hover:bg-slate-950 transition"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/10" />
                    <span>WhatsApp Order Form</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ABOUT PAGE/VIEW */}
        {currentView === 'about' && (
          <div id="view-about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
            
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <button onClick={() => setCurrentView('home')} className="hover:text-teal-500">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">About Us</span>
            </div>

            {/* Intro Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Our Heritage</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white leading-tight">
                  Business Story of <br /> Nitish Medical in Tekari
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2022 on Khachiya Road, Nitish Medical began with a single core promise: <strong>to bring certified, 100% genuine healthcare products to Tekari</strong>. In regional markets, obtaining verified life-saving medicines was once a challenge, with patients often travelling to Gaya for chronic treatments. 
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Under the direct management of lead pharmacist <strong>Nitish Kumar</strong>, we introduced strict cold-chain refrigeration networks, systematically categorized medication lists, and digitized ordering procedures via WhatsApp to make healthcare easily reachable.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800/85">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Nitish Medical Story"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-teal-900/10 mix-blend-multiply" />
              </div>
            </section>

            {/* Mission & Vision Bento Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Our Mission</span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Community Accessibility</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  To ensure that no resident of Tekari has to suffer or travel long distances to find high-grade, authentic prescription drugs and specialized baby-care equipment.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Our Vision</span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">The Trusted Health Hub</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  To establish Nitish Medical as Bihar's premier, gold-standard community pharmacy renowned for absolute integrity, digital ease, and constant inventory backup.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Our Core Value</span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Unyielding Authenticity</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We maintain zero tolerance for substandard pharmaceutical items, ensuring standard VAT/Tax invoicing and proper ethical practices for patient wellness.
                </p>
              </div>

            </section>

            {/* Timeline Milestones */}
            <section className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Our Timeline</span>
                <h3 className="text-2xl font-bold text-gray-950 dark:text-white">Milestones & Growth</h3>
              </div>

              <div className="max-w-3xl mx-auto space-y-6 relative border-l-2 border-teal-200 dark:border-slate-850 pl-5 ml-4 sm:ml-auto">
                {TIMELINE.map((time, idx) => (
                  <div key={idx} className="relative group space-y-1.5">
                    {/* Circle bullet */}
                    <div className="absolute -left-[1.6rem] top-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white dark:border-slate-950 group-hover:scale-110 transition-transform" />
                    
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400 font-mono block">
                      {time.year}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{time.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{time.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Owner Message Panel */}
            <section className="bg-slate-950/70 backdrop-blur-xl border border-white/10 text-white p-6 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-4 shrink-0 text-center lg:text-left space-y-2">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 mx-auto lg:mx-0 flex items-center justify-center text-4xl shadow-md border-2 border-white">
                    👨‍⚕️
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">{BUSINESS_INFO.owner.name}</h4>
                    <p className="text-xs text-teal-300 font-semibold">{BUSINESS_INFO.owner.designation}</p>
                  </div>
                </div>

                <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <span className="text-teal-400 text-2xl font-serif mr-1">"</span>
                    Message from the Owner
                    <span className="text-teal-400 text-2xl font-serif ml-1">"</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    {BUSINESS_INFO.owner.message}
                  </p>
                </div>
              </div>
            </section>

            {/* Near Deliveries Location Info */}
            <section className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                  Local Area Delivery Coverage
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  We deliver genuine medical parcels right to your doorstep across <strong>{BUSINESS_INFO.deliveryInfo.coverage}</strong>. Orders placed before 6 PM are bundled and shipped on the same day.
                </p>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                  * Minimum order of ₹200 applies for free delivery inside central Tekari town limit.
                </p>
              </div>

              <button
                onClick={() => setIsWhatsAppOrderOpen(true)}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shrink-0 transition shadow-sm"
              >
                Inquire Village Delivery Area
              </button>
            </section>

          </div>
        )}

        {/* SERVICES PAGE/VIEW */}
        {currentView === 'services' && (
          <div id="view-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
            
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <button onClick={() => setCurrentView('home')} className="hover:text-teal-500">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Services</span>
            </div>

            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Our Services</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">Dedicated Healthcare Services</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">We offer specialized pharmacy racks catering to every family and clinical requirement.</p>
            </div>

            {/* Grid of 10 complete services cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                        {srv.id.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{srv.title}</h3>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features list */}
                    {srv.features && (
                      <ul className="space-y-1.5 text-[11px] text-gray-500 dark:text-gray-400 pl-1">
                        {srv.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-teal-500 mr-2 shrink-0">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-5 border-t border-gray-50 dark:border-slate-800/80 mt-6 flex items-center justify-between">
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                    >
                      Inquire Rates
                    </a>
                    
                    <button
                      onClick={() => triggerMedicineInquiry(srv.title)}
                      className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
                    >
                      Inquire on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Consultation Banner */}
            <div className="glass-card bg-amber-50/15 dark:bg-amber-950/20 border border-amber-500/20 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">Need Guidance on Medicine Dosage?</h4>
                <p className="text-xs text-amber-700/90 dark:text-amber-400">Our pharmacist Nitish Kumar is a registered chemical consultant available for dosage clarifications.</p>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 transition"
              >
                Call Pharmacist
              </a>
            </div>

          </div>
        )}

        {/* GALLERY PAGE/VIEW */}
        {currentView === 'gallery' && (
          <div id="view-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
            
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <button onClick={() => setCurrentView('home')} className="hover:text-teal-500">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Gallery</span>
            </div>

            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Masonry Gallery</span>
              <h2 className="text-3xl font-extrabold text-gray-950 dark:text-white">Store Photos & Products Racks</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Take an aesthetic visual tour of our high-quality clinical supplies and shop layout.</p>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'store', label: 'Store Front' },
                { id: 'medicines', label: 'Medicine Shelves' },
                { id: 'equipment', label: 'Medical Devices' },
                { id: 'products', label: 'Products & Baby-care' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setGalleryFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    galleryFilter === tab.id
                      ? 'bg-teal-600 text-white'
                      : 'glass-card text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-slate-900/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Responsive Masonry Grid with popup triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item.imageUrl, index)}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs bg-white/90 text-slate-950 px-3 py-1.5 rounded-full font-bold shadow">Zoom Image</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest block">{item.category}</span>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* CONTACT PAGE/VIEW */}
        {currentView === 'contact' && (
          <div id="view-contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
            
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <button onClick={() => setCurrentView('home')} className="hover:text-teal-500">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Contact Us</span>
            </div>

            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Reach Us</span>
              <h2 className="text-3xl font-extrabold text-gray-950 dark:text-white">Store Address & Quick Inquiry</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Have generic queries or bulk supply requirements? Send us a mail or visit counter.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
              
              {/* Contact Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card p-6 rounded-2xl space-y-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">Nitish Medical Store Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3.5 text-sm">
                      <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Physical Location Address:</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{BUSINESS_INFO.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 text-sm">
                      <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Primary Phone Hotline:</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:underline text-teal-600 dark:text-teal-400 font-bold">{BUSINESS_INFO.phoneFormatted}</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 text-sm">
                      <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Counter Operating Hours:</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Mon - Sat: {BUSINESS_INFO.hours.weekdays}</p>
                        <p className="text-xs text-teal-500">Sunday: {BUSINESS_INFO.hours.sunday}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 text-sm">
                      <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Email Address:</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{BUSINESS_INFO.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live emergency alert */}
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-900/30 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-red-800 dark:text-red-300 flex items-center text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                    24/7 Late-Night Medical Emergencies
                  </h4>
                  <p className="text-xs text-red-700/90 dark:text-red-400 leading-relaxed">
                    If you require essential clinical injections or emergency breathing oxygen supplies outside standard hours, call us directly on <strong>8409052410</strong>.
                  </p>
                </div>
              </div>

              {/* Contact Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="glass-card p-6 sm:p-8 rounded-2xl">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3 mb-6">Send an Online Inquiry</h3>
                  
                  {contactSubmitted ? (
                    <div className="p-6 bg-green-50 dark:bg-green-950/40 border border-green-200/50 dark:border-green-900/30 rounded-xl text-center space-y-2">
                      <span className="text-2xl">✓</span>
                      <h4 className="font-bold text-green-800 dark:text-green-300 text-sm">Inquiry Sent Successfully!</h4>
                      <p className="text-xs text-green-700/90 dark:text-green-400">Thank you for writing to Nitish Medical. We will review your message and reply via phone/email shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="E.g., Amit Kumar"
                          className="w-full px-3.5 py-2.5 glass-input rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={contactData.phone}
                            onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="10-digit mobile number"
                            className="w-full px-3.5 py-2.5 glass-input rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email Address (Optional)</label>
                          <input
                            type="email"
                            value={contactData.email}
                            onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="yourname@gmail.com"
                            className="w-full px-3.5 py-2.5 glass-input rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Your Message or Query *</label>
                        <textarea
                          required
                          rows={4}
                          value={contactData.message}
                          onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Write your medicine requirements, health parameter query, or store question..."
                          className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg flex items-center justify-center space-x-1.5 shadow-md transition"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

            {/* Maps section on Contact Page too */}
            <section className="h-96 rounded-3xl overflow-hidden border border-gray-150 dark:border-slate-800">
              <iframe
                src={BUSINESS_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nitish Medical Contact Map"
              />
            </section>

          </div>
        )}
      </main>

      {/* MODAL / OVERLAY LIGHTBOXES */}
      
      {/* 1. HEALTH TIP EXPANDED DETAIL MODAL */}
      {activeHealthTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm" onClick={() => setActiveHealthTipId(null)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 z-10">
            <div className="h-52 overflow-hidden relative">
              <img src={activeHealthTip.imageUrl} alt={activeHealthTip.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActiveHealthTipId(null)}
                className="absolute top-3 right-3 p-1.5 bg-slate-950/60 hover:bg-slate-950/80 rounded-full text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider block">{activeHealthTip.category}</span>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">{activeHealthTip.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                {activeHealthTip.summary}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {activeHealthTip.content}
              </p>
              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-gray-400">
                <span>By Pharmacist Nitish Kumar</span>
                <span>{activeHealthTip.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MEDICINE INQUIRY MODAL */}
      {activeMedicineInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm" onClick={() => setActiveMedicineInquiry(null)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-150/40 dark:border-slate-800 animate-in zoom-in-95 duration-200 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-850 pb-3">
              <div className="flex items-center space-x-2 text-teal-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Medicine Stock Check</h4>
              </div>
              <button onClick={() => setActiveMedicineInquiry(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">You searched for:</p>
              <p className="text-base font-extrabold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-100/40">
                💊 {activeMedicineInquiry}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center pt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-ping" />
                Commonly kept in stock at Nitish Medical
              </p>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              We catalog Dolo 650, standard anti-allergens, cold syrups, diabetic monitoring devices, and cardiac pills constantly. Tap below to format a WhatsApp chat and verify absolute stock availability instantly.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => setActiveMedicineInquiry(null)}
                className="py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold text-center hover:bg-gray-50 dark:border-slate-800 dark:text-gray-300"
              >
                Cancel
              </button>
              <a
                href={getInquiryWhatsAppUrl(activeMedicineInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs text-center flex items-center justify-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Check via WA</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. MASONRY GALLERY LIGHTBOX ACCORDION POPUP */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95">
          <div className="fixed inset-0 cursor-zoom-out" onClick={() => setActiveLightboxImage(null)} />
          
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={() => handleLightboxNav('prev')}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10 font-bold"
            aria-label="Previous Image"
          >
            ‹
          </button>

          <div className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center justify-center z-10 select-none">
            <img
              src={activeLightboxImage}
              alt="Lightbox Zoom"
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
            />
            <div className="mt-4 text-center text-white space-y-1 bg-black/60 p-4 rounded-xl max-w-md">
              <h4 className="font-bold text-sm">{filteredGallery[lightboxIndex]?.title}</h4>
              <p className="text-xs text-slate-300">{filteredGallery[lightboxIndex]?.description}</p>
            </div>
          </div>

          <button
            onClick={() => handleLightboxNav('next')}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10 font-bold"
            aria-label="Next Image"
          >
            ›
          </button>
        </div>
      )}

      {/* WhatsApp Ordering Modal Form */}
      <WhatsAppOrderModal
        isOpen={isWhatsAppOrderOpen}
        onClose={() => setIsWhatsAppOrderOpen(false)}
      />

      {/* FLOATING ACTION INTERACTIVE BUBBLES */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30" id="floating-actions">
        {/* Floating Call Bubble */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="p-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:-translate-y-0.5 transition flex items-center justify-center"
          aria-label="Call Store"
          id="floating-call"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Floating WhatsApp Bubble */}
        <button
          onClick={() => setIsWhatsAppOrderOpen(true)}
          className="p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:-translate-y-0.5 transition flex items-center justify-center relative group"
          aria-label="WhatsApp Order Form"
          id="floating-whatsapp"
        >
          <MessageSquare className="w-5 h-5 fill-white/10" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap hidden sm:block">
            Order Medicines on WhatsApp
          </span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </button>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2.5 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-full border border-gray-150 dark:border-slate-800 shadow transition flex items-center justify-center"
          aria-label="Back to Top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenWhatsAppOrder={() => setIsWhatsAppOrderOpen(true)}
      />
    </div>
  );
}
