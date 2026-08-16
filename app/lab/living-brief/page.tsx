import type { Metadata } from 'next';
import { LivingBriefExperience } from './LivingBriefExperience';

export const metadata: Metadata = {
  title: 'Living Brief — Project 01',
  description:
    'A conversation that becomes a clear, living creative-technology brief in real time.',
  robots: { index: false, follow: false },
};

export default async function LivingBriefPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  return <LivingBriefExperience continueFromHome={params.from === 'home'} />;
}
