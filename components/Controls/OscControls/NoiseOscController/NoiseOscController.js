import cn from 'classnames'
import React, { useState } from 'react'
import styles from './NoiseOscController.module.scss'
import DropDown from '../../../DropDown/DropDown'
import Knob from '../../Knob'

const NoiseOscController = ({ changeNoiseGain, changeNoiseType, initGain }) => {
  const [gain, setGain] = useState(initGain)
  const [type, setType] = useState('white')
  const updateGain = (e) => {
    changeNoiseGain(e / 1000)
    setGain(e / 1000)
  }
  const updateType = (e) => {
    let { value } = e.target
    changeNoiseType(value)
    setType(value)
  }

  return (
    <div className={styles.noiseOscControl}>
      <h4 className={cn(styles.name, 'center')}>noise osc</h4>

      <div className={cn(styles.gainKnob, 'center')}>
        <h3>gain</h3>

        <Knob
          className={styles.knob}
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={gain * 1000}
          unlockDistance={10}
          onChange={updateGain}
        />
        <div>{(gain * 1000).toFixed(2)}</div>
      </div>
      <div className={cn(styles.dropdown, 'center')}>
        <DropDown
          updateFunction={updateType}
          inputId={'type'}
          initVal={{ val: 'white', text: 'white' }}
          options={[
            { val: 'white', text: 'white' },
            { val: 'pink', text: 'pink' },
            { val: 'brown', text: 'brown' }
          ]}
        />
      </div>
    </div>
  )
}

export default NoiseOscController
