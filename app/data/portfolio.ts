import type { Project, Skill } from './portfolio-types';
import { hameli } from './hameli';

export type { Project, Skill } from './portfolio-types';

/**
 * Compatibility shim for leftover components / RSS.
 * New UI should import from `./hameli`.
 */
export const portfolioData = {
  personalInfo: {
    name: hameli.person,
    role: 'Hameli',
    roleSubtitle: hameli.tagline,
    location: hameli.location,
    email: hameli.email,
    bio: [hameli.tagline],
    socials: {
      github: hameli.socials.github,
      linkedin: hameli.socials.linkedin,
      twitter: hameli.socials.instagram || hameli.socials.youtube || '',
    },
  },
  skills: [] as Skill[],
  projects: [] as Project[],
};
