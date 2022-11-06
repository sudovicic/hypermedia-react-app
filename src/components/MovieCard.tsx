import React from 'react';
import { useId } from 'react';
import type { MutatedMovie } from '../api/api-routes';
import type { Tag } from '../utils/hooks';
import { useTags } from '../utils/hooks';
import RatingStars from './RatingStars';

interface MovieCardProps {
  movie: MutatedMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const tags: Tag[] = useTags(movie);
  const id = useId();

  return (
    <div className="card lg:card-side lg:max-w-xl bg-base-100 shadow-xl">
      <figure className="card-body">
        <img
          className="w-44"
          src={movie['#IMG_POSTER'] && movie['#IMG_POSTER']}
          alt={movie['#IMG_POSTER'] ? `Thumbnail for ${movie['#TITLE']}` : 'No preview image available.'}
        />
      </figure>
      <div className="card-body justify-between gap-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <RatingStars movie={movie && movie} />
          <div className="inline-flex">
            {tags.map((tag) => (
              <div key={`${id}-${tag.type}`} className="badge badge-secondary mx-1 select-none">
                {tag.type.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="card-title pb-3">{movie['#TITLE'] ? movie['#TITLE'] : 'Unknown Title'}</h2>
          <p className="flex-grow-0 line-clamp-6">
            {movie['#IMDb_SHORT_DESC'] ? movie['#IMDb_SHORT_DESC'] : 'No description available.'}
          </p>
        </div>
        <div className="card-actions justify-between">
          {movie['#YEAR'] && <span>{new Date(Date.parse(movie['#YEAR'].toString())).getFullYear()}</span>}
          <div className="badge badge-outline">
            {movie['#RATING'] && movie['#RATING']['#NUMUSERRATINGS']
              ? movie['#RATING']['#NUMUSERRATINGS']
              : 'No ratings availbale.'}
          </div>
        </div>
      </div>
    </div>
  );
}
