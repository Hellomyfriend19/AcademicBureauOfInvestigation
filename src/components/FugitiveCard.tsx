/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Fugitive } from '../types';

interface FugitiveCardProps {
  fugitive: Fugitive;
  onClick: () => void;
  key?: string;
}

export default function FugitiveCard({ fugitive, onClick }: FugitiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.25)',
      }}
      onClick={onClick}
      className="group relative cursor-pointer bg-brand-tertiary border border-brand-accent/30 hover:border-brand-accent transition-colors duration-300 rounded overflow-hidden flex flex-col h-[480px] w-full shadow-lg"
    >
      {/* Decorative metal corner screws for high-security dossier aesthetic */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-600/60 border border-gray-400/40 z-20 shadow-inner" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-600/60 border border-gray-400/40 z-20 shadow-inner" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-600/60 border border-gray-400/40 z-20 shadow-inner" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-600/60 border border-gray-400/40 z-20 shadow-inner" />

      {/* Subtle identification numbering in background */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-brand-accent/20 select-none z-10 pointer-events-none">
        DOSSIER // {fugitive.caseNumber}
      </div>

      {/* Rugged "WANTED" Stamp Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] select-none pointer-events-none z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
        <div className="border-4 border-dashed border-brand-red px-6 py-2 rounded text-shadow-[0_0_2px_rgba(178,34,34,0.3)] text-brand-red font-mono font-bold text-3xl tracking-widest bg-brand-primary/85">
          WANTED
        </div>
      </div>

      {/* Image Container with red grid filter or scan overlay */}
      <div className="relative h-64 overflow-hidden border-b border-brand-accent/30 shrink-0">
        <div className="absolute inset-0 bg-brand-red/5 mix-blend-color-burn z-10" />
        {fugitive.imageURL ? (
          <img
            src={fugitive.imageURL}
            alt={fugitive.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-secondary flex flex-col items-center justify-center text-brand-accent/30">
            <span className="font-mono text-xs">NO IMAGE AVAILABLE</span>
            <span className="font-mono text-[9px] mt-1">{fugitive.caseNumber}</span>
          </div>
        )}
        {/* Top Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-tertiary via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Badge/Tag Section */}
      <div className="px-5 pt-4 pb-2 flex-grow flex flex-col justify-between">
        <div>
          {/* Crime label */}
          <div className="text-[10px] tracking-widest font-mono text-brand-accent font-bold uppercase truncate bg-brand-accent/10 py-1 px-2.5 rounded border border-brand-accent/20 w-fit">
            {fugitive.crimeCommited}
          </div>

          {/* Fugitive Name */}
          <h3 className="mt-3 text-2xl font-serif text-white font-medium group-hover:text-brand-accent transition-colors line-clamp-2 leading-tight">
            {fugitive.name}
          </h3>
        </div>

        {/* Footer info: Classification & Status */}
        <div className="mt-4 pt-3 border-t border-dashed border-brand-accent/20 font-mono text-[11px] flex justify-between items-center text-gray-400">
          <div>
            <span className="text-gray-600 mr-1">CASE:</span>
            <span className="text-gray-300">{fugitive.caseNumber}</span>
          </div>
          {fugitive.isArmedAndDangerous && (
            <span className="text-brand-red font-bold tracking-wider animate-[alert-pulse_1.5s_infinite]">
              ⚠️ DANGEROUS
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
