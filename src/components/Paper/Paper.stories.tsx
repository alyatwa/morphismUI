import type { Meta, StoryFn } from '@storybook/react';
import type { PaperProps } from './Paper';
import { Paper } from './Paper';

export default {
  title: 'Components/Paper',
  component: Paper,
  decorators: [(Story): JSX.Element => <div className="h-1/2 w-1/2">{Story()}</div>],
} as Meta;

const Template: StoryFn<PaperProps> = (args: PaperProps) => (
  <Paper {...args}>
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Noteworthy technology acquisitions 2021
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
  </Paper>
);

export const Default = Template.bind({});
Default.args = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
  horizontal: true,
};

 