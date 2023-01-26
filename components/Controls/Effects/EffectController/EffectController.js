import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './EffectController.module.scss'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'
import Knob from '../../Knob'

const EffectController = ({ name, values, minified }) => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ updateFunction, val, prop }) => {
    setGlobalState({ type: updateFunction, payload: { value: { prop, val } } })
  }

  return (
    <div className={cn(styles.effectController, minified && styles.minified)}>
      <h2 className={cn(styles.name, styles.center)}>{name}</h2>
      <div className={styles.inputsContainer}>
        {values.map(({ name, propertyName, updateFunction, max }) => {
          if (name === 'mix' || name === 'gain') {
            return (
              <div key={propertyName}>
                <h6 className="center">{name}</h6>
                <Knob
                  className={cn('center', styles.knob)}
                  min={0}
                  max={1}
                  value={globalState[propertyName]}
                  onChange={(val) => update({ updateFunction, val, prop: name })}
                />
                <div className="center">{globalState[propertyName].toFixed(2)}</div>
              </div>
            )
          } else if (name === 'reverse') {
            return (
              <div key={propertyName}>
                <div
                  className={cn(styles.reverseBtn, 'center')}
                  onClick={() =>
                    update({ updateFunction, val: !globalState[propertyName].reversed, prop: name })
                  }
                >
                  <div className={cn(styles.reversible, reversed && styles.reversed)}>reverse</div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={propertyName}>
                <div className={cn(styles.paramName, 'center')}>
                  <b>{name}</b> <span className={styles.val}>{globalState[propertyName]}</span>
                </div>
                <Range
                  className={cn('center', styles.input)}
                  id={propertyName}
                  onChange={update}
                  min={0}
                  max={max || 100}
                  value={globalState[propertyName]}
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default EffectController
