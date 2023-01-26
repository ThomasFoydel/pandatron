import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './DistortionController.module.scss'
import Knob from '../../Knob'
import { CTX } from '../../../../context/store'

const DistortionController = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { distortion1, dist1WetGain } = globalState

  const updateAmount = (value) => {
    setGlobalState({ type: 'changeDistortion1Amount', payload: { value } })
  }

  const updateMix = (value) => {
    setGlobalState({ type: 'changeDistortion1Mix', payload: { value } })
  }

  return (
    <div className={styles.distortion}>
      <div className={cn('center', styles.inner)}>
        <h2>distortion I</h2>
        <h6>amount</h6>
        <Knob
          className={styles.knob}
          min={0}
          max={100}
          value={distortion1}
          onChange={updateAmount}
        />

        <div>{(distortion1 * 5).toFixed(2)}</div>
        <h6 className={styles.property}>mix</h6>

        <Knob
          className={styles.knob}
          min={0}
          max={100}
          value={dist1WetGain * 100}
          onChange={updateMix}
        />
        <div className="center">{dist1WetGain.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default DistortionController
