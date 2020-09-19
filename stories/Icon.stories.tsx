import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Icon, {IconProps} from '../src';

export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta;

const IconStory = ({size = 96}: IconProps) => <Icon size={size}/>;

export const Primary = IconStory.bind({});
Primary.args = {
  size: 96
};
