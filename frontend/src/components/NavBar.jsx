import React, { useState, useEffect } from 'react';
import { toggleDarkTheme } from '@/_helpers/set_theme';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { FaAlignJustify } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Image from 'next/image';
import Link from 'next/link';
import lightLogo from '../../public/images/logo-light.png'
// import lightLogo from '../../public/images/logo-dup.png'

import darkLogo from '../../public/images/logo-dark.png'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const NavBar = () => {
  const [theme, setTheme] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const mode = localStorage.getItem('theme');
    if (mode) {
      setTheme(mode)
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

  
  return (
    <div className='flex sm:px-8 py-4 items-center justify-between'>
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
        <MenuItem>About</MenuItem>
        <MenuItem>Contact us</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Search</MenuItem>
        <MenuItem>Blog</MenuItem>

        <div className='min-[500px]:hidden'>
          <button className="ml-2 px-3 py-2 block rounded bg-[#EA5455] text-white font-bold">Sign Up</button>
          <button className="ml-2 px-3 py-2 block font-bold text-text-color">Log in</button>
        </div>
      </Menu>
      </div>
  
      <div>
      {theme === 'dark' && <Image src={darkLogo}
      className='w-32 sm:w-44' alt="logo for dark mode" priority/>}
      {theme === 'light' && <Image src={lightLogo}
      className='w-32 sm:w-44' alt="logo for light mode" priority/>}
      </div>

      </div>

      <div className='hidden lg:block'>
        <Link href="" className='mr-6 text-text-color font-bold'>About</Link>
        <Link href="" className='mr-6 text-text-color font-bold'>Contact us</Link>
        <Link href="" className='mr-6 text-text-color font-bold'>Search</Link>
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

        <div className='hidden min-[500px]:block'>
          <button className="px-5 py-2 rounded bg-[#EA5455] text-white font-bold">Sign Up</button>
          <button className="px-5 py-2 font-bold text-text-color">Log in</button>
        </div>
        
      </div>
    </div>
  )
}
