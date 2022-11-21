import type { ReactElement } from 'react';
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { screen, within } from '@testing-library/react';
import ResourceCard from '../ResourceCard';
import type { Resource } from '../../../utils/api';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../utils/i18nForTests';

const fakeResource: Resource = {
  '#TITLE': 'fake resource',
  '#IMDB_ID': 'tt_123456789',
  '#IMDB_URL': 'imdb url',
  '#IMDb_SHORT_DESC': 'a movie&apos;s description',
  '#YEAR': 2022,
  '#IMDB_IV': 'some url',
  '#RATING': {
    '#NUMUSERRATINGS': 10000,
    '#ONLYRATING': 7.5,
  },
  '#ACTORS': 'actor 1, actor 2',
  '#IMG_POSTER': 'poster url',
  '#IMDb_TITLE_TYPE': 'Movie',
  '#AKA': 'fake resource (2022)',
  '#RANK': 150,
  '#KEYWORDS': 'a b c',
  '#MARINTG': '14',
  photo_height: 800,
  photo_width: 800,
  userRating: 3,
  saved: false,
  watched: false,
  comments: undefined,
};

const render = (elem: ReactElement) => {
  return rtlRender(
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>{elem}</MemoryRouter>
      </I18nextProvider>
    </RecoilRoot>
  );
};

describe('<ResourceCard />', () => {
  it('renders successfully', () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(within(screen.getByRole('figure')).getByRole('img')).toBeTruthy();
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('uses correct translation keys', () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(within(screen.getByRole('heading')).getByText('fake resource')).toBeTruthy(); // #TITLE
    expect(screen.getByRole('button')).toHaveTextContent('card_cta');
  });

  it('properly escapes description', () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(screen.getByText("a movie's description")).toBeTruthy();
  });

  it('displays the poster image correctly', () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'poster url');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'alt_thumbnail');
  });

  it('displays additional information', () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(screen.getByText('2022')).toBeTruthy(); // #YEAR
    expect(screen.getByText('14')).toBeTruthy(); // #MARINTG
  });

  it("links to details page for resource's imdb id", () => {
    render(<ResourceCard resource={fakeResource} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/details/tt_123456789');
  });
});
