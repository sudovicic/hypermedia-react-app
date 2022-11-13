import { UserRatingDAO } from '../dao/UserRatingDAO';

export enum Services {
  userRating = 'userrating',
}

export class LocalStorageService {
  static getDAO(service: Services) {
    switch (service) {
      case Services.userRating:
        return new UserRatingDAO();
      default:
        return null;
    }
  }
}
