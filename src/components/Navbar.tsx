import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NavLink = {
  label: string;
  to: string;
  submenu?: { label: string; to: string }[];
};

const NAV_LINKS: NavLink[] = [
  { label: 'Ремонт', to: '/remont' },
  { label: 'Купить / Продать', to: '/tradein' },
  { label: 'Аренда', to: '/arenda' },
  { label: 'О компании', to: '/company' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setIsOpen(false); setMobileExpanded(null); }, [location]);


  const openDrop = (to: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(to);
  };

  const closeDrop = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.nav
        style={{
          borderRadius: isOpen ? '1rem' : '9999px',
          background: 'rgba(50,50,54,0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-full max-w-7xl overflow-visible"
      >

        {/* Main row */}
        <div className="flex items-center justify-between px-6 py-4 gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <motion.img
              src="/logo-gs.webp"
              alt="Greatsteve"
              className="h-9 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.to ||
                (link.submenu?.some(s => location.pathname === s.to));
              const hasSubmenu = !!link.submenu;

              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    setHovered(link.to);
                    if (hasSubmenu) openDrop(link.to);
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = setTimeout(() => setHovered(null), 100);
                    if (hasSubmenu) closeDrop();
                  }}
                >
                  <Link
                    to={link.to}
                    className="relative flex items-center gap-1 px-4 py-2.5 text-base font-semibold transition-colors duration-200 rounded-full"
                    style={{ color: isActive || hovered === link.to ? '#fff' : 'rgba(255,255,255,0.7)' }}
                  >
                    {hovered === link.to && (
                      <motion.span
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute bottom-0.5 left-3 right-3 h-px rounded-full bg-white/70"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {hasSubmenu && (
                      <motion.span
                        className="relative z-10"
                        animate={{ rotate: openDropdown === link.to ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </motion.span>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasSubmenu && (
                    <AnimatePresence>
                      {openDropdown === link.to && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-2 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-w-[150px] shadow-2xl"
                          onMouseEnter={() => { if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current); }}
                          onMouseLeave={closeDrop}
                        >
                          {link.submenu!.map(sub => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              className="block px-5 py-3 text-base text-white/75 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop info & buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex flex-col text-right mr-2 justify-center">
              <span className="text-white/90 text-sm font-medium flex items-center gap-1.5 justify-end">
                <MapPin className="w-4 h-4 text-white/60" />
                Гоголя 75/1
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-wide pr-0.5">
                уг. ул.Тулебаева
              </span>
            </div>
            
            <div className="flex items-center gap-2">
            <motion.a
              href="https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-base font-medium"
              whileHover={{ scale: 1.05, backgroundColor: '#1EBE5A' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <WhatsAppIcon />
              WhatsApp
            </motion.a>
            <motion.a
              href="tel:+77775181111"
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full text-base font-medium"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Phone className="w-4 h-4" />
              8 777 518 11 11
            </motion.a>
            </div>
          </div>

          {/* Mobile burger */}
          <motion.button
            className="md:hidden text-white/70 p-1"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Меню"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                  >
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === link.to ? null : link.to)}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                            location.pathname === link.to || link.submenu.some(s => location.pathname === s.to)
                              ? 'bg-white/10 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.label}
                          <motion.span animate={{ rotate: mobileExpanded === link.to ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className="w-4 h-4 opacity-70" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.to && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.submenu.map(sub => (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                                    location.pathname === sub.to
                                      ? 'text-white'
                                      : 'text-white/50 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.to}
                        className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                          location.pathname === link.to
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  className="flex flex-col gap-3 pt-3 mt-2 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-2 text-white/70 text-sm py-1 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Гоголя 75/1 уг. ул.Тулебаева</span>
                  </div>
                  <a href="https://wa.me/77775181111?text=Здравствуйте%20пишу%20вам%20с%20сайта" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full text-sm font-medium">
                    <WhatsAppIcon /> WhatsApp
                  </a>
                  <a href="tel:+77775181111"
                    className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-full text-sm font-medium">
                    <Phone className="w-4 h-4" /> 8 777 518 11 11
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
