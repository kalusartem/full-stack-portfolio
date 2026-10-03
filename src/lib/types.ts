export type Project = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
};
