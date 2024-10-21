export interface IBlogPost {
  id: number;
  blogText: string;
  username: string;
  dateCreated: Date | string; // ISO date string
}

export class BlogPost implements IBlogPost {
  id = 0;
  blogText = '';
  username = '';
  dateCreated = new Date();
}
