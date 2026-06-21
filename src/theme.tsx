import React, { createContext, useContext, useMemo, useState } from 'react';

/** Paleta base de CertSim (de la referencia neumórfica). */
export const palette = {
  navy: '#14213d',
  black: '#000000',
  accent: '#fca311',
  gray: '#e5e5e5',
  white: '#ffffff',
  green: '#34d399',
  red: '#f87171',
};

export type ThemeName = 'dark' | 'light';

export interface Theme {
  name: ThemeName;
  bg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentInk: string; // texto/íconos sobre acento
  track: string; // fondo de barras de progreso (hundido)
  green: string;
  red: string;
  shadowDark: string;
  shadowLight: string;
  /** Sombra neumórfica elevada (relieve). */
  raised: (depth?: number, blur?: number) => { boxShadow: string };
  /** Sombra neumórfica hundida (presionado). */
  inset: (depth?: number, blur?: number) => { boxShadow: string };
  /** Resplandor del acento (para botones/FAB). */
  accentGlow: { boxShadow: string };
}

function build(name: ThemeName): Theme {
  const dark = name === 'dark';
  const bg = dark ? palette.navy : palette.gray;
  const shadowDark = dark ? '#080e1a' : '#c5cad6';
  const shadowLight = dark ? '#1e2f52' : '#ffffff';
  return {
    name,
    bg,
    textPrimary: dark ? palette.white : palette.navy,
    textSecondary: dark ? palette.gray : '#5a6478',
    accent: palette.accent,
    accentInk: palette.navy,
    track: dark ? '#080e1a' : '#c5cad6',
    green: palette.green,
    red: palette.red,
    shadowDark,
    shadowLight,
    raised: (d = 6, b = 14) => ({
      boxShadow: `${d}px ${d}px ${b}px ${shadowDark}, -${d}px -${d}px ${b}px ${shadowLight}`,
    }),
    inset: (d = 4, b = 8) => ({
      boxShadow: `inset ${d}px ${d}px ${b}px ${shadowDark}, inset -${d}px -${d}px ${b}px ${shadowLight}`,
    }),
    accentGlow: {
      boxShadow: `0px 8px 18px rgba(252,163,17,0.4)`,
    },
  };
}

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  setTheme: (n: ThemeName) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<ThemeName>('dark');
  const value = useMemo<ThemeCtx>(
    () => ({
      theme: build(name),
      toggle: () => setName((n) => (n === 'dark' ? 'light' : 'dark')),
      setTheme: setName,
    }),
    [name],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
