import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const Icon = ({ name, className = '', onClick }: IconProps) => (
  <i
    className={`icon icon-${name} ${className}`}
    onClick={onClick}
  />
);

export default Icon;