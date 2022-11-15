import type { KeyboardEvent } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import type { SWRResponse } from 'swr';
import useSWR, { useSWRConfig } from 'swr';
import type { Resource, ResourcesResult } from '../api/api-routes';
import { fetchedResourcesState } from '../state/FetchedResourcesState';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../api/api-routes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchBar: React.FC = () => {
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();
  const setFetchedResources = useSetRecoilState(fetchedResourcesState);
  const [keyboardInput, setKeyboardInput] = useState<string>('');
  const url = useMemo(() => API_BASE_URL + '?q=' + keyboardInput, [keyboardInput]);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    setKeyboardInput(e.currentTarget.value);
  };

  useSWR(url, fetcher, { refreshInterval: 1000 }) as SWRResponse<ResourcesResult>;

  useEffect(() => {
    const fetchApiFromInput = async (): Promise<Resource[]> => {
      try {
        // eslint-disable-next-line
        const response: ResourcesResult = await mutate(url);

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

    if (url !== API_BASE_URL + '?q=') {
      fetchApiFromInput()
        .then((res: Resource[]) => {
          console.log(t('fetch_successful'));
          setFetchedResources(res);
        })
        .catch((e) => console.error(e));
    }
  }, [mutate, setFetchedResources, t, url]);

  return (
    <div className="searchbar">
      <input
        className="input input-sm w-96 rounded-full bg-transparent/10 placeholder-accent-content"
        onKeyUp={(e) => handleKeyUp(e)}
        type="text"
        placeholder={t('search_placeholder')}
      />
    </div>
  );
};

export default SearchBar;
