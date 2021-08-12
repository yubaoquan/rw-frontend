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

export interface User {
  username: string;
  token: string;
  email: string;
  image?: string;
}

export interface FormErrors {
  [field: string]: string[];
}
