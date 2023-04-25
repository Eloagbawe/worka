import React, { useState, useEffect } from 'react';
import { toggleDarkTheme } from '../_helpers/set_theme';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { FaAlignJustify } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


import { logout, reset } from '../features/auth/authSlice';
import lightLogo from '../images/logo-light.png'
import darkLogo from '../images/logo-dark.png'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const path = useLocation().pathname


  const { user } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const mode = localStorage.getItem('theme');  
    if ((mode === 'dark') || (!mode && window.matchMedia("(prefers-color-scheme: dark)").matches)){
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  const setDarkTheme = () => {
    toggleDarkTheme();
    setTheme('dark');

  }

  const setLightTheme = () => {
    toggleDarkTheme();
    setTheme('light');
  }

  const isCreateAccountPage = path.startsWith('/create_account');

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/');
  }
  
  return (
    <div className='flex px-3 sm:px-8 py-4 items-center justify-between'>
      <div className='flex items-center'>
       <div className=''>
      <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            display: {
              laptop: "inherit"
            },
            visibility: {
              laptop: 'hidden'
            },
            width: {
              laptop: 0
            },
            minWidth: {
              laptop: 0
            }
          }}
        >
          <FaAlignJustify className='text-text-color'/>
        </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          display: {
            laptop: "inherit"
          },
          visibility: {
            laptop: 'hidden'
          },
          width: {
            laptop: 0
          },
          minWidth: {
            laptop: 0
          }
        }}
      >
        {path !== '/' && <Link to="/"><MenuItem>Home</MenuItem></Link>}
        <MenuItem>About</MenuItem>
        <MenuItem>Contact us</MenuItem>
        {user && user.role === 'user' && path !=='/search' && <Link to="/search"><MenuItem>Search</MenuItem></Link>}
        <MenuItem>Blog</MenuItem>

        {user ? (
          <div className='min-[500px]:hidden mb-3'>
          {path !== '/dashboard' && <Link to="/dashboard"><button className="ml-2 px-3 py-2 block rounded bg-[#EA5455] text-white font-bold">Dashboard</button></Link>}
          <button onClick={onLogout} className="ml-2 px-3 py-2 block font-bold text-text-color">Log out</button>
          </div>
        ) : (
          <div className='min-[500px]:hidden mb-3'>
          {!isCreateAccountPage && <Link to="/create_account"><button className="ml-2 px-3 py-2 block rounded bg-[#EA5455] text-white font-bold">Sign Up</button></Link>}
          {path !== '/login' && <Link to="/login"><button className="ml-2 px-3 py-2 block font-bold text-text-color">Log in</button></Link>}
        </div>
        )}

        

      </Menu>
      </div>
  
      <div>
      {theme === 'dark' && <img src={darkLogo}
      className='w-32 sm:w-44' alt="logo for dark mode"/>}
      {theme === 'light' && <img src={lightLogo}
      className='w-32 sm:w-44' alt="logo for light mode" />}
      </div>

      </div>

      <div className='hidden lg:block'>
        {path !== '/' && <Link to="/" className='mr-6 text-text-color font-bold'>Home</Link>}
        <Link to="" className='mr-6 text-text-color font-bold'>About</Link>
        <Link to="" className='mr-6 text-text-color font-bold'>Contact us</Link>
        {user && user.role === 'user' && path !== '/search' && <Link to="/search" className='mr-6 text-text-color font-bold'>Search</Link>}
        <Link href="" className='mr-6 text-text-color font-bold'>Blog</Link>
      </div>

      <div className='flex items-center'>
        <div>
        {theme === 'dark' && 
        <IconContext.Provider  value={{ size: '20px' }}>
            
            <BsSun onClick={() => setLightTheme()} className='text-[#05BFDB] mx-6'/>

        </IconContext.Provider>}

        {theme === 'light' &&
        <IconContext.Provider value={{ size: '20px'}}>

            <BsMoonFill onClick={() => setDarkTheme()} className='text-text-color mx-6'/>

        </IconContext.Provider>}
        </div>

        {user ? (
          <div className='hidden min-[500px]:block'>
          {path !== '/dashboard' && <Link to="/dashboard"><button className="px-5 py-2 rounded bg-[#EA5455] text-white font-bold">Dashboard</button></Link>}
          <button onClick={onLogout} className="px-5 py-2 font-bold text-text-color">Log out</button>
        </div>
        ): (
          <div className='hidden min-[500px]:block'>
          {!isCreateAccountPage && <Link to="/create_account"><button className="px-5 py-2 rounded bg-[#EA5455] text-white font-bold">Sign Up</button></Link>}
          {path !== '/login' && <Link to="/login"><button className="px-5 py-2 font-bold text-text-color">Log in</button></Link>}
          </div>
        )}
      </div>
    </div>
  )
}
