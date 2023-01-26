import cn from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../../context/store'
import Range from '../../Range'
import './ADSR.scss'

const ADSR = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { envelope } = globalState
  const { attack, decay, sustain, release } = envelope

  const updateADSR = (e) => {
    let { value, id } = e.target
    setGlobalState({
      type: 'changeADSR',
      payload: { value: { aspect: id, newVal: +value / 100 } }
    })
  }

  return (
    <div className='adsr'>
      <div className='innerRotate'>
        <div className='aspect'>
          <div className={cn('val', 'attackVal')}>{attack.toFixed(2)}</div>
          <span className='aspectInitial'>A</span>
          <Range
            max='200'
            id='attack'
            value={attack * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className={cn('val', 'decayVal')}>{decay.toFixed(2)}</div>
          <span className='aspectInitial'>D</span>

          <Range
            id='decay'
            max='200'
            value={decay * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className={cn('val', 'sustainVal')}>{sustain.toFixed(2)}</div>
          <span className='aspectInitial'>S</span>
          <Range
            id='sustain'
            max='200'
            value={sustain * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className={cn('val', 'releaseVal')}>{release.toFixed(2)}</div>
          <span className='aspectInitial'>R</span>
          <Range
            id='release'
            max='200'
            value={release * 100}
            onChange={updateADSR}
          />
        </div>
      </div>
      <div className='valueDisplays'></div>
    </div>
  )
}

export default ADSR
