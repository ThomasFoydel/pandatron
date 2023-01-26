import React, { useEffect, useRef } from 'react'

const Knob = ({ onChange, value, className, style, min, max }) => {
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
  }, [])

  const mouseDown = useRef(false)
  const startY = useRef(0)

  const handleMouseDown = (e) => {
    mouseDown.current = true
    startY.current = e.clientY
  }

  const handleMouseUp = () => (mouseDown.current = false)

  const handleMouseMove = (e) => {
    if (mouseDown.current) {
      let newPosition = (startY.current - e.clientY) * 2
      if (newPosition < 0) newPosition = 0
      if (newPosition > 360) newPosition = 360

      const ratio = newPosition / 360
      const difference = max - min
      const relativeDifference = ratio * difference
      const relativePosition = min + relativeDifference

      if (onChange) onChange(relativePosition)
    }
  }

  const rotation = (value / (max - min)) * 360

  return (
    <svg
      className={className}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      width="204px"
      height="204px"
      viewBox="0 0 204 204"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Sketch.</desc>
      <defs>
        <linearGradient x1="50%" y1="50%" x2="50%" y2="100%" id="linearGradient-1">
          <stop stopColor="#444040" stopOpacity="0.51098279" offset="0%"></stop>
          <stop stopColor="#131111" stopOpacity="0.893200861" offset="100%"></stop>
        </linearGradient>
        <circle id="path-2" cx="98.0400009" cy="98.0400009" r="98.0400009"></circle>
        <filter
          x="-3.3%"
          y="-3.3%"
          width="106.6%"
          height="106.6%"
          filterUnits="objectBoundingBox"
          id="filter-3"
        >
          <feMorphology
            radius="0.5"
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          ></feMorphology>
          <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          ></feComposite>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
          <stop stopColor="#FFFFFF" stopOpacity="0.5" offset="0%"></stop>
          <stop stopColor="#000000" stopOpacity="0.5" offset="100%"></stop>
        </linearGradient>
        <circle id="path-5" cx="98" cy="98" r="86"></circle>
        <filter
          x="-4.1%"
          y="-3.5%"
          width="108.1%"
          height="108.1%"
          filterUnits="objectBoundingBox"
          id="filter-6"
        >
          <feMorphology
            radius="0.5"
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          ></feMorphology>
          <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          ></feComposite>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="s13" transform="translate(4.000000, 4.000000)">
          <g id="container">
            <g id="Oval-2">
              <use fill="black" fillOpacity="1" filter="url(#filter-3)" xlinkHref="#path-2"></use>
              <use
                stroke="#979797"
                strokeWidth="1"
                fill="url(#linearGradient-1)"
                fillRule="evenodd"
                xlinkHref="#path-2"
              ></use>
            </g>
            <g id="Oval-2">
              <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5"></use>
              <use fill="" fillRule="evenodd" xlinkHref="#path-5"></use>
              <use
                stroke="#4A4A4A"
                strokeWidth="1"
                fill="url(#linearGradient-4)"
                fillRule="evenodd"
                xlinkHref="#path-5"
              ></use>
            </g>
            <g
              id="knob"
              transform="translate(27.431373, 27.431373)"
              style={{
                transform: `rotate(${rotation}deg) translateY(25px) translateX(25px)`,
                transformOrigin: '96px 96px',
              }}
            >
              <circle id="Oval-5" fill="#322E2E" cx="71" cy="71" r="71"></circle>
              <path
                d="M70.0686275,4.17063061 L86.5686275,65.2689929 C81.3642501,66.811221 75.8642501,67.5735686 70.0686275,67.5560356 C64.2730048,67.5385027 58.7730048,66.7761551 53.5686275,65.2689929 L70.0686275,4.17063061 Z"
                id="Rectangle-Copy"
                fill="#E6D7D7"
                transform="translate(70.068627, 35.863481) scale(1, -1) translate(-70.068627, -35.863481) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Knob
