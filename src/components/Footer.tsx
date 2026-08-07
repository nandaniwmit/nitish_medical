import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck, ChevronRight, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenWhatsAppOrder: () => void;
}

export default function Footer({ setCurrentView, onOpenWhatsAppOrder }: FooterProps) {
  const handleNavClick = (view: string) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950/70 backdrop-blur-xl border-t border-white/10 text-slate-300 pt-16 pb-8 shadow-2xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">
                +
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your most trusted local pharmacy in Tekari, Bihar. Committed to dispensing 100% genuine pharmaceutical drugs, baby products, and health monitors at affordable prices.
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenWhatsAppOrder}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Order on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 border-l-2 border-teal-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Business Story' },
                { id: 'services', label: 'Our Services' },
                { id: 'gallery', label: 'Masonry Gallery' },
                { id: 'testimonials', label: 'What Customers Say' },
                { id: 'faq', label: 'Common FAQs' },
                { id: 'contact', label: 'Store Location' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center text-slate-400 hover:text-teal-400 transition-colors duration-150 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1.5 text-slate-600 group-hover:text-teal-400 transition-transform duration-200 group-hover:translate-x-1" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 border-l-2 border-teal-500 pl-2.5">
              Healthcare Racks
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2.5" />
                  <span>{srv.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Operating Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 border-l-2 border-teal-500 pl-2.5">
              Find Us & Hours
            </h4>
            
            <div className="flex items-start space-x-2.5 text-sm">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Khachiya Road, Tekari</p>
                <p className="text-xs text-slate-500 mt-0.5">Gaya Dist, Bihar 824236</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 text-sm">
              <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Mon - Sat: {BUSINESS_INFO.hours.weekdays}</p>
                <p className="text-xs text-teal-500">Sun: {BUSINESS_INFO.hours.sunday}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs bg-slate-800/60 border border-slate-700/50 p-2.5 rounded-lg text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BUSINESS_INFO.hours.emergency}</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Meta / Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} <strong>{BUSINESS_INFO.name}</strong>. All rights reserved. <a href="#" className="wmit-popup-trigger hover:text-white underline transition-colors" target="_blank" rel="noopener noreferrer">Developed by WMIT</a>
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-400">
            <button onClick={() => alert("Privacy Policy:\nYour health and order data uploaded to Nitish Medical via our secure online system is fully private. We never share prescription information or contact details with any third parties.")} className="hover:text-teal-400">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => alert("Terms & Conditions:\nAll medicine sales require legal physical prescription where applicable. Home deliveries are subjected to delivery availability.")} className="hover:text-teal-400">Terms & Conditions</button>
            <span>•</span>
            <button onClick={() => alert("Disclaimer:\nThe contents of this website (health tips, medicines reference) are purely for awareness. Consultation with a registered physician is always advised for serious illnesses.")} className="hover:text-teal-400">Medical Disclaimer</button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-teal-500 hover:text-white text-slate-400 transition"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
