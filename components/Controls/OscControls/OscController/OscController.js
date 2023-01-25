import cn from 'classnames'
import React, { useState } from 'react'
import waves from '../../../../assets/imgs/waves'
import DropDown from '../../../DropDown/DropDown'
import styles from './OscController.module.scss'
import Knob from '../../Knob'

const OscController = ({
  changeWaveTable,
  changeOctaveOsc,
  changeGain,
  detuneOsc,
  initVals,
  name
}) => {
  const [gainVal, setGainVal] = useState(initVals.gain)
  const [detuneVal, setDetuneVal] = useState(0)
  const [wavetable, setWavetable] = useState(initVals.wavetable)

  const changeOscGain = (e) => {
    const newVal = e / 1000
    setGainVal(newVal)
    changeGain(newVal)
  }

  const updateWavetable = (e) => {
    e.target.value = e.target.id
    setWavetable(e.target.value)
    changeWaveTable(e)
  }

  const updateDetune = (e) => {
    setDetuneVal(e / 10)
    detuneOsc(e / 10)
  }
  return (
    <div className={styles.oscControl}>
      <h2 className={cn(styles.name, 'center')}>{name}</h2>
      <div>
        <div className={styles.wavetableControl}>
          <img
            onClick={updateWavetable}
            className={cn(
              styles.wavetableIcon,
              wavetable === 'sine' && styles.currentWavetable
            )}
            src={waves['sine'].src}
            id='sine'
            alt={`sine ${wavetable === 'sine' && 'current wavetable'}`}
          />
          <img
            onClick={updateWavetable}
            className={cn(
              styles.wavetableIcon,
              wavetable === 'sawtooth' && styles.currentWavetable
            )}
            src={waves['sawtooth'].src}
            id='sawtooth'
            alt={`sawtooth ${wavetable === 'sawtooth' && 'current wavetable'}`}
          />

          <img
            onClick={updateWavetable}
            className={cn(
              styles.wavetableIcon,
              wavetable === 'triangle' && styles.currentWavetable
            )}
            src={waves['triangle'].src}
            id='triangle'
            alt={`triangle ${wavetable === 'triangle' && 'current wavetable'}`}
          />

          <img
            onClick={updateWavetable}
            className={cn(
              styles.wavetableIcon,
              wavetable === 'square' && styles.currentWavetable
            )}
            src={waves['square'].src}
            id='square'
            alt={`square ${wavetable === 'square' && 'current wavetable'}`}
          />
        </div>
      </div>

      <div className={cn(detuneOsc && styles.flex, 'center')}>
        <div className={styles.gain}>
          <div>
            <h3>gain</h3>
          </div>
          <Knob
            className={styles.knob}
            style={{ display: 'inline-block' }}
            min={0}
            max={1000}
            value={gainVal * 1000}
            unlockDistance={10}
            onChange={changeOscGain}
          />
          <div>{(gainVal * 1000).toFixed(2)}</div>
        </div>

        {detuneOsc && (
          <div className={styles.detune}>
            <div>
              <h3>detune</h3>
            </div>
            <Knob
              style={{ display: 'inline-block' }}
              className={styles.knob}
              min={-200}
              max={200}
              value={detuneVal * 10}
              unlockDistance={10}
              onChange={updateDetune}
            />
            {detuneVal.toFixed(2)}
          </div>
        )}
      </div>
      <div className={cn(styles.octave, 'center')}>
        <b>octave</b>
        <div className={styles.oscControlDropdown}>
          <DropDown
            options={[
              { val: 2, text: '+2' },
              { val: 1, text: '+1' },
              { val: 0, text: '0' },
              { val: -1, text: '-1' },
              { val: -2, text: '-2' }
            ]}
            updateFunction={changeOctaveOsc}
            inputId={'type'}
            initVal={{ val: 0, text: '0' }}
          />
        </div>
      </div>
    </div>
  )
}

export default OscController
