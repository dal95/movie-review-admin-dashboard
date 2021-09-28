import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux/actions/movies'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImage } from '../helpers/movieDB'

function Movies () {
  const dispatch = useDispatch()
  const { movies: data } = useSelector(state => state)
  const state = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  console.log(data.isLoading)
  if (data?.isLoading) return <h1>Loading...</h1>

  return (
    <div>
      {data?.movies?.docs.map(movie => (
        <div key={movie._id}>
          <Link to={`/movies/details/${movie._id}`}>
            <img src={getImage(movie.poster)} alt='' />
            <h2>{movie.title}</h2>
          </Link>
          id:
          <input type='text' defaultValue={movie._id} />
        </div>
      ))}
    </div>
  )
}

export default Movies
