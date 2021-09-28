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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
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

  if (isLoading)
    return (
      <div className='grid'>
        {Array.from(Array(10)).map((x, i) => {
          return (
            <ReactPlaceholder
              className='card'
              key={i}
              ready={!isLoading}
              showLoadingAnimation
              type='rect'
              style={{ height: 700, width: '100%' }}
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
        <div key={movie.id} className='card'>
          <div className='card__img'>
            <div className='card__img-overlay'>
              <div
                className='card__cta'
                onClick={() => handleAddMovie(movie.id)}
              >
                <div>Add this to database</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                    clipRule='evenodd'
                  />
                </svg>
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
          <h3>{movie.title}</h3>

          {/* {movie?.casts.map(cast => (
            <div key={cast.id}>{cast.name}</div>
          ))} */}
        </div>
      ))}
    </div>
  )
}

export default Home
