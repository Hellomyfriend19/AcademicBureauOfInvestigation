/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldAlert, Eye, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Fugitive } from '../types';

interface FugitiveDetailProps {
  fugitive: Fugitive;
  onBack: () => void;
}

export default function FugitiveDetail({ fugitive, onBack }: FugitiveDetailProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [tipName, setTipName] = useState('');
  const [tipLocation, setTipLocation] = useState('');
  const [tipDetails, setTipDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const handleSubmitTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipDetails) return;

    setIsSubmitting(true);
    // Simulate high-security encrypted transmission
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `ABI-TIP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmitResult(code);
      // Clear fields
      setTipName('');
      setTipLocation('');
      setTipDetails('');
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Back button with official micro-animations */}
      <motion.button
        whileHover={{ x: -6 }}
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-mono text-brand-accent hover:text-white transition-colors cursor-pointer bg-brand-secondary py-2 px-4 rounded border border-brand-accent/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← RETURN TO FUGITIVES ROSTER</span>
      </motion.button>

      {/* Grid container representing a physical classified folder file */}
      <div className="bg-brand-secondary border border-brand-accent/30 rounded-lg p-6 md:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Dossier absolute background branding */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/2 rounded-full blur-3xl pointer-events-none" />
        
        {/* Classification Header Banner */}
        <div className="border-b border-dashed border-brand-accent/30 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-widest text-brand-accent bg-brand-accent/10 py-1 px-3 rounded uppercase border border-brand-accent/20">
                OFFICIAL RECORD // DOSSIER NO. {fugitive.caseNumber}
              </span>
              {fugitive.isArmedAndDangerous && (
                <span className="text-[11px] font-mono tracking-widest text-white bg-brand-red py-1 px-3 rounded uppercase font-bold animate-[alert-pulse_1s_infinite]">
                  Armed & Dangerous
                </span>
              )}
            </div>
            
            <h1 className="mt-4 text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
              {fugitive.name}
            </h1>
          </div>
          
          {/* Classification double-bordered retro stamp */}
          <div className="shrink-0 font-mono stamp-classified px-6 py-2.5 font-bold text-center text-sm uppercase max-md:mx-auto">
            {fugitive.classification}
          </div>
        </div>

        {/* Core details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          
          {/* LEFT COLUMN: Crime info, description paragraphs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block">Primary Offense Charge</span>
                <span className="font-serif text-xl md:text-2xl text-brand-accent leading-tight font-semibold block mt-1">
                  {fugitive.crimeCommited}
                </span>
              </div>

              <div className="border-t border-brand-accent/20 pt-6">
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Case Facts & Investigative Details</h4>
                <div className="font-serif text-gray-300 space-y-4 leading-relaxed text-base italic md:text-lg">
                  {fugitive.crimeDetails.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-block showing warning specifications */}
            <div className="mt-8 bg-brand-red/5 border border-brand-red/30 rounded p-4 flex gap-4 items-start">
              <ShieldAlert className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono font-bold text-brand-red text-xs uppercase tracking-wider">CAUTIONARY DIRECTIVE</h5>
                <p className="font-mono text-[11px] text-gray-400 mt-1">
                  If analyzed or spotted in the library, avoid direct eye contact. Do not challenge their thesis statements. Immediately call the ABI High Commission or submit a report below.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Primary Mugshot */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-brand-primary border-4 border-brand-accent/25 rounded p-4 relative shadow-[0_0_20px_rgba(2,4,8,0.8)]">
              {/* Image with alignment framing guides */}
              <div className="absolute top-2 left-2 text-xs font-mono text-gray-600 select-none pointer-events-none">[+]</div>
              <div className="absolute top-2 right-2 text-xs font-mono text-gray-600 select-none pointer-events-none">[+]</div>
              <div className="absolute bottom-2 left-2 text-xs font-mono text-gray-600 select-none pointer-events-none">[+]</div>
              <div className="absolute bottom-2 right-2 text-xs font-mono text-gray-600 select-none pointer-events-none">[+]</div>

              <div className="w-full h-80 bg-gray-950 overflow-hidden relative border border-gray-900 pointer-events-none">
                <img
                  src={fugitive.imageURL}
                  alt={fugitive.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-75 contrast-105"
                />
              </div>

              <div className="mt-4 text-center font-mono text-[10px] text-gray-500">
                IDENTIFICATION PHOTO // ABI RECORD UNIT
              </div>
            </div>

            {/* Secondary Confidential Stamp on photo */}
            <div className="stamp-confidential px-5 py-1 text-xs uppercase tracking-widest font-bold mt-4 font-mono select-none">
              CONFIDENTIAL FILE
            </div>
          </div>
        </div>

        {/* ADDITIONAL GALLERY PHOTOS SECTION */}
        {fugitive.additionalPhotos && fugitive.additionalPhotos.length > 0 && (
          <div className="mt-12 border-t border-brand-accent/20 pt-8">
            <h3 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>SUPPLEMENTARY CASE EVIDENCE IMAGES</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {fugitive.additionalPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.04, borderColor: '#d4af37' }}
                  onClick={() => setActivePhoto(photo)}
                  className="h-32 bg-brand-primary border border-brand-accent/15 rounded overflow-hidden cursor-pointer p-1 relative group"
                >
                  <img
                    src={photo}
                    alt={`${fugitive.name} - Evidence ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/60 text-gray-400 px-1 py-0.5 rounded">
                    IMG-{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* INTERACTIVE TIP SUBMISSION SECTION */}
        <div className="mt-12 border-t border-brand-accent/20 pt-8">
          <div className="bg-brand-primary/80 p-6 rounded-lg border border-brand-accent/15">
            <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-accent" />
              <span>SUBMIT ENCRYPTED ANONYMOUS TIP</span>
            </h3>
            <p className="font-mono text-xs text-gray-400 mb-6 leading-relaxed">
              Have you seen this individual on campus? Submit sightings or information anonymously. 
              The connection is routed through multiple proxy university networks.
            </p>

            <AnimatePresence mode="wait">
              {submitResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-brand-tertiary border border-brand-accent/35 rounded p-6 text-center text-gray-300 font-mono"
                >
                  <CheckCircle className="w-12 h-12 text-brand-accent mx-auto mb-4 animate-bounce" />
                  <h4 className="text-white font-bold text-base mb-2">TRANSMISSION COMPLETED SECURELY</h4>
                  <p className="text-xs text-paragraph mb-4 text-gray-400 max-w-lg mx-auto">
                    Your intel report was parsed and stored at high authority. Thank you for safeguarding the university quad.
                  </p>
                  <div className="bg-brand-primary p-3 rounded max-w-xs mx-auto border border-brand-accent/20">
                    <span className="text-gray-500 text-[10px] block">CONFIRMATION TICKET:</span>
                    <span className="text-brand-accent font-bold text-sm select-all tracking-wider">{submitResult}</span>
                  </div>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="mt-6 text-xs text-brand-accent hover:underline cursor-pointer"
                  >
                    SUBMIT ANOTHER SIGHTING RECORD
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitTip} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-2">Informant Pseudonym (Optional)</label>
                      <input
                        type="text"
                        value={tipName}
                        onChange={(e) => setTipName(e.target.value)}
                        placeholder="e.g., Hidden Scribe"
                        className="w-full bg-brand-secondary border border-brand-accent/20 focus:border-brand-accent text-white font-mono text-xs p-3 rounded outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase mb-2">Sighting Location / Seminar Code</label>
                      <input
                        type="text"
                        value={tipLocation}
                        onChange={(e) => setTipLocation(e.target.value)}
                        placeholder="e.g., Library Annex 3 / PHY-201"
                        className="w-full bg-brand-secondary border border-brand-accent/20 focus:border-brand-accent text-white font-mono text-xs p-3 rounded outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-2">Sighting Details / Observable Suspicious Activities *</label>
                    <textarea
                      required
                      rows={4}
                      value={tipDetails}
                      onChange={(e) => setTipDetails(e.target.value)}
                      placeholder="Specify dates, actions, matching clothing, and behavior patterns. Minimum details required..."
                      className="w-full bg-brand-secondary border border-brand-accent/20 focus:border-brand-accent text-white font-mono text-xs p-3 rounded outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !tipDetails}
                      className="bg-brand-red hover:bg-[#8b1414] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-mono text-xs uppercase font-bold py-3 px-6 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-lg active:translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>ENCRYPTING PROTOCOL TRANSMISSION...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>TRANSMIT CLASSIFIED DATA REPORT</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 bg-brand-primary/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] overflow-hidden bg-brand-secondary border border-brand-accent rounded p-2 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto}
                alt="Case Evidence Highlight"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain grayscale"
              />
              <div className="text-center font-mono text-[10px] text-gray-400 mt-2">
                EXAMINATION KEY OVERRIDE // PRESS OUTSIDE TO CLOSE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
