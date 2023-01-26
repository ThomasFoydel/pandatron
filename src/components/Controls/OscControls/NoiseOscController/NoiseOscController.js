import cn from 'classnames'
import DropDown from '../../../DropDown/DropDown'
import './NoiseOscController.scss'
import Knob from '../../Knob'

const NoiseOscController = ({ updateState, gain, type }) => {
  const updateGain = (value) => updateState('changeNoiseGain', value)
  const updateType = (e) => updateState('changeNoiseType', e.target.value)

  return (
    <div className="noiseOscControl">
      <h4 className={cn('name', 'center')}>noise osc</h4>

      <div className={cn('gainKnob', 'center')}>
        <h3>gain</h3>

        <Knob className="knob" min={0} max={0.5} value={gain} onChange={updateGain} />
        <div>{gain.toFixed(2)}</div>
      </div>
      <div className={cn('dropdown', 'center')}>
        <DropDown
          updateFunction={updateType}
          inputId={'type'}
          current={type}
          options={[
            { val: 'white', text: 'white' },
            { val: 'pink', text: 'pink' },
            { val: 'brown', text: 'brown' },
          ]}
        />
      </div>
    </div>
  )
}

export default NoiseOscController
