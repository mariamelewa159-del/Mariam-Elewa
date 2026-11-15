/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { DishCategory, PageId, RouteState, TransitionStyle } from './types/restaurant';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { PageTransitionCurtain } from './components/PageTransitionCurtain';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { FoodDetailsPage } from './pages/FoodDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function parseHashRoute(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { page: 'home' };
  const parts = raw.split('/').filter(Boolean);
  const head = parts[0];

  if (head === 'menu') {
    const cat = parts[1] as DishCategory | 'all' | undefined;
    return { page: 'menu', category: cat || 'all' };
  }
  if (head === 'dish' && parts[1]) {
    return { page: 'dish', dishId: parts[1] };
  }
  if (head === 'checkout') return { page: 'checkout' };
  if (head === 'about') return { page: 'about' };
  if (head === 'contact') return { page: 'contact' };
  return { page: 'home' };
}

function buildHashUrl(route: RouteState): string {
  if (route.page === 'home') return '#/';
  if (route.page === 'menu') {
    return route.category && route.category !== 'all'
      ? `#/menu/${route.category}`
      : '#/menu';
  }
  if (route.page === 'dish' && route.dishId) {
    return `#/dish/${route.dishId}`;
  }
  return `#/${route.page}`;
}

function pickTransitionStyle(from: PageId, to: PageId): TransitionStyle {
  if (to === 'dish' || (from === 'dish' && to === 'menu')) return 'zoom';
  if (to === 'checkout') return 'circular';
  if (to === 'menu' || from === 'menu') return 'slide';
  return 'curtain';
}

const NovaKitchenShell: React.FC = () => {
  const { isRtl } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [route, setRoute] = useState<RouteState>(() => parseHashRoute());
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('curtain');
  const [curtainActive, setCurtainActive] = useState(false);

  const curtainTimerRef = useRef<number | null>(null);
  const swapTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (curtainTimerRef.current) window.clearTimeout(curtainTimerRef.current);
    if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const performNavigation = useCallback(
    (nextRoute: RouteState, pushHistory = true) => {
      if (
        nextRoute.page === route.page &&
        nextRoute.dishId === route.dishId &&
        nextRoute.category === route.category
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const style = pickTransitionStyle(route.page, nextRoute.page);
      setTransitionStyle(style);

      if (pushHistory) {
        const nextHash = buildHashUrl(nextRoute);
        window.history.pushState(nextRoute, '', nextHash);
      }

      clearTimers();

      if (style === 'curtain' && !shouldReduceMotion) {
        setCurtainActive(true);
        swapTimerRef.current = window.setTimeout(() => {
          setRoute(nextRoute);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }, 260);
        curtainTimerRef.current = window.setTimeout(() => {
          setCurtainActive(false);
        }, 560);
      } else {
        setRoute(nextRoute);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    },
    [route, shouldReduceMotion]
  );

  // Sync browser back & forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetRoute: RouteState =
        event.state && (event.state as RouteState).page
          ? (event.state as RouteState)
          : parseHashRoute();
      performNavigation(targetRoute, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [performNavigation]);

  const handleNavigate = (
    page: PageId,
    options?: { category?: DishCategory | 'all' }
  ) => {
    performNavigation({
      page,
      category: options?.category,
    });
  };

  const handleSelectDish = (dishId: string) => {
    performNavigation({
      page: 'dish',
      dishId,
    });
  };

  const pageKey = `${route.page}-${route.dishId || ''}-${route.category || ''}`;

  const getPageMotionProps = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      };
    }

    switch (transitionStyle) {
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, scale: 1.03, filter: 'blur(6px)' },
          transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
        };
      case 'circular': {
        const origin = isRtl ? '10% 10%' : '90% 10%';
        return {
          initial: { opacity: 0.4, clipPath: `circle(0% at ${origin})` },
          animate: { opacity: 1, clipPath: `circle(150% at 50% 50%)` },
          exit: { opacity: 0, scale: 0.98 },
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        };
      }
      case 'slide': {
        const enterX = isRtl ? -44 : 44;
        const exitX = isRtl ? 32 : -32;
        return {
          initial: { opacity: 0, x: enterX },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: exitX },
          transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] as const },
        };
      }
      case 'curtain':
      default:
        return {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
        };
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#121110] text-[#F5EFE6]">
      <Navbar currentPage={route.page} onNavigate={(page) => handleNavigate(page)} />

      <PageTransitionCurtain isVisible={curtainActive} />

      <CartDrawer
        onProceedToCheckout={() => handleNavigate('checkout')}
        onBrowseMenu={() => handleNavigate('menu', { category: 'all' })}
      />

      <main className="flex-1 overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div key={pageKey} {...getPageMotionProps()}>
            {route.page === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectDish={handleSelectDish}
              />
            )}
            {route.page === 'menu' && (
              <MenuPage
                initialCategory={route.category || 'all'}
                onSelectDish={handleSelectDish}
              />
            )}
            {route.page === 'dish' && (
              <FoodDetailsPage
                key={route.dishId}
                dishId={route.dishId || 'hearth-wagyu-ribeye'}
                onBackToMenu={() => handleNavigate('menu', { category: 'all' })}
              />
            )}
            {route.page === 'checkout' && (
              <CheckoutPage onNavigate={(p) => handleNavigate(p)} />
            )}
            {route.page === 'about' && (
              <AboutPage onNavigate={(p) => handleNavigate(p)} />
            )}
            {route.page === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={(page) => handleNavigate(page)} />
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <CartProvider>
          <NovaKitchenShell />
        </CartProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
