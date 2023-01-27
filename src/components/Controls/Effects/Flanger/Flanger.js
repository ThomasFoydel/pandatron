import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../Range/Range'
import '../EffectController.scss'
import Knob from '../../Knob/Knob'

const Flanger = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    setGlobalState({ type: 'changeFlanger', payload: { value: { prop, val } } })
  }

  const properties = ['time', 'speed', 'depth', 'feedback']
  return (
    <div className="effectController">
      <h2 className={cn('name', 'center')}>flanger</h2>
      <div className="inputsContainer">
        {properties.map((property) => (
          <div key={property}>
            <div className={cn('paramName', 'center')}>
              <b>{property}</b> <span className="val">{globalState.flanger[property]}</span>
            </div>
            <Range
              className={cn('center', 'input')}
              onChange={(e) => update({ prop: property, val: e.target.value })}
              max={1}
              step={0.01}
              value={globalState.flanger[property]}
            />
          </div>
        ))}

        <div>
          <h6 className="center">mix</h6>
          <Knob
            className={cn('center', 'knob')}
            min={0}
            max={1}
            value={globalState.flanger.mix}
            onChange={(val) => update({ prop: 'mix', val })}
          />
          <div className="center">{globalState.flanger.mix.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default Flanger
