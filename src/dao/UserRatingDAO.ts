import type { IGenericDAO } from './interfaces/IGenericDAO';
import type { UserRating } from './interfaces/UserRating';

export class UserRatingDAO implements IGenericDAO<UserRating> {
  private LS_KEY = 'userratings';

  /**
   * Add new entry and save it to local storage
   * @param entry
   */
  addEntry = (entry: UserRating): void => {
    const allEntries = this.getAllEntries();

    if (allEntries) {
      allEntries.push(entry);
      this.saveEntries(allEntries);
    }
  };

  /**
   * Update an existing rating of a movie by the movie id
   * @param entry
   */
  updateEntryById = (entry: UserRating): void => {
    const allEntries = this.getAllEntries();

    if (allEntries) {
      allEntries.forEach((_entry: UserRating) => {
        if (_entry.movieId === entry.movieId) {
          _entry.rating = entry.rating;
        }
      });

      this.saveEntries(allEntries);
    }
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
    const allEntries = this.getAllEntries();

    if (allEntries) {
      for (const entry of allEntries) {
        if (entry.movieId === id) {
          return entry;
        }
      }
    }

    return null;
  };

  /**
   * Return all entries from local storage
   * @returns all entries form local storage or empty array
   */
  getAllEntries = () => {
    const entries = localStorage.getItem(this.LS_KEY);
    return entries && entries.length > 0 ? (JSON.parse(entries) as UserRating[]) : null;
  };

  /**
   * Persist all entries
   * @param allEntries The entries array
   */
  private saveEntries = (allEntries: UserRating[]): void => {
    localStorage.setItem(this.LS_KEY, JSON.stringify(allEntries));
  };
}
