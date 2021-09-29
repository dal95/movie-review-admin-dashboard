import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import useForm from '../hooks/useForm'
import Button from '../components/Button'
import { authRequest } from '../redux/actions/users'

function Login () {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      authRequest(values, () => {
        history.push('/')
      })
    )
  }

  return (
    <section className='login'>
      <form action='' className='login__form' onSubmit={handleSubmit}>
        <h3>Login to your account</h3>
        <h4>Test account - email: admin@gmail.com, password: admin</h4>
        <div className='fields'>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            placeholder='Your email'
            autoComplete='username'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className='fields'>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Your password'
            autoComplete='current-password'
            values={values.password}
            onChange={handleChange}
          />
        </div>

        <div className='submit-wrapper'>
          <Button isLoading={state?.users.isLoading}>Sign in</Button>
        </div>
      </form>
    </section>
  )
}

export default Login
