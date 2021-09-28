import { Link } from 'react-router-dom'

function Sidebar () {
  return (
    <aside className='sidebar'>
      Movies
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/movies'>All Movies</Link>
        </li>
        <li>All casts</li>
        <li>All Comments</li>
      </ul>
      Users
      <ul>
        <li>All Users</li>
      </ul>
    </aside>
  )
}

export default Sidebar
