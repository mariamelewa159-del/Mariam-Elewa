import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { CinematicButton } from './CinematicButton';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onBrowseMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onBrowseMenu,
}) => {
  const { lang, isRtl, t } = useLanguage();
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    freeDeliveryRemaining,
    itemCount,
  } = useCart();

  const shouldReduceMotion = useReducedMotion();
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[70]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.title}
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 320, damping: 34 }
            }
            className={`fixed inset-y-0 ${
              isRtl ? 'left-0 border-r' : 'right-0 border-l'
            } flex w-full max-w-md flex-col border-[#F5EFE6]/10 bg-[#181614] shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F5EFE6]/10 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#F5EFE6]">
                  {t.cart.title}
                </h2>
                <p className="mt-0.5 text-xs tabular-nums text-[#B8AFA3]">
                  {itemCount} {itemCount === 1 ? t.cart.itemCount : t.cart.itemsCount}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close Cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#F5EFE6]/10 text-[#B8AFA3] cursor-pointer transition-colors hover:border-[#C8A15A]/50 hover:text-[#F5EFE6]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#C8A15A]/25 bg-[#23201D]">
                    <ShoppingBag className="h-7 w-7 text-[#C8A15A]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-[#F5EFE6]">
                    {t.cart.emptyTitle}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#B8AFA3]">
                    {t.cart.emptyDesc}
                  </p>
                  <CinematicButton
                    variant="primary"
                    size="md"
                    className="mt-6"
                    onClick={() => {
                      closeCart();
                      onBrowseMenu();
                    }}
                  >
                    <span>{t.cart.browseMenu}</span>
                    <ForwardArrow className="h-4 w-4" />
                  </CinematicButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free delivery progress indicator */}
                  {freeDeliveryRemaining > 0 && (
                    <div className="rounded-lg border border-[#C8A15A]/25 bg-[#201D1A] px-4 py-3 text-xs text-[#F5EFE6]/90">
                      <p className="tabular-nums">
                        {t.cart.freeThresholdHint.replace(
                          '{{amount}}',
                          `$${freeDeliveryRemaining}`
                        )}
                      </p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#121110]">
                        <div
                          className="h-full rounded-full bg-[#C8A15A] transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 85) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout={!shouldReduceMotion}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, x: isRtl ? -30 : 30 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-4 rounded-xl border border-[#F5EFE6]/10 bg-[#1F1C19] p-3.5"
                      >
                        <img
                          src={item.dish.image}
                          alt={item.dish.name[lang]}
                          referrerPolicy="no-referrer"
                          className="h-20 w-20 shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-display text-base font-semibold leading-tight text-[#F5EFE6] truncate">
                                {item.dish.name[lang]}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.cartItemId)}
                                aria-label={t.cart.remove}
                                className="text-[#B8AFA3]/70 cursor-pointer transition-colors hover:text-[#D95D24]"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-[#C8A15A]">
                              {item.selectedSize.label[lang]}
                            </p>
                            {item.selectedExtras.length > 0 && (
                              <p className="mt-0.5 text-xs text-[#B8AFA3] line-clamp-1">
                                + {item.selectedExtras.map((e) => e.label[lang]).join(' · ')}
                              </p>
                            )}
                            {item.notes && (
                              <p className="mt-1 text-xs italic text-[#B8AFA3]/80 line-clamp-1">
                                “{item.notes}”
                              </p>
                            )}
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-lg border border-[#F5EFE6]/15 bg-[#121110]">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center text-[#F5EFE6]/80 cursor-pointer hover:text-[#D95D24]"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 text-center text-xs font-medium tabular-nums text-[#F5EFE6]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center text-[#F5EFE6]/80 cursor-pointer hover:text-[#D95D24]"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <span className="text-sm font-semibold tabular-nums text-[#F5EFE6]">
                              ${item.unitPrice * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Totals */}
            {items.length > 0 && (
              <div className="border-t border-[#F5EFE6]/10 bg-[#151311] px-6 py-5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-[#B8AFA3]">
                    <span>{t.cart.subtotal}</span>
                    <span className="tabular-nums text-[#F5EFE6]">${subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#B8AFA3]">
                    <span>{t.cart.delivery}</span>
                    <span className="tabular-nums text-[#C8A15A]">
                      {deliveryFee === 0 ? t.cart.free : `$${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#F5EFE6]/10 pt-3 text-base font-semibold text-[#F5EFE6]">
                    <span>{t.cart.total}</span>
                    <span className="tabular-nums text-lg text-[#F5EFE6]">${total}</span>
                  </div>
                </div>

                <CinematicButton
                  variant="primary"
                  size="lg"
                  className="mt-5 w-full"
                  onClick={() => {
                    closeCart();
                    onProceedToCheckout();
                  }}
                >
                  <span>{t.cart.checkoutCta}</span>
                  <ForwardArrow className="h-4 w-4" />
                </CinematicButton>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
