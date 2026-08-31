export interface Project {
  id: number;
  title: string;
  description: string | null;
  category: string;
  tech_stack: string | null;
  media_url: string | null;
  github_url: string | null;
  demo_url: string | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: string | null;
  created_at: string;
}

 export interface Achievement {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  date_achieved: string;
}
export interface SiteSettings {
  telegram_url: string | null;
  github_url: string | null;
  email: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  cv_url: string | null;
}


