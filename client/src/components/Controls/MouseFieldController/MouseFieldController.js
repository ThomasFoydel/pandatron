import React, { useRef, useEffect, useState } from 'react';
import { useContainerDimensions } from 'util/custom-hooks';
import { animated, useSpring, config } from 'react-spring';
import './MouseFieldController.scss';

const MouseFieldController = ({ changeMouseLfo, toggleLfo1, children }) => {
  const [springOn, setSpringOn] = useState(false);

  useEffect(() => {
    setSpringOn(true);
  }, []);

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

  const animationProps = useSpring({
    background: `radial-gradient( rgba(${xVal * 255},0, ${
      yVal * 90
    }, 0.9), rgba(${yVal * 255},0, ${xVal * 90}, 0.9))`,
    config: config.molasses,
  });
  return (
    <>
      <animated.div
        ref={componentRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className='mousefield'
        style={
          springOn
            ? animationProps
            : {
                background: `radial-gradient( rgba(${xVal * 255},0, ${
                  yVal * 90
                }, 0.9), rgba(${yVal * 255},0, ${xVal * 90}, 0.9))`,
              }
        }
      >
        <div className='center'>x: {(xVal * 100).toFixed(0)}</div>
        <div className='center'>y: {(yVal * 100).toFixed(0)} </div>
        {children}
      </animated.div>
    </>
  );
};

export default MouseFieldController;
