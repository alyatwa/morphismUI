import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Colors } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface HelperTextTheme {
  root: HelperTextRootTheme;
}

export interface HelperTextRootTheme {
  base: string;
  colors: HelperColors;
}

export interface HelperColors extends Pick<Colors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface HelperTextProps extends PropsWithChildren<Omit<ComponentProps<'p'>, 'color'>> {
  color?: keyof HelperColors;
  theme?: DeepPartial<HelperTextTheme>;
  value?: string;
}

export const HelperText: FC<HelperTextProps> = ({
  children,
  className,
  color = 'default',
  theme: customTheme = {},
  value,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.helperText, customTheme);

  return (
    <p className={twMerge(theme.root.base, theme.root.colors[color], className)} {...props}>
      {value ?? children ?? ''}
    </p>
  );
};

HelperText.displayName = 'HelperText';