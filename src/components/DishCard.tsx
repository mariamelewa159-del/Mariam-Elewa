import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { Dish } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { DishImage } from './DishImage';

interface DishCardProps {
  dish: Dish;
  index?: number;
  onSelectDish: (dishId: string) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  index = 0,
  onSelectDish,
}) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ dish, quantity: 1 });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const categoryLabel = t.categories[dish.category];

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.07, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelectDish(dish.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectDish(dish.id);
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#F5EFE6]/10 bg-[#1B1917] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A15A]/40 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A]"
    >
      {/* Image Container ~65% card prominence */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151311]">
        <DishImage
          src={dish.image}
          alt={dish.name[lang]}
          isHot={dish.isHot}
          steamIntensity="medium"
          fallbackTitle={dish.name[lang]}
          className="h-full w-full"
          imgClassName="group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1917] via-transparent to-black/15 opacity-80"
        />
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="mb-2 flex items-center gap-2 text-xs text-[#B8AFA3]">
            <span className="text-[#C8A15A]">{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {dish.prepMinutes} {t.menu.mins}
            </span>
            {dish.isSignature && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t.menu.signatureOnly}</span>
              </>
            )}
          </div>

          <h3 className="font-display text-xl font-semibold leading-snug text-[#F5EFE6] transition-colors group-hover:text-[#C8A15A] sm:text-2xl">
            {dish.name[lang]}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#B8AFA3]">
            {dish.description[lang]}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#F5EFE6]/10 pt-4">
          <div className="tabular-nums text-base font-semibold text-[#F5EFE6]">
            ${dish.price}
          </div>

          <motion.button
            type="button"
            onClick={handleQuickAdd}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A15A] ${
              justAdded
                ? 'bg-[#2C5E3B] text-[#F5EFE6]'
                : 'bg-[#D95D24] text-[#F5EFE6] hover:bg-[#EA6B2F]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{t.menu.addedToast}</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>{t.menu.addQuick}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};
