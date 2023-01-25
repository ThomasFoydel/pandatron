import cn from 'classnames'
import React, { useState } from 'react'
import styles from './FilterController.module.scss'
import DropDown from '../../../DropDown/DropDown'
import Range from '../../../Range'

const FilterController = ({
  changeFilter1Type,
  changeFilter1Freq,
  changeFilter1Q,
  changeFilter1Mix,
  changeFilter1Gain,
  initParams
}) => {
  const [filterDisplayVals, setFilterDisplayVals] = useState(initParams)

  const updateDisplay = (id, value) => {
    setFilterDisplayVals({ ...filterDisplayVals, [id]: value })
  }

  const updateFilter = ({ target: { value, id } }) => {
    if (id === 'type') {
      changeFilter1Type(value)
      updateDisplay(id, value)
    } else if (id === 'frequency') {
      changeFilter1Freq(value)
      updateDisplay(id, value)
    } else if (id === 'Q') {
      changeFilter1Q(value)
      updateDisplay(id, value)
    } else if (id === 'mix') {
      changeFilter1Mix(value)
      updateDisplay(id, value)
    } else if (id === 'gain') {
      changeFilter1Gain(value)
      updateDisplay(id, value)
    }
  }
  const { type, frequency, Q, mix, gain } = filterDisplayVals
  const showGainInput =
    type === 'peaking' || type === 'lowshelf' || type === 'highshelf'
  const showQInput = type !== 'lowshelf' && type !== 'highshelf'
  return (
    <div className={styles.filter1}>
      <h1 className='center'>filter</h1>

      <div className={styles.sliders}>
        <div className={styles.frequency}>
          <div className={cn('center', styles.valueDisplay)}>
            <b>frequency </b> {filterDisplayVals.frequency}
          </div>
          <Range
            className='center'
            max='19000'
            id='frequency'
            value={frequency}
            onChange={updateFilter}
          />
        </div>
        {showQInput && (
          <div>
            <div className='center'>
              <b>Q </b>
              {filterDisplayVals.Q}
            </div>
            <Range
              className='center'
              value={Q}
              id='Q'
              onChange={updateFilter}
            />
          </div>
        )}

        {showGainInput && (
          <div>
            <div className='center'>
              <b>gain</b>
            </div>
            <Range
              className='center'
              value={gain}
              id='gain'
              onChange={updateFilter}
            />
          </div>
        )}

        <div>
          <div className='center'>
            <b>mix </b>
            {filterDisplayVals.mix}
          </div>
          <Range
            className='center'
            value={mix}
            id='mix'
            onChange={updateFilter}
          />
        </div>
      </div>

      <div className={cn(styles.filter1Dropdown, 'center')}>
        <DropDown
          updateFunction={updateFilter}
          inputId={'type'}
          initVal={{ val: 'highpass', text: 'highpass' }}
          options={[
            { val: 'lowpass', text: 'lowpass' },
            { val: 'highpass', text: 'highpass' },
            { val: 'lowshelf', text: 'lowshelf' },
            { val: 'highshelf', text: 'highshelf' },
            { val: 'bandpass', text: 'bandpass' },
            { val: 'peaking', text: 'peaking' },
            { val: 'notch', text: 'notch' },
            { val: 'allpass', text: 'allpass' }
          ]}
        />
      </div>
    </div>
  )
}

export default FilterController
