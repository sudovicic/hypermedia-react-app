import React from 'react';
import { Movie } from '../dao/interfaces/Movie';
import { MovieListDAO } from '../dao/MovieListDAO';
import { LocalStorageService, Services } from '../services/LocalStorageService';
import ResourceGrid from './ResourceGrid';

export const WatchList = () => {
  const DAO = LocalStorageService.getDAO(Services.movieList) as MovieListDAO;

  const getWatchlistMovies = (): Array<Movie> => {
    return DAO.getAllEntries();
  };

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <ResourceGrid resources={getWatchlistMovies()} />
      </div>
    </div>
  );
};
