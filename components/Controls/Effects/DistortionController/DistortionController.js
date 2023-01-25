import cn from 'classnames'
import React, { useState } from 'react'
import styles from './DistortionController.module.scss'
import Knob from '../../Knob'

const DistortionController = ({
  changeDistortion1Amount,
  changeDistortion1Mix,
  initVals: { amountVal, mixVal }
}) => {
  const [amount, setAmount] = useState(amountVal)
  const [mix, setMix] = useState(mixVal.toFixed(2))
  const updateAmount = (e) => {
    setAmount(e)
    changeDistortion1Amount(e)
  }

  const updateMix = (e) => {
    setMix(e.toFixed(2))
    changeDistortion1Mix(e)
  }
  const displayMixVal = (+mix).toFixed(0)
  return (
    <div className={styles.distortion}>
      <div className={cn('center', styles.inner)}>
        <h2>distortion I</h2>
        <h6>amount</h6>
        <Knob
          className={styles.knob}
          min={0}
          max={100}
          // value={amount}
          // unlockDistance={10}
          onChange={updateAmount}
        />

        <div>{(amount * 5).toFixed(2)}</div>
        <h6 className={styles.property}>mix</h6>

        <Knob
          className={styles.knob}
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={displayMixVal}
          unlockDistance={10}
          onChange={updateMix}
        />
        <div className='center'>{mix}</div>
      </div>
    </div>
  )
}

export default DistortionController
