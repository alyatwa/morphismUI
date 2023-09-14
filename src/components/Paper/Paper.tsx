import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import type { DeepPartial, Boolean } from '../../';
import { useTheme } from '../../';
import { mergeDeep } from '../../helpers/merge-deep';
import { omit } from '../../helpers/omit';

export interface PaperTheme {
  root: PaperRootTheme;
  img: PaperImageTheme;
}

export interface PaperRootTheme {
  base: string;
  children: string;
  horizontal: Boolean;
  href: string;
}

export interface PaperImageTheme {
  base: string;
  horizontal: Boolean;
}

interface CommonPaperProps extends PropsWithChildren<ComponentProps<'div'>> {
  horizontal?: boolean;
  href?: string;
  /** Overwrites the theme. Will be merged with the context theme.
   * @default {}
   */
  theme?: DeepPartial<PaperTheme>;
}

export type PaperProps =
  | (
      | { imgAlt?: string; imgSrc?: string; renderImage?: never }
      | {
          /** Allows to provide a custom render function for the image component. Useful in Next.JS and Gatsby. **Setting this will disable `imgSrc` and `imgAlt`**.
           */
          renderImage?: (theme: DeepPartial<PaperTheme>, horizontal: boolean) => JSX.Element;
          imgAlt?: never;
          imgSrc?: never;
        }
    ) &
      CommonPaperProps;

export const Paper: FC<PaperProps> = (props) => {
  const { children, className, horizontal, href, theme: customTheme = {} } = props;
  const Component = typeof href === 'undefined' ? 'div' : 'a';
  const theirProps = removeCustomProps(props);

  const theme = mergeDeep(useTheme().theme.paper, customTheme);
  
  return (
    <Component
      data-testid="paper"
      href={href}
      className={twMerge(
        theme.root.base,
        theme.root.horizontal[horizontal ? 'on' : 'off'],
        href && theme.root.href,
        className,
      )}
      {...theirProps}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- jsx-ally/alt-text gives a false positive here. Since we use our own Image component, we cannot provide an "alt" prop.*/}
       
      <div className={theme.root.children}>{children}</div>
    </Component>
  );
};

const Image: FC<PaperProps> = ({ theme: customTheme = {}, ...props }) => {
  const theme = mergeDeep(useTheme().theme.paper, customTheme);
  if (props.renderImage) {
    return props.renderImage(theme, props.horizontal ?? false);
  }
  if (props.imgSrc) {
    return (
      <img
        data-testid="flowbite-paper-image"
        alt={props.imgAlt ?? ''}
        src={props.imgSrc}
        className={twMerge(theme.img.base, theme.img.horizontal[props.horizontal ? 'on' : 'off'])}
      />
    );
  }
  return null;
};

const removeCustomProps = omit([
  'renderImage',
  'imgSrc',
  'imgAlt',
  'children',
  'className',
  'horizontal',
  'href',
  'theme',
]);