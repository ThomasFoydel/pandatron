import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../Range/Range'
import '../EffectController.scss'
import Knob from '../../Knob/Knob'

const Quadrafuzz = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    setGlobalState({ type: 'changeQuadrafuzz', payload: { value: { prop, val } } })
  }

  const properties = [
    { property: 'lowGain', label: 'low' },
    { property: 'midLowGain', label: 'mid low' },
    { property: 'midHighGain', label: 'mid high' },
    { property: 'highGain', label: 'high' },
  ]

  return (
    <div className="effectController">
      <h2 className={cn('name', 'center')}>quadrafuzz</h2>
      <div className="inputsContainer">
        {properties.map(({ property, label }) => (
          <div key={property}>
            <div className={cn('paramName', 'center')}>
              <b>{label}</b> <span className="val">{globalState.quadrafuzz[property]}</span>
            </div>
            <Range
              className={cn('center', 'input')}
              onChange={(e) => update({ prop: property, val: e.target.value })}
              step={0.01}
              max={1}
              value={globalState.quadrafuzz[property]}
            />
          </div>
        ))}

        <div>
          <h6 className="center">mix</h6>
          <Knob
            className={cn('center', 'knob')}
            min={0}
            max={1}
            value={globalState.quadrafuzz.mix}
            onChange={(val) => update({ prop: 'mix', val })}
          />
          <div className="center">{globalState.quadrafuzz.mix.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default Quadrafuzz
