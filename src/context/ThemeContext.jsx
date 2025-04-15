import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    console.log('Saved theme:', savedTheme); // Log the saved theme
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
    
    // Apply theme to body
    document.body.className = savedTheme;
    document.body.style.backgroundColor = savedTheme === 'dark' ? '#000' : '#fff';
    document.body.style.color = savedTheme === 'dark' ? '#fff' : '#000';
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = theme;
    document.body.style.backgroundColor = theme === 'dark' ? '#000' : '#fff';
    document.body.style.color = theme === 'dark' ? '#fff' : '#000';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
