import React, { useState, useContext, useEffect } from 'react'
import MouseFieldController from '../Controls/MouseFieldController/MouseFieldController'
import pandaFaces from '../../assets/imgs/pandas'
import { CTX } from '../../context/store'
import './PandaSection.scss'

const PandaDisplay = () => {
  const [{ chordName }] = useContext(CTX)
  const { panda1, panda2, panda3, panda4, panda5, panda6, panda7 } = pandaFaces
  const [currentPanda, setCurrentPanda] = useState(panda7)
  const toggleLfo1 = () => {}
  const changeMouseLfo = () => {}

  useEffect(() => {
    if (chordName.includes('7')) {
      setCurrentPanda(panda6)
    } else if (chordName.includes('6')) {
      setCurrentPanda(panda5)
    } else if (chordName.includes('sus')) {
      setCurrentPanda(panda4)
    } else if (chordName.includes('dim')) {
      setCurrentPanda(panda3)
    } else if (chordName.includes('mi') || chordName.includes('minor')) {
      setCurrentPanda(panda2)
    } else if (chordName.includes('ma') || chordName.includes('major')) {
      setCurrentPanda(panda1)
    } else {
      setCurrentPanda(panda7)
    }
  }, [chordName])

  return (
    <div className="flex">
      <MouseFieldController changeMouseLfo={changeMouseLfo} toggleLfo1={toggleLfo1}>
        <div id="chord-panda">
          <img
            src={currentPanda}
            alt="panda-display"
            id="panda-display"
            className="pandaDisplay"
          />
        </div>
      </MouseFieldController>
    </div>
  )
}

export default PandaDisplay
