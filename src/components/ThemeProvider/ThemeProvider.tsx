import { createContext, useEffect, useState } from 'react';

type ContextType = {
  theme: string;
  toggleTheme: () => void;
  iconColor: string;
};

interface Props {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ContextType>({
  theme: 'light',
  toggleTheme: () => {},
  iconColor: '',
});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light',
  );
  const [iconColor, setIconColor] = useState(
    localStorage.getItem('selectedTheme') === 'light'
      ? '#0f0f11'
      : '#fff',
  );

  if (!(theme === 'dark')) {
    localStorage.setItem('selectedTheme', 'light');
  }

  useEffect(() => localStorage.setItem(
    'selectedTheme',
    theme === 'dark' ? 'dark' : 'light',
  ), [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    setIconColor((curr) => (curr === '#0f0f11' ? '#fff' : '#0f0f11'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        iconColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
