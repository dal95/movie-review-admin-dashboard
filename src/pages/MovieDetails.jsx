import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getImage } from '../helpers/movieDB'
import API from '../services/api'

function MovieDetails () {
  const [details, setDetails] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    API.get(`/movies/${id}`).then(res => setDetails(res.data))
  }, [])

  if (!details) return <h3>Loading...</h3>

  return (
    <div>
      <h1>{details.title}</h1>
      <div>
        <h2>Casts</h2>
        {details?.casts.map(cast => (
          <span key={cast.id}>
            {' '}
            <img src={getImage(cast.profile_path)} alt={cast.name} />{' '}
            {cast.name}{' '}
          </span>
        ))}
      </div>
    </div>
  )
}

export default MovieDetails
