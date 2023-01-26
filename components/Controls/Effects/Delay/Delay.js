import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import styles from './Delay.module.scss'
import Knob from '../../Knob'

const Delay = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { delay1, delay1Wet } = globalState

  const updateDelayTime = (value) => {
    setGlobalState({ type: 'changeDelayTime', payload: { value } })
  }

  const updateDelayMix = (value) => {
    setGlobalState({ type: 'changeDelayMix', payload: { value } })
  }

  return (
    <div className={styles.delay}>
      <h2 className={cn('center', styles.title)}>delay</h2>
      <div className={styles.time}>
        <h6 className={styles.property}>time</h6>

        <Knob
          className={cn('center', styles.knob)}
          min={0}
          max={100}
          value={delay1}
          onChange={updateDelayTime}
        />
        <div className={cn(styles.valueDisplay, 'center')}>{delay1.toFixed(2)}</div>
      </div>

      <div className={styles.amount}>
        <h6 className={styles.property}>mix</h6>
        <Knob
          className={cn('center', styles.knob)}
          min={0}
          max={100}
          value={delay1Wet * 100}
          onChange={updateDelayMix}
        />
        <div className={cn(styles.valueDisplay, 'center')}>{(+delay1Wet).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Delay
