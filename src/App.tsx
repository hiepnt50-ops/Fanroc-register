/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MediaCarousel } from './components/MediaCarousel.tsx';
import { Timeline } from './components/Timeline.tsx';
import { BoardCards } from './components/BoardCards.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';
import { Footer } from './components/Footer.tsx';
import { BoardType } from './types.ts';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardType>('Robotics');

  const handleOpenRegister = (board?: BoardType) => {
    if (board) {
      setSelectedBoard(board);
    }
    setIsRegisterOpen(true);
  };

  const handleSelectBoard = (board: BoardType) => {
    setSelectedBoard(board);
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex flex-col font-sans selection:bg-[#F37021] selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister('Drone Soccer')} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero onOpenRegister={() => handleOpenRegister('Robotics')} />

        {/* Section 2: Media Carousel & Lightbox */}
        <MediaCarousel />

        {/* Section 3: Timeline & Journey */}
        <Timeline onOpenRegister={() => handleOpenRegister('Robotics')} />

        {/* Section 4: Competition Boards & Registration Triggers */}
        <BoardCards onSelectBoard={handleSelectBoard} />
      </main>

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
