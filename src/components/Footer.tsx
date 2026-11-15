import React from 'react';
import { PageId } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, toggleLang } = useLanguage();

  return (
    <footer className="border-t border-[#F5EFE6]/10 bg-[#0E0D0C] text-[#B8AFA3]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-2xl font-semibold text-[#F5EFE6] cursor-pointer hover:text-[#C8A15A]"
            >
              {t.brand}
            </button>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#B8AFA3]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C8A15A]">
              {t.footer.explore}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(['home', 'menu', 'about', 'contact'] as const).map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(page)}
                    className="cursor-pointer transition-colors hover:text-[#F5EFE6]"
                  >
                    {t.nav[page]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C8A15A]">
              {t.footer.visit}
            </h3>
            <p className="mt-4 text-sm text-[#F5EFE6]">{t.contact.addressLine1}</p>
            <p className="mt-1.5 text-sm text-[#B8AFA3]">{t.footer.hours}</p>
            <button
              type="button"
              onClick={toggleLang}
              className="mt-4 inline-block text-xs font-medium text-[#C8A15A] underline underline-offset-4 cursor-pointer hover:text-[#F5EFE6]"
            >
              {t.nav.langSwitch}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#F5EFE6]/10 pt-8 text-xs text-[#B8AFA3]/80 sm:flex-row sm:items-center">
          <p>{t.footer.rights}</p>
          <p>{t.footer.protoNote}</p>
        </div>
      </div>
    </footer>
  );
};
