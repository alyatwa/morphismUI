import type { ComponentProps, ElementType, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Boolean } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import type { SidebarCTATheme } from './SidebarCTA';
import { SidebarCTA } from './SidebarCTA';
import type { SidebarCollapseTheme } from './SidebarCollapse';
import { SidebarCollapse } from './SidebarCollapse';
import { SidebarContext } from './SidebarContext';
import type { SidebarItemTheme } from './SidebarItem';
import { SidebarItem } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';
import { SidebarItems } from './SidebarItems';
import type { SidebarLogoTheme } from './SidebarLogo';
import SidebarLogo from './SidebarLogo';

export interface SidebarTheme {
  root: {
    base: string;
    collapsed: Boolean;
    inner: string;
  };
  collapse: SidebarCollapseTheme;
  cta: SidebarCTATheme;
  item: SidebarItemTheme;
  items: string;
  itemGroup: string;
  logo: SidebarLogoTheme;
}

export interface SidebarProps extends PropsWithChildren, ComponentProps<'div'> {
  as?: ElementType;
  collapseBehavior?: 'collapse' | 'hide';
  collapsed?: boolean;
  theme?: DeepPartial<SidebarTheme>;
}

const SidebarComponent: FC<SidebarProps> = ({
  children,
  as: Component = 'nav',
  collapseBehavior = 'collapse',
  collapsed: isCollapsed = true,
  theme: customTheme = {},
  className,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.sidebar, customTheme);

  return (
    <SidebarContext.Provider value={{ isCollapsed }}>
      <Component
        aria-label="Sidebar"
        hidden={isCollapsed && collapseBehavior === 'hide'}
        className={twMerge(theme.root.base, theme.root.collapsed[isCollapsed ? 'on' : 'off'], className)}
        {...props}
      >
        <div className={theme.root.inner}>{children}</div>
      </Component>
    </SidebarContext.Provider>
  );
};

SidebarComponent.displayName = 'Sidebar';
export const Sidebar = Object.assign(SidebarComponent, {
  Collapse: SidebarCollapse,
  CTA: SidebarCTA,
  Item: SidebarItem,
  Items: SidebarItems,
  ItemGroup: SidebarItemGroup,
  Logo: SidebarLogo,
});