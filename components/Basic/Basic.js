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
import Distortion2Controller from '../Controls/Effects/Distortion2Controller'

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
            <DistortionController />
            <Distortion2Controller />
            {/* <EffectController
              name="distortion II"
              values={[
                {
                  name: 'gain',
                  propertyName: 'distortion2Gain',
                  updateFunction: 'changeDistortion2Gain',
                },
              ]}
            /> */}
            {/* <EffectController
              label="ring mod"
              name="ringModulator"
              values={[
                {
                  // name: 'ring mod',
                  propertyName: 'ringModulator',
                  changeEffect: 'changeRingModulator',
                },
              ]}
              // changeEffect={changeDistortion2Gain}
              // initVals={{ gain: distortion2.gain }}
            /> */}
            {/* 
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
