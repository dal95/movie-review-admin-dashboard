import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux/actions/movies'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImage } from '../helpers/movieDB'
import MovieCard from '../components/MovieCard'

function Movies () {
  const dispatch = useDispatch()
  const { movies: data } = useSelector(state => state)
  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  console.log(data.isLoading)
  if (data?.isLoading) return <div></div>

  return (
    <div className='grid'>
      {data?.movies?.docs.map(movie => (
        <MovieCard
          key={movie._id}
          movie={{ ...movie, poster_path: movie.poster }}
          // renderAction={customAction}
        />
      ))}
    </div>
  )
}

export default Movies
