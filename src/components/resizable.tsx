import './resizable.css';
import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
};

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProps: ResizableBoxProps;

  if(direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: window.innerHeight * 0.75,
      resizeHandles: ['e'],
      maxConstraints: [window.innerHeight * 0.90, Infinity],
      minConstraints: [window.innerHeight * 0.2, Infinity],
    };
  } else {
    resizableBoxProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, window.innerHeight * 0.7],
      minConstraints: [Infinity, window.innerHeight * 0.05],
    };
  }

  return (
    <ResizableBox {...resizableBoxProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;