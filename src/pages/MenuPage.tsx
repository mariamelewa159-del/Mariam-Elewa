import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { DISHES } from '../data/dishes';
import { DishCategory } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { DishCard } from '../components/DishCard';
import { CinematicButton } from '../components/CinematicButton';

interface MenuPageProps {
  initialCategory?: DishCategory | 'all';
  onSelectDish: (dishId: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  initialCategory = 'all',
  onSelectDish,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [attributeFilter, setAttributeFilter] = useState<'all' | 'hot' | 'signature'>('all');

  const categories: (DishCategory | 'all')[] = [
    'all',
    'starters',
    'mains',
    'desserts',
    'elixirs',
  ];

  const filteredDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DISHES.filter((dish) => {
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      if (attributeFilter === 'hot' && !dish.isHot) return false;
      if (attributeFilter === 'signature' && !dish.isSignature) return false;

      if (!q) return true;
      const searchable = [
        dish.name.en,
        dish.name.ar,
        dish.description.en,
        dish.description.ar,
        ...dish.ingredients.en,
        ...dish.ingredients.ar,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(q);
    });
  }, [selectedCategory, searchQuery, attributeFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setAttributeFilter('all');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
          {t.menu.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-[#F5EFE6] sm:text-5xl">
          {t.menu.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#B8AFA3]">
          {t.menu.subtitle}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-10 flex flex-col gap-5 border-b border-[#F5EFE6]/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Segmented Tabs */}
        <div
          role="tablist"
          aria-label="Menu Categories"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#F5EFE6]/10 bg-[#181614] p-1.5"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors sm:text-sm ${
                  active ? 'text-[#F5EFE6]' : 'text-[#B8AFA3] hover:text-[#F5EFE6]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeMenuCategoryPill"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 360, damping: 30 }
                    }
                    className="absolute inset-0 rounded-lg bg-[#D95D24]"
                  />
                )}
                <span className="relative z-10">{t.categories[cat]}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Attribute Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Quick attribute segmented toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-[#F5EFE6]/10 bg-[#181614] p-1">
            {(
              [
                { id: 'all', label: t.menu.allFilter },
                { id: 'signature', label: t.menu.signatureOnly },
                { id: 'hot', label: t.menu.hotOnly },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAttributeFilter(opt.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  attributeFilter === opt.id
                    ? 'bg-[#282420] text-[#C8A15A]'
                    : 'text-[#B8AFA3] hover:text-[#F5EFE6]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative min-w-[240px] flex-1 sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-[#B8AFA3]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              aria-label={t.menu.searchPlaceholder}
              className="w-full rounded-xl border border-[#F5EFE6]/15 bg-[#181614] py-2.5 pe-9 ps-10 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/60 focus:border-[#C8A15A] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 end-3 -translate-y-1/2 text-[#B8AFA3] cursor-pointer hover:text-[#F5EFE6]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dish Grid */}
      <AnimatePresence mode="wait">
        {filteredDishes.length === 0 ? (
          <motion.div
            key="empty-menu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] px-6 py-16 text-center"
          >
            <p className="max-w-md text-base text-[#B8AFA3]">{t.menu.noResults}</p>
            <CinematicButton
              variant="outline"
              size="md"
              className="mt-6"
              onClick={resetFilters}
            >
              {t.menu.resetFilters}
            </CinematicButton>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedCategory}-${attributeFilter}`}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredDishes.map((dish, idx) => (
              <DishCard
                key={dish.id}
                dish={dish}
                index={idx}
                onSelectDish={onSelectDish}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
