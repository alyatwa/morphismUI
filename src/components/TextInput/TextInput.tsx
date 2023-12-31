import type { ComponentProps, FC, ReactNode } from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Boolean, Colors, Sizes } from '../../';
import { HelperText, useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface TextInputTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    rightIcon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: TextInputSizes;
      colors: TextInputColors;
      withIcon: Boolean;
      withRightIcon: Boolean;
      withAddon: Boolean;
      withShadow: Boolean;
    };
  };
}

export interface TextInputColors
  extends Pick<Colors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface TextInputSizes extends Pick<Sizes, 'sm' | 'md' | 'lg'> {
  [key: string]: string;
}

export interface TextInputProps extends Omit<ComponentProps<'input'>, 'ref' | 'color'> {
  addon?: ReactNode;
  color?: keyof TextInputColors;
  helperText?: ReactNode;
  icon?: FC<ComponentProps<'svg'>>;
  rightIcon?: FC<ComponentProps<'svg'>>;
  shadow?: boolean;
  sizing?: keyof TextInputSizes;
  theme?: DeepPartial<TextInputTheme>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      addon,
      className,
      color = 'info',
      helperText,
      icon: Icon,
      rightIcon: RightIcon,
      shadow,
      sizing = 'md',
      theme: customTheme = {},
      ...props
    },
    ref,
  ) => {
    const theme = mergeDeep(useTheme().theme.textInput, customTheme);

    return (
      <>
        <div className={twMerge(theme.base, className)}>
          {addon && <span className={theme.addon}>{addon}</span>}
          <div className={theme.field.base}>
            {Icon && (
              <div className={theme.field.icon.base}>
                <Icon className={theme.field.icon.svg} />
              </div>
            )}
            {RightIcon && (
              <div data-testid="right-icon" className={theme.field.rightIcon.base}>
                <RightIcon className={theme.field.rightIcon.svg} />
              </div>
            )}
            <input
              className={twMerge(
                theme.field.input.base,
                theme.field.input.colors[color],
                theme.field.input.sizes[sizing],
                theme.field.input.withIcon[Icon ? 'on' : 'off'],
                theme.field.input.withRightIcon[RightIcon ? 'on' : 'off'],
                theme.field.input.withAddon[addon ? 'on' : 'off'],
                theme.field.input.withShadow[shadow ? 'on' : 'off'],
              )}
              {...props}
              ref={ref}
            />
          </div>
        </div>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  },
);

TextInput.displayName = 'TextInput';