/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, AlertCircle, HelpCircle, HardDrive, Cpu } from 'lucide-react';

export default function About() {
  const violations = [
    {
      code: 'ABI-V40',
      title: 'Font Inflation Malfeasance',
      description: 'The use of 13px font-sizes or modified line-spacing (e.g., 2.15x) to artificially extend short page requirements. Caught automatically via our spacing trackers.',
      severity: 'CRITICAL',
    },
    {
      code: 'ABI-V12',
      title: 'Reference Laundering',
      description: 'Inventing plausible authors or fake journal titles to pad literature reviews. Laundering citations is a federal classroom violation under syllabus codes.',
      severity: 'HIGH ALERT',
    },
    {
      code: 'ABI-V09',
      title: 'Corruption Extension Sabotage',
      description: 'Intentionally editing a complete PDF with random ASCII text using hex-editors specifically to render it "corrupted" when uploaded, winning 24 extra extension hours.',
      severity: 'SEVERE CRIMINALITY',
    },
    {
      code: 'ABI-V67',
      title: 'Wiki-Plagiarism Conspiracies',
      description: 'Copy-pasting paragraphs from third-tier scholarly articles while changing exactly every fourth word to a synonym using modern browser search engines.',
      severity: 'CLASS-I CONSPIRACY',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* Institutional Document Frame */}
      <div className="bg-brand-secondary border border-brand-accent/20 rounded-lg p-6 md:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Dossier Grid Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-brand-accent/10 p-4 font-mono text-[9px] text-gray-700 pointer-events-none select-none">
          SECURE LOG AREA // CODE-33
        </div>

        {/* Charters Title Banner */}
        <div className="border-b border-dashed border-brand-accent/30 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-accent">
              Official Bureau Charter // Est. 2026
            </span>
            <h1 className="mt-2 text-4xl font-serif text-white font-black uppercase">
              Mission Objectives & Charter
            </h1>
          </div>
          
          <div className="stamp-confidential px-6 py-2.5 font-bold text-center text-sm uppercase max-md:mx-auto">
            ABI HIGH OFFICE
          </div>
        </div>

        {/* Parody Copy Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
          
          {/* Main Charter Content */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>THE COGNITIVE INTEGRITY INITIATIVE</span>
            </h2>

            <div className="font-serif text-gray-300 leading-relaxed text-base space-y-4">
              <p>
                Founded under the joint authority of the National Dean’s Assembly and the Federal Campus Security Group, the <strong>Academic Bureau of Investigation (ABI)</strong> is commissioned to safeguard the intellectual standard of our educational institution. In an era where plagiarism is globalized and peer-reviews are under assault, the ABI employs high-surveillance diagnostics to eliminate classroom fraud.
              </p>
              <p>
                Our specialized investigators operate within hidden alcoves of libraries, under floorboards of coffee shops, and inside digital routing nodes of university networks. When an academic offender uses online paraphrasing services or submits AI-generated drafts, the ABI takes action immediately—restoring balance and original critical thinking to the human race.
              </p>
              <p className="italic text-brand-accent/80 border-l-2 border-brand-accent/20 pl-4">
                "Academic integrity is more than custom citation orders. It is a defense of biological consciousness itself. We trace, we monitor, we investigate, and we expel."
                <span className="block mt-2 font-mono text-[10px] text-gray-500 uppercase not-italic">— Dr. Thaddeus "The Red Pencil" Sterling III, Bureau Director</span>
              </p>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div className="md:col-span-4 bg-brand-primary/60 border border-brand-accent/15 rounded p-6 font-mono text-xs space-y-4">
            <h3 className="text-white font-bold border-b border-brand-accent/15 pb-2 uppercase text-[10px]">
              Surveillance Grid Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">CORES ACTIVE</span>
                <span className="text-gray-300 font-bold">148 MAIN NODES</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">ACTIVE FIELD SURVEILLANCE</span>
                <span className="text-gray-300 font-bold">24H AUDIO / SCANLINE MATRIX</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">LATEST ENFORCEMENT STRIKE</span>
                <span className="text-brand-red font-bold">STRIKE ROUTE "APA-7TH"</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px]">BUREAU CLEARANCE LEVEL</span>
                <span className="text-brand-accent font-bold">CLASSIFIED ORANGE</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-dashed border-brand-accent/15 flex items-center gap-2 text-[10px] text-gray-400">
              <Cpu className="w-4 h-4 text-brand-accent animate-spin" />
              <span>DIAGNOSTICS ONLINE</span>
            </div>
          </div>
        </div>

        {/* LIST OF ACADEMIC CODE VIOLATIONS */}
        <div className="mt-12 border-t border-brand-accent/20 pt-8">
          <h2 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>PRIMARY MONITORED ACADEMIC CODES // OFFENSE VIOLATIONS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {violations.map((violation, idx) => (
              <div 
                key={idx}
                className="bg-brand-primary/40 border border-brand-accent/15 rounded p-5 hover:border-brand-accent/45 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-brand-accent font-bold tracking-widest text-[11px]">
                    {violation.code}
                  </span>
                  <span className="font-mono text-[9px] font-bold text-brand-red bg-brand-red/10 py-0.5 px-2 rounded border border-brand-red/20">
                    {violation.severity}
                  </span>
                </div>
                
                <h4 className="font-serif text-white font-medium text-lg mb-2">
                  {violation.title}
                </h4>
                
                <p className="font-mono text-[11px] text-gray-400 leading-relaxed uppercase">
                  {violation.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY ENFORCEMENT DEPT BADGE */}
        <div className="mt-10 border-t border-brand-accent/20 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
          <div className="font-mono text-[10px] text-gray-500">
            ABI HIGH INTEL ASSEMBLY // AUTHENTIC CLASSIFIED DOSSIER UNIT-0
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] text-brand-accent uppercase animate-[alert-pulse_1.5s_infinite]">
              ● TRANSMITTING TELEMETRY
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
