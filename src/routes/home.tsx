import React from 'react';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import { useRecoilValue } from 'recoil';
import { fetchedMoviesState } from '../state/FetchedMoviesState';
import type { MutatedMovie } from '../api/api-routes';

export default function Home() {
  const fetchedMoviesFromState = useRecoilValue<MutatedMovie[] | null>(fetchedMoviesState);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-movie-cards-vertical lg:grid-cols-movie-cards-horizontal gap-4">
        {fetchedMoviesFromState?.map((m) => (
          <MovieCard key={m['#IMDB_ID']} movie={m} />
        ))}
      </div>
    </>
  );
}
