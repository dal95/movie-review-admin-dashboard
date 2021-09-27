import { useState } from 'react'

const useForm = settings => {
  const [values, setValues] = useState(settings)

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e, cb) => {
    e.preventDefault()
    // cb()
  }

  return {
    values,
    handleChange,
    handleSubmit
  }
}

export default useForm
