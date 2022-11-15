export interface IGenericDAO<T> {
  addEntry(entry: T): void;
  updateEntryById(entry: T): void;
  getAllEntries(): T[] | null;
  getEntryById(id: string): T | null;
  deleteEntry(entry: T): void;
}
