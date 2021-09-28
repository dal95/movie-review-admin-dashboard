import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import ChevronDown from '../assets/images/chevron-down.svg?component'
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

            <ChevronDown />
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
