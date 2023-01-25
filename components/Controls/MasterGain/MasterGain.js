import cn from 'classnames'
import React, { useState } from 'react'
import styles from './MasterGain.module.scss'
import Knob from '../Knob'

const MasterGain = ({ changeMasterGain }) => {
  const [display, setDisplay] = useState(1)
  const updateMasterGain = (e) => {
    changeMasterGain(e.toFixed(2))
    setDisplay(+e)
  }
  return (
    <div className={styles.masterGain}>
      <h2 className={cn(styles.title, 'center')}>master gain</h2>

      <Knob
        className={cn('center', styles.knob)}
        min={0}
        max={100}
        value={display.toFixed(2)}
        unlockDistance={10}
        onChange={updateMasterGain}
      />
      <div className='center'>{display.toFixed(2)}</div>
    </div>
  )
}

export default MasterGain
