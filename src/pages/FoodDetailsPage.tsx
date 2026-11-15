import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Flame, Minus, Plus, ShoppingBag } from 'lucide-react';
import { DISHES } from '../data/dishes';
import { DishExtraOption, DishSizeOption } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { DishImage } from '../components/DishImage';
import { CinematicButton } from '../components/CinematicButton';

interface FoodDetailsPageProps {
  dishId: string;
  onBackToMenu: () => void;
}

export const FoodDetailsPage: React.FC<FoodDetailsPageProps> = ({
  dishId,
  onBackToMenu,
}) => {
  const { lang, isRtl, t } = useLanguage();
  const { addToCart, openCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  const dish = useMemo(
    () => DISHES.find((d) => d.id === dishId) || DISHES[0],
    [dishId]
  );

  const [selectedSize, setSelectedSize] = useState<DishSizeOption>(dish.sizes[0]);
  const [selectedExtras, setSelectedExtras] = useState<DishExtraOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const toggleExtra = (extra: DishExtraOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const unitPrice =
    dish.price +
    selectedSize.priceDelta +
    selectedExtras.reduce((sum, ext) => sum + ext.price, 0);

  const lineTotal = unitPrice * quantity;

  const handleAddToOrder = () => {
    addToCart({
      dish,
      selectedSize,
      selectedExtras,
      quantity,
      notes,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      {/* Back Control */}
      <button
        type="button"
        onClick={onBackToMenu}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#B8AFA3] cursor-pointer transition-colors hover:text-[#F5EFE6]"
      >
        <BackArrow className="h-4 w-4 text-[#C8A15A]" />
        <span>{t.dishDetails.backToMenu}</span>
      </button>

      {/* Contiguous 2-Column Culinary Presentation & Customization Module */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: Sticky Large Culinary Photography with Steam */}
        <div className="lg:sticky lg:top-28 lg:col-span-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#F5EFE6]/10 bg-[#1B1917] shadow-2xl"
          >
            <DishImage
              src={dish.image}
              alt={dish.name[lang]}
              isHot={dish.isHot}
              steamIntensity="hero"
              fallbackTitle={dish.name[lang]}
              className="h-full w-full"
              imgClassName="group-hover:scale-104"
            />
          </motion.div>

          {/* Ingredients Showcase */}
          <div className="mt-7 rounded-xl border border-[#F5EFE6]/10 bg-[#181614] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
              {t.dishDetails.ingredientsTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#F5EFE6]/90">
              {dish.ingredients[lang].join(' · ')}
            </p>
          </div>
        </div>

        {/* Right: Contiguous Purchase & Customization Module */}
        <div className="lg:col-span-6">
          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#B8AFA3]">
            <span className="font-medium text-[#C8A15A]">{t.categories[dish.category]}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {dish.prepMinutes} {t.menu.mins}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {dish.calories} {t.dishDetails.kcal}
            </span>
            {dish.isHot && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-[#D95D24]">
                  <Flame className="h-3.5 w-3.5" />
                  {t.dishDetails.hotBadge}
                </span>
              </>
            )}
          </div>

          <h1 className="font-display mt-3 text-3xl font-semibold text-[#F5EFE6] [text-wrap:balance] sm:text-5xl">
            {dish.name[lang]}
          </h1>
          <p className="mt-2 text-sm font-medium text-[#C8A15A] sm:text-base">
            {dish.subtitle[lang]}
          </p>

          <p className="mt-5 text-base leading-relaxed text-[#B8AFA3]">
            {dish.description[lang]}
          </p>

          <div className="mt-6 border-y border-[#F5EFE6]/10 py-4">
            <span className="font-display text-3xl font-semibold tabular-nums text-[#F5EFE6]">
              ${unitPrice}
            </span>
          </div>

          {/* 1. Size / Cut Selection */}
          <div className="mt-7">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
              {t.dishDetails.sizeTitle}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {dish.sizes.map((size) => {
                const active = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-start text-sm cursor-pointer transition-all ${
                      active
                        ? 'border-[#D95D24] bg-[#D95D24]/15 text-[#F5EFE6]'
                        : 'border-[#F5EFE6]/10 bg-[#181614] text-[#B8AFA3] hover:border-[#C8A15A]/40 hover:text-[#F5EFE6]'
                    }`}
                  >
                    <span className="font-medium">{size.label[lang]}</span>
                    <span className="tabular-nums text-xs text-[#C8A15A]">
                      {size.priceDelta === 0
                        ? lang === 'ar'
                          ? 'مشمول'
                          : 'Included'
                        : `+$${size.priceDelta}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Extras & Accompaniments */}
          {dish.extras.length > 0 && (
            <div className="mt-7">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                {t.dishDetails.extrasTitle}
              </h2>
              <div className="mt-3 space-y-2.5">
                {dish.extras.map((extra) => {
                  const checked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-start text-sm cursor-pointer transition-all ${
                        checked
                          ? 'border-[#C8A15A] bg-[#C8A15A]/12 text-[#F5EFE6]'
                          : 'border-[#F5EFE6]/10 bg-[#181614] text-[#B8AFA3] hover:border-[#F5EFE6]/25 hover:text-[#F5EFE6]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            checked
                              ? 'border-[#C8A15A] bg-[#C8A15A] text-[#121110]'
                              : 'border-[#F5EFE6]/30'
                          }`}
                        >
                          {checked && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span className="font-medium">{extra.label[lang]}</span>
                      </span>
                      <span className="tabular-nums text-xs text-[#C8A15A]">
                        +${extra.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Optional Preparation Notes */}
          <div className="mt-7">
            <label
              htmlFor="dish-prep-note"
              className="block text-xs font-semibold uppercase tracking-widest text-[#C8A15A]"
            >
              {t.dishDetails.specialNote}
            </label>
            <input
              id="dish-prep-note"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.dishDetails.specialNotePlaceholder}
              className="mt-2.5 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#181614] px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/55 focus:border-[#C8A15A] focus:outline-none"
            />
          </div>

          {/* 4. Quantity + Add to Order CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex items-center justify-between rounded-xl border border-[#F5EFE6]/15 bg-[#181614] px-2 py-1.5 sm:w-36">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#F5EFE6] cursor-pointer hover:bg-white/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-base font-semibold tabular-nums text-[#F5EFE6]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#F5EFE6] cursor-pointer hover:bg-white/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <CinematicButton
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleAddToOrder}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{t.dishDetails.addedConfirm}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>
                    {t.dishDetails.addToOrder} ·{' '}
                    <span className="tabular-nums">${lineTotal}</span>
                  </span>
                </>
              )}
            </CinematicButton>

            {justAdded && (
              <CinematicButton
                variant="outline"
                size="lg"
                onClick={openCart}
              >
                {t.dishDetails.viewBag}
              </CinematicButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
