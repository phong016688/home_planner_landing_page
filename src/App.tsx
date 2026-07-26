import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Star, 
  CheckCircle2, 
  Check, 
  ChevronDown, 
  Globe, 
  Home as HomeIcon,
  History as HistoryIcon,
  Heart,
  Settings,
  ArrowLeft, 
  ArrowRight,
  Zap,
  Layers,
  Download,
  QrCode,
  BookOpen
} from 'lucide-react';
import { privacyPolicy } from './content/privacyPolicy';
import { translations, type Language, SUPPORTED_LANGUAGES, detectUserLanguage } from './content/i18n';
import { ArticlesIndexView, ArticleDetailView } from './pages/ArticlesPage';
import { ARTICLES } from './content/articles';
import { cn } from './lib/utils';

// --- App Store & Google Play SVG Icons ---
const AppleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-14 69.5-34.3z"/>
  </svg>
);

const PlayStoreIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 65.7 65.7 65.7 59.2-34.1c16.2-9.3 26.5-26.6 26.5-46.6s-10.3-37.3-26.8-46.6zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/>
  </svg>
);

// --- Logo Component ---
const Logo = ({ className = "w-9 h-9" }: { className?: string }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("overflow-hidden rounded-2xl shadow-sm bg-stone-900 flex items-center justify-center shrink-0 border border-stone-200", className)}>
      {!hasError ? (
        <img 
          src="/ic_logo_home_planner.png" 
          alt="Home Planner AI Logo" 
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="text-amber-400 flex items-center justify-center w-full h-full">
          <Sparkles className="w-1/2 h-1/2" />
        </div>
      )}
    </div>
  );
};

// --- Navbar Component ---
const Navbar = ({ lang, setLang, onOpenDownload }: { lang: Language; setLang: (l: Language) => void; onOpenDownload: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang].nav;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-xs">
      <div className="landing-container">
        <div className="flex justify-between h-16 md:h-[72px] items-center">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-9 h-9" />
            <span className="font-extrabold text-lg tracking-tight text-stone-900">Home Planner AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link to="/" className={cn("text-xs font-bold transition-all hover:text-blue-600", location.pathname === '/' ? "text-stone-900" : "text-stone-500")}>
              {t.home}
            </Link>
            <a href="/#features" className="text-xs font-bold text-stone-500 hover:text-blue-600 transition-colors">{t.features}</a>
            <a href="/#room-types" className="text-xs font-bold text-stone-500 hover:text-blue-600 transition-colors">{t.roomTypes}</a>
            <a href="/#pet-zone" className="text-xs font-bold text-stone-500 hover:text-blue-600 transition-colors">{t.petZone}</a>
            <a href="/#faq" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">{t.faq}</a>
            <Link to="/articles" className={cn("text-xs font-bold transition-all hover:text-blue-600", location.pathname.startsWith('/articles') ? "text-stone-900 font-extrabold" : "text-stone-500")}>
              {t.articles}
            </Link>
            <Link to="/help" className={cn("text-xs font-bold transition-all hover:text-blue-600", location.pathname === '/help' ? "text-stone-900" : "text-stone-500")}>
              {t.help}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="pl-8 pr-6 py-1.5 bg-stone-100 border border-stone-200 rounded-full text-xs font-bold text-stone-800 hover:bg-stone-200 transition-colors appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {SUPPORTED_LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 pointer-events-none" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              {t.download}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <div className="relative flex items-center">
              <Globe className="w-3 h-3 text-stone-500 absolute left-2 pointer-events-none" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="pl-6 pr-5 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-bold text-stone-800 appearance-none cursor-pointer outline-none"
              >
                {SUPPORTED_LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.code.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400 absolute right-1.5 pointer-events-none" />
            </div>
            <button className="p-2 text-stone-900" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden px-4 py-3 space-y-2"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.home}</Link>
            <a href="/#features" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.features}</a>
            <a href="/#room-types" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.roomTypes}</a>
            <a href="/#pet-zone" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.petZone}</a>
            <a href="/#faq" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-bold text-blue-600">{t.faq}</a>
            <Link to="/articles" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.articles}</Link>
            <Link to="/help" onClick={() => setIsOpen(false)} className="block px-2.5 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900">{t.help}</Link>
            <button onClick={() => { setIsOpen(false); onOpenDownload(); }} className="w-full text-center py-2.5 mt-2 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {t.download}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Footer Component ---
