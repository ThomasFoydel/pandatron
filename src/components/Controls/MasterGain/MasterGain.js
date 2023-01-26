import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/store'
import Knob from '../Knob'
import './MasterGain.scss'

const MasterGain = () => {
  const [{ masterGain }, setGlobalState] = useContext(CTX)

  const updateMasterGain = (value) => {
    setGlobalState({ type: 'changeMasterGain', payload: { value } })
  }

  return (
    <div className="masterGain">
      <h2 className={cn('title', 'center')}>master gain</h2>
      <Knob
        className={cn('center', 'knob')}
        min={0}
        max={1}
        value={masterGain.toFixed(2)}
        onChange={updateMasterGain}
      />
      <div className="center">{masterGain.toFixed(2)}</div>
    </div>
  )
}

export default MasterGain
