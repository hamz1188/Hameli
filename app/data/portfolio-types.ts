export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  color: string;
  icon?: string;
  highlights?: string[];
  demoLink?: string;
  demoLabel?: string;
  codeLink?: string;
  techStack?: string[];
  image?: string;
  images?: string[];
  type?: 'mobile' | 'web';
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Tools' | 'Backend' | 'Other';
  icon?: unknown;
}
