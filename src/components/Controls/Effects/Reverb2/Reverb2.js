import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Range from '../../Range/Range'
import '../Reverb1/Reverb1.scss'
import Knob from '../../Knob'

const Reverb2 = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { duration, decay, reverse, mix } = globalState.reverb2

  const updateState = (prop, val) => {
    setGlobalState({ type: 'changeReverb2', payload: { value: { prop, val } } })
  }

  const handleDecay = (e) => updateState('decay', +e.target.value)

  const handleDuration = (e) => updateState('time', +e.target.value)

  const handleMix = (value) => updateState('mix', value)

  const handleReverse = () => updateState('reverse', !reverse)

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
          <div className={cn('reversible', reverse && 'reversed')}>reverse</div>
        </div>
      </div>

      <div>
        <div className="center">
          <b>mix</b>
        </div>

        <Knob className={cn('knob', 'center')} min={0} max={1} value={mix} onChange={handleMix} />

        <div className="center">{mix.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Reverb2
