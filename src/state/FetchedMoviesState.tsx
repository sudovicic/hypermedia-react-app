import { atom } from 'recoil';
import type { MutatedMovie } from '../api/api-routes';

export const fetchedMoviesState = atom<MutatedMovie[]>({
  key: 'fetchedMovies',
  default: [],
});
