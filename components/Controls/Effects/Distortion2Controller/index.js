import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import styles from '../EffectController.module.scss'
import Knob from '../../Knob'

const Distortion2Controller = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = (val) => {
    setGlobalState({ type: 'changeDistortion2Gain', payload: { value: { prop: 'gain', val } } })
  }

  return (
    <div className={styles.effectController}>
      <h2 className={cn(styles.name, styles.center)}>distortion II</h2>
      <div className={styles.inputsContainer}>
        <h6 className="center">gain</h6>
        <Knob
          className={cn('center', styles.knob)}
          min={0}
          max={1}
          value={globalState.distortion2Gain}
          onChange={(val) => update(val)}
        />
        <div className="center">{globalState.distortion2Gain.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Distortion2Controller
