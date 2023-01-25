import React, { useContext } from 'react'
import { CTX } from '../../context/store'
import OscController from '../Controls/OscControls/OscController/OscController'
import styles from './Oscillators.module.scss'
import Range from '../Range'
import NoiseOscController from '../Controls/OscControls/NoiseOscController/NoiseOscController'

const Oscillators = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const {
    wavetable1,
    wavetable2,
    subOscType,
    noiseType,
    envelope,
    osc1OctaveOffset,
    osc2OctaveOffset,
    subOscOctaveOffset,
    oscGain1,
    oscGain2,
    subGain,
    noiseGainAmount,
    osc1Detune,
    osc2Detune
  } = globalState

  const updateState = (type, value) =>
    setGlobalState({ type, payload: { value } })

  const mixGain = (e) => updateState('mixGain', e.target.value)

  return (
    <>
      <div className='flex'>
        <OscController
          name='osc 1'
          updateState={updateState}
          changeWaveTable='changeWaveTable1'
          changeOctaveOsc='changeOctaveOsc1'
          detuneOsc='detuneOsc1'
          changeGain='changeOsc1Gain'
          values={{
            wavetable: wavetable1,
            envelope,
            detune: osc1Detune,
            offset: osc1OctaveOffset,
            gain: oscGain1
          }}
        />
        <OscController
          name='osc 2'
          updateState={updateState}
          changeWaveTable='changeWaveTable2'
          changeOctaveOsc='changeOctaveOsc2'
          detuneOsc='detuneOsc2'
          changeGain='changeOsc2Gain'
          values={{
            wavetable: wavetable2,
            envelope,
            detune: osc2Detune,
            offset: osc2OctaveOffset,
            gain: oscGain2
          }}
        />
      </div>

      <div className={styles.oscMix}>
        <div className={styles.inputContainer}>
          <span className={styles.oscName}>osc1</span>
          <Range onChange={mixGain} />
          <span className={styles.oscName}>osc2</span>
        </div>
      </div>

      <div className='flex'>
        <OscController
          name='sub osc'
          updateState={updateState}
          changeWaveTable='changeWaveTableSub'
          changeOctaveOsc='changeOctaveSub'
          changeGain='changeSubGain'
          values={{
            wavetable: subOscType,
            envelope,
            offset: subOscOctaveOffset,
            gain: subGain
          }}
        />

        <NoiseOscController
          updateState={updateState}
          gain={noiseGainAmount}
          type={noiseType}
        />
      </div>
    </>
  )
}

export default Oscillators
