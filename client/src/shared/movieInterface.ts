export interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string | string[];
  director: string;
  language: string;
}
