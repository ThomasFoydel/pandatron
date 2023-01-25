import cn from 'classnames'
import React, { useState } from 'react'
import styles from './EffectController.module.scss'
import Range from '../../../Range'
import Knob from '../../Knob'

const EffectController = ({ effectName, initVals, changeEffect, minified }) => {
  const [display, setDisplay] = useState(initVals)
  const [reversed, setReversed] = useState(false)

  const update = (e) => {
    const { id, value } = e.target
    changeEffect(id, value / 100)
    setDisplay((display) => {
      return { ...display, [id]: value }
    })
  }

  const toggleReverse = () => {
    changeEffect('reverse', !reversed)
    setReversed(!reversed)
  }

  return (
    <div className={cn(styles.effectController, minified && styles.minified)}>
      <h2 className={cn(styles.name, styles.center)}>{effectName}</h2>
      <div className={styles.inputsContainer}>
        {Object.keys(initVals).map((parameter) => {
          if (parameter === 'mix' || parameter === 'gain') {
            return (
              <div key={parameter}>
                <h6 className='center'>{parameter}</h6>
                <Knob
                  style={{ display: 'inline-block' }}
                  className={cn('center', styles.knob)}
                  min={0}
                  max={100}
                  value={display[parameter]}
                  unlockDistance={10}
                  onChange={(e) =>
                    update({ target: { id: parameter, value: e } })
                  }
                />
                <div className='center'>{display[parameter].toFixed(2)}</div>
              </div>
            )
          } else if (parameter === 'reverse') {
            return (
              <div key={parameter}>
                <div
                  className={cn(styles.reverseBtn, 'center')}
                  onClick={toggleReverse}>
                  <div
                    className={cn(
                      styles.reversible,
                      reversed && styles.reversed
                    )}>
                    reverse
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={parameter}>
                <div className={cn(styles.paramName, 'center')}>
                  <b>{parameter} </b>{' '}
                  <span className={styles.val}>{display[parameter]}</span>
                </div>
                <Range
                  className={cn('center', styles.input)}
                  id={parameter}
                  onChange={update}
                  min={0}
                  max={parameter.max || 100}
                  value={display[parameter]}
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default EffectController
