import type { FC, HTMLAttributes } from 'react';
import { useEffect, useMemo } from 'react';
import type { DeepPartial } from '../../';
import { theme as defaultTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import type { Theme } from './Theme';
import { ThemeContext, useTheme, useThemeMode } from './ThemeContext';

export interface ThemeProps {
  dark?: boolean;
  theme?: DeepPartial<Theme>;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const Morphism: FC<Props> = ({ children, theme = {} }) => {
  const { theme: customTheme = {}, dark } = theme;
  const [mode, setMode, toggleMode] = useThemeMode();

  const mergedTheme = mergeDeep(defaultTheme, customTheme);

  useEffect(() => {
    if (dark) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  }, [dark, setMode]);

  const themeContextValue = useMemo(
    () => ({
      theme: mergedTheme,
      mode,
      toggleMode,
    }),
    [mode, toggleMode, mergedTheme],
  );

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

Morphism.displayName = 'Morphism';

export type {
  CustomTheme,
  Boolean,
  Colors,
  ContentPositions,
  GradientColors,
  GradientDuoToneColors,
  HeadingLevel,
  Positions,
  Sizes,
  StateColors,
  Theme,
} from './Theme';
export { useTheme, useThemeMode };