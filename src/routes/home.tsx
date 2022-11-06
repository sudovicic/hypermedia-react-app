import React from 'react';
import { useLoaderData } from 'react-router-dom';
import type { MovieResult } from '../api/api-routes';
import { getMovies } from '../api/api-routes';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const movies = useLoaderData() as MovieResult[];

  return (
    <>
      <SearchBar />
      <NavBar />
      <div className="grid grid-cols-movie-cards-vertical lg:grid-cols-movie-cards-horizontal gap-4">
        {movies.map((m) => (
          <MovieCard key={m.jsonnob.name} movie={m} />
        ))}
      </div>
    </>
  );
}

export const homeLoader = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await getMovies();
};
