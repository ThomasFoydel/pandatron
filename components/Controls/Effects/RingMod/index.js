import cn from 'classnames'
import React, { useContext } from 'react'
import styles from '../EffectController/EffectController.module.scss'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'
import Knob from '../../Knob'

const RingMod = () => {
  const [globalState, setGlobalState] = useContext(CTX)

  const update = ({ val, prop }) => {
    setGlobalState({ type: 'changeRingModulator', payload: { value: { prop, val } } })
  }

  return (
    <div className={styles.effectController}>
      <h2 className={cn(styles.name, styles.center)}>ring mod</h2>
      <div className={styles.inputsContainer}>
        <div>
          <div className={cn(styles.paramName, 'center')}>
            <b>speed</b> <span className={styles.val}>{globalState.ringModulator.speed}</span>
          </div>
          <Range
            className={cn('center', styles.input)}
            onChange={(e) => update({ prop: 'speed', val: e.target.value })}
            min={0}
            max={100}
            value={globalState.ringModulator.speed}
          />
        </div>

        <div>
          <div className={cn(styles.paramName, 'center')}>
            <b>distortion</b>{' '}
            <span className={styles.val}>{globalState.ringModulator.distortion}</span>
          </div>
          <Range
            className={cn('center', styles.input)}
            onChange={(e) => update({ prop: 'distortion', val: e.target.value })}
            min={0}
            max={100}
            value={globalState.ringModulator.distortion}
          />
        </div>

        <div>
          <h6 className="center">mix</h6>
          <Knob
            className={cn('center', styles.knob)}
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
