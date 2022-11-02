import React, { useId } from 'react';
import type { MovieResult } from '../api/api-routes';
import type { Tag } from '../utils/hooks';
import { useTags } from '../utils/hooks';
import RatingStars from './RatingStars';

interface MovieCardProps {
  movie: MovieResult;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const tags: Tag[] = useTags(movie);
  const id = useId();

  return (
    <div className="card lg:card-side lg:max-w-xl bg-base-100 shadow-xl">
      <figure>
        <img src={movie.jsonnob.image} alt={`Thumbnail for ${movie.jsonnob.name}`} />
      </figure>
      <div className="card-body justify-between gap-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <RatingStars movie={movie} />
          <div className="inline-flex">
            {tags.map((tag) => (
              <div key={`${id}-${tag.type}`} className="badge badge-secondary mx-1">
                {tag.type.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="card-title pb-3">{movie.jsonnob.name}</h2>
          <p className="flex-grow-0 line-clamp-6">{movie.jsonnob.description}</p>
        </div>
        <div className="card-actions justify-between">
          <span>{new Date(Date.parse(movie.jsonnob.datePublished)).getFullYear()}</span>
          <div className="badge badge-outline">{movie.jsonnob.contentRating}</div>
        </div>
      </div>
    </div>
  );
}
