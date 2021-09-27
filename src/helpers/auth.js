export const setToken = currentUser => {
  const user = localStorage.setItem('user', JSON.stringify(currentUser))
  return user
}

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user?.token
}

export const removeToken = () => {
  localStorage.removeItem('user')
}
