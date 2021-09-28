import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactPlaceholder from 'react-placeholder'

import Button from '../components/Button'
import { getImage } from '../helpers/movieDB'
import useForm from '../hooks/useForm'

import 'react-placeholder/lib/reactPlaceholder.css'
import CardSkeleton from '../components/placeholders/CardSkeleton'
import { postMovie } from '../redux/actions/movies'
import MovieCard from '../components/MovieCard'
import LibraryIcon from '../assets/images/library.svg?component'
import SearchIcon from '../assets/images/eyeglass.svg?component'

const source = {
  baseUrl: import.meta.env.VITE_APP_MOVIEDB_BASE_URL,
  apiKey: import.meta.env.VITE_APP_MOVIEDB_API_KEY
}

const genres = [
  'Horror',
  'Science Fiction',
  'Action',
  'Comedy',
  'Romance',
  'Thriller',
  'Adventure',
  'Documentary',
  'Animation',
  'Drama',
  'War'
]

function Home () {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { values, handleChange } = useForm({ query: '' })
  const [data, setMovies] = useState(null)

  const handleSubmit = async e => {
    setIsLoading(true)
    e.preventDefault()

    try {
      const res = await axios.get(`${source.baseUrl}/search/movie`, {
        params: {
          api_key: source.apiKey,
          query: values.query
        }
      })

      setTimeout(() => {
        setMovies(res.data)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const addMovie = movie => dispatch(postMovie(movie))

  return (
    <div className='home'>
      <h3>Add your favorite movies to the list</h3>

      <form
        action=''
        className={isLoading ? 'is-loading' : ''}
        onSubmit={handleSubmit}
      >
        <input
          type='search'
          name='query'
          id=''
          placeholder='Search movie name'
          value={values.query}
          onChange={handleChange}
        />
        <Button type='submit' isLoading={isLoading}>
          {isLoading ? 'Fetch your movies' : 'Search'}
          <SearchIcon />
        </Button>
      </form>

      {values.query && renderList(data, isLoading, addMovie, source)}
    </div>
  )
}

function renderList (data, isLoading, addMovie, source) {
  const handleAddMovie = async id => {
    const movie = await axios.get(
      `${source.baseUrl}/movie/${id}?api_key=${source.apiKey}&append_to_response=videos`
    )
    const credit = await axios.get(
      `${source.baseUrl}/movie/${id}/credits?api_key=${source.apiKey}`
    )

    addMovie({
      ...movie.data,
      synopsis: movie.data.overview,
      trailer: `https://www.youtube.com/watch?v=${movie.data?.videos?.results[0]?.key}`,
      poster: movie.data?.poster_path,
      genres: movie.data?.genres.map(genre => genre.name),
      casts: [...credit?.data?.cast.slice(0, 15)],
      crews: [...credit?.data?.crew.slice(0, 15)]
    })
  }

  const customAction = movie => {
    return (
      <>
        <div className='card__cta' onClick={() => handleAddMovie(movie.id)}>
          <div>Add this to database</div>
          <LibraryIcon />
        </div>
      </>
    )
  }

  if (isLoading)
    return (
      <div className='grid'>
        {Array.from(Array(10)).map((x, i) => {
          return (
            <ReactPlaceholder
              className='card-placeholder'
              key={i}
              ready={!isLoading}
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
    <div className='grid'>
      {data?.results.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          renderAction={() => customAction(movie)}
        />
      ))}
    </div>
  )
}

export default Home
