export interface MutatedMovie {
  '#ACTORS': string;
  '#AKA': string;
  '#GENRE': string;
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
}

export interface MutatedMovieResult {
  description: MutatedMovie[];
  error_code: number;
  ok: boolean;
}
