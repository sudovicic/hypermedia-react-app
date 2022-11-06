import type { KeyboardEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import type { SWRResponse } from 'swr';
import useSWR, { useSWRConfig } from 'swr';
import type { MutatedMovie, MutatedMovieResult } from '../api/api-routes';
import { fetchedMoviesState } from '../state/FetchedMoviesState';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBar: React.FC = () => {
  const { mutate } = useSWRConfig();

  const baseUrl = 'https://search.imdbot.workers.dev/?q=';
  const [keyboardInput, setKeyboardInput] = useState<string>('');

  useSWR(baseUrl + keyboardInput, fetcher, { refreshInterval: 1000 }) as SWRResponse<MutatedMovieResult>;

  const setFetchedMovies = useSetRecoilState(fetchedMoviesState);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setKeyboardInput(e.currentTarget.value);
  };

  useEffect(() => {
    const fetchApiFromInput = async (): Promise<MutatedMovie[]> => {
      try {
        // eslint-disable-next-line
        const response: MutatedMovieResult = await mutate(baseUrl + keyboardInput);

        if (response.ok) {
          return response.description;
        } else {
          console.error('Error while fetching: ', response);
          return [];
        }
      } catch (error) {
        console.error(error);
        throw new Error(' has occurred while fetching from the API.');
      }
    };

    if (keyboardInput.length > 0) {
      fetchApiFromInput()
        .then((res: MutatedMovie[]) => {
          console.log('Movies fetched successfully!');
          setFetchedMovies(res);
        })
        .catch((e) => console.error(e));
    }
  }, [keyboardInput, mutate, setFetchedMovies]);

  return (
    <div className="searchbar">
      <input
        className="input input-sm w-96 rounded-full bg-slate-800 placeholder-white"
        onKeyUp={(e) => handleKeyPress(e)}
        type="text"
        placeholder="Search for movies, TV shows..."
      />
    </div>
  );
};

export default SearchBar;
