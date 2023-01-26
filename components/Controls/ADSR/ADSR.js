import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './ADSR.module.scss'
import { CTX } from '../../../context/store'
import Range from '../../Range'

const ADSR = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { envelope } = globalState
  const { attack, decay, sustain, release } = envelope

  const updateADSR = (e) => {
    let { value, id } = e.target
    setGlobalState({ type: 'changeADSR', payload: { value: { aspect: id, newVal: +value / 100 } } })
  }

  return (
    <div className={styles.adsr}>
      <div className={styles.innerRotate}>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.attackVal)}>{attack.toFixed(2)}</div>
          <span className={styles.aspectInitial}>A</span>
          <Range max="200" id="attack" value={attack * 100} onChange={updateADSR} />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.decayVal)}>{decay.toFixed(2)}</div>
          <span className={styles.aspectInitial}>D</span>

          <Range id="decay" max="200" value={decay * 100} onChange={updateADSR} />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.sustainVal)}>{sustain.toFixed(2)}</div>
          <span className={styles.aspectInitial}>S</span>
          <Range id="sustain" max="200" value={sustain * 100} onChange={updateADSR} />
        </div>
        <div className={styles.aspect}>
          <div className={cn(styles.val, styles.releaseVal)}>{release.toFixed(2)}</div>
          <span className={styles.aspectInitial}>R</span>
          <Range id="release" max="200" value={release * 100} onChange={updateADSR} />
        </div>
      </div>
      <div className={styles.valueDisplays}></div>
    </div>
  )
}

export default ADSR
