import React, { useRef, useEffect, useState } from 'react';
import './MouseFieldController.scss';

export const useContainerDimensions = (myRef) => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight,
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };
    if (myRef.current) {
      setDimensions(getDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);
  return dimensions;
};

const MouseFieldController = ({ changeMouseLfo, toggleLfo1 }) => {
  const componentRef = useRef();
  const { width, height } = useContainerDimensions(componentRef);

  const initVal = 0;

  const [xVal, setXVal] = useState(initVal.toFixed(2));
  const [yVal, setYVal] = useState(initVal.toFixed(2));
  const [active, setActive] = useState(false);

  const handleMouseMove = (e) => {
    if (!active) {
      setActive(true);
      toggleLfo1(false);
    }
    const x = (e.nativeEvent.offsetX / width).toFixed(2);
    const y = (e.nativeEvent.offsetY / height).toFixed(2);

    if (x >= 0 && y >= 0 && x <= 1 && y <= 1) {
      setXVal(x);
      setYVal(y);
      changeMouseLfo(x, y);
    }
  };

  const handleMouseLeave = () => {
    if (active) {
      setActive(false);
      setXVal(0);
      setYVal(0);
      changeMouseLfo(0, 0);
      toggleLfo1(true);
    }
  };

  return (
    <div
      ref={componentRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='mousefield'
    >
      <div>x: {xVal}</div>
      <div>y: {yVal}</div>
    </div>
  );
};

export default MouseFieldController;
