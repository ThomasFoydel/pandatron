import cn from 'classnames'
import React, { useContext } from 'react'
import DropDown from '../DropDown/DropDown'
import { CTX } from '../../../context/store'
import Range from '../Range/Range'
import './Filter.scss'

const Filter = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { filter1WetGain, filter1 } = globalState
  const { type, gain, Q, frequency } = filter1

  const updateFilter = ({ target: { value, id } }) => {
    setGlobalState({ type: id, payload: { value } })
  }

  const showGainInput = type === 'peaking' || type === 'lowshelf' || type === 'highshelf'
  const showQInput = type !== 'lowshelf' && type !== 'highshelf'
  return (
    <div className="filter1">
      <h1 className="center">filter</h1>

      <div className="sliders">
        <div className="frequency">
          <div className={cn('center', 'valueDisplay')}>
            <b>frequency </b> {frequency}
          </div>
          <Range
            className="center"
            max="20000"
            id="changeFilter1Freq"
            value={frequency}
            onChange={updateFilter}
          />
        </div>
        {showQInput && (
          <div>
            <div className="center">
              <b>Q </b>
              {Q}
            </div>
            <Range className="center" value={Q} id="changeFilter1Q" onChange={updateFilter} />
          </div>
        )}

        {showGainInput && (
          <div>
            <div className="center">
              <b>gain</b>
              {(+gain).toFixed(2)}
            </div>
            <Range className="center" value={gain} id="changeFilter1Gain" onChange={updateFilter} />
          </div>
        )}

        <div>
          <div className="center">
            <b>mix </b>
            {(+filter1WetGain).toFixed(2)}
          </div>
          <Range
            max={1}
            step={0.01}
            className="center"
            value={filter1WetGain}
            id="changeFilter1Mix"
            onChange={updateFilter}
          />
        </div>
      </div>

      <div className={cn('filter1Dropdown', 'center')}>
        <DropDown
          updateFunction={updateFilter}
          inputId="changeFilter1Type"
          current={type}
          options={[
            { val: 'lowpass', text: 'lowpass' },
            { val: 'highpass', text: 'highpass' },
            { val: 'lowshelf', text: 'lowshelf' },
            { val: 'highshelf', text: 'highshelf' },
            { val: 'bandpass', text: 'bandpass' },
            { val: 'peaking', text: 'peaking' },
            { val: 'notch', text: 'notch' },
            { val: 'allpass', text: 'allpass' },
          ]}
        />
      </div>
    </div>
  )
}

export default Filter
