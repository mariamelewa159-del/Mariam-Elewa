import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  Receipt,
} from 'lucide-react';
import { PageId } from '../types/restaurant';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { CinematicButton } from '../components/CinematicButton';

interface CheckoutPageProps {
  onNavigate: (page: PageId) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { lang, isRtl, t } = useLanguage();
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    lastOrder,
    submitDemoOrder,
    clearLastOrder,
  } = useCart();

  const shouldReduceMotion = useReducedMotion();
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg(t.checkout.emptyBagWarning);
      return;
    }
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(t.checkout.validationError);
      return;
    }
    setErrorMsg('');
    submitDemoOrder({
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod: 'cash_on_delivery',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ORDER CONFIRMATION RECEIPT SCREEN
  if (lastOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#C8A15A]/35 bg-[#181614] p-7 sm:p-10"
        >
          <div className="flex flex-col items-start gap-4 border-b border-[#F5EFE6]/10 pb-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2C5E3B]/30 text-[#69C785]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                {t.checkout.confirmedEyebrow}
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold text-[#F5EFE6] sm:text-4xl">
                {t.checkout.confirmedTitle}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#B8AFA3]">
                {t.checkout.confirmedSubtitle}
              </p>
            </div>
          </div>

          {/* Key Order Metadata */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-b border-[#F5EFE6]/10 pb-6 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[#B8AFA3]">{t.checkout.orderRef}</p>
              <p className="mt-1 font-mono text-base font-semibold tabular-nums text-[#F5EFE6]">
                {lastOrder.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#B8AFA3]">{t.checkout.estPrep}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#F5EFE6]">
                <Clock className="h-4 w-4 text-[#C8A15A]" />
                <span>{t.checkout.estWindowValue}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-[#B8AFA3]">{t.checkout.paymentLabel}</p>
              <p className="mt-1 text-sm font-medium text-[#C8A15A]">
                {t.checkout.codTitle}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-6 border-b border-[#F5EFE6]/10 pb-6">
            <p className="text-xs text-[#B8AFA3]">{t.checkout.deliverTo}</p>
            <p className="mt-1.5 text-sm font-semibold text-[#F5EFE6]">
              {lastOrder.customer.fullName} ·{' '}
              <span className="tabular-nums text-[#B8AFA3]" dir="ltr">
                {lastOrder.customer.phone}
              </span>
            </p>
            <p className="mt-1 inline-flex items-start gap-1.5 text-sm text-[#B8AFA3]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A15A]" />
              <span>{lastOrder.customer.address}</span>
            </p>
            {lastOrder.customer.notes && (
              <p className="mt-2 text-xs italic text-[#B8AFA3]">
                “{lastOrder.customer.notes}”
              </p>
            )}
          </div>

          {/* Itemized Receipt */}
          <div className="mt-6 space-y-3 border-b border-[#F5EFE6]/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
              <Receipt className="h-3.5 w-3.5" />
              <span>{t.checkout.orderSummary}</span>
            </div>
            {lastOrder.items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium text-[#F5EFE6]">
                    <span className="tabular-nums text-[#C8A15A]">{item.quantity}×</span>{' '}
                    {item.dish.name[lang]}
                  </p>
                  <p className="text-xs text-[#B8AFA3]">
                    {item.selectedSize.label[lang]}
                    {item.selectedExtras.length > 0
                      ? ` · ${item.selectedExtras.map((e) => e.label[lang]).join(', ')}`
                      : ''}
                  </p>
                </div>
                <span className="tabular-nums font-medium text-[#F5EFE6]">
                  ${item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-[#B8AFA3]">
              <span>{t.cart.subtotal}</span>
              <span className="tabular-nums text-[#F5EFE6]">${lastOrder.subtotal}</span>
            </div>
            <div className="flex justify-between text-[#B8AFA3]">
              <span>{t.cart.delivery}</span>
              <span className="tabular-nums text-[#C8A15A]">
                {lastOrder.deliveryFee === 0 ? t.cart.free : `$${lastOrder.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#F5EFE6]/10 pt-3 text-base font-semibold text-[#F5EFE6]">
              <span>{t.cart.total}</span>
              <span className="tabular-nums text-lg text-[#F5EFE6]">${lastOrder.total}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CinematicButton
              variant="primary"
              size="md"
              onClick={() => {
                clearLastOrder();
                onNavigate('home');
              }}
            >
              <span>{t.checkout.startNewOrder}</span>
            </CinematicButton>
            <CinematicButton
              variant="outline"
              size="md"
              onClick={() => {
                clearLastOrder();
                onNavigate('menu');
              }}
            >
              <span>{t.checkout.exploreMore}</span>
              <ForwardArrow className="h-4 w-4" />
            </CinematicButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
          {t.checkout.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-[#F5EFE6] sm:text-5xl">
          {t.checkout.title}
        </h1>
      </div>

      {/* Prototype Transparency Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#C8A15A]/30 bg-[#1F1C18] px-4 py-3.5 text-sm text-[#F5EFE6]/90">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A15A]" />
        <p className="leading-relaxed">{t.checkout.demoNotice}</p>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-10 text-center">
          <p className="text-base text-[#B8AFA3]">{t.checkout.emptyBagWarning}</p>
          <CinematicButton
            variant="primary"
            size="md"
            className="mt-6"
            onClick={() => onNavigate('menu')}
          >
            <span>{t.cart.browseMenu}</span>
            <ForwardArrow className="h-4 w-4" />
          </CinematicButton>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12"
        >
          {/* Left: Guest Form & COD Payment */}
          <div className="space-y-8 lg:col-span-7">
            <div className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#F5EFE6]">
                {t.checkout.customerDetails}
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                  >
                    {t.checkout.fullName} *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.checkout.fullNamePlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/50 focus:border-[#C8A15A] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                  >
                    {t.checkout.phone} *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.checkout.phonePlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/50 focus:border-[#C8A15A] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                  >
                    {t.checkout.address} *
                  </label>
                  <textarea
                    id="checkout-address"
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.checkout.addressPlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/50 focus:border-[#C8A15A] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                  >
                    {t.checkout.notes}
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.checkout.notesPlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] placeholder:text-[#B8AFA3]/50 focus:border-[#C8A15A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#F5EFE6]">
                {t.checkout.paymentTitle}
              </h2>
              <div className="mt-4 flex items-start gap-4 rounded-xl border border-[#D95D24]/60 bg-[#D95D24]/10 p-4">
                <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-[#D95D24]" />
                <div>
                  <p className="text-sm font-semibold text-[#F5EFE6]">
                    {t.checkout.codTitle}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#B8AFA3]">
                    {t.checkout.codDesc}
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <p role="alert" className="text-sm font-medium text-[#EA6B2F]">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Right: Sticky Order Summary */}
          <aside className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-6 sm:p-8 lg:sticky lg:top-28 lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold text-[#F5EFE6]">
              {t.checkout.orderSummary}
            </h2>

            <div className="mt-6 space-y-4 border-b border-[#F5EFE6]/10 pb-6">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name[lang]}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#F5EFE6]">
                        <span className="tabular-nums text-[#C8A15A]">
                          {item.quantity}×
                        </span>{' '}
                        {item.dish.name[lang]}
                      </p>
                      <p className="mt-0.5 text-xs text-[#B8AFA3]">
                        {item.selectedSize.label[lang]}
                      </p>
                    </div>
                  </div>
                  <span className="tabular-nums font-medium text-[#F5EFE6]">
                    ${item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between text-[#B8AFA3]">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums text-[#F5EFE6]">${subtotal}</span>
              </div>
              <div className="flex justify-between text-[#B8AFA3]">
                <span>{t.cart.delivery}</span>
                <span className="tabular-nums text-[#C8A15A]">
                  {deliveryFee === 0 ? t.cart.free : `$${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#F5EFE6]/10 pt-3 text-base font-semibold text-[#F5EFE6]">
                <span>{t.cart.total}</span>
                <span className="tabular-nums text-xl text-[#F5EFE6]">${total}</span>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <CinematicButton type="submit" variant="primary" size="lg" className="w-full">
                <span>{t.checkout.placeOrder}</span>
                <ForwardArrow className="h-4 w-4" />
              </CinematicButton>

              <CinematicButton
                type="button"
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => onNavigate('menu')}
              >
                {t.checkout.backToMenu}
              </CinematicButton>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
};
