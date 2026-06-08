/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Fugitive {
  id: string;
  index: number;
  name: string;
  imageURL: string;
  crimeCommited: string;
  crimeDetails: string;
  additionalPhotos: string[];
  caseNumber: string;
  classification: string;
  isArmedAndDangerous: boolean;
}

export type ViewType = 'home' | 'wanted' | 'detail' | 'about';
