/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { TICKER_MESSAGES } from '../utils/constants';

export default function Ticker() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-brand-tertiary border-y border-brand-accent/30 h-10 flex items-center overflow-hidden uppercase font-mono text-xs select-none relative z-40">
      {/* Fixed Threat Badge */}
      <div className="h-full px-4 bg-brand-red text-white font-bold flex items-center shrink-0 border-r border-brand-accent/30 gap-2 relative shadow-[0_0_15px_rgba(178,34,34,0.4)]">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>THREAT LEVEL ELEVATED</span>
      </div>

      {/* Ticker Content Window */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div className="flex items-center gap-16 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Duplicate double times for seam-free looping */}
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, index) => (
            <div key={index} className="flex items-center gap-4 text-brand-accent/95">
              <span>★</span>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UTC Clock Right Badge */}
      <div className="h-full px-4 bg-brand-primary text-brand-accent font-mono border-l border-brand-accent/30 flex items-center shrink-0 gap-2">
        <span className="text-gray-500">SYSTEM TIME:</span>
        <span className="tracking-widest">{utcTime}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
