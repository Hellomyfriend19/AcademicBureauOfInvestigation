/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Radio, Menu, X, HelpCircle, FileSearch, HelpCircle as HelpIcon, Send } from 'lucide-react';
import { ViewType } from '../types';
import { ABI_LOGO_URL } from '../utils/constants';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenGlobalTip: () => void;
}

export default function Header({ currentView, onNavigate, onOpenGlobalTip }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'GENERAL HEADQUARTERS', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'wanted', label: 'MOST WANTED REGISTRY', icon: <FileSearch className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'BUREAU CHARTER', icon: <HelpIcon className="w-3.5 h-3.5" /> },
  ];

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-brand-primary border-b border-brand-accent/30 z-40 relative shadow-[0_4px_30px_rgba(2,4,8,0.8)] backdrop-blur-md">
      
      {/* Official Top Technical Spec Accent Bar */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/75 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* ABI CREST & ACRONYM BRANDING */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 shrink-0 filter brightness-95">
            <div className="absolute inset-0 bg-brand-accent/10 rounded-full group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
            <img
              src={ABI_LOGO_URL}
              alt="ABI Crest Mini"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 border border-brand-accent/30 p-0.5"
            />
          </div>

          <div className="font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-lg tracking-wider">A . B . I .</span>
              <span className="text-[9px] font-bold text-brand-red border border-brand-red/30 px-1 rounded flex items-center gap-1 bg-brand-red/5">
                <Radio className="w-2 h-2 animate-ping" />
                <span>SECURE HOST</span>
              </span>
            </div>
            <div className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-0.5">
              Academic Bureau of Investigation
            </div>
          </div>
        </div>

        {/* DESKTOP MAIN NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1.5 font-mono text-xs">
          {menuItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'wanted' && currentView === 'detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded transition-all duration-300 cursor-pointer border ${
                  isActive 
                    ? 'bg-brand-accent/15 border-brand-accent/60 text-brand-accent shadow-[0_0_15px_rgba(212,175,55,0.15)] font-bold' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-brand-accent/5 hover:border-brand-accent/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenGlobalTip}
            className="font-mono text-[10px] bg-brand-red hover:bg-[#8b1414] text-white font-bold tracking-widest px-4 py-2.5 rounded border border-brand-red/30 flex items-center gap-2 cursor-pointer shadow-lg active:translate-y-0.5 animate-pulse transition-all"
          >
            <Send className="w-3 h-3" />
            <span>REPORT A SIGHTING</span>
          </button>
        </div>

        {/* MOBILE TOGGLE TRIGGER */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onOpenGlobalTip}
            className="font-mono text-[9px] bg-brand-red font-bold tracking-widest p-2 rounded cursor-pointer animate-pulse"
          >
            REPORT TIP
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-gray-800 text-brand-accent hover:text-white hover:border-brand-accent/50 rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANDED MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-brand-accent/10 bg-brand-secondary w-full font-mono text-xs overflow-hidden absolute top-20 left-0 shadow-xl"
          >
            <div className="px-4 py-6 space-y-3">
              {menuItems.map((item) => {
                const isActive = currentView === item.id || (item.id === 'wanted' && currentView === 'detail');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded border ${
                      isActive 
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent font-bold' 
                        : 'border-gray-900 text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
