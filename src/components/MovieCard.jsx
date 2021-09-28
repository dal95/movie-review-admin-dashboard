import { getImage } from '../helpers/movieDB'

function MovieCard ({ movie, renderAction }) {
  console.log(movie.poster)
  return (
    <div key={movie.id} className='card'>
      <div className='card__img'>
        <div className='card__img-overlay'>
          <div className='card__cta' onClick={() => handleAddMovie(movie.id)}>
            {renderAction && renderAction()}
          </div>
        </div>
        <img
          src={
            movie.poster_path
              ? getImage(movie.poster_path, 'w400')
              : 'http://unsplash.it/500'
          }
          alt={`Poster of ${movie.title}`}
        />
      </div>
      <h5>{movie.title}</h5>
    </div>
  )
}

export default MovieCard
