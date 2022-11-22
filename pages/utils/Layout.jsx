import * as React from 'react'
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Nav from './Nav'

const Layout = ({children }) => {

  
  const lightTheme = createTheme({
    type: 'light',
    theme: {
      
    }
  })
  
  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      
    }
  })

  return (
 
     <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
       >
    <NextUIProvider>
    <Nav />
    { children }
   </NextUIProvider>
    
    </NextThemesProvider>
    
   
  )
}

export default Layout