import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'
import '../EffectController.scss'
import Knob from '../../Knob'

const Quadrafuzz = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    setGlobalState({ type: 'changeQuadrafuzz', payload: { value: { prop, val } } })
  }

  const properties = ['lowGain', 'midLowGain', 'midHighGain', 'highGain']

  return (
    <div className={cn('effectController', 'minified')}>
      <h2 className={cn('name', 'center')}>quadrafuzz</h2>
      <div className="inputsContainer">
        {properties.map((property) => (
          <div key={property}>
            <div className={cn('paramName', 'center')}>
              <b>{property}</b> <span className="val">{globalState.quadrafuzz[property]}</span>
            </div>
            <Range
              className={cn('center', 'input')}
              onChange={(e) => update({ prop: property, val: e.target.value })}
              min={0}
              max={100}
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
