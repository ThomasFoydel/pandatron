import cn from 'classnames'
import Distortion1 from '../Controls/Effects/Distortion1/Distortion1'
import Filter from '../../components/Controls/Filter/Filter'
import Reverb1 from '../Controls/Effects/Reverb1/Reverb1'
import ADSR from '../../components/Controls/ADSR/ADSR'
import Delay from '../Controls/Effects/Delay/Delay'
import MasterGain from '../../components/Controls/MasterGain/MasterGain'
import PandaSection from '../PandaSection'
import ChordDisplay from '../ChordDisplay'
import styles from './Basic.module.scss'
import Visualizer from '../Visualizer'
import Keyboard from '../Keyboard'
import Oscillators from '../Oscillators'
import Distortion2 from '../Controls/Effects/Distortion2/Distortion2'
import RingMod from '../Controls/Effects/RingMod/RingMod'
import Flanger from '../Controls/Effects/Flanger/Flanger'
import Quadrafuzz from '../Controls/Effects/Quadrafuzz/Quadrafuzz'
import PingPong from '../Controls/Effects/PingPong/PingPong'
import Reverb2 from '../Controls/Effects/Reverb2/Reverb2'

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
                <Filter />
                <ADSR />
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
            <Distortion1 />
            <Distortion2 />
            <RingMod />
            <Flanger />
            <Quadrafuzz />
          </div>

          <div className={cn(styles.effectRack, 'flex')}>
            <Delay />
            <PingPong />
            <Reverb1 />
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
