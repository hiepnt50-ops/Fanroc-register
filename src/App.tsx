/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MediaCarousel } from './components/MediaCarousel.tsx';
import { Timeline } from './components/Timeline.tsx';
import { BoardCards } from './components/BoardCards.tsx';
import { PrizesSection } from './components/PrizesSection.tsx';
import { BoardDetailPage } from './components/BoardDetailPage.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';
import { Footer } from './components/Footer.tsx';
import { BoardSlug, BoardTabId, BoardType } from './types.ts';
import { BOARD_TABS } from './constants.ts';

type AppRoute =
  | { view: 'home' }
  | { view: 'detail'; boardSlug: BoardSlug; tab: BoardTabId };

const VALID_TAB_IDS = new Set<BoardTabId>([
  'gioi-thieu',
  'the-le',
  'the-thuc',
  'giai-thuong',
  'giai-phu',
]);

function parseHashRoute(hash: string): AppRoute {
  const match = hash.match(/^#\/(robotics|drone)(?:\/([^/?#]+))?/i);
  if (!match) {
    return { view: 'home' };
  }

  const boardSlug = match[1].toLowerCase() as BoardSlug;
  const rawTab = (match[2] || 'gioi-thieu').toLowerCase() as BoardTabId;
  const boardTabs = BOARD_TABS[boardSlug];
  const validTab =
    VALID_TAB_IDS.has(rawTab) && boardTabs.some((t) => t.id === rawTab)
      ? rawTab
      : 'gioi-thieu';

  return { view: 'detail', boardSlug, tab: validTab };
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parseHashRoute(typeof window !== 'undefined' ? window.location.hash : '')
  );
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardType>('Robotics');

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseHashRoute(window.location.hash);
      setRoute(nextRoute);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenRegister = useCallback((board?: BoardType) => {
    if (board) {
      setSelectedBoard(board);
    }
    setIsRegisterOpen(true);
  }, []);

  const handleNavigateBoard = useCallback(
    (slug: BoardSlug, tab: BoardTabId = 'gioi-thieu') => {
      const wasHome = route.view === 'home';
      const targetHash = `#/${slug}/${tab}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
      setRoute({ view: 'detail', boardSlug: slug, tab });
      if (wasHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [route.view]
  );

  const handleNavigateHome = useCallback(() => {
    if (window.location.hash !== '#hero') {
      window.location.hash = '#hero';
    }
    setRoute({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      const normalizedHash = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
      const wasDetail = route.view === 'detail';

      if (window.location.hash !== normalizedHash) {
        window.location.hash = normalizedHash;
      }
      setRoute({ view: 'home' });

      const scrollToTarget = () => {
        const el = document.querySelector(normalizedHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      if (wasDetail) {
        window.setTimeout(scrollToTarget, 60);
      } else {
        scrollToTarget();
      }
    },
    [route.view]
  );

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex flex-col font-sans selection:bg-[#F37021] selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar
        onOpenRegister={() =>
          handleOpenRegister(
            route.view === 'detail' && route.boardSlug === 'drone'
              ? 'Drone Soccer'
              : 'Robotics'
          )
        }
        onNavigateSection={handleNavigateSection}
        onNavigateBoard={handleNavigateBoard}
      />

      {/* Main Content: Either Homepage or Shared Board Detail Page */}
      {route.view === 'detail' ? (
        <BoardDetailPage
          boardSlug={route.boardSlug}
          activeTab={route.tab}
          onNavigateHome={handleNavigateHome}
          onSelectBoardAndTab={handleNavigateBoard}
          onOpenRegister={handleOpenRegister}
        />
      ) : (
        <main className="flex-1">
          {/* Section 1: Hero */}
          <Hero onOpenRegister={() => handleOpenRegister('Robotics')} />

          {/* Section 2: Media Carousel & Lightbox */}
          <MediaCarousel />

          {/* Section 3: Timeline & Journey */}
          <Timeline onOpenRegister={() => handleOpenRegister('Robotics')} />

          {/* Section 4: Competition Boards & Mascots */}
          <BoardCards
            onViewBoardDetail={(slug) => handleNavigateBoard(slug, 'gioi-thieu')}
          />

          {/* Section 5: Prize Structure */}
           {/* <PrizesSection /> */}
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialBoard={selectedBoard}
      />
    </div>
  );
}
