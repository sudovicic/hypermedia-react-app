export interface APISearchParams {
  queryString: string;
  startIndex?: number;
  amount?: number;
}

export interface MovieResult {
  tt_url: string;
  jsonnob: {
    name: string;
    image: string;
    description: string;
    aggregateRating: {
      ratingCount: number;
      ratingValue: number;
    };
    contentRating: string;
    genre: string[];
    datePublished: string;
    trailer: {
      thumbnailUrl: string;
    };
  };
}

// TODO: exchange for real API call (this will also get rid of console errors due to duplicate keys)
export const getMovies = async (): Promise<MovieResult[]> => {
  const dahmer = {
    tt_url: 'https://www.imdb.com/title/tt13207736',
    jsonnob: {
      name: 'Dahmer - Monster: The Jeffrey Dahmer Story',
      image:
        'https://m.media-amazon.com/images/M/MV5BM2IwNWY2YWEtNTU4Ni00MmE2LTljZjItNWQ0NzBlNjJiMzBiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      description:
        'Story of the Milwaukee Monster told from the perspective of the victims and police incompetence that allowed the Wisconsin native to go on a multiyear killing spree.',
      aggregateRating: {
        ratingCount: 99049,
        ratingValue: 8,
      },
      contentRating: 'TV-MA',
      genre: ['Biography', 'Crime', 'Drama'],
      datePublished: '2022-09-21',
      trailer: {
        thumbnailUrl:
          'https://m.media-amazon.com/images/M/MV5BNjYyNjM3YjYtZGI2NC00ZDliLWI3YWYtZmJmZDA0Yjc2ZTJjXkEyXkFqcGdeQWRpZWdtb25n._V1_.jpg',
      },
    },
  };
  const batman = {
    tt_url: 'https://www.imdb.com/title/tt1877830',
    jsonnob: {
      name: 'The Batman',
      image:
        'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg',
      description:
        "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      aggregateRating: {
        ratingCount: 615249,
        ratingValue: 7.9,
      },
      contentRating: 'PG-13',
      genre: ['Action', 'Crime', 'Drama'],
      datePublished: '2022-03-04',
      trailer: {
        thumbnailUrl:
          'https://m.media-amazon.com/images/M/MV5BMTdjOTQ1NDItYjBkYy00OTA3LTk3NDItOTk5YTg4NGZmYmZhXkEyXkFqcGdeQWRpZWdtb25n._V1_.jpg',
      },
    },
  };

  return Promise.resolve([batman, dahmer, batman, batman, dahmer, batman, dahmer, dahmer]);
};
