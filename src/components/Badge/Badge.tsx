import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Boolean, Colors, Sizes } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';

export interface BadgeTheme {
  root: BadgeRootTheme;
  icon: BadgeIconTheme;
}

export interface BadgeRootTheme {
  base: string;
  color: Colors;
  href: string;
  size: BadgeSizes;
}

export interface BadgeIconTheme extends Boolean {
  size: BadgeSizes;
}

export interface BadgeSizes extends Pick<Sizes, 'xs' | 'sm'> {
  [key: string]: string;
}

export interface BadgeProps extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  color?: keyof Colors;
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  size?: keyof BadgeSizes;
  theme?: DeepPartial<BadgeTheme>;
}

export const Badge: FC<BadgeProps> = ({
  children,
  color = 'info',
  href,
  icon: Icon,
  size = 'xs',
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.badge, customTheme);

  const Content: FC = () => (
    <span
      className={twMerge(
        theme.root.base,
        theme.root.color[color],
        theme.root.size[size],
        theme.icon[Icon ? 'on' : 'off'],
        className,
      )}
      data-testid="badge"
      {...props}
    >
      {Icon && <Icon aria-hidden className={theme.icon.size[size]} data-testid="badge-icon" />}
      {children && <span>{children}</span>}
    </span>
  );

  return href ? (
    <a className={theme.root.href} href={href}>
      <Content />
    </a>
  ) : (
    <Content />
  );
};

Badge.displayName = 'Badge';