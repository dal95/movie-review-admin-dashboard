import { Children } from 'react'

function Button ({
  type = '',
  isLoading = false,
  loadingIcon = null,
  variant = '',
  value = null,
  children,
  ...rest
}) {
  const renderLoading = isLoading => {
    if (isLoading && loadingIcon) return <span>Custom {loadingIcon}</span>
    if (isLoading) return <span className='loading'></span>
  }

  switch (type) {
    case 'input':
      return (
        <input
          type='submit'
          value={value}
          className={`button ${variant}`}
          {...rest}
        />
      )
    default:
      return (
        <button type={type} {...rest} className={`button ${variant}`}>
          {renderLoading(isLoading)}
          {value || children}
        </button>
      )
  }
}

export default Button
