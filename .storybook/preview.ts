import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

import { withThemeByClassName } from '@storybook/addon-styling';

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../src/index.css';
import { storybookParameters } from './parameters';



const preview: Preview = {
  globalTypes: {
    background: {  default: "white",
    selector: "body",}
  },
  parameters: {
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark, appBg: 'black' },
      // Override the default light theme
      light: { ...themes.normal, appBg: 'white' }
    },
    background: {
      default: "gradient",
      selector: "body",
      onChange(background) {
        // handle new background
      },
      options: [
        {
          id: "white",
          title: "White",
          color: "#fff",
        },
        {
          id: "black",
          title: "Black",
          color: "#000",
        },
        {
          id: "gradient",
          title: "Gradient",
          background:
            "linear-gradient(to right top, #5fc9f8, #72c9fa, #82c9fc, #91cafc, #9fcafc, #adcafc, #bbc9fb, #c7c9f9, #d7c9f6, #e5c9f1, #f0caec, #f9cce6)",
          color:
            "linear-gradient(to right top, #5fc9f8, #72c9fa, #82c9fc, #91cafc, #9fcafc, #adcafc, #bbc9fb, #c7c9f9, #d7c9f6, #e5c9f1, #f0caec, #f9cce6)",
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};
export const parameters = storybookParameters;
export default preview;
