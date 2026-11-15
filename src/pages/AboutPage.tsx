import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { ABOUT_INTERIOR_IMAGE } from '../data/dishes';
import { PageId } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { CinematicButton } from '../components/CinematicButton';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isRtl, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
          {t.about.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-tight text-[#F5EFE6] [text-wrap:balance] sm:text-5xl lg:text-6xl">
          {t.about.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#B8AFA3]">{t.about.lead}</p>
      </div>

      {/* Architectural Dining Room Banner */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 overflow-hidden rounded-2xl border border-[#F5EFE6]/10 bg-[#181614]"
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={ABOUT_INTERIOR_IMAGE}
            alt={t.brand}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Two-Column Editorial Narrative */}
      <div className="mt-14 grid grid-cols-1 gap-10 border-b border-[#F5EFE6]/10 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-base leading-loose text-[#F5EFE6]/90">{t.about.storyP1}</p>
        </div>
        <div className="lg:col-span-6">
          <p className="text-base leading-loose text-[#B8AFA3]">{t.about.storyP2}</p>
        </div>
      </div>

      {/* Three Culinary Pillars */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {t.about.pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="rounded-xl border border-[#F5EFE6]/10 bg-[#181614] p-7"
          >
            <h2 className="font-display text-2xl font-semibold text-[#F5EFE6]">
              {pillar.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B8AFA3]">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Dining Hours & CTA */}
      <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#C8A15A]/25 bg-[#1B1917] p-8 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
            <Clock className="h-4 w-4" />
            <span>{t.about.hoursTitle}</span>
          </div>
          <p className="mt-2 text-base text-[#F5EFE6]">{t.about.hoursDesc}</p>
        </div>
        <CinematicButton variant="primary" size="lg" onClick={() => onNavigate('menu')}>
          <span>{t.about.ctaMenu}</span>
          <ForwardArrow className="h-4 w-4" />
        </CinematicButton>
      </div>
    </div>
  );
};
