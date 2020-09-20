import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Icon, {IconProps} from '../src';

export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta;

const IconStory = ({size = 48, type = 'simple'}: IconProps) => <Icon size={size} type={type}/>;

export const Simple = IconStory.bind({});
Simple.args = {
  size: 48
};

export const Expanding = IconStory.bind({});
Expanding.args = {
  size: 48,
  type: 'expanding'
};
