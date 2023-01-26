import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../../context/store'
import Knob from '../../Knob'
import './Delay.scss'

const Delay = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { delay1, delay1Wet } = globalState

  const updateDelayTime = (value) => {
    setGlobalState({ type: 'changeDelayTime', payload: { value } })
  }

  const updateDelayMix = (value) => {
    setGlobalState({ type: 'changeDelayMix', payload: { value } })
  }

  return (
    <div className='delay'>
      <h2 className={cn('center', 'title')}>delay</h2>
      <div className='time'>
        <h6 className='property'>time</h6>

        <Knob
          className={cn('center', 'knob')}
          min={0}
          max={100}
          value={delay1}
          onChange={updateDelayTime}
        />
        <div className={cn('valueDisplay', 'center')}>{delay1.toFixed(2)}</div>
      </div>

      <div className='amount'>
        <h6 className='property'>mix</h6>
        <Knob
          className={cn('center', 'knob')}
          min={0}
          max={100}
          value={delay1Wet * 100}
          onChange={updateDelayMix}
        />
        <div className={cn('valueDisplay', 'center')}>{(+delay1Wet).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Delay
