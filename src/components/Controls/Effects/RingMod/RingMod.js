import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../Range/Range'
import Knob from '../../Knob/Knob'
import '../EffectController.scss'

const RingMod = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    setGlobalState({ type: 'changeRingModulator', payload: { value: { prop, val } } })
  }

  return (
    <div className={cn('effectController', 'white')}>
      <h2 className={cn('name', 'center')}>ring mod</h2>
      <div className="inputsContainer">
        <div>
          <div className={cn('paramName', 'center')}>
            <b>speed</b> <span className="val">{globalState.ringModulator.speed}</span>
          </div>
          <Range
            className={cn('center', 'input')}
            onChange={(e) => update({ prop: 'speed', val: e.target.value })}
            step={10}
            max={2000}
            value={globalState.ringModulator.speed}
          />
        </div>

        <div>
          <div className={cn('paramName', 'center')}>
            <b>distortion</b>{' '}
            <span className="val">{globalState.ringModulator.distortion.toFixed(1)}</span>
          </div>
          <Range
            className={cn('center', 'input')}
            onChange={(e) => update({ prop: 'distortion', val: e.target.value })}
            step={0.5}
            max={50}
            value={globalState.ringModulator.distortion}
          />
        </div>

        <div>
          <h6 className="center">mix</h6>
          <Knob
            className={cn('center', 'knob')}
            min={0}
            max={1}
            value={globalState.ringModulator.mix}
            onChange={(val) => update({ prop: 'mix', val })}
          />
          <div className="center">{globalState.ringModulator.mix.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default RingMod
