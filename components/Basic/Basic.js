import cn from 'classnames'
import Pizzicato from 'pizzicato'
import DistortionController from '../../components/Controls/Effects/DistortionController/DistortionController'
import NoiseOscController from '../../components/Controls/OscControls/NoiseOscController/NoiseOscController'
import FilterController from '../../components/Controls/ADSRFilterEq/FilterController/FilterController'
import ReverbController from '../../components/Controls/Effects/ReverbController/ReverbController'
import EffectController from '../../components/Controls/Effects/EffectController/EffectController'
import ADSRController from '../../components/Controls/ADSRFilterEq/ADSRController/ADSRController'
import DelayController from '../../components/Controls/Effects/DelayController/DelayController'
import OscController from '../../components/Controls/OscControls/OscController/OscController'
import MasterGain from '../../components/Controls/MasterGain/MasterGain'
// import { makeDistortionCurve, impulseResponse } from '../../util/util'
// import pandaFaces from '../../assets/imgs/pandas'
import PandaSection from '../PandaSection'
import ChordDisplay from '../ChordDisplay'
import styles from './Basic.module.scss'
import Visualizer from '../Visualizer'
import Keyboard from '../Keyboard'
import Oscillators from '../Oscillators'

const Basic = () => {
  return (
    <div className={cn('center', styles.synth)}>
      <div className={styles.mainGrid}>
        <div className={styles.mainGridSection1}>
          <div className={styles.oscillatorsContainer}>
            <Oscillators />
          </div>
        </div>
        <div className={styles.mainGridSection2}>
          <div className={styles.adsrFilterMouse}>
            <div className={styles.section2Grid}>
              <div className={styles.section2Grid1}>
                <FilterController />
                <ADSRController />
                {/* <FilterController
                  changeFilter1Type={changeFilter1Type}
                  changeFilter1Freq={changeFilter1Freq}
                  changeFilter1Q={changeFilter1Q}
                  changeFilter1Mix={changeFilter1Mix}
                  changeFilter1Gain={changeFilter1Gain}
                  initParams={{
                    type: filter1.type,
                    frequency: filter1.frequency.value,
                    Q: filter1.Q.value,
                    mix: 100 - filter1.dryWet,
                    gain: filter1.gain.value
                  }}
                />

                <ADSRController
                  changeADSR={changeADSR}
                  initEnvelope={initEnvelope}
                /> */}
              </div>

              <div className={styles.section2Grid2}>
                <PandaSection />
                <div>
                  <ChordDisplay />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainGridSection3}>
          <div className={styles.effectRack}>
            {/* <DistortionController
              initVals={{
                amountVal: 0,
                mixVal: dist1WetGain.gain.value * 100
              }}
              changeDistortion1Amount={changeDistortion1Amount}
              changeDistortion1Mix={changeDistortion1Mix}
            />
            <EffectController
              effectName='distortion II'
              changeEffect={changeDistortion2Gain}
              initVals={{ gain: distortion2.gain }}
            />
            <EffectController
              effectName='ring mod'
              initVals={ringModulatorInitVals}
              changeEffect={changeRingModulator}
            />
            <EffectController
              effectName='flanger'
              initVals={flanger1InitVals}
              changeEffect={changeFlanger1}
              minified={true}
            />

            <EffectController
              effectName='quadrafuzz'
              changeEffect={changeQuadrafuzz}
              initVals={quadrafuzzInitVals}
              minified={true}
            /> */}
          </div>

          <div className={cn(styles.effectRack, 'flex')}>
            {/* <DelayController
              changeMix={changeDelayMix}
              changeDelayTime={changeDelayTime}
              initVals={{
                time: delay1.delayTime.value,
                mix: delay1Wet.gain.value
              }}
            />

            <EffectController
              effectName='ping pong'
              initVals={pingPongDelayInitVals}
              changeEffect={changePingPongDelay}
            />
            <ReverbController
              changeReverbDecay={changeReverbDecay}
              changeReverbDuration={changeReverbDuration}
              mixReverbGain={mixReverbGain}
              initVals={{
                ...reverb1.buffer,
                mixGain: reverb1Dry.gain.value
              }}
            />
            <EffectController
              effectName='reverb II'
              initVals={reverb2InitVals}
              changeEffect={changeReverb2}
            />
            <MasterGain changeMasterGain={changeMasterGain} /> */}
          </div>
        </div>

        <div className={styles.mainGridSection4}>
          <div className={styles.keyboardContainer}>
            <Keyboard className={styles.keyboard} />
          </div>
          <Visualizer />
        </div>
      </div>
    </div>
  )
}

export default Basic
