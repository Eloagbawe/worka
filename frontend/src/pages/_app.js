import '@/styles/globals.css'
import { useEffect } from 'react';
import { addDarkTheme } from '@/_helpers/set_theme';
import { NavBar } from '@/components/NavBar';
import { ThemeProvider} from '@mui/material/styles';
import { THEME } from '@/styles/material_theme';
import { Footer } from '@/components/Footer';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme');  
    if ((theme === 'dark') || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)){
      addDarkTheme();
    }

  }, []);

 
  return (
    <>
      <ThemeProvider theme={THEME}>
        <div className='h-screen'>
        <NavBar/>
          <Component {...pageProps} />
        <Footer/>
        </div>
      </ThemeProvider>
    </>
  )
}
