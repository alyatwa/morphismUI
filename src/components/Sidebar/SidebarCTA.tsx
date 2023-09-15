import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Colors } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';

export interface SidebarCTATheme {
  base: string;
  color: SidebarCTAColors;
}

export interface SidebarCTAProps extends PropsWithChildren, Omit<ComponentProps<'div'>, 'color'> {
  color?: keyof SidebarCTAColors;
  theme?: DeepPartial<SidebarCTATheme>;
}

export interface SidebarCTAColors
  extends Pick<
    Colors,
    'blue' | 'dark' | 'failure' | 'gray' | 'green' | 'light' | 'purple' | 'red' | 'success' | 'warning' | 'yellow'
  > {
  [key: string]: string;
}

export const SidebarCTA: FC<SidebarCTAProps> = ({
  children,
  color = 'info',
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(useTheme().theme.sidebar.cta, customTheme);

  return (
    <div
      data-testid="sidebar-cta"
      hidden={isCollapsed}
      className={twMerge(theme.base, theme.color[color], className)}
      {...props}
    >
      {children}
    </div>
  );
};

SidebarCTA.displayName = 'Sidebar.CTA';