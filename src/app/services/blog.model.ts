export interface Blog {
  type: 'blog'|'presentation';
  key: string;
  leadImage: string;
  title: string;
  description: string;
  postPath: string;
  postFileName: string;
}
