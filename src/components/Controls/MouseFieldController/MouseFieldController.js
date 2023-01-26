import { animated, useSpring, config } from 'react-spring'
import React, { useRef, useEffect, useState, useContext } from 'react'
import { useContainerDimensions } from '../../../util/custom-hooks'
import { CTX } from '../../../context/store'
import './MouseFieldController.scss'

const MouseFieldController = ({ children }) => {
  const [springOn, setSpringOn] = useState(false)

  useEffect(() => {
    setSpringOn(true)
  }, [])

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const [globalState, setGlobalState] = useContext(CTX)
  const {
    lfo: { active },
    mouseField: { x, y },
  } = globalState

  const toggleLfo1 = (e) => {
    setGlobalState({ type: 'toggleLfo1' })
  }
  const changeMouseLfo = (x, y) => {
    // console.log('changeMouseLfo: ', e)
    setGlobalState({ type: 'changeMouseLfo', payload: { value: { x, y } } })
  }

  const handleMouseMove = (e) => {
    if (!active) toggleLfo1(false)

    const xVal = (e.nativeEvent.offsetX / width).toFixed(2)
    const yVal = (e.nativeEvent.offsetY / height).toFixed(2)

    if (xVal >= 0 && yVal >= 0 && xVal <= 1 && yVal <= 1) {
      changeMouseLfo(xVal, yVal)
    }
  }

  const handleMouseLeave = () => {
    if (active) {
      changeMouseLfo(0, 0)
      toggleLfo1(true)
    }
  }

  const animationProps = useSpring({
    background: `radial-gradient( rgba(${x * 200 + 10},10, ${y * 40 + 10}, 0.9), rgba(${
      y * 200 + 10
    },10, ${x * 40 + 10}, 0.9))`,
    config: config.molasses,
  })

  return (
    <animated.div
      ref={componentRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mousefield"
      style={
        springOn
          ? animationProps
          : {
              background: `radial-gradient( rgba(${x * 255},0, ${y * 90}, 0.9), rgba(${
                y * 255
              },0, ${x * 90}, 0.9))`,
            }
      }
    >
      {children}
    </animated.div>
  )
}

export default MouseFieldController
