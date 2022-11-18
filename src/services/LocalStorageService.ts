import { MovieListDAO } from '../dao/MovieListDAO';
import { UserRatingDAO } from '../dao/UserRatingDAO';

export enum Services {
  userRating = 'userrating',
  movieList = 'movielist',
}

export class LocalStorageService {
  static getDAO(service: Services) {
    switch (service) {
      case Services.userRating:
        return new UserRatingDAO();
      case Services.movieList:
        return new MovieListDAO();
      default:
        return null;
    }
  }
}
