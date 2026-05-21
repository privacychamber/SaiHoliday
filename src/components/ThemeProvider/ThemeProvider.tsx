'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  /* On first mount: read saved preference (or OS preference) */
  useEffect(() => {
    const saved = localStorage.getItem('sh-theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
      setTheme(saved);
    } else {
      /* Default: light (white) theme */
      applyTheme('light');
      setTheme('light');
    }
  }, []);

  function applyTheme(t: Theme) {
    const html = document.documentElement;
    if (t === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('sh-theme', next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
