import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme} = useSelector(state => state.theme)
  return (
    <div className={theme}>
        <div className='bg-editorial-white text-editorial-dark dark:text-editorial-dark-text
        dark:bg-editorial-dark-bg min-h-screen transition-colors duration-300'>
            {children}
        </div>
    </div>
  )
}

export default ThemeProvider;