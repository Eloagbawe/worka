import './App.css';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { CreateUserAccount } from './pages/CreateUserAccount';
import { CreateArtisanAccount } from './pages/CreateArtisanAccount';
import { Search } from './pages/Search';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { ContactUs } from './pages/ContactUs';
import { About } from './pages/About';

import { addDarkTheme } from './_helpers/set_theme';
import { useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {Routes, Route} from 'react-router-dom'


function App() {

  useEffect(() => {
    const theme = localStorage.getItem('theme');  
    if ((theme === 'dark') || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)){
      addDarkTheme();
    }

  }, []);
  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
        <div className='min-h-fit'>
        <NavBar/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/create_account' element={<CreateAccount/>} />
          <Route path='/create_account/user' element={<CreateUserAccount/>} />
          <Route path='/create_account/artisan' element={<CreateArtisanAccount/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/profile/:id' element={<Profile/>} />
          <Route path='/contact' element={<ContactUs/>} />
          <Route path='/about' element={<About/>} />

          <Route path='*' element={<NotFound/>} />
      </Routes>

      </div>
      <Footer/>
    </div>
  );
}

export default App;
