import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Boolean } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import { useSidebarContext } from './SidebarContext';

export interface SidebarLogoTheme {
  base: string;
  collapsed: Boolean;
  img: string;
}

export interface SidebarLogoProps extends PropsWithChildren, ComponentProps<'a'> {
  href: string;
  img: string;
  imgAlt?: string;
  theme?: DeepPartial<SidebarLogoTheme>;
}

const SidebarLogo: FC<SidebarLogoProps> = ({
  children,
  className,
  href,
  img,
  imgAlt = '',
  theme: customTheme = {},
  ...props
}) => {
  const id = useId();
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(useTheme().theme.sidebar.logo, customTheme);

  return (
    <a
      aria-labelledby={`-sidebar-logo-${id}`}
      href={href}
      className={twMerge(theme.base, className)}
      {...props}
    >
      <img alt={imgAlt} src={img} className={theme.img} />
      <span className={theme.collapsed[isCollapsed ? 'on' : 'off']} id={`-sidebar-logo-${id}`}>
        {children}
      </span>
    </a>
  );
};

SidebarLogo.displayName = 'Sidebar.Logo';
export default SidebarLogo;