const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 text-xs border-t border-stone-800">
      <div className="landing-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <Logo className="w-7 h-7 rounded-xl border-stone-700" />
              <span className="font-bold text-base tracking-tight text-white">Home Planner AI</span>
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs">{t.desc}</p>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-stone-200 mb-3">{t.product}</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#room-types" className="hover:text-white transition-colors">Room Types</a></li>
              <li><a href="/#pet-zone" className="hover:text-white transition-colors">Pet Zone</a></li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Articles & Guides</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-stone-200 mb-3">{t.legal}</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t.privacy}</Link></li>
              <li><a href="mailto:personpick11@gmail.com" className="hover:text-white transition-colors">Support Email</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-stone-200 mb-3">{t.support}</h4>
            <p className="text-xs text-stone-400 mb-2">Email: personpick11@gmail.com</p>
            <p className="text-xs text-stone-500">Available Mon - Fri (9:00 - 18:00)</p>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Home Planner AI. {t.rights}</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-stone-300">{t.privacy}</Link>
            <Link to="/help" className="hover:text-stone-300">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Interactive Mobile Phone Mockup Component ---
const MobilePhoneMockup = ({ lang, activeTab, setActiveTab }: { lang: Language; activeTab: string; setActiveTab: (t: string) => void }) => {
  const _t = translations[lang] || translations.vi;
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [selectedPet, setSelectedPet] = useState('cat');

  return (
    <div className="relative mx-auto w-full max-w-[340px] rounded-[40px] bg-black p-3.5 shadow-2xl ring-1 ring-stone-900/10">
      {/* Phone Notch / Dynamic Island */}
      <div className="relative overflow-hidden rounded-[32px] bg-white aspect-[9/19.5] text-stone-900 flex flex-col justify-between select-none">
        
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-2 flex justify-between items-center text-xs font-bold text-stone-900 bg-white border-b border-stone-100">
          <span>23:36</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2.5 border border-stone-800 rounded-xs relative p-0.5 flex items-center">
              <div className="w-full h-full bg-stone-900 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Screen Content - Dynamic based on activeTab */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 custom-scrollbar bg-stone-50/50 space-y-3.5">
          {activeTab === 'home' && (
            <>
              {/* Header Title + PRO */}
              <div className="flex justify-between items-start pt-1">
                <div>
                  <h3 className="font-extrabold text-base leading-tight text-stone-900">Design Your Dream Home</h3>
                  <p className="text-[10px] text-stone-500 mt-0.5">Your AI partner in turning ideas into interiors</p>
                </div>
                <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                  <CrownIcon className="w-2.5 h-2.5" /> PRO
                </span>
              </div>

              {/* Main Banner Card (Interior For Your Room) */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-800 text-white p-3 shadow-md aspect-[16/10] flex flex-col justify-between group">
                <img src="/hero_room_redesign.jpg" alt="Interior Redesign" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="relative z-10">
                  <span className="font-extrabold text-xs tracking-tight text-white block drop-shadow-xs">Interior For Your Room</span>
                  <p className="text-[10px] text-stone-200 mt-0.5 opacity-90">Redesign Any Room In Seconds!</p>
                </div>
                <div className="relative z-10 self-end">
                  <button className="bg-blue-600 text-white px-3 py-1.5 rounded-xl font-bold text-[10px] flex items-center gap-1 shadow-md hover:bg-blue-700 transition-colors">
                    <Sparkles className="w-3 h-3 fill-current" /> Create Now
                  </button>
                </div>
              </div>

              {/* Explore AI tools Header */}
              <h4 className="font-extrabold text-xs text-stone-900 pt-1">Explore AI tools</h4>

              {/* Tool Card 1: Exterior Design */}
              <div className="bg-white rounded-2xl p-2.5 border border-stone-100 shadow-xs space-y-2">
                <div className="rounded-xl overflow-hidden aspect-[16/9]">
                  <img src="/exterior_facade.jpg" alt="Exterior Design" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Exterior Design</h5>
                    <p className="text-[9px] text-stone-500 max-w-[170px] leading-tight">Refresh old facades with paint, decor, lighting & landscaping.</p>
                  </div>
                  <button onClick={() => setActiveTab('exterior')} className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-xl shadow-xs">Start</button>
                </div>
              </div>

              {/* Tool Card 2: Pet Zone Design */}
              <div className="bg-white rounded-2xl p-2.5 border border-stone-100 shadow-xs space-y-2">
                <div className="rounded-xl overflow-hidden aspect-[16/9]">
                  <img src="/pet_zone_design.jpg" alt="Pet Zone Design" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Pet Zone Design</h5>
                    <p className="text-[9px] text-stone-500 max-w-[170px] leading-tight">Design cozy climbing shelves and pet lounge spots.</p>
                  </div>
                  <button onClick={() => setActiveTab('pet')} className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-xl shadow-xs">Start</button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'roomTypes' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                <button onClick={() => setActiveTab('home')} className="flex items-center gap-1 text-stone-800 text-xs font-bold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Room Type
                </button>
                <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-200 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-current" /> 3
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'living', title: 'Living Room', img: '/hero_room_redesign.jpg' },
                  { id: 'kitchen', title: 'Kitchen', img: '/hero_room_redesign.jpg' },
                  { id: 'bedroom', title: 'Bedroom', img: '/hero_room_redesign.jpg' },
                  { id: 'bathroom', title: 'Bathroom', img: '/hero_room_redesign.jpg' },
                  { id: 'dining', title: 'Dining Room', img: '/hero_room_redesign.jpg' },
                  { id: 'office', title: 'Home Office', img: '/hero_room_redesign.jpg' },
                ].map((room) => {
                  const isChecked = selectedRoom === room.id;
                  return (
                    <div 
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={cn(
                        "rounded-xl border p-1.5 bg-white cursor-pointer transition-all flex flex-col justify-between",
                        isChecked ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-stone-200 hover:border-stone-300"
                      )}
                    >
                      <div className="rounded-lg overflow-hidden aspect-[4/3] mb-1.5">
                        <img src={room.img} alt={room.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <span className={cn("text-[10px] font-bold", isChecked ? "text-blue-600" : "text-stone-900")}>
                          {room.title}
                        </span>
                        {isChecked && (
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-colors">
                Next
              </button>
            </div>
          )}

          {activeTab === 'pet' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                <button onClick={() => setActiveTab('home')} className="flex items-center gap-1 text-stone-800 text-xs font-bold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Pet Type
                </button>
                <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-200 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-current" /> 3
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'cat', title: 'Cat', img: '/pet_zone_design.jpg' },
                  { id: 'dog', title: 'Dog', img: '/pet_zone_design.jpg' },
                  { id: 'rabbit', title: 'Rabbit', img: '/pet_zone_design.jpg' },
                  { id: 'guinea', title: 'Guinea Pig', img: '/pet_zone_design.jpg' },
                  { id: 'hamster', title: 'Hamster', img: '/pet_zone_design.jpg' },
                  { id: 'ferret', title: 'Ferret', img: '/pet_zone_design.jpg' },
                ].map((pet) => {
                  const isChecked = selectedPet === pet.id;
                  return (
                    <div 
                      key={pet.id}
                      onClick={() => setSelectedPet(pet.id)}
                      className={cn(
                        "rounded-xl border p-1.5 bg-white cursor-pointer transition-all flex flex-col justify-between",
                        isChecked ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-stone-200 hover:border-stone-300"
                      )}
                    >
                      <div className="rounded-lg overflow-hidden aspect-[4/3] mb-1.5">
                        <img src={pet.img} alt={pet.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <span className={cn("text-[10px] font-bold", isChecked ? "text-blue-600" : "text-stone-900")}>
                          {pet.title}
                        </span>
                        {isChecked && (
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-colors">
                Next
              </button>
            </div>
          )}

          {activeTab === 'exterior' && (
            <div className="space-y-3">
              <div className="flex items-center gap-1 border-b border-stone-100 pb-2">
                <button onClick={() => setActiveTab('home')} className="flex items-center gap-1 text-stone-800 text-xs font-bold">
                  <ArrowLeft className="w-3.5 h-3.5" /> Exterior Design
                </button>
              </div>

              <div className="bg-white rounded-2xl p-2.5 border border-stone-100 shadow-xs space-y-2">
                <div className="rounded-xl overflow-hidden aspect-[16/10]">
                  <img src="/exterior_facade.jpg" alt="Exterior" className="w-full h-full object-cover" />
                </div>
                <h5 className="font-extrabold text-xs text-stone-900">Facade & Landscaping Makeover</h5>
                <p className="text-[10px] text-stone-500 leading-relaxed">AI automatically updates wall paint, entrance doors, window flower boxes, and stone walkways.</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-bold shadow-md">
                Generate Facade
              </button>
            </div>
          )}
        </div>

        {/* Bottom App Navigation Bar */}
        <div className="bg-white border-t border-stone-100 px-3 py-2 grid grid-cols-4 gap-1 text-center">
          <button 
            onClick={() => setActiveTab('home')} 
            className={cn("flex flex-col items-center gap-0.5 text-[9px] font-bold", activeTab === 'home' ? "text-blue-600" : "text-stone-400 hover:text-stone-600")}
          >
            <HomeIcon className="w-4 h-4" /> Home
          </button>
          <button 
            onClick={() => setActiveTab('roomTypes')} 
            className={cn("flex flex-col items-center gap-0.5 text-[9px] font-bold", activeTab === 'roomTypes' ? "text-blue-600" : "text-stone-400 hover:text-stone-600")}
          >
            <HistoryIcon className="w-4 h-4" /> History
          </button>
          <button 
            onClick={() => setActiveTab('pet')} 
            className={cn("flex flex-col items-center gap-0.5 text-[9px] font-bold", activeTab === 'pet' ? "text-blue-600" : "text-stone-400 hover:text-stone-600")}
          >
            <Heart className="w-4 h-4" /> Favorite
          </button>
          <button 
            onClick={() => setActiveTab('exterior')} 
            className={cn("flex flex-col items-center gap-0.5 text-[9px] font-bold", activeTab === 'exterior' ? "text-blue-600" : "text-stone-400 hover:text-stone-600")}
          >
            <Settings className="w-4 h-4" /> Setting
          </button>
        </div>

      </div>
    </div>
  );
};

const CrownIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
  </svg>
);

// --- Download QR Code Modal ---
const QRModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Language }) => {
  const t = translations[lang].hero;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
          <X size={20} />
        </button>

        <Logo className="w-12 h-12 mx-auto" />
        <h3 className="text-lg font-black text-stone-900">{t.qrTitle}</h3>
        <p className="text-xs text-stone-500">{t.qrSubtitle}</p>

        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex justify-center">
          <div className="w-40 h-40 bg-white border border-stone-200 rounded-xl p-2 flex flex-col items-center justify-center space-y-1 shadow-inner">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fhome-planner-ai%2Fid6751722422" 
              alt="Home Planner AI QR Code" 
              className="w-28 h-28 object-contain"
            />
            <span className="text-[9px] font-extrabold tracking-widest text-stone-500">HOME PLANNER AI</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a href="https://apps.apple.com/us/app/home-planner-ai/id6751722422" target="_blank" rel="noreferrer" className="w-1/2 py-2.5 rounded-xl bg-black text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors">
            <AppleIcon className="w-4 h-4" /> App Store
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.mentos_koder.homedecorai" target="_blank" rel="noreferrer" className="w-1/2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <PlayStoreIcon className="w-4 h-4" /> Google Play
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Landing Page ---
const LandingPage = ({ lang, onOpenDownload }: { lang: Language; onOpenDownload: () => void }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('home');
  const heroVisuals: Record<string, { src: string; alt: string }> = {
    home: { src: '/assets/landing/home-hero-v2.webp', alt: 'Before and after living room redesign inspiration' },
    exterior: { src: '/assets/landing/home-exterior-v2.webp', alt: 'Before and after exterior facade refresh' },
    pet: { src: '/assets/landing/home-pet-zone-v2.webp', alt: 'Integrated pet-friendly living room design' },
    roomTypes: { src: '/assets/landing/home-furniture-v2.webp', alt: 'Furniture planning in a real living room' },
  };
  const activeHeroVisual = heroVisuals[activeTab] ?? heroVisuals.home;
  const homeReviews = [
    { quote: 'I could compare two room directions before buying anything. The decision felt much easier.', name: 'Maya R.' },
    { quote: 'The exterior preview helped our family agree on materials before speaking with a contractor.', name: 'Daniel K.' },
    { quote: 'Pet Zone gave us ideas that work for our cat without making the room feel like a playroom.', name: 'Sofia L.' },
  ];

  return (
    <div className="pt-16 md:pt-[72px] bg-gradient-to-b from-stone-50/50 via-white to-stone-50/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="landing-container relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-[11px] font-extrabold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-200 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> {t.hero.badge}
              </span>
              <h1 className="hero-title font-black tracking-tight mb-5 text-stone-900">
                {t.hero.titleStart} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600">
                  {t.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 mb-8 leading-relaxed max-w-lg">
                {t.hero.subtitle}
              </p>

              {/* App Store & Google Play Badges */}
              <div className="p-4 bg-white rounded-3xl border border-stone-200/80 shadow-md max-w-lg space-y-3">
                <div className="flex flex-row items-stretch gap-3">
                  <a 
                    href="https://apps.apple.com/us/app/home-planner-ai/id6751722422" 
                    target="_blank" rel="noreferrer"
                    className="w-1/2 min-w-0 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-2xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition-all shadow-sm active:scale-95"
                  >
                    <AppleIcon className="w-5 h-5 shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-wider opacity-70 leading-none mb-0.5">{t.hero.iosLabel}</div>
                      <div className="text-xs sm:text-sm font-extrabold leading-none">{t.hero.iosTitle}</div>
                    </div>
                  </a>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.mentos_koder.homedecorai" 
                    target="_blank" rel="noreferrer"
                    className="w-1/2 min-w-0 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                  >
                    <PlayStoreIcon className="w-5 h-5 shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] uppercase tracking-wider opacity-90 leading-none mb-0.5">{t.hero.androidLabel}</div>
                      <div className="text-xs sm:text-sm font-extrabold leading-none">{t.hero.androidTitle}</div>
                    </div>
                  </a>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-stone-500 px-1 border-t border-stone-100">
                  <span className="flex items-center gap-1 font-medium"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Download</span>
                  <button onClick={onOpenDownload} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" /> Scan QR Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-7"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_90px_rgba(73,63,48,0.18)]">
                <img
                  src={activeHeroVisual.src}
                  alt={activeHeroVisual.alt}
                  className="h-full w-full object-cover"
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600">AI preview</p>
                    <p className="mt-1 text-sm font-extrabold text-stone-900">{activeTab === 'exterior' ? t.features.f2.title : activeTab === 'pet' ? t.features.f5.title : t.features.f1.title}</p>
                  </div>
                  <button onClick={onOpenDownload} className="min-h-11 rounded-full bg-blue-600 px-4 text-xs font-extrabold text-white hover:bg-blue-700">
                    {t.nav.download}
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Top Feature Visual Showcase & App Download Highlights */}
          <div className="mt-14 pt-8 border-t border-stone-200/70">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Feature Showcase • Ảnh Tính Năng Nổi Bật
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">Khám Phá Tính Năng Trọng Tâm Của App</h3>
              </div>
              <button 
                onClick={onOpenDownload}
                className="px-5 py-2.5 rounded-2xl bg-stone-900 text-white font-extrabold text-xs shadow-md hover:bg-stone-800 transition-all flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Download className="w-4 h-4 text-blue-400" /> Tải App Ngay
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => setActiveTab('home')} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2.5 relative">
                  <img src="/assets/landing/home-hero-v2.webp" alt="Interior Redesign" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs">AI INTERIOR</span>
                </div>
                <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-blue-600 transition-colors">Interior For Your Room</h4>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Đổi mới phong cách căn phòng trong 10 giây</p>
              </div>

              <div onClick={() => setActiveTab('exterior')} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2.5 relative">
                  <img src="/assets/landing/home-exterior-v2.webp" alt="Exterior Design" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" />
                  <span className="absolute top-2 left-2 bg-stone-900 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs">FACADE & PAINT</span>
                </div>
                <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-blue-600 transition-colors">Exterior Design</h4>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Thay màu sơn ngoại thất, đèn & cây cảnh</p>
              </div>

              <div onClick={() => setActiveTab('pet')} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2.5 relative">
                  <img src="/assets/landing/home-pet-zone-v2.webp" alt="Pet Zone Design" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" />
                  <span className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs">PET ZONE</span>
                </div>
                <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-blue-600 transition-colors">Pet Zone Design</h4>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Thiết kế góc nệm & kệ leo cho thú cưng</p>
              </div>

              <div onClick={() => setActiveTab('home')} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2.5 relative">
                  <img src="/assets/landing/home-furniture-v2.webp" alt="Replace Furniture & Real Dimensions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" />
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs">REPLACE & DIMENSIONS</span>
                </div>
                <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-blue-600 transition-colors">Replace & Dimensions</h4>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Thay đồ chính xác & ước tính kích thước</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="py-8 bg-stone-900 text-white border-y border-stone-800">
        <div className="landing-container text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-6">{t.socialProof.headline}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/50">
              <div className="flex justify-center text-amber-400 mb-1 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg font-black text-white">{t.socialProof.rating}</p>
            </div>
            <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/50">
              <div className="flex justify-center text-blue-400 mb-1">
                <Layers className="w-5 h-5" />
              </div>
              <p className="text-lg font-black text-white">{t.socialProof.generated}</p>
            </div>
            <div className="p-4 bg-stone-800/60 rounded-2xl border border-stone-700/50">
              <div className="flex justify-center text-emerald-400 mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-lg font-black text-white">{t.socialProof.accuracy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BEFORE/AFTER SLIDER SHOWCASE */}
      <section id="features" className="landing-section">
        <div className="landing-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-600 font-extrabold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {t.features.f1.tag}
            </span>
            <h2 className="landing-title font-black text-stone-900 mt-3 mb-3">{t.features.title}</h2>
            <p className="text-stone-500 text-sm leading-relaxed">{t.features.subtitle}</p>
          </div>

          {/* Interactive Before/After Room Redesign */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-4xl mx-auto aspect-[16/9] group">
            <img src="/assets/landing/home-hero-v2.webp" alt="Before and after room transformation" className="w-full h-full object-cover" width="1536" height="1024" loading="lazy" />
            
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row justify-between items-center bg-stone-900/80 backdrop-blur-md p-4 rounded-2xl text-white gap-3 border border-stone-700">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg">{t.features.f1.title}</h3>
                <p className="text-xs text-stone-300">{t.features.f1.desc}</p>
              </div>
              <button onClick={() => setActiveTab('roomTypes')} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md shrink-0">
                {t.features.f1.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE GRID (FROM SCREENSHOTS) */}
      <section className="landing-section bg-stone-100/70 border-y border-stone-200/60">
        <div className="landing-container">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Exterior Design */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {t.features.f2.tag}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900">{t.features.f2.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{t.features.f2.desc}</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-100 relative group">
                <img src="/assets/landing/home-exterior-v2.webp" alt="Exterior Design" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" loading="lazy" />
                <div className="absolute bottom-3 right-3">
                  <button onClick={() => setActiveTab('exterior')} className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">
                    {t.features.f2.btn}
                  </button>
                </div>
              </div>
            </div>

            {/* Replace Furniture */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {t.features.f3.tag}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900">{t.features.f3.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{t.features.f3.desc}</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-100 relative group">
                <img src="/assets/landing/home-furniture-v2.webp" alt="Replace Furniture" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" loading="lazy" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400 bg-cyan-500/20 px-6 py-2 rounded-xl backdrop-blur-xs text-white text-xs font-bold shadow-lg">
                  🛋️ Sofa Marked for Swap
                </div>
                <div className="absolute bottom-3 right-3">
                  <button onClick={() => setActiveTab('home')} className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">
                    {t.features.f3.btn}
                  </button>
                </div>
              </div>
            </div>

            {/* Real Dimensions */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {t.features.f4.tag}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900">{t.features.f4.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{t.features.f4.desc}</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-100 relative group">
                <img src="/assets/landing/home-furniture-v2.webp" alt="Real Dimensions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-t-2 border-dashed border-blue-400 w-3/4 flex justify-between items-center px-2 text-white font-black text-xs bg-stone-900/60 py-1 rounded-full backdrop-blur-xs">
                    <span>📏 1.6m</span>
                    <span>3.1m 📐</span>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <button onClick={() => setActiveTab('home')} className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">
                    {t.features.f4.btn}
                  </button>
                </div>
              </div>
            </div>

            {/* Pet Zone Design */}
            <div id="pet-zone" className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {t.features.f5.tag}
                </span>
                <h3 className="text-xl font-extrabold text-stone-900">{t.features.f5.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{t.features.f5.desc}</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-stone-100 relative group">
                <img src="/assets/landing/home-pet-zone-v2.webp" alt="Pet Zone Design" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width="1536" height="1024" loading="lazy" />
                <div className="absolute bottom-3 right-3">
                  <button onClick={() => setActiveTab('pet')} className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">
                    {t.features.f5.btn}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ROOM TYPES & PET TYPES SECTION */}
      <section id="room-types" className="landing-section">
        <div className="landing-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mb-3">{t.roomTypes.title}</h2>
            <p className="text-stone-500 text-sm leading-relaxed">{t.roomTypes.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.roomTypes.items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs text-center space-y-2 hover:border-blue-500 hover:shadow-md transition-all">
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-extrabold text-xs text-stone-900">{lang === 'vi' ? item.nameVi : item.name}</h4>
                <span className="text-[10px] text-stone-400 block">{item.energy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" className="landing-section bg-stone-900 text-white">
        <div className="landing-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-300">{t.nav.howItWorks}</p>
            <h2 className="landing-title mt-3 font-black">From your photo to a clearer design decision</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { number: '01', title: t.features.f1.title, description: t.features.f1.desc },
              { number: '02', title: t.roomTypes.title, description: t.roomTypes.subtitle },
              { number: '03', title: t.nav.download, description: t.hero.subtitle },
            ].map((step) => (
              <div key={step.number} className="border-t border-stone-700 pt-5">
                <p className="font-mono text-3xl font-black text-blue-400">{step.number}</p>
                <h3 className="mt-3 text-lg font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="landing-section bg-stone-100/70">
        <div className="landing-container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">{t.socialProof.headline}</p>
            <h2 className="landing-title mt-3 font-black text-stone-900">Plans feel easier when you can see the options</h2>
          </div>
          <div className="review-track">
            {homeReviews.map((review) => (
              <figure key={review.name} className="rounded-2xl border border-stone-200 bg-white p-6">
                <div className="mb-4 flex gap-1 text-amber-500">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="text-sm leading-relaxed text-stone-600">“{review.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-stone-100 pt-4 text-xs font-extrabold text-stone-900">{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ARTICLES PREVIEW SECTION */}
      <section id="articles" className="landing-section bg-white border-t border-stone-200/60">
        <div className="landing-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded-full">
                <BookOpen className="w-3.5 h-3.5" /> Cẩm Nang & Bài Viết
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 mt-2">Bài Viết & Hướng Dẫn Mới Nhất</h2>
            </div>
            <Link 
              to="/articles" 
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Xem Tất Cả Bài Viết <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((art) => (
              <article key={art.slug} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] text-stone-400 mb-1">{art.date} • {art.readTime}</div>
                    <h3 className="font-extrabold text-stone-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link to={`/articles/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">{art.excerpt}</p>
                  </div>
                  <Link to={`/articles/${art.slug}`} className="text-xs font-extrabold text-blue-600 flex items-center gap-1 pt-2">
                    Đọc Bài Viết &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="landing-section bg-stone-100/50 border-t border-stone-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-center text-stone-900 mb-10">{t.faq.title}</h2>
          <div className="space-y-4">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-2">
                <h3 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-black flex items-center justify-center shrink-0">Q</span>
                  {item.q}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-8">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section id="download" className="landing-section bg-blue-600 text-white">
        <div className="landing-container text-center">
          <h2 className="landing-title font-black">Preview the room before you commit to the change.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-100">{t.hero.subtitle}</p>
          <button onClick={onOpenDownload} className="mt-8 min-h-12 rounded-full bg-white px-7 text-sm font-extrabold text-blue-700 shadow-lg hover:bg-blue-50">
            {t.nav.download}
          </button>
        </div>
      </section>

    </div>
  );
};

// --- Privacy Policy View ---
const PrivacyPolicyView = ({ lang }: { lang: Language }) => {
  const _t = translations[lang] || translations.vi;
  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900 mb-2">{privacyPolicy.title}</h1>
          <p className="text-xs text-stone-400">Last updated: {privacyPolicy.lastUpdated}</p>
        </div>

        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 grid sm:grid-cols-2 gap-3 text-xs">
          {privacyPolicy.details.map((d, i) => (
            <div key={i}>
              <span className="text-stone-400 font-medium mr-1">{d.label}</span>
              {d.href ? (
                <a href={d.href} target={d.external ? "_blank" : "_self"} rel="noreferrer" className="font-bold text-blue-600 hover:underline">
                  {d.text}
                </a>
              ) : (
                <span className="font-bold text-stone-800">{d.text}</span>
              )}
            </div>
          ))}
        </div>

        {privacyPolicy.intro.map((block, i) => (
          <p key={i} className={cn("text-xs leading-relaxed text-stone-600", block.tone === 'lead' && "text-sm font-medium text-stone-800")}>
            {block.text}
          </p>
        ))}

        {privacyPolicy.sections.map((section, idx) => (
          <div key={idx} className="space-y-3 pt-4 border-t border-stone-100">
            <h2 className="text-base font-extrabold text-stone-900">{section.title}</h2>
            {section.blocks.map((b, bi) => {
              if (b.kind === 'paragraph') {
                return <p key={bi} className="text-xs text-stone-600 leading-relaxed">{b.text}</p>;
              }
              if (b.kind === 'list') {
                return (
                  <ul key={bi} className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
                    {b.items.map((it, ii) => <li key={ii}>{it}</li>)}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Help Center View ---
const HelpCenterView = ({ lang }: { lang: Language }) => {
  const t = translations[lang].help;

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm text-center space-y-6">
        <Logo className="w-16 h-16 mx-auto" />
        <h1 className="text-3xl font-black text-stone-900">{t.title}</h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">{t.subtitle}</p>

        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 max-w-md mx-auto space-y-3 text-left">
          <h3 className="font-extrabold text-sm text-stone-900">{t.contactTitle}</h3>
          <p className="text-xs text-stone-500">{t.contactDesc}</p>
          <a href={`mailto:${t.email}`} className="block w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm">
            📧 {t.email}
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Scroll To Top Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App Component ---
export default function App() {
  const [lang, setLang] = useState<Language>(detectUserLanguage);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('app_user_lang', newLang);
      document.documentElement.lang = newLang;
    } catch (e) {}
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-white">
        <Navbar lang={lang} setLang={handleSetLang} onOpenDownload={() => setIsQRModalOpen(true)} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage lang={lang} onOpenDownload={() => setIsQRModalOpen(true)} />} />
            <Route path="/articles" element={<ArticlesIndexView lang={lang} onOpenDownload={() => setIsQRModalOpen(true)} />} />
            <Route path="/articles/:slug" element={<ArticleDetailView lang={lang} onOpenDownload={() => setIsQRModalOpen(true)} />} />
            <Route path="/privacy" element={<PrivacyPolicyView lang={lang} />} />
            <Route path="/help" element={<HelpCenterView lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />

        <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} lang={lang} />
      </div>
    </Router>
  );
}
