import { IGenericDAO } from './interfaces/IGenericDAO';
import { Movie } from './interfaces/Movie';

export class MovieListDAO implements IGenericDAO<Movie> {
  private LS_KEY = 'movielist';

  /**
   * Add new entry and save it to local storage
   * @param entry The movie object
   */
  addEntry = (entry: Movie): void => {
    const allEntries: Array<Movie> = this.getAllEntries();

    const newEntry: Movie = entry;

    allEntries.push(newEntry);

    this.saveEntries(allEntries);
  };

  /**
   * Update an existing movie by the movie id
   * @param entry The movie object
   */
  updateEntryById = (entry: Movie): void => {
    const allEntries: Array<Movie> = this.getAllEntries();

    allEntries.forEach((_entry: Movie) => {
      if (_entry['#IMDB_ID'] === entry['#IMDB_ID']) {
        _entry = entry;
      }
    });

    this.saveEntries(allEntries);
  };

  /**
   * Delete movie
   * @param entry The movie
   */
  deleteEntry = (entry: Movie): void => {
    const allEntries: Array<Movie> = this.getAllEntries();

    this.saveEntries(allEntries.filter((_entry: Movie) => _entry['#IMDB_ID'] !== entry['#IMDB_ID']));
  };

  /**
   * Get an entry via its id
   * @param id the id of the entry
   * @returns the entry or null if no entry exists
   */
  getEntryById = (id: string): Movie | null => {
    const allEntries: Array<Movie> = this.getAllEntries();

    if (allEntries.length > 0) {
      for (let index = 0; index < allEntries.length; index++) {
        if (allEntries[index]['#IMDB_ID'] === id) {
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
  getAllEntries = (): Array<Movie> => {
    return JSON.parse(localStorage.getItem(this.LS_KEY) || '[]') as Array<Movie>;
  };

  /**
   * Persist all entries
   * @param allEntries The entries array
   */
  private saveEntries = (allEntries: Array<Movie>): void => {
    localStorage.setItem(this.LS_KEY, JSON.stringify(allEntries));
  };
}
