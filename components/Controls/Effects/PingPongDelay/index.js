import cn from 'classnames'
import React, { useContext } from 'react'
import styles from '../EffectController/EffectController.module.scss'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'
import Knob from '../../Knob'

const PingPongDelay = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    console.log({ val, prop })
    setGlobalState({ type: 'changePingPongDelay', payload: { value: { prop, val } } })
  }

  const properties = ['feedback', 'time']

  return (
    <div className={cn(styles.effectController, styles.minified)}>
      <h2 className={cn(styles.name, styles.center)}>ping pong</h2>
      <div className={styles.inputsContainer}>
        {properties.map((property) => (
          <div key={property}>
            <div className={cn(styles.paramName, 'center')}>
              <b>{property}</b> <span className={styles.val}>{globalState.flanger[property]}</span>
            </div>
            <Range
              className={cn('center', styles.input)}
              onChange={(e) => update({ prop: property, val: e.target.value })}
              min={0}
              max={100}
              value={globalState.flanger[property]}
            />
          </div>
        ))}

        <div>
          <h6 className="center">mix</h6>
          <Knob
            className={cn('center', styles.knob)}
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

export default PingPongDelay
