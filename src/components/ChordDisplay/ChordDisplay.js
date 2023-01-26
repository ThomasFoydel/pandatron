import classNames from 'classnames'
import React, { useContext } from 'react'
import { CTX } from '../../context/store'
import './ChordDisplay.scss'

const ChordDisplay = () => {
  const [{ chordName }] = useContext(CTX)
  return <h6 className={classNames('center', 'chordDisplay')}>{chordName}</h6>
}

export default ChordDisplay
