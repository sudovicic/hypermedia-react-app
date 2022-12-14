export const API_BASE_URL = 'https://search.imdbot.workers.dev/';

export interface Comment {
  createdAt: Date;
  content: string;
}

export interface Resource {
  '#ACTORS': string;
  '#AKA': string;
  '#GENRE'?: string[];
  '#IMDB_ID': string;
  '#IMDB_IV': string;
  '#IMDB_URL': string;
  '#IMDb_SHORT_DESC'?: string;
  '#IMDb_TITLE_TYPE': string;
  '#IMG_POSTER': string;
  '#KEYWORDS': string;
  '#MARINTG'?: string;
  '#RANK': number;
  '#RATING'?: {
    '#MAXRATING'?: number;
    '#MINRATING'?: number;
    '#NUMUSERRATINGS'?: number;
    '#ONLYRATING'?: number;
  };
  '#TITLE': string;
  '#YEAR'?: number;
  photo_height: number;
  photo_width: number;

  // additional data
  comments?: Comment[];
  saved?: boolean;
  watched?: boolean;
  userRating?: UserRating;
}

export type UserRating = 1 | 2 | 3 | 4 | 5;

export interface ResourcesResult {
  description: Resource[];
  error_code: number;
  ok: boolean;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
