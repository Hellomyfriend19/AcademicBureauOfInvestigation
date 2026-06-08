/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, Send, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ABI_LOGO_URL } from '../utils/constants';

interface HomeProps {
  onNavigate: (view: 'wanted' | 'about' | 'home') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [showGlobalTipModal, setShowGlobalTipModal] = useState(false);
  const [informantName, setInformantName] = useState('');
  const [suspectName, setSuspectName] = useState('');
  const [tipDetails, setTipDetails] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [tipCode, setTipCode] = useState<string | null>(null);

  const handleGlobalTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipDetails) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setTipCode(`ABI-GLOBAL-${Math.floor(200000 + Math.random() * 700000)}`);
      // Clear values
      setInformantName('');
      setSuspectName('');
      setTipDetails('');
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      
      {/* Decorative Warning Alert Header */}
      <div className="border border-brand-red/35 bg-brand-red/5 p-4 rounded text-center mb-10 text-gray-300 font-mono text-xs max-w-3xl mx-auto flex items-center justify-center gap-3">
        <AlertTriangle className="text-brand-red animate-bounce w-5 h-5 shrink-0" />
        <span>
          <strong>LAW ENFORCEMENT ADVISORY:</strong> STRICT ACADEMIC SURVEILLANCE UNDERWAY. CORES REPORTING ALL CITATION PATTERNS.
        </span>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Animated stamp-in of ABI Logo Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 18, 
            delay: 0.2 
          }}
          className="relative filter drop-shadow-[0_0_20px_rgba(212,175,55,0.35)] w-52 h-52 md:w-64 md:h-64 mb-8"
        >
          {/* Circular rotators overlaying behind / over the logo */}
          <div className="absolute inset-0 border border-brand-accent/20 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-2 border-2 border-dashed border-brand-accent/10 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />
          
          <img
            src={ABI_LOGO_URL}
            alt="ABI Crest"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter grayscale contrast-110 active:scale-95 transition-transform border border-brand-accent/30 p-2"
          />
        </motion.div>

        {/* Animated Department Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent font-bold block mb-3">
            Federal Department of Academic Integrity
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-extrabold tracking-tight mb-6">
            WE NEED YOUR HELP
          </h1>
          
          <p className="font-mono text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10 uppercase text-justify border-y border-brand-accent/15 py-6">
            The Academic Bureau of Investigation (ABI) seeks immediate assistance in locating key academic deviants wanted for high integrity crimes, including plagiarism conspiracies, late homework drafts, formatting malfeasance, and citation laundering. Do not attempt confrontation. Submit tips securely below.
          </p>
        </motion.div>

        {/* Action Button CTA Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center h-16 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('wanted')}
            className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-black font-mono font-bold uppercase tracking-widest text-xs py-4 px-8 rounded cursor-pointer transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>VIEW MOST WANTED REGISTER</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowGlobalTipModal(true)}
            className="w-full sm:w-auto bg-brand-red hover:bg-[#8b1414] text-white font-mono font-bold uppercase tracking-widest text-xs py-4 px-8 rounded cursor-pointer transition-colors shadow-[0_0_20px_rgba(178,34,34,0.35)] flex items-center justify-center gap-2 animate-pulse"
          >
            <Send className="w-4 h-4" />
            <span>SUBMIT ANONYMOUS TIP</span>
          </motion.button>
        </motion.div>

        {/* Bureau Status Dossier Board */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 w-full max-w-4xl border border-brand-accent/20 bg-brand-tertiary rounded p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase">ACTIVE FIELD OPERATIONS</div>
            <div className="mt-1 font-serif text-2xl font-bold text-white uppercase">9 SECURE</div>
          </div>
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase">SURVEILLANCE GROUPS</div>
            <div className="mt-1 font-serif text-2xl font-bold text-white uppercase">3 QUADRANTS</div>
          </div>
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase">CASE CLOSURE RATE</div>
            <div className="mt-1 font-serif text-2xl font-bold text-white uppercase">98.4%</div>
          </div>
          <div>
            <div className="font-mono text-xs text-gray-500 uppercase">CURRENT GRID SECURITY</div>
            <div className="mt-1 font-serif text-2xl font-bold text-brand-accent uppercase">HIGH ALERT</div>
          </div>
        </motion.div>
      </div>

      {/* GLOBAL TIP MODAL DIALOG */}
      <AnimatePresence>
        {showGlobalTipModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-primary/95"
            onClick={() => setShowGlobalTipModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-brand-secondary border border-brand-red rounded-lg p-6 md:p-8 max-w-xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Classified Stamp Backing */}
              <div className="absolute top-4 right-4 stamp-classified px-4 py-1 text-[10px] font-bold select-none pointer-events-none uppercase">
                EMERGENCY LINE
              </div>

              <h2 className="text-xl font-mono text-white tracking-widest uppercase mb-2 flex items-center gap-2">
                <Shield className="text-brand-red w-5 h-5 shrink-0" />
                <span>ABI CENTRAL TIP CENTER</span>
              </h2>
              <p className="text-xs font-mono text-gray-400 mb-6">
                Transmit anonymous observations directly to general headquarters duty agents. Keep intelligence concise and true.
              </p>

              {tipCode ? (
                <div className="text-center font-mono py-6 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto animate-bounce" />
                  <h3 className="text-white font-bold text-sm">TRANSMISSION SEAMLESSLY DISPATCHED</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    The report has bypassed university local domains and is securely registered. Thank you.
                  </p>
                  <div className="bg-brand-primary p-3 rounded max-w-xs mx-auto border border-brand-accent/20">
                    <span className="text-[9px] text-gray-500 block">TRACE RECORD TICKET:</span>
                    <span className="text-brand-accent font-bold text-sm select-all tracking-wider">{tipCode}</span>
                  </div>
                  <button
                    onClick={() => {
                      setTipCode(null);
                      setShowGlobalTipModal(false);
                    }}
                    className="mt-4 bg-brand-accent text-black text-xs font-mono py-2 px-6 rounded uppercase font-bold cursor-pointer"
                  >
                    CLOSE TIP CHANNEL
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGlobalTipSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-brand-accent mb-1 uppercase text-[10px]">Your Pseudonym (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Scholar X"
                      value={informantName}
                      onChange={(e) => setInformantName(e.target.value)}
                      className="w-full bg-brand-primary border border-brand-accent/20 focus:border-brand-accent outline-none text-white p-3 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-accent mb-1 uppercase text-[10px]">Suspect Name of Academic Deviant (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Professor Moriarty or Marcus Sterling"
                      value={suspectName}
                      onChange={(e) => setSuspectName(e.target.value)}
                      className="w-full bg-brand-primary border border-brand-accent/20 focus:border-brand-accent outline-none text-white p-3 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-accent mb-1 uppercase text-[10px]">Observation Details / Crime Specifics *</label>
                    <textarea
                      required
                      placeholder="Input the location, academic offenses, double-spaced files, or AI detection reports..."
                      rows={4}
                      value={tipDetails}
                      onChange={(e) => setTipDetails(e.target.value)}
                      className="w-full bg-brand-primary border border-brand-accent/20 focus:border-brand-accent outline-none text-white p-3 rounded resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowGlobalTipModal(false)}
                      className="border border-brand-accent/20 hover:border-white text-gray-400 hover:text-white px-4 py-2.5 rounded uppercase tracking-wider text-[10px] cursor-pointer"
                    >
                      ABORT
                    </button>
                    <button
                      type="submit"
                      disabled={isSending || !tipDetails}
                      className="bg-brand-red hover:bg-[#8b1414] disabled:bg-gray-800 disabled:text-gray-500 text-white px-5 py-2.5 rounded uppercase tracking-wider font-bold cursor-pointer flex items-center gap-2"
                    >
                      {isSending ? 'SENDING SECURE...' : 'TRANSMIT SECURELY'}
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
