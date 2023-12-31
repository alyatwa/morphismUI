import type { TextInputTheme } from './TextInput';

export const textInputTheme: TextInputTheme = {
  base: 'flex drop-shadow-md ',
  addon:
    'inline-flex items-center block bg-opacity-90 px-4 py-3 pl-10 text-sm text-slate-500',
  field: {
    base: 'relative w-full',
    icon: {
      base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
      svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
    },
    rightIcon: {
      base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
      svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
    },
    input: {
      base: 'block w-full focus:ring-transparent border-none focus:outline-offset-1 focus:outline-gray-400 focus:outline without-ring rounded-full bg-white focus:ring-0 font-textaMedium disabled:cursor-not-allowed disabled:opacity-50',
      sizes: {
        sm: 'py-2 px-4 sm:text-xs',
        md: 'py-2.5 px-4 text-sm',
        lg: 'sm:text-md p-4',
      },
      colors: {
        gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
        info: 'bg-opacity-90 px-4 py-3 pl-10 text-sm text-black rounded-full bg-white',
        failure:
          'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
        warning:
          'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
        success:
          'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
      },
      withRightIcon: {
        on: 'pr-10',
        off: '',
      },
      withIcon: {
        on: 'pl-10',
        off: '',
      },
      withAddon: {
        on: 'rounded-r-full',
        off: 'rounded-full',
      },
      withShadow: {
        on: 'shadow-sm dark:shadow-sm-light',
        off: '',
      },
    },
  },
};