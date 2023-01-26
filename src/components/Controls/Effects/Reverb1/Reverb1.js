import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../Range/Range'
import Knob from '../../Knob/Knob'
import './Reverb1.scss'

const Reverb = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const {
    reverb1Wet,
    reverb1: { duration, decay, reversed },
  } = globalState

  const handleDecay = (e) => {
    const value = +e.target.value
    setGlobalState({ type: 'changeReverbDecay', payload: { value } })
  }

  const handleDuration = (e) => {
    const value = +e.target.value
    setGlobalState({ type: 'changeReverbDuration', payload: { value } })
  }

  const handleMix = (value) => {
    setGlobalState({ type: 'mixReverbGain', payload: { value } })
  }

  const handleReverse = () => {
    setGlobalState({ type: 'changeReverb1Reverse', payload: { value: !reversed } })
  }

  return (
    <div className="reverb">
      <h2 className={cn('title', 'center')}>reverb</h2>

      <div className="sliderInput">
        <div className="display">
          <b>duration</b> {duration}
        </div>

        <Range value={duration} min={1} max={20} onChange={handleDuration} />
      </div>

      <div className="sliderInput">
        <div className="display">
          <b>decay</b> {decay}
        </div>
        <Range value={decay} max={100} onChange={handleDecay} />
      </div>

      <div>
        <div className={cn('reverseBtn', 'center')} onClick={handleReverse}>
          <div className={cn('reversible', reversed && 'reversed')}>reverse</div>
        </div>
      </div>

      <div>
        <div className="center">
          <b>mix</b>
        </div>

        <Knob
          className={cn('knob', 'center')}
          min={0}
          max={1}
          value={reverb1Wet}
          onChange={handleMix}
        />

        <div className="center">{reverb1Wet.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Reverb
