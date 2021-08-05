export interface Author {
  username: string;
}

export interface Article {
  tagList: string[];
  author: Author;
  createdAt: number;
  favoritesCount: number;
  favorited: boolean;
  marking: boolean;
  slug: string;
  title: string;
  description: string;
}
