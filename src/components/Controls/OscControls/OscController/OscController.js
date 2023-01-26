import cn from 'classnames'
import React from 'react'
import waves from '../../../../assets/imgs/waves'
import DropDown from '../../../DropDown/DropDown'
import Knob from '../../Knob'
import './OscController.scss'

const OscController = ({
  updateState,
  changeWaveTable,
  changeOctaveOsc,
  changeGain,
  detuneOsc,
  values,
  name,
}) => {
  const { gain, detune, wavetable, offset } = values
  const handleOscGain = (value) => updateState(changeGain, value)
  const handleWaveTable = (e) => updateState(changeWaveTable, e.target.id)
  const handleDetune = (value) => updateState(detuneOsc, value)
  const handleOctave = (e) => updateState(changeOctaveOsc, e.target.value)

  const waveNames = ['sine', 'sawtooth', 'triangle', 'square']

  return (
    <div className="oscControl">
      <h2 className={cn('name', 'center')}>{name}</h2>
      <div>
        <div className="wavetableControl">
          {waveNames.map((waveName) => (
            <img
              key={waveName}
              onClick={handleWaveTable}
              className={cn('wavetableIcon', wavetable === waveName && 'currentWavetable')}
              src={waves[waveName]}
              id={waveName}
              alt={`${waveName} ${wavetable === waveName && 'current wavetable'}`}
            />
          ))}
        </div>
      </div>

      <div className={cn(detuneOsc && 'flex', 'center')}>
        <div className="gain">
          <div>
            <h3>gain</h3>
          </div>
          <Knob className="knob" min={0} max={1} value={gain} onChange={handleOscGain} />
          <div>{gain.toFixed(2)}</div>
        </div>

        {detuneOsc && (
          <div className="detune">
            <div>
              <h3>detune</h3>
            </div>
            <Knob className="knob" min={-200} max={200} value={detune} onChange={handleDetune} />
            {detune.toFixed(2)}
          </div>
        )}
      </div>
      <div className={cn('octave', 'center')}>
        <b>octave</b>
        <div className="oscControlDropdown">
          <DropDown
            options={[
              { val: 2, text: '+2' },
              { val: 1, text: '+1' },
              { val: 0, text: '0' },
              { val: -1, text: '-1' },
              { val: -2, text: '-2' },
            ]}
            updateFunction={handleOctave}
            inputId={'type'}
            current={offset}
          />
        </div>
      </div>
    </div>
  )
}

export default OscController
