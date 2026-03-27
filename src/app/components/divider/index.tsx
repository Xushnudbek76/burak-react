import React from 'react';
import styled from 'styled-components';

interface IDividerProps {
  height?: string;
  width?: string;
  bg?: string;
  className?: string; 
}
const DividerComponent = styled.span<IDividerProps>`
	display: flex;
	min-width: ${({ width }) => `${width}px`};
	min-height: ${({ height }) => `${height}px`};
	background: ${({ bg }) => `${bg}`};
`;

export default function Divider(props: IDividerProps) {
  const { height, width, bg, className } = props;

  return (
    <div
      className={className} 
      style={{
        height,
        width,
        backgroundColor: bg,
      }}
    />
  );
}
