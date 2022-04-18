import './resizable.css';
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
interface ResizableProps {
  direction: 'horizontal' | 'vertical';
};

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      },100);
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  if(direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: innerWidth * 0.65,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.90, Infinity],
      minConstraints: [innerWidth * 0.3, Infinity],
    };
  } else {
    resizableBoxProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.7],
      minConstraints: [Infinity, innerHeight * 0.05],
    };
  }

  return (
    <ResizableBox {...resizableBoxProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;