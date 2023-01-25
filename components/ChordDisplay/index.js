import classNames from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../context/store'
import styles from './ChordDisplay.module.scss'

const ChordDisplay = () => {
  const [{ chordName }] = useContext(CTX)
  return (
    <h6 className={classNames('center', styles.chordDisplay)}>{chordName}</h6>
  )
}

export default ChordDisplay
