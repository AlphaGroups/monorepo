'use client';

import * as React from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>('system'); // Default to 'system' initially

  React.useEffect(() => {
    // Client-side initialization
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const initialTheme = storedTheme || defaultTheme;
    setTheme(initialTheme);

    const root = window.document.documentElement;
    
    let enable = true;

    if (disableTransitionOnChange) {
      enable = false;
      root.classList.add('disable-theme-transition');
    }

    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    if (initialTheme === 'system' && enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      if (attribute === 'class') {
        root.classList.add(systemTheme);
      } else {
        root.setAttribute(attribute, systemTheme);
      }
    } else {
      if (attribute === 'class') {
        root.classList.add(initialTheme);
      } else {
        root.setAttribute(attribute, initialTheme);
      }
    }

    if (disableTransitionOnChange && enable === false) {
      root.classList.remove('disable-theme-transition');
    }
  }, []); // Only run once after mount

  React.useEffect(() => {
    // Update theme when the theme state changes
    const root = window.document.documentElement;
    
    let enable = true;

    if (disableTransitionOnChange) {
      enable = false;
      root.classList.add('disable-theme-transition');
    }

    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    if (theme === 'system' && enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      if (attribute === 'class') {
        root.classList.add(systemTheme);
      } else {
        root.setAttribute(attribute, systemTheme);
      }
    } else {
      if (attribute === 'class') {
        root.classList.add(theme);
      } else {
        root.setAttribute(attribute, theme);
      }
    }

    if (disableTransitionOnChange && enable === false) {
      root.classList.remove('disable-theme-transition');
    }
  }, [theme, attribute, enableSystem, disableTransitionOnChange]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};