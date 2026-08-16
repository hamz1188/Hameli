import { z } from 'zod';
import type { LivingBrief, LivingBriefInput } from './living-brief';

export const livingBriefInputSchema: z.ZodType<LivingBriefInput> = z.object({
  ambition: z.string().trim().min(8).max(1_200),
  audience: z.string().trim().min(3).max(800),
  outcome: z.string().trim().min(3).max(800),
  character: z.array(z.string().trim().min(2).max(40)).min(1).max(3),
  reality: z.string().trim().min(3).max(800),
});

export const livingBriefSchema: z.ZodType<LivingBrief> = z.object({
  title: z.string().trim().min(2).max(80),
  oneLine: z.string().trim().min(8).max(280),
  audience: z.string().trim().min(3).max(240),
  outcome: z.string().trim().min(3).max(240),
  principles: z.array(z.string().trim().min(2).max(120)).length(3),
  openQuestions: z.array(z.string().trim().min(4).max(160)).min(2).max(4),
  firstMove: z.string().trim().min(4).max(240),
});
