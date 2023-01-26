import { useContext, useEffect } from 'react'
import QwertyHancock from '../qwerty-hancock/dist/qwerty-hancock'
import { CTX } from '../../context/store'

const Keyboard = ({ className }) => {
  const [, setGlobalState] = useContext(CTX)
  useEffect(() => {
    const keyboard = new QwertyHancock({
      id: 'keyboard',
      width: 450,
      height: 68,
      octaves: 2,
      startNote: 'C4',
      whiteKeyColour: '#1c1c1c',
      blackKeyColour: '#f7f7f7',
      activeColour: '#c70c0c',
      borderColour: '#1c1c1c',
    })

    keyboard.keyDown = (note, freq) => {
      setGlobalState({
        type: 'generateOsc',
        payload: { value: { note, freq } },
      })
    }

    keyboard.keyUp = (note, freq) => {
      setGlobalState({ type: 'killOsc', payload: { value: { note, freq } } })
    }
  }, [])
  return <div className={className} id="keyboard" />
}

export default Keyboard
