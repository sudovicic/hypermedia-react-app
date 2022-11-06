import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { MovieResult, MutatedMovieResult, MutatedMovie } from '../api/api-routes';
import { fetchedMoviesState } from '../state/FetchedMoviesState';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBar: React.FC = () => {
  const { mutate } = useSWRConfig();

  const baseUrl = 'https://search.imdbot.workers.dev/?q=';
  const [keyboardInput, setKeyboardInput] = useState<string>('');

  useSWR(baseUrl + keyboardInput, fetcher, { refreshInterval: 1000 }) as SWRResponse<MovieResult, any>;

  const setFetchedMovies = useSetRecoilState(fetchedMoviesState);

  const fetchApiFromInput = async (): Promise<any> => {
    try {
      // eslint-disable-next-line
      const response: MutatedMovieResult = await mutate(baseUrl + keyboardInput);

      if (response && response.ok) {
        const result: Array<MutatedMovie> = response.description;

        return result;
      } else {
        console.log('Error while fetching: ', response);
        return [];
      }
    } catch (error) {
      console.log(error);

      return Error(' has occurred while fetching from the API.');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setKeyboardInput(e.currentTarget.value);
  };

  useEffect(() => {
    fetchApiFromInput()
      .then((res: Array<MutatedMovie>) => {
        console.log('Movies fetched successfully!');
        setFetchedMovies(res ?? []);
      })
      .catch((e) => console.log(e));
  }, [keyboardInput]);

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
