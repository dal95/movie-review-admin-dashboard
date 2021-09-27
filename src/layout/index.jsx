import Variant from './Layout'
import { useSelector } from 'react-redux'

function Layout ({ children }) {
  const users = useSelector(state => state.users)
  if (users.currentUser)
    return (
      <Variant.Private user={users.currentUser}>{children}</Variant.Private>
    )
  return <Variant.Public>{children}</Variant.Public>
}

export default Layout
