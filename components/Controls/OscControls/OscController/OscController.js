import cn from 'classnames'
import React from 'react'
import waves from '../../../../assets/imgs/waves'
import DropDown from '../../../DropDown/DropDown'
import styles from './OscController.module.scss'
import Knob from '../../Knob'

const OscController = ({
  changeWaveTable,
  changeOctaveOsc,
  changeGain,
  detuneOsc,
  values,
  name
}) => {
  const { gain, detune, wavetable } = values
  console.log({ gain, detune, wavetable })
  const handleOscGain = (e) => changeGain(e / 1000)
  const handleWaveTable = (e) => changeWaveTable(e.target.id)
  const handleDetune = (e) => detuneOsc(e / 10)
  const handleOctave = (e) => changeOctaveOsc(e.target.value)

  const waveNames = ['sine', 'sawtooth', 'triangle', 'square']

  return (
    <div className={styles.oscControl}>
      <h2 className={cn(styles.name, 'center')}>{name}</h2>
      <div>
        <div className={styles.wavetableControl}>
          {waveNames.map((waveName) => (
            <img
              key={waveName}
              onClick={handleWaveTable}
              className={cn(
                styles.wavetableIcon,
                wavetable === waveName && styles.currentWavetable
              )}
              src={waves[waveName].src}
              id={waveName}
              alt={`${waveName} ${
                wavetable === waveName && 'current wavetable'
              }`}
            />
          ))}
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
            max={1}
            value={gain}
            onChange={handleOscGain}
          />
          {/* <div>{gain && (gain * 1000).toFixed(2)}</div> */}
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
              value={detune * 10}
              unlockDistance={10}
              onChange={handleDetune}
            />
            {/* {detune && detune.toFixed(2)} */}
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
            updateFunction={handleOctave}
            inputId={'type'}
            initVal={{ val: 0, text: '0' }}
          />
        </div>
      </div>
    </div>
  )
}

export default OscController
