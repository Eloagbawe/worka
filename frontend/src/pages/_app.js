import '@/styles/globals.css'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { addDarkTheme } from '@/_helpers/set_theme';
import { NavBar } from '@/components/NavBar';
import { ThemeProvider} from '@mui/material/styles';
import { THEME } from '@/styles/material_theme';
import { Footer } from '@/components/Footer';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



export default function App({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme');  
    if ((theme === 'dark') || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)){
      addDarkTheme();
    }

  }, []);

 
  return (
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <ToastContainer autoClose={3000}/>
        <div className='h-screen'>
        <NavBar/>
          <Component {...pageProps} />
        <Footer/>
        </div>
      </ThemeProvider>
    </Provider>

  )
}
