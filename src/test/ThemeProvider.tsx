import { createContext, useState } from 'react';

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
  const [theme, setTheme] = useState('light');
  const [iconColor, setIconColor] = useState('#0F0F11');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    setIconColor((curr) => (curr === '#0F0F11' ? '#fff' : '#0F0F11'));
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
