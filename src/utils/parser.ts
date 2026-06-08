/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fugitive } from '../types';

function matchField(block: string, field: string): string {
  // Resolve double quotes
  const doubleQuoteRegex = new RegExp(`<${field}:"([\\s\\S]*?)"`, 'i');
  let match = block.match(doubleQuoteRegex);
  if (match) return match[1].trim();

  // Resolve single quotes
  const singleQuoteRegex = new RegExp(`<${field}:'([\\s\\S]*?)'`, 'i');
  match = block.match(singleQuoteRegex);
  if (match) return match[1].trim();

  // Resolve no quotes
  const noQuoteRegex = new RegExp(`<${field}:([^>\\n]+)`, 'i');
  match = block.match(noQuoteRegex);
  if (match) {
    let val = match[1].trim();
    if (val.endsWith('>')) val = val.slice(0, -1).trim();
    if (val.endsWith('"') || val.endsWith("'")) val = val.slice(0, -1).trim();
    return val;
  }

  return '';
}

export function parseFugitiveData(rawText: string): Fugitive[] {
  if (!rawText) return [];

  // Split listings: we can split by "<Listing"
  const chunks = rawText.split(/<Listing/i);
  const fugitives: Fugitive[] = [];

  let validIndex = 0;
  for (const chunk of chunks) {
    if (!chunk.trim()) continue;

    const name = matchField(chunk, 'Name');
    const crimeCommited = matchField(chunk, 'CrimeCommited') || matchField(chunk, 'CrimeCommitted');

    // If both name and crime commited are missing, it's not a valid fugitive block
    if (!name && !crimeCommited) {
      continue;
    }

    const imageURL = matchField(chunk, 'ImageURL');
    const crimeDetails = matchField(chunk, 'CrimeDetails');
    const additionalPhotosRaw = matchField(chunk, 'AdditionalPhotos');

    const additionalPhotos = additionalPhotosRaw
      ? additionalPhotosRaw
          .split(',')
          .map((url) => {
            let u = url.trim();
            if (u.startsWith('"') || u.startsWith("'")) u = u.substring(1);
            if (u.endsWith('"') || u.endsWith("'")) u = u.substring(0, u.length - 1);
            return u.trim();
          })
          .filter((url) => url.length > 0)
      : [];

    const id = `fugitive-${validIndex + 1}`;
    const caseNumber = `ABI-90${700 + validIndex}`;

    // Parody classifications for the academic FBI bureau theme
    const classifications = [
      'CLASS-I ACADEMIC INSUBORDINATION',
      'HIGH-LEVEL PLAGIARISM CONSPIRACY',
      'SEVERE PEER-REVIEW SABOTAGE',
      'ILLEGAL COMMENCEMENT DISRUPTION',
      'CRITICAL SYLLABUS FRAUD',
    ];
    const classification = classifications[validIndex % classifications.length];
    const isArmedAndDangerous = validIndex % 2 === 0;

    fugitives.push({
      id,
      index: validIndex,
      name: name || 'CLASSIFIED SUSPECT',
      imageURL: imageURL || '',
      crimeCommited: crimeCommited || 'ACADEMIC TRIAL IN PROGRESS',
      crimeDetails: crimeDetails || 'The structural details of this academic offense are currently restricted under Section 11 of the Academic Integrity Protection Act of 1994. Warning: Avoid engagement.',
      additionalPhotos,
      caseNumber,
      classification,
      isArmedAndDangerous,
    });

    validIndex++;
  }

  return fugitives;
}

export async function fetchFugitives(): Promise<Fugitive[]> {
  const url = 'https://raw.githubusercontent.com/Hellomyfriend19/AcademicBureauOfInvestigation/refs/heads/main/Fugitives.txt';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load fugitive data: ${response.statusText}`);
  }
  const text = await response.text();
  return parseFugitiveData(text);
}
