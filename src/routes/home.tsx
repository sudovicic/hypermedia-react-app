import React from 'react';
import { getMovies } from '../api/api-routes';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import { useRecoilValue } from 'recoil';
import { fetchedMoviesState } from '../state/FetchedMoviesState';

export default function Home() {
  const fetchedMoviesFromState = useRecoilValue(fetchedMoviesState);

  console.log(typeof fetchedMoviesFromState, fetchedMoviesFromState);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-movie-cards-vertical lg:grid-cols-movie-cards-horizontal gap-4">
        {fetchedMoviesFromState.map((m) => (
          <MovieCard key={m['#IMDB_ID']} movie={m} />
        ))}
      </div>
    </>
  );
}

export const homeLoader = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await getMovies();
};
