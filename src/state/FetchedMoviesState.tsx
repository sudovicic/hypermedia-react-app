import { atom } from 'recoil';
import { MutatedMovie } from '../api/api-routes';

export const fetchedMoviesState = atom<MutatedMovie[]>({
  key: 'fetchedMovies',
  default: [
    {
      '#ACTORS': '',
      '#AKA': '',
      '#GENRE': '',
      '#IMDB_ID': '',
      '#IMDB_IV': '',
      '#IMDB_URL': '',
      '#IMDb_SHORT_DESC': '',
      '#IMDb_TITLE_TYPE': '',
      '#IMG_POSTER': '',
      '#KEYWORDS': '',
      '#MARINTG': '',
      '#RANK': 0,
      '#RATING': {
        '#MAXRATING': 0,
        '#MINRATING': 0,
        '#NUMUSERRATINGS': 0,
        '#ONLYRATING': 0,
      },
      '#TITLE': '',
      '#YEAR': 0,
      photo_height: 0,
      photo_width: 0,
    },
  ],
});
