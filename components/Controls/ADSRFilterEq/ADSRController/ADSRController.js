import cn from 'classnames'
import React, { useState } from 'react'
import styles from './ADSRController.module.scss'
import Range from '../../../Range'

const ADSRController = ({ changeADSR, initEnvelope }) => {
  const [envelope, setEnvelope] = useState(initEnvelope)

  const changeDisplayState = (newVal, property) => {
    setEnvelope({ ...envelope, [property]: newVal })
  }

  const updateADSR = (e) => {
    let { value, id } = e.target
    changeADSR(+value / 100, id)
    changeDisplayState(+value / 100, id)
  }
  const { attack, decay, sustain, release } = envelope
  return (
    <div className={styles.adsr}>
      <div className={styles.innerRotate}>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.attackVal)}>
            {attack.toFixed(2)}
          </div>
          <span className={styles.aspectInitial}>A</span>
          <Range
            max='200'
            id='attack'
            value={attack * 100}
            onChange={updateADSR}
          />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.decayVal)}>
            {decay.toFixed(2)}
          </div>
          <span className={styles.aspectInitial}>D</span>

          <Range
            id='decay'
            max='200'
            value={decay * 100}
            onChange={updateADSR}
          />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.sustainVal)}>
            {sustain.toFixed(2)}
          </div>
          <span className={styles.aspectInitial}>S</span>
          <Range
            id='sustain'
            max='200'
            value={sustain * 100}
            onChange={updateADSR}
          />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.releaseVal)}>
            {release.toFixed(2)}
          </div>
          <span className={styles.aspectInitial}>R</span>
          <Range
            id='release'
            max='200'
            value={release * 100}
            onChange={updateADSR}
          />
        </div>
      </div>
      <div className={styles.valueDisplays}></div>
    </div>
  )
}

export default ADSRController
