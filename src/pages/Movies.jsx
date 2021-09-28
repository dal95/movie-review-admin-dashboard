import { useDispatch, useSelector } from 'react-redux'
import ReactPlaceholder from 'react-placeholder'
import { useEffect } from 'react'

import { fetchMovies } from '../redux/actions/movies'
import MovieCard from '../components/MovieCard'

import 'react-placeholder/lib/reactPlaceholder.css'

function Movies () {
  const dispatch = useDispatch()
  const { movies: data } = useSelector(state => state)
  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (data?.isLoading)
    return (
      <div className='grid'>
        {Array.from(Array(10)).map((x, i) => {
          return (
            <ReactPlaceholder
              className='card-placeholder'
              key={i}
              ready={!data.isLoading}
              showLoadingAnimation
              type='rect'
              color='#cacaca'
              // customPlaceholder={<CardSkeleton />}
            />
          )
        })}
      </div>
    )

  return (
    <div className='page movies'>
      <h2 style={{ padding: '0 1.5rem' }}>All movies</h2>
      <div className='grid'>
        {data?.movies?.docs.map(movie => (
          <MovieCard
            key={movie._id}
            movie={{ ...movie, poster_path: movie.poster }}
            // renderAction={customAction}
          />
        ))}
      </div>
    </div>
  )
}

export default Movies
