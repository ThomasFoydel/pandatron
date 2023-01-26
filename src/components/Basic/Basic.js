import cn from 'classnames'
import Distortion1 from '../Controls/Effects/Distortion1/Distortion1'
import Distortion2 from '../Controls/Effects/Distortion2/Distortion2'
import Quadrafuzz from '../Controls/Effects/Quadrafuzz/Quadrafuzz'
import Oscillators from '../Controls/Oscillators/Oscillators'
import PingPong from '../Controls/Effects/PingPong/PingPong'
import MasterGain from '../Controls/MasterGain/MasterGain'
import Reverb1 from '../Controls/Effects/Reverb1/Reverb1'
import RingMod from '../Controls/Effects/RingMod/RingMod'
import Flanger from '../Controls/Effects/Flanger/Flanger'
import Reverb2 from '../Controls/Effects/Reverb2/Reverb2'
import ChordDisplay from '../ChordDisplay/ChordDisplay'
import PandaSection from '../PandaSection/PandaSection'
import Keyboard from '../Controls/Keyboard/Keyboard'
import Delay from '../Controls/Effects/Delay/Delay'
import Visualizer from '../Visualizer/Visualizer'
import Filter from '../Controls/Filter/Filter'
import ADSR from '../Controls/ADSR/ADSR'
import './Basic.scss'

const Basic = () => (
  <div className={cn('center', 'synth')}>
    <div className="mainGrid">
      <div className="mainGridSection1">
        <div className="oscillatorsContainer">
          <Oscillators />
        </div>
      </div>

      <div className="mainGridSection2">
        <div className="adsrFilterMouse">
          <div className="section2Grid">
            <div className="section2Grid1">
              <Filter />
              <ADSR />
            </div>

            <div className="section2Grid2">
              <PandaSection />
              <ChordDisplay />
            </div>
          </div>
        </div>
      </div>

      <div className="mainGridSection3">
        <div className="effectRack">
          <Distortion1 />
          <Distortion2 />
          <RingMod />
          <Flanger />
          <Quadrafuzz />
        </div>

        <div className={cn('effectRack', 'flex')}>
          <Delay />
          <PingPong />
          <Reverb1 />
          <Reverb2 />
          <MasterGain />
        </div>
      </div>

      <div className="mainGridSection4">
        <div className="keyboardContainer">
          <Keyboard className="keyboard" />
        </div>
        <Visualizer />
      </div>
    </div>
  </div>
)

export default Basic
