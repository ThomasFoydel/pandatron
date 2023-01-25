import React, { useContext } from 'react'
import { CTX } from '../../context/store'
import OscController from '../Controls/OscControls/OscController/OscController'

const Oscillators = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { wavetable1, envelope, osc1OctaveOffset, oscGain1, osc1Detune } =
    globalState

  const detuneOsc1 = (value) => {
    setGlobalState({ type: 'detuneOsc1', payload: { value } })
  }

  const changeOsc1Gain = (value) => {
    setGlobalState({ type: 'changeOsc1Gain', payload: { value } })
  }

  const changeOctaveOsc1 = (value) => {
    setGlobalState({ type: 'changeOctaveOsc1', payload: { value } })
  }

  const changeWaveTable1 = (value) => {
    setGlobalState({ type: 'changeWaveTable1', payload: { value } })
  }

  return (
    <>
      <div className='flex'>
        <OscController
          name='osc 1'
          changeWaveTable={changeWaveTable1}
          changeOctaveOsc={changeOctaveOsc1}
          detuneOsc={detuneOsc1}
          changeGain={changeOsc1Gain}
          values={{
            wavetable: wavetable1,
            envelope,
            detune: osc1Detune,
            offset: osc1OctaveOffset,
            gain: oscGain1
          }}
        />
        {/* <OscController
          name='osc 2'
          changeWaveTable={changeWaveTable2}
          changeOctaveOsc={changeOctaveOsc2}
          detuneOsc={detuneOsc2}
          changeGain={changeOsc2Gain}
          initVals={{
            wavetable: wavetable2,
            envelope: initEnvelope,
            offset: osc2OctaveOffset,
            gain: oscGainDefaultVal
          }}
        /> */}
      </div>

      {/* <div className={styles.oscMix}>
        <div className={cn('center', styles.inputContainer)}>
          <span className={styles.oscName}>osc1</span>
          <Range onChange={mixGain} />
          <span className={styles.oscName}>osc2</span>
        </div>
      </div> */}

      <div className='flex'>
        {/* <OscController
      name='sub osc'
      changeWaveTable={changeWaveTableSub}
      changeOctaveOsc={changeOctaveSub}
      changeGain={changeSubGain}
      initVals={{
        wavetable: subOscType,
        envelope: initEnvelope,
        offset: subOscOctaveOffset,
        gain: oscGainDefaultVal
      }}
    />
    <NoiseOscController
      changeNoiseGain={changeNoiseGain}
      changeNoiseType={changeNoiseType}
      initGain={noiseOscVol}
    /> */}
      </div>
    </>
  )
}

export default Oscillators
