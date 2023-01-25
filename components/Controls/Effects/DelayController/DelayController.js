import cn from 'classnames'
import React, { useState } from 'react'
import styles from './DelayController.module.scss'
import Knob from '../../Knob'

const DelayController = ({ changeDelayTime, initVals, changeMix }) => {
  const [time, setTime] = useState(initVals.time * 100)
  const [mix, setMix] = useState(initVals.mix)

  const updateDelayTime = (e) => {
    changeDelayTime(e / 100)
    setTime(e / 100)
  }

  const updateDelayMix = (e) => {
    changeMix(e)
    setMix(e / 100)
  }

  return (
    <div className={styles.delay}>
      <h2 className={cn('center', styles.title)}>delay</h2>
      <div className={styles.time}>
        <h6 className={styles.property}>time</h6>

        <Knob
          className={cn('center', styles.knob)}
          // min={0}
          // max={100}
          // value={time * 100}
          // unlockDistance={10}
          onChange={updateDelayTime}
        />
        <div className={cn(styles.valueDisplay, 'center')}>
          {time.toFixed(2)}
        </div>
      </div>

      <div className={styles.amount}>
        <h6 className={styles.property}>mix</h6>
        <Knob
          className={cn('center', styles.knob)}
          min={0}
          max={100}
          value={mix * 100}
          unlockDistance={10}
          onChange={updateDelayMix}
        />
        <div className={cn(styles.valueDisplay, 'center')}>
          {mix.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default DelayController
