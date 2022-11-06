import React, { KeyboardEvent, useEffect, useState } from 'react';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { MovieResult, MutatedMovieResult, MutatedMovies } from '../api/api-routes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBar: React.FC = () => {
  const { mutate } = useSWRConfig();

  const baseUrl = 'https://search.imdbot.workers.dev/?q=';

  const [keyboardInput, setKeyboardInput] = useState<string>('');

  useSWR(baseUrl + keyboardInput, fetcher) as SWRResponse<MovieResult, any>;

  const fetchApiFromInput = async (): Promise<any> => {
    try {
      // eslint-disable-next-line
      const response: MutatedMovieResult = await mutate(baseUrl + keyboardInput);
      const result: Array<MutatedMovies> = response.description;

      return result;
    } catch (error) {
      console.log(error);

      return Error('An error has occurred while fetching from the API.');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setKeyboardInput(e.currentTarget.value);
  };

  useEffect(() => {
    fetchApiFromInput()
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, [keyboardInput]);

  return (
    <div className="searchbar">
      <input
        className="input input-sm input-bordered w-full max-w-xs"
        onKeyUp={(e) => handleKeyPress(e)}
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
