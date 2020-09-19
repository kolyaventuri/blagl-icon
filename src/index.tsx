import React from 'react';

export type IconProps = {
  readonly size: number;
};

const Icon = ({size = 96}: IconProps): JSX.Element => (
  <div>
    <p>text {size}</p>
  </div>
);

export default Icon;
