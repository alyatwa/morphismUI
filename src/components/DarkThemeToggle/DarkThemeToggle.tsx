import type { ComponentProps, FC } from 'react';
import { useContext } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial } from '../../';
import { useTheme } from '../../';
import { ThemeContext } from '../../components/Morphism/ThemeContext';
import { mergeDeep } from '../../helpers/merge-deep';

export interface DarkThemeToggleTheme {
  root: DarkThemeToggleRootTheme;
}

export interface DarkThemeToggleRootTheme {
  base: string;
  icon: string;
}

export interface DarkThemeToggleProps extends ComponentProps<'button'> {
  iconDark?: string;
  iconLight?: string;
  theme?: DeepPartial<DarkThemeToggleTheme>;
}

export const DarkThemeToggle: FC<DarkThemeToggleProps> = ({
  className,
  theme: customTheme = {},
  iconDark: IconDark = HiSun,
  iconLight: IconLight = HiMoon,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.darkThemeToggle, customTheme);

  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <button
      aria-label="Toggle dark mode"
      data-testid="dark-theme-toggle"
      onClick={toggleMode}
      type="button"
      className={twMerge(theme.root.base, className)}
      {...props}
    >
      {mode === 'dark' ? (
        <IconLight aria-label="Currently dark mode" className={theme.root.icon} />
      ) : (
        <IconDark aria-label="Currently light mode" className={theme.root.icon} />
      )}
    </button>
  );
};

DarkThemeToggle.displayName = 'DarkThemeToggle';