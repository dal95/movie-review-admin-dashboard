import Home from '../pages/Home'
import Login from '../pages/Login'
import MovieDetails from '../pages/MovieDetails'
import Movies from '../pages/Movies'
import Profile from '../pages/Profile'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    private: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/movies',
    exact: true,
    component: Movies,
    private: true
  },
  {
    path: '/movies/details/:id',
    component: MovieDetails,
    private: true
  },
  {
    path: '/profile',
    component: Profile,
    private: true
  }
]

export default routes
