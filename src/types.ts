/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SectionType = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

export interface Section {
  id: SectionType;
  label: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  metrics: string;
  features: string[];
  link?: string;
  github?: string;
  imageAlt?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface ContactChannel {
  name: string;
  value: string;
  href: string;
  iconName: string;
}
