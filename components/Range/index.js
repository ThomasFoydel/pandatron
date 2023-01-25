import cn from 'classnames'
import styles from './Range.module.scss'

const Range = ({ className, min, max, step, onChange, value, id }) => {
  return (
    <input
      className={cn(className, styles.range)}
      type='range'
      min={min || '0'}
      max={max || '100'}
      step={step || '1'}
      onChange={onChange}
      value={value}
      id={id}
    />
  )
}

export default Range
