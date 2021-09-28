import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import Sidebar from './Sidebar'

function Private ({ children, user }) {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className='layout private'>
      <Sidebar />

      <main className='main'>
        <nav className='top-nav'>
          <div className='top-nav__profile'>
            <img
              className='avatar'
              src={`https://avatars.dicebear.com/api/big-ears-neutral/${user.first_name}.svg`}
              alt=''
            />
            {`${user.first_name}`}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
            <div className='top-nav__dropdown'>
              <Link to='/profile' className='top-nav__dropdown-item'>
                Settings
              </Link>
              <div
                className='top-nav__dropdown-item'
                onClick={() => {
                  removeToken()
                  dispatch({ type: 'AUTH_USER_LOGOUT' })
                  history.push('/login')
                }}
              >
                Logout
              </div>
            </div>
          </div>
        </nav>

        {children}
      </main>
    </div>
  )
}

function Public ({ children }) {
  return (
    <div className='layout public'>
      <div className='main'>{children}</div>
    </div>
  )
}

export default {
  Public,
  Private
}
