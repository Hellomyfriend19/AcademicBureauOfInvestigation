/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, SlidersHorizontal, RefreshCw, Radio, HardDrive, HelpCircle } from 'lucide-react';
import { Fugitive, ViewType } from './types';
import { fetchFugitives } from './utils/parser';

// Subcomponents
import Header from './components/Header';
import Ticker from './components/Ticker';
import NoiseOverlays from './components/NoiseOverlays';
import Home from './components/Home';
import About from './components/About';
import FugitiveCard from './components/FugitiveCard';
import FugitiveDetail from './components/FugitiveDetail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedFugitive, setSelectedFugitive] = useState<Fugitive | null>(null);
  
  const [fugitives, setFugitives] = useState<Fugitive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyArmed, setOnlyArmed] = useState(false);
  const [classificationFilter, setClassificationFilter] = useState('ALL');

  // Global Sighting modal triggers inside the application
  const [globalTipOpen, setGlobalTipOpen] = useState(false);
  const [globalTipName, setGlobalTipName] = useState('');
  const [globalTipSuspect, setGlobalTipSuspect] = useState('');
  const [globalTipDetails, setGlobalTipDetails] = useState('');
  const [isSendingTip, setIsSendingTip] = useState(false);
  const [globalTipCode, setGlobalTipCode] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchFugitives();
      setFugitives(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'CLASSIFIED — DATA UNAVAILABLE');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFugitive = (fugitive: Fugitive) => {
    setSelectedFugitive(fugitive);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitGlobalTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalTipDetails) return;
    setIsSendingTip(true);
    setTimeout(() => {
      setIsSendingTip(false);
      setGlobalTipCode(`ABI-M-TIP-${Math.floor(800000 + Math.random() * 199999)}`);
      setGlobalTipName('');
      setGlobalTipSuspect('');
      setGlobalTipDetails('');
    }, 2000);
  };

  // Filter listings based on query parameters
  const filteredFugitives = fugitives.filter((f) => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.crimeCommited.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesArmed = onlyArmed ? f.isArmedAndDangerous === true : true;
    
    const matchesClassification =
      classificationFilter === 'ALL' || f.classification.includes(classificationFilter);

    return matchesSearch && matchesArmed && matchesClassification;
  });

  return (
    <div className="min-h-screen bg-brand-primary text-gray-100 flex flex-col relative select-none font-sans overflow-x-hidden pt-crt-flicker">
      
      {/* Visual background atmospheric overlays */}
      <NoiseOverlays />

      {/* Persistent global header */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onOpenGlobalTip={() => setGlobalTipOpen(true)}
      />

      {/* Primary Ticker feed */}
      <Ticker />

      {/* App master content view */}
      <main className="flex-grow py-6 md:py-10 z-10">
        <AnimatePresence mode="wait">
          
          {/* VIEW: HOME PORTAL */}
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Home onNavigate={(v) => handleNavigate(v as any)} />
            </motion.div>
          )}

          {/* VIEW: MOST WANTED REGISTER GRID */}
          {currentView === 'wanted' && (
            <motion.div
              key="wanted-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 md:px-6"
            >
              {/* Registry Directory Header Banner */}
              <div className="border-b border-brand-accent/20 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block font-bold">
                    SECURITY COMMAND MATRIX
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif text-white font-extrabold uppercase mt-1">
                    Most Wanted Registry
                  </h1>
                </div>

                <div className="font-mono text-xs text-gray-500 bg-brand-secondary px-3 py-1.5 rounded border border-brand-accent/15">
                  RECORDED FILES // {filteredFugitives.length} OF {fugitives.length} SUSPECTS INDEXED
                </div>
              </div>

              {/* LOADING COMPLETED CONDITION */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 font-mono text-xs gap-4 text-gray-400">
                  <RefreshCw className="w-8 h-8 text-brand-accent animate-spin" />
                  <span className="tracking-widest uppercase animate-pulse">CONNECTING TO ABI INTELLIGENCE CORE COG...</span>
                </div>
              ) : error ? (
                /* COMPLIANT FALLBACK CRITICAL RED CARD ERROR */
                <div className="max-w-2xl mx-auto bg-black border-2 border-brand-red rounded p-8 text-center my-12 relative shadow-[0_0_30px_rgba(178,34,34,0.3)]">
                  <div className="absolute top-2 right-2 stamp-classified px-4 py-1 text-[10px] font-bold select-none rotate-[0deg] uppercase">
                    ENFORCEMENT HALT
                  </div>
                  <ShieldAlert className="w-16 h-16 text-brand-red mx-auto mb-6 animate-pulse" />
                  
                  <h2 className="text-2xl font-serif font-black tracking-widest text-brand-red uppercase mb-4">
                    CLASSIFIED — DATA UNAVAILABLE
                  </h2>
                  
                  <p className="font-mono text-xs text-gray-400 mb-6 leading-relaxed max-w-lg mx-auto uppercase">
                    Your clearance has been revoked or the secure text database file is currently offline. 
                    Ensure proxy networks are tuned and retry database connectivity.
                  </p>
                  
                  <button
                    onClick={loadData}
                    className="bg-brand-red hover:bg-[#8b1414] text-white font-mono text-xs px-6 py-3 rounded cursor-pointer font-bold tracking-widest uppercase flex items-center gap-2 mx-auto shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>RETRY CONNECTIVITY SEQUENCE</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* TERMINAL-STYLE SEARCH AND FILTER BLOCK */}
                  <div className="bg-brand-secondary border border-brand-accent/15 rounded p-4 md:p-6 mb-10 font-mono text-xs">
                    <div className="flex items-center gap-2 text-brand-accent pb-4 border-b border-brand-accent/15 mb-5 font-bold uppercase tracking-wider">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Intelligence Search Filter</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Search box input */}
                      <div className="md:col-span-5 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="FILTER SUSPECTS BY NAME, CRIME, OR CASE..."
                          className="w-full bg-brand-primary border border-brand-accent/15 focus:border-brand-accent text-white p-3.5 pl-10 rounded text-xs placeholder:text-gray-600 outline-none transition-colors"
                        />
                      </div>

                      {/* Dropdown Filters */}
                      <div className="md:col-span-4">
                        <select
                          value={classificationFilter}
                          onChange={(e) => setClassificationFilter(e.target.value)}
                          className="w-full bg-brand-primary border border-brand-accent/15 focus:border-brand-accent text-white p-3.5 rounded text-xs outline-none cursor-pointer transition-colors"
                        >
                          <option value="ALL">ALL SECURITY CLASSIFICATIONS</option>
                          <option value="INSUBORDINATION">ACADEMIC INSUBORDINATION</option>
                          <option value="PLAGIARISM">PLAGIARISM CONSPIRACY</option>
                          <option value="SABOTAGE">PEER-REVIEW SABOTAGE</option>
                          <option value="FRAUD">SYLLABUS FRAUD</option>
                        </select>
                      </div>

                      {/* Armed and Dangerous checkbox button override toggle */}
                      <div className="md:col-span-3 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => setOnlyArmed(!onlyArmed)}
                          className={`w-full py-3 px-4 border rounded font-mono font-bold tracking-wider text-center uppercase transition-all cursor-pointer ${
                            onlyArmed
                              ? 'bg-brand-red/15 border-brand-red text-brand-red shadow-[0_0_10px_rgba(178,34,34,0.15)]'
                              : 'bg-brand-primary border-brand-accent/15 text-gray-400 hover:text-white hover:border-brand-accent/25'
                          }`}
                        >
                          {onlyArmed ? '⚠️ DANGEROUS ONLY SELECTED' : 'SHOW ALL OFFENDERS'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MAIN GRID SHOWCASE */}
                  {filteredFugitives.length === 0 ? (
                    <div className="border border-dashed border-brand-accent/20 p-16 rounded text-center font-mono text-gray-500 uppercase text-xs">
                      <span>0 DOSSIER ENTRIES MATCHED THE ACTIVE SELECTION PARAMS</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredFugitives.map((fugitive) => (
                        <FugitiveCard
                          key={fugitive.id}
                          fugitive={fugitive}
                          onClick={() => handleSelectFugitive(fugitive)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* VIEW: FUGITIVE DOSSIER FULL SPEC DETAIL OVERLAY */}
          {currentView === 'detail' && selectedFugitive && (
            <motion.div
              key="detail-view"
              className="w-full"
            >
              <FugitiveDetail 
                fugitive={selectedFugitive} 
                onBack={() => handleNavigate('wanted')} 
              />
            </motion.div>
          )}

          {/* VIEW: ABOUT / MISSION OBJECTIVES */}
          {currentView === 'about' && (
            <motion.div
              key="about-view"
            >
              <About />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* PERSISTENT LEGAL GOVERNMENT FOOTER */}
      <footer className="bg-brand-primary text-gray-700 text-[10px] font-mono border-t border-brand-accent/10 py-6 text-center tracking-widest uppercase z-30">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div>© 2026 ACADEMIC BUREAU OF INVESTIGATION (ABI) // ALL RIGHTS RESERVED</div>
          <div className="text-gray-800">
            THIS SITE IS A CREATIVE FICTIONAL PARODY INSPIRED BY TRADITIONAL SECURITY INTERFACES. ACADEMIC INTEGRITY IS VITAL TO GLOBAL INTELLIGENCE.
          </div>
        </div>
      </footer>

      {/* GENERAL SIGHTING FLOATING DIALOG OVERLAY */}
      <AnimatePresence>
        {globalTipOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGlobalTipOpen(false)}
            className="fixed inset-0 bg-brand-primary/95 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-secondary border border-brand-red rounded p-6 md:p-8 max-w-md w-full relative font-mono text-xs"
            >
              <div className="absolute top-4 right-4 stamp-classified px-3 py-0.5 text-[8px] font-bold select-none uppercase">
                CRITICAL PATH
              </div>

              <h2 className="text-white text-sm font-bold uppercase border-b border-brand-accent/15 pb-3 mb-4 tracking-wider flex items-center gap-2">
                <ShieldAlert className="text-brand-red w-4 h-4" />
                <span>REPORT SUSPECT SIGHTING</span>
              </h2>

              {globalTipCode ? (
                <div className="text-center py-6 space-y-4">
                  <HardDrive className="w-12 h-12 text-brand-accent mx-auto animate-pulse" />
                  <h3 className="text-white font-bold">TRANSMISSION ENCRYPTED</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed max-w-xs mx-auto">
                    Your dispatch report was packaged and routed through deep academic proxy layers automatically.
                  </p>
                  <div className="bg-brand-primary p-3 rounded border border-brand-accent/15">
                    <span className="text-[9px] text-gray-500 block">ENCRYPTED TICKET REGISTER:</span>
                    <span className="text-brand-accent font-bold select-all tracking-widest">{globalTipCode}</span>
                  </div>
                  <button
                    onClick={() => {
                      setGlobalTipCode(null);
                      setGlobalTipOpen(false);
                    }}
                    className="mt-4 bg-brand-red hover:bg-[#8b1414] text-white px-4 py-2 rounded text-[10px] uppercase font-bold cursor-pointer"
                  >
                    CLOSE TIP CHANNEL
                  </button>
                </div>
              ) : (
                <form onSubmit={submitGlobalTip} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">SUSPECT NAME OR DESCRIPTION *</label>
                    <input
                      type="text"
                      required
                      value={globalTipSuspect}
                      onChange={(e) => setGlobalTipSuspect(e.target.value)}
                      placeholder="e.g. MARCUS STERLING OR MAN IN BLACK PARKA"
                      className="w-full bg-brand-primary border border-brand-accent/15 focus:border-brand-accent text-white p-3 rounded outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">YOUR PSEUDONYM (OPTIONAL)</label>
                    <input
                      type="text"
                      value={globalTipName}
                      onChange={(e) => setGlobalTipName(e.target.value)}
                      placeholder="e.g. INFORMANT DELTA"
                      className="w-full bg-brand-primary border border-brand-accent/15 focus:border-brand-accent text-white p-3 rounded outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">SIGHTING INFORMATION / EVIDENCE CORES *</label>
                    <textarea
                      required
                      value={globalTipDetails}
                      onChange={(e) => setGlobalTipDetails(e.target.value)}
                      placeholder="DESCRIBE OBSERVABLE BEHAVIORS, CLOTHING MATCHES, CODES, AND LOCATIONS..."
                      rows={4}
                      className="w-full bg-brand-primary border border-brand-accent/15 focus:border-brand-accent text-white p-3 rounded resize-none outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setGlobalTipOpen(false)}
                      className="border border-brand-accent/15 hover:border-white text-gray-500 hover:text-white px-4 py-2 rounded text-[10px] uppercase cursor-pointer"
                    >
                      ABORT
                    </button>
                    <button
                      type="submit"
                      disabled={isSendingTip || !globalTipSuspect || !globalTipDetails}
                      className="bg-brand-red hover:bg-[#8b1414] disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold px-5 py-2 rounded text-[10px] uppercase cursor-pointer flex items-center gap-1.5"
                    >
                      {isSendingTip ? 'TRANSMITTING...' : 'DISPATCH REPORT'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
