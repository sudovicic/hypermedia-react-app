import { IGenericDAO } from './interfaces/IGenericDAO';
import { UserRating } from './interfaces/UserRating';

export class UserRatingDAO implements IGenericDAO<UserRating> {
  private LS_KEY = 'userratings';

  /**
   * Add new entry and save it to local storage
   * @param movieId The id of the movie
   * @param rating The rating of the movie
   */
  addEntry = (entry: UserRating): void => {
    const allEntries: Array<UserRating> = this.getAllEntries();

    const newEntry: UserRating = entry;

    allEntries.push(newEntry);

    this.saveEntries(allEntries);
  };

  /**
   * Update an existing rating of a movie by the movie id
   * @param movieId The id of the movie
   * @param newRating The new rating of the movie
   */
  updateEntryById = (entry: UserRating): void => {
    const allEntries: Array<UserRating> = this.getAllEntries();

    allEntries.forEach((_entry: UserRating) => {
      if (_entry.movieId === entry.movieId) {
        _entry.rating = entry.rating;
      }
    });

    this.saveEntries(allEntries);
  };

  // To be implemented
  // eslint-disable-next-line
  deleteEntry = (entry: UserRating): void => {};

  /**
   * Get an entry via its id
   * @param id the id of the entry
   * @returns the entry or null if no entry exists
   */
  getEntryById = (id: string): UserRating | null => {
    const allEntries: Array<UserRating> = this.getAllEntries();

    if (allEntries.length > 0) {
      for (let index = 0; index < allEntries.length; index++) {
        if (allEntries[index].movieId === id) {
          return allEntries[index];
        }
      }
    }

    return null;
  };

  /**
   * Return all entries from local storage
   * @returns all entries form local storage or empty array
   */
  getAllEntries = (): Array<UserRating> => {
    return JSON.parse(localStorage.getItem(this.LS_KEY) || '[]') as Array<UserRating>;
  };

  /**
   * Persist all entries
   * @param allEntries The entries array
   */
  private saveEntries = (allEntries: Array<UserRating>): void => {
    localStorage.setItem(this.LS_KEY, JSON.stringify(allEntries));
  };
}
