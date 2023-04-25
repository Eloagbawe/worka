export const addDarkTheme = () => {
  document.documentElement.classList.add('dark');
  localStorage.setItem("theme", "dark")
}

export const toggleDarkTheme = () => {
  const theme = localStorage.getItem('theme');

  if (theme === 'dark') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem("theme", "light")
  }

  if (theme === 'light') {
    document.documentElement.classList.add('dark');
    localStorage.setItem("theme", "dark")
  }
}
