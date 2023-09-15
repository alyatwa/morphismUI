import type { Meta, StoryFn } from '@storybook/react';
import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.storyName = 'Default';
DefaultAvatar.args = {
  status:'online',
  alt: 'Your avatar',
  img: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/26183/article_aligned%401x.jpg',
};
