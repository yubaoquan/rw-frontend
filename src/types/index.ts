export interface Author {
  username: string;
  image: string;
  following: boolean;
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

export interface Comment {
  id: number | string;
  author: User;
  createdAt: number;
}
