import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Globe, Menu, ShoppingBag, X } from 'lucide-react';
import { PageId } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t, toggleLang, isRtl } = useLanguage();
  const { itemCount, openCart } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'menu', label: t.nav.menu },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const isNavActive = (id: PageId) => {
    if (id === 'menu' && currentPage === 'dish') return true;
    return currentPage === id;
  };

  const handleLinkClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || currentPage !== 'home'
            ? 'border-b border-[#F5EFE6]/10 bg-[#121110]/90 backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-[#121110]/85 via-[#121110]/40 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:gap-8 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="font-display text-xl font-semibold tracking-wide text-[#F5EFE6] whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#C8A15A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] sm:text-2xl"
          >
            {t.brand}
          </button>

          {/* Zone 2: Desktop Single-line Nav Links with animated underline */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {navItems.map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] ${
                    active
                      ? 'text-[#F5EFE6]'
                      : 'text-[#B8AFA3] hover:text-[#F5EFE6]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="novaActiveNavIndicator"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#D95D24]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Language Switch */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.nav.langSwitch}
              className="hidden items-center gap-1.5 rounded-lg border border-[#F5EFE6]/15 px-3 py-2 text-xs font-medium text-[#F5EFE6]/90 whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:border-[#C8A15A]/60 hover:text-[#C8A15A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] sm:inline-flex"
            >
              <Globe className="h-3.5 w-3.5 text-[#C8A15A]" />
              <span>{t.nav.langSwitch}</span>
            </button>

            <motion.button
              type="button"
              onClick={openCart}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              className="relative inline-flex items-center gap-2 rounded-lg bg-[#D95D24] px-3.5 py-2 text-xs font-medium text-[#F5EFE6] whitespace-nowrap shrink-0 cursor-pointer shadow-[0_4px_18px_-4px_rgba(217,93,36,0.6)] transition-colors hover:bg-[#EA6B2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] sm:px-4 sm:text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={itemCount}
                  initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#121110]/35 px-1.5 text-xs font-semibold tabular-nums text-[#F5EFE6]"
                >
                  {itemCount}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#F5EFE6]/15 text-[#F5EFE6] cursor-pointer transition-colors hover:border-[#C8A15A] md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Creative Mobile Slide-Out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#121110]/85 backdrop-blur-md md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`fixed inset-y-0 ${
                isRtl ? 'left-0 border-r' : 'right-0 border-l'
              } flex w-72 max-w-[82vw] flex-col justify-between border-[#F5EFE6]/10 bg-[#181614] px-6 pb-8 pt-24`}
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, idx) => {
                  const active = isNavActive(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: isRtl ? -16 : 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.28 }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#D95D24]/15 text-[#F5EFE6] border border-[#D95D24]/40'
                          : 'text-[#B8AFA3] hover:bg-white/5 hover:text-[#F5EFE6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-[#D95D24]" />}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="space-y-4 border-t border-[#F5EFE6]/10 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    toggleLang();
                    setMobileOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#C8A15A]/40 bg-[#1F1C19] px-4 py-3 text-sm font-medium text-[#F5EFE6] cursor-pointer transition-colors hover:border-[#C8A15A]"
                >
                  <Globe className="h-4 w-4 text-[#C8A15A]" />
                  <span>{t.nav.langSwitch}</span>
                </button>
                <p className="text-center text-xs text-[#B8AFA3]">{t.footer.hours}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
