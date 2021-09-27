import axios from 'axios'
import { useState } from 'react'
import ReactPlaceholder from 'react-placeholder'

import Button from '../components/Button'
import { getPoster } from '../helpers/movieDB'
import useForm from '../hooks/useForm'

import 'react-placeholder/lib/reactPlaceholder.css'
import CardSkeleton from '../components/placeholders/CardSkeleton'

const source = {
  baseUrl: import.meta.env.VITE_APP_MOVIEDB_BASE_URL,
  apiKey: import.meta.env.VITE_APP_MOVIEDB_API_KEY
}

function Home () {
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

      {values.query && renderList(data, isLoading)}
    </div>
  )
}

function renderList (data, isLoading) {
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
          <img
            src={getPoster(movie.poster_path, 'w400')}
            alt={`Poster of ${movie.title}`}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default Home
