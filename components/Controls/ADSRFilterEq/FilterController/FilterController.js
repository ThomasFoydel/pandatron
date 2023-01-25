import cn from 'classnames'
import React, { useContext } from 'react'
import styles from './FilterController.module.scss'
import DropDown from '../../../DropDown/DropDown'
import { CTX } from '../../../../context/store'
import Range from '../../../Range'

const FilterController = () => {
  const [globalState, setGlobalState] = useContext(CTX)
  const { filter1WetGain, filter1 } = globalState
  const { type, gain, Q, frequency } = filter1

  const updateFilter = ({ target: { value, id } }) => {
    setGlobalState({ type: id, payload: { value } })
  }

  const showGainInput = type === 'peaking' || type === 'lowshelf' || type === 'highshelf'
  const showQInput = type !== 'lowshelf' && type !== 'highshelf'
  return (
    <div className={styles.filter1}>
      <h1 className="center">filter</h1>

      <div className={styles.sliders}>
        <div className={styles.frequency}>
          <div className={cn('center', styles.valueDisplay)}>
            <b>frequency </b> {frequency}
          </div>
          <Range
            className="center"
            max="19000"
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
            </div>
            <Range className="center" value={gain} id="changeFilter1Gain" onChange={updateFilter} />
          </div>
        )}

        <div>
          <div className="center">
            <b>mix </b>
            {(filter1WetGain * 100).toFixed(0)}
          </div>
          <Range
            className="center"
            value={filter1WetGain * 100}
            id="changeFilter1Mix"
            onChange={updateFilter}
          />
        </div>
      </div>

      <div className={cn(styles.filter1Dropdown, 'center')}>
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

export default FilterController
