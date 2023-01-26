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
import RingMod from '../Controls/Effects/RingMod'
import Flanger from '../Controls/Effects/Flanger'
import Quadrafuzz from '../Controls/Effects/Quadrafuzz'
import PingPongDelay from '../Controls/Effects/PingPongDelay'
import Reverb2 from '../Controls/Effects/Reverb2'

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
            <RingMod />
            <Flanger />
            <Quadrafuzz />
          </div>

          <div className={cn(styles.effectRack, 'flex')}>
            <DelayController />
            <PingPongDelay />
            <ReverbController />
            <Reverb2 />
            <MasterGain />
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
