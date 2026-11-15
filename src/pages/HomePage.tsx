import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, Flame, Sparkles, Star } from 'lucide-react';
import { ABOUT_INTERIOR_IMAGE, DISHES, HERO_IMAGE, REVIEWS } from '../data/dishes';
import { DishCategory, PageId } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { CinematicButton } from '../components/CinematicButton';
import { DishCard } from '../components/DishCard';
import { SteamEffect } from '../components/SteamEffect';

interface HomePageProps {
  onNavigate: (page: PageId, options?: { category?: DishCategory | 'all' }) => void;
  onSelectDish: (dishId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectDish }) => {
  const { lang, isRtl, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  const featuredDishes = DISHES.filter((d) =>
    ['hearth-wagyu-ribeye', 'herb-rack-of-lamb', 'saffron-scallop-risotto'].includes(d.id)
  );

  const categoryCards: { id: DishCategory; image: string; count: number }[] = [
    {
      id: 'starters',
      image: DISHES.find((d) => d.id === 'truffle-burrata')?.image || HERO_IMAGE,
      count: DISHES.filter((d) => d.category === 'starters').length,
    },
    {
      id: 'mains',
      image: DISHES.find((d) => d.id === 'hearth-wagyu-ribeye')?.image || HERO_IMAGE,
      count: DISHES.filter((d) => d.category === 'mains').length,
    },
    {
      id: 'desserts',
      image: DISHES.find((d) => d.id === 'valrhona-lava-fondant')?.image || HERO_IMAGE,
      count: DISHES.filter((d) => d.category === 'desserts').length,
    },
    {
      id: 'elixirs',
      image: DISHES.find((d) => d.id === 'smoked-amber-elixir')?.image || HERO_IMAGE,
      count: DISHES.filter((d) => d.category === 'elixirs').length,
    },
  ];

  return (
    <div>
      {/* 1. FULL-SCREEN CINEMATIC HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#121110] pb-16 pt-28 sm:items-center sm:pb-20 sm:pt-32"
      >
        {/* Parallax Culinary Background */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : { y: heroImageY, scale: heroImageScale }
          }
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={HERO_IMAGE}
            alt={t.hero.headline}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Measured Contrast Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/65 to-[#121110]/40"
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-l from-[#121110]/90 via-[#121110]/45 to-transparent'
              : 'bg-gradient-to-r from-[#121110]/90 via-[#121110]/45 to-transparent'
          }`}
        />

        {/* Rising Hearth Steam over Hero Wagyu */}
        <div className="pointer-events-none absolute bottom-10 right-[10%] h-72 w-80 sm:right-[18%]">
          <SteamEffect intensity="hero" />
        </div>

        {/* Hero Copy */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: heroContentOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-xs font-medium tracking-widest uppercase text-[#C8A15A]"
            >
              {t.hero.kicker}
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-semibold leading-[1.08] text-[#F5EFE6] [text-wrap:balance] sm:text-5xl lg:text-6xl"
            >
              {t.hero.headline}
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#F5EFE6]/85 sm:text-lg"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <CinematicButton
                variant="primary"
                size="lg"
                onClick={() => onNavigate('menu', { category: 'all' })}
              >
                <span>{t.hero.ctaPrimary}</span>
                <ForwardArrow className="h-4 w-4" />
              </CinematicButton>

              <CinematicButton
                variant="outline"
                size="lg"
                onClick={() => onSelectDish('hearth-wagyu-ribeye')}
              >
                <Flame className="h-4 w-4 text-[#D95D24]" />
                <span>{t.hero.ctaSecondary}</span>
              </CinematicButton>
            </motion.div>
          </div>

          {/* Floating Scroll Cue */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 hidden items-center gap-2 text-xs text-[#B8AFA3] sm:flex"
          >
            <ArrowDown className="ember-float h-4 w-4 text-[#C8A15A]" />
            <span>{t.hero.scrollCue}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. FEATURED SIGNATURE PLATES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 border-b border-[#F5EFE6]/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
              {t.home.featuredEyebrow}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#F5EFE6] [text-wrap:balance] sm:text-4xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#B8AFA3] sm:text-base">
              {t.home.featuredSubtitle}
            </p>
          </div>
          <CinematicButton
            variant="ghost"
            size="md"
            onClick={() => onNavigate('menu', { category: 'all' })}
          >
            <span>{t.home.viewAllMenu}</span>
            <ForwardArrow className="h-4 w-4 text-[#C8A15A]" />
          </CinematicButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((dish, idx) => (
            <DishCard
              key={dish.id}
              dish={dish}
              index={idx}
              onSelectDish={onSelectDish}
            />
          ))}
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES & EVENING PRIVILEGE */}
      <section className="border-y border-[#F5EFE6]/10 bg-[#171513] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
              {t.home.categoriesEyebrow}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#F5EFE6] sm:text-4xl">
              {t.home.categoriesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((cat, idx) => (
              <motion.button
                key={cat.id}
                type="button"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => onNavigate('menu', { category: cat.id })}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#F5EFE6]/10 bg-[#1B1917] text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A]"
              >
                <img
                  src={cat.image}
                  alt={t.categories[cat.id]}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs tabular-nums text-[#C8A15A]">
                    0{idx + 1} · {cat.count}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold text-[#F5EFE6] transition-colors group-hover:text-[#C8A15A]">
                      {t.categories[cat.id]}
                    </h3>
                    <ForwardArrow className="h-4 w-4 text-[#F5EFE6]/70 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Special Offer Banner */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mt-14 flex flex-col items-start justify-between gap-8 rounded-2xl border border-[#C8A15A]/30 bg-gradient-to-br from-[#231F1B] via-[#1B1917] to-[#151311] p-7 sm:p-10 lg:flex-row lg:items-center"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t.home.offerEyebrow}</span>
              </div>
              <h3 className="font-display mt-2 text-2xl font-semibold text-[#F5EFE6] [text-wrap:balance] sm:text-3xl">
                {t.home.offerTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B8AFA3] sm:text-base">
                {t.home.offerDesc}
              </p>
            </div>

            <CinematicButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('menu', { category: 'all' })}
            >
              <span>{t.home.offerCta}</span>
              <ForwardArrow className="h-4 w-4" />
            </CinematicButton>
          </motion.div>
        </div>
      </section>

      {/* 4. RESTAURANT INTRODUCTION & GUEST REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Interior Image Split */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-2xl border border-[#F5EFE6]/10 bg-[#1B1917] lg:col-span-6"
          >
            <img
              src={ABOUT_INTERIOR_IMAGE}
              alt={t.brand}
              referrerPolicy="no-referrer"
              className="h-full min-h-[300px] w-full object-cover"
            />
          </motion.div>

          {/* Story Intro */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
              {t.home.storyEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-[#F5EFE6] [text-wrap:balance] sm:text-4xl">
              {t.home.storyTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#B8AFA3]">
              {t.home.storyDesc}
            </p>
            <div className="mt-8">
              <CinematicButton
                variant="outline"
                size="md"
                onClick={() => onNavigate('about')}
              >
                <span>{t.home.storyCta}</span>
                <ForwardArrow className="h-4 w-4" />
              </CinematicButton>
            </div>
          </div>
        </div>

        {/* Guest Reviews */}
        <div className="mt-20 border-t border-[#F5EFE6]/10 pt-16">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
              {t.home.reviewsEyebrow}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[#F5EFE6] sm:text-4xl">
              {t.home.reviewsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <motion.blockquote
                key={review.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex flex-col justify-between rounded-xl border border-[#F5EFE6]/10 bg-[#1B1917] p-6"
              >
                <div>
                  <div className="mb-4 flex items-center gap-1 text-[#C8A15A]" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, starIdx) => (
                      <Star key={starIdx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-[#F5EFE6]/90">
                    “{review.quote[lang]}”
                  </p>
                </div>

                <footer className="mt-6 border-t border-[#F5EFE6]/10 pt-4">
                  <p className="font-display text-lg font-semibold text-[#F5EFE6]">
                    {review.author[lang]}
                  </p>
                  <p className="mt-0.5 text-xs text-[#B8AFA3]">
                    {review.role[lang]} · {t.home.orderedLabel}: {review.dishOrdered[lang]}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
