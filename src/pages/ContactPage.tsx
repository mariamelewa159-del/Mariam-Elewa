import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Clock, ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CinematicButton } from '../components/CinematicButton';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[#C8A15A]">
          {t.contact.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-[#F5EFE6] sm:text-5xl">
          {t.contact.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#B8AFA3]">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left: Direct Contact Details & Location Card */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-7">
            <div className="space-y-6">
              {/* Address */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                  <MapPin className="h-4 w-4" />
                  <span>{t.contact.addressTitle}</span>
                </div>
                <p className="mt-2 text-base font-medium text-[#F5EFE6]">
                  {t.contact.addressLine1}
                </p>
                <p className="mt-1 text-sm text-[#B8AFA3]">{t.contact.addressLine2}</p>
                <a
                  href="https://maps.google.com/?q=148+Mercer+Street+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#C8A15A] underline underline-offset-4 transition-colors hover:text-[#F5EFE6]"
                >
                  <span>{t.contact.openMaps}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Phone */}
              <div className="border-t border-[#F5EFE6]/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                  <Phone className="h-4 w-4" />
                  <span>{t.contact.phoneTitle}</span>
                </div>
                <a
                  href="tel:+12125550194"
                  dir="ltr"
                  className="mt-2 inline-block tabular-nums text-base font-medium text-[#F5EFE6] transition-colors hover:text-[#C8A15A]"
                >
                  +1 (212) 555-0194
                </a>
              </div>

              {/* Email */}
              <div className="border-t border-[#F5EFE6]/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                  <Mail className="h-4 w-4" />
                  <span>{t.contact.emailTitle}</span>
                </div>
                <a
                  href="mailto:concierge@novakitchen.dining"
                  dir="ltr"
                  className="mt-2 inline-block text-base font-medium text-[#F5EFE6] transition-colors hover:text-[#C8A15A]"
                >
                  concierge@novakitchen.dining
                </a>
              </div>

              {/* Hours */}
              <div className="border-t border-[#F5EFE6]/10 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
                  <Clock className="h-4 w-4" />
                  <span>{t.contact.hoursTitle}</span>
                </div>
                <p className="mt-2 text-sm text-[#F5EFE6]">{t.contact.hoursLine1}</p>
                <p className="mt-1 text-sm text-[#B8AFA3]">{t.contact.hoursLine2}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-7">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#C8A15A]">
              {t.contact.socialTitle}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'X / Twitter', href: 'https://x.com' },
                { label: 'TikTok', href: 'https://tiktok.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5EFE6]/15 bg-[#121110] px-4 py-2 text-xs font-medium text-[#F5EFE6] transition-colors hover:border-[#C8A15A] hover:text-[#C8A15A]"
                >
                  <span>{social.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Direct Concierge Message Form */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-[#F5EFE6]/10 bg-[#181614] p-7 sm:p-9 lg:col-span-7"
        >
          <h2 className="font-display text-2xl font-semibold text-[#F5EFE6] sm:text-3xl">
            {t.contact.formTitle}
          </h2>

          {sent ? (
            <div className="mt-8 rounded-xl border border-[#69C785]/30 bg-[#2C5E3B]/15 p-6">
              <div className="flex items-center gap-3 text-[#69C785]">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="font-semibold text-[#F5EFE6]">{t.contact.formSentTitle}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#B8AFA3]">
                {t.contact.formSentDesc}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 text-xs font-medium text-[#C8A15A] underline underline-offset-4 cursor-pointer hover:text-[#F5EFE6]"
              >
                {t.contact.formTitle}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                >
                  {t.contact.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] focus:border-[#C8A15A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                >
                  {t.contact.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] focus:border-[#C8A15A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-msg"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#C8A15A]"
                >
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#F5EFE6]/15 bg-[#121110] px-4 py-3 text-sm text-[#F5EFE6] focus:border-[#C8A15A] focus:outline-none"
                />
              </div>

              <CinematicButton type="submit" variant="primary" size="lg">
                <Send className="h-4 w-4" />
                <span>{t.contact.formSubmit}</span>
              </CinematicButton>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
