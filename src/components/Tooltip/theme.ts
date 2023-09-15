import type { TooltipTheme } from './Tooltip';

export const tooltipTheme: TooltipTheme = {
  target: 'w-fit',
  animation: 'transition-opacity',
  arrow: {
    base: 'absolute z-10 h-2 w-2 rotate-45',
    style: {
      dark: 'bg-gray-900 dark:bg-gray-700',
      light: 'bg-white',
      auto: 'bg-white dark:bg-gray-700',
    },
    placement: '-4px',
  },
  base: 'absolute inline-block z-10 rounded-lg py-2 px-3 text-base font-medium shadow-sm font-textaBold',
  hidden: 'invisible opacity-0',
  style: {
    dark: 'bg-gray-900 text-white dark:bg-gray-700',
    light: 'backdrop-blur-md bg-white/90 text-gray-900 drop-shadow-lg',
    auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
  },
  content: 'relative z-20',
};