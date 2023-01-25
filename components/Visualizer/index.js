import React, { useEffect, useRef } from 'react'
import styles from './Visualizer.module.scss'
import { analyzer } from '../../context/store'

const Visualizer = () => {
  const canvasRef = useRef()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!analyzer) return
    const analyzerBufferLength = analyzer.frequencyBinCount
    const analyzerData = new Uint8Array(analyzerBufferLength)
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const barWidth = (WIDTH / analyzerBufferLength) * 13
    let barHeight
    let x = 0
    function renderFrame() {
      // Takes callback function to invoke before rendering
      setTimeout(() => requestAnimationFrame(renderFrame), 45)
      x = 0
      analyzer.getByteFrequencyData(analyzerData) // Copies the frequency data into dataArray
      // Results in a normalized array of values between 0 and 255
      // Before this step, dataArray's values are all zeros (but with length of 8192)
      ctx.fillStyle = '#1c1c1c' // Clears canvas before rendering bars (black with opacity 0.2)
      ctx.fillRect(0, 0, WIDTH, HEIGHT) // Fade effect, set opacity to 1 for sharper rendering of bars
      let r, g, b
      let bars = 50 // Set total number of bars you want per frame

      for (let i = 0; i < bars; i++) {
        barHeight = analyzerData[i] * 2.5
        if (analyzerData[i] > 210) {
          r = 255
          g = 255
          b = 255
        } else if (analyzerData[i] > 200) {
          r = 210
          g = 210
          b = 210
        } else if (analyzerData[i] > 190) {
          r = 160
          g = 160
          b = 160
        } else if (analyzerData[i] > 180) {
          r = 120
          g = 120
          b = 120
        } else {
          r = 80
          g = 80
          b = 80
        }
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
        // (x, y, i, j)
        // (x, y) Represents start point
        // (i, j) Represents end point
        x += barWidth + 10 // Gives 10px space between each bar
      }
    }
    renderFrame()
  }, [analyzer])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default Visualizer
