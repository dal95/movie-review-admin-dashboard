import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux/actions/movies'
import { useEffect } from 'react'

function Movies () {
  const dispatch = useDispatch()
  const { movies: data } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div>
      {data?.movies?.docs.map(movie => (
        <h2 key={movie._id}>{movie.title}</h2>
      ))}
    </div>
  )
}

export default Movies
