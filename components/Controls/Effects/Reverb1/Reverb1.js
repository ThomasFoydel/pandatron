import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './Reverb1.module.scss'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'
import Knob from '../../Knob'

const Reverb = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const {
    reverb1Wet,
    reverb1: { duration, decay, reversed },
  } = globalState

  const handleDecay = (e) => {
    const value = +e.target.value
    setGlobalState({ type: 'changeReverbDecay', payload: { value } })
  }

  const handleDuration = (e) => {
    const value = +e.target.value
    setGlobalState({ type: 'changeReverbDuration', payload: { value } })
  }

  const handleMix = (value) => {
    setGlobalState({ type: 'mixReverbGain', payload: { value } })
  }

  const handleReverse = () => {
    setGlobalState({ type: 'changeReverb1Reverse', payload: { value: !reversed } })
  }

  return (
    <div className={styles.reverb}>
      <h2 className={cn(styles.title, 'center')}>reverb</h2>

      <div className={styles.sliderInput}>
        <div className={styles.display}>
          <b>duration</b> {duration}
        </div>

        <Range value={duration} min={1} max={20} onChange={handleDuration} />
      </div>

      <div className={styles.sliderInput}>
        <div className={styles.display}>
          <b>decay</b> {decay}
        </div>
        <Range value={decay} max={100} onChange={handleDecay} />
      </div>

      <div>
        <div className={cn(styles.reverseBtn, 'center')} onClick={handleReverse}>
          <div className={cn(styles.reversible, reversed && styles.reversed)}>reverse</div>
        </div>
      </div>

      <div>
        <div className="center">
          <b>mix</b>
        </div>

        <Knob
          className={cn(styles.knob, 'center')}
          min={0}
          max={1}
          value={reverb1Wet}
          onChange={handleMix}
        />

        <div className="center">{reverb1Wet.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Reverb
