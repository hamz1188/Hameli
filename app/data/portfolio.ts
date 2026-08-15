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
  skills: [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'Expo', category: 'Mobile' },
    { name: 'Swift', category: 'Mobile' },
    { name: 'Cursor', category: 'Tools' },
    { name: 'Git', category: 'Tools' },
  ] as Skill[],
  projects: [
    {
      title: 'Desert Survivors',
      description:
        'Roguelike survival game for iOS. Survive waves of Arabian mythical creatures with auto-attacks, level-ups, and 8 playable characters.',
      tags: ['Swift', 'SpriteKit', 'iOS', 'Game Dev'],
      color: 'from-amber-400 to-orange-600',
      image: '/images/projects/desert-survivors/desert-survivors-1.png',
      images: [
        '/images/projects/desert-survivors/desert-survivors-1.png',
        '/images/projects/desert-survivors/desert-survivors-2.png',
        '/images/projects/desert-survivors/desert-survivors-3.png',
        '/images/projects/desert-survivors/desert-survivors-4.png',
        '/images/projects/desert-survivors/desert-survivors-5.png',
        '/images/projects/desert-survivors/desert-survivors-6.png',
      ],
      highlights: [
        '8 playable characters with unique abilities',
        '12 weapons with awakened evolution forms',
        'Procedural 4000x4000 desert world',
        'AI-generated pixel art via PixelLab',
      ],
      demoLink: 'https://desert-survivors.vercel.app/',
      demoLabel: 'More',
      codeLink: 'https://github.com/hamz1188/DesertSurvivors',
      type: 'mobile',
    },
    {
      title: 'Fitness Tracker',
      description:
        'Mobile fitness app with smooth animations and haptic feedback. Track workouts, visualize progress.',
      tags: ['React Native', 'Expo', 'TypeScript', 'Reanimated 3'],
      color: 'from-cyan-400 to-blue-600',
      image: '/images/projects/fitness-tracker/fitness-tracker-1.png',
      images: [
        '/images/projects/fitness-tracker/fitness-tracker-1.png',
        '/images/projects/fitness-tracker/fitness-tracker-2.png',
        '/images/projects/fitness-tracker/fitness-tracker-3.png',
        '/images/projects/fitness-tracker/fitness-tracker-4.png',
        '/images/projects/fitness-tracker/fitness-tracker-5.png',
        '/images/projects/fitness-tracker/fitness-tracker-6.png',
        '/images/projects/fitness-tracker/fitness-tracker-7.png',
        '/images/projects/fitness-tracker/fitness-tracker-8.png',
      ],
      highlights: [
        'Animated circular progress with spring physics',
        'Custom bottom tab navigator with blur',
        'Workout data in AsyncStorage',
      ],
      demoLink: 'https://hamz-fitness-tracker-app.vercel.app/',
      codeLink: 'https://github.com/hamz1188/hamz-fitness-tracker-app',
      type: 'mobile',
    },
    {
      title: 'Hameli',
      description:
        'Learn-first studio site — Made in public shorts, how it’s filmed, calm contact.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      color: 'from-olive-500 to-stone-600',
      image: '/images/projects/portfolio/portfolio.png',
      demoLink: 'https://hameli.io',
      codeLink: 'https://github.com/hamz1188/Hameli',
      type: 'web',
    },
    {
      title: 'TalkingPhoto AI',
      description:
        'Expo app that turns photos into talking avatars with Gemini, ElevenLabs, and Replicate.',
      tags: ['Expo', 'AI', 'TypeScript'],
      color: 'from-violet-400 to-fuchsia-600',
      codeLink: 'https://github.com/hamz1188/talkingphoto-ai',
      type: 'mobile',
    },
  ] as Project[],
};
