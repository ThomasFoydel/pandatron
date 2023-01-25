import cn from 'classnames'
import Pizzicato from 'pizzicato'
import DistortionController from '../../components/Controls/Effects/DistortionController/DistortionController'
import NoiseOscController from '../../components/Controls/OscControls/NoiseOscController/NoiseOscController'
import FilterController from '../../components/Controls/ADSRFilterEq/FilterController/FilterController'
import ReverbController from '../../components/Controls/Effects/ReverbController/ReverbController'
import EffectController from '../../components/Controls/Effects/EffectController/EffectController'
import ADSRController from '../../components/Controls/ADSRFilterEq/ADSRController/ADSRController'
import DelayController from '../../components/Controls/Effects/DelayController/DelayController'
import OscController from '../../components/Controls/OscControls/OscController/OscController'
import MasterGain from '../../components/Controls/MasterGain/MasterGain'
import { makeDistortionCurve, impulseResponse } from '../../util/util'
import pandaFaces from '../../assets/imgs/pandas'
import PandaSection from '../PandaSection'
import ChordDisplay from '../ChordDisplay'
import styles from './Basic.module.scss'
import Visualizer from '../Visualizer'
import Keyboard from '../Keyboard'
import Range from '../Range'

const Basic = () => {
  // const actx = Pizzicato.context

  // let attack = 0.0
  // let decay = 1
  // let sustain = 1
  // let release = 0.3
  // let initEnvelope = { attack, decay, sustain, release }

  // let wavetable1 = 'sawtooth'
  // let wavetable2 = 'sine'
  // let subOscType = 'sine'
  // let noiseType = 'white'

  // let osc1Detune = 0
  // let osc2Detune = 0
  // let osc1OctaveOffset = '0'
  // let osc2OctaveOffset = '0'

  // let subOscOctaveOffset = '0'

  // let noiseOscVol = 0

  // const oscGain1 = actx.createGain()
  // const oscGain2 = actx.createGain()
  // const oscGainDefaultVal = 0.1
  // oscGain1.gain.value = oscGainDefaultVal
  // oscGain2.gain.value = oscGainDefaultVal
  // const oscMixGain1 = actx.createGain()
  // const oscMixGain2 = actx.createGain()
  // oscMixGain1.gain.value = 0.5
  // oscMixGain2.gain.value = 0.5

  // const oscMasterGain1 = actx.createGain()
  // const noiseGain = actx.createGain()
  // const subGain = actx.createGain()
  // subGain.gain.value = oscGainDefaultVal
  // const sourcesGain = actx.createGain()

  // const subFilter = actx.createBiquadFilter()

  // const distortion1 = actx.createWaveShaper()
  // distortion1.curve = makeDistortionCurve(0, actx)

  // const dist1WetGain = actx.createGain()
  // const dist1DryGain = actx.createGain()
  // dist1WetGain.gain.value = 0
  // dist1DryGain.gain.value = 1
  // const distortion1MixedGain = actx.createGain()

  // const filter1 = actx.createBiquadFilter()
  // filter1.type = 'highpass'
  // filter1.dryWet = 1
  // const filter1WetGain = actx.createGain()
  // const filter1DryGain = actx.createGain()
  // filter1WetGain.gain.value = 1
  // filter1DryGain.gain.value = 0
  // const filter1MixedGain = actx.createGain()

  // const distortion2 = new Pizzicato.Effects.Distortion()
  // distortion2.gain = 0

  // const quadrafuzzInitVals = {
  //   lowGain: 0.6,
  //   midLowGain: 0.8,
  //   midHighGain: 0.5,
  //   highGain: 0.6,
  //   mix: 0
  // }

  // const quadrafuzz1 = new Pizzicato.Effects.Quadrafuzz(quadrafuzzInitVals)
  // quadrafuzz1.dryGainNode.gain.value = 1
  // quadrafuzz1.wetGainNode.gain.value = 0

  // const flanger1InitVals = {
  //   time: 0.45,
  //   speed: 0.2,
  //   depth: 0.1,
  //   feedback: 0.1,
  //   mix: 0
  // }
  // const flanger1 = new Pizzicato.Effects.Flanger(flanger1InitVals)

  // const ringModulatorInitVals = {
  //   speed: 10,
  //   distortion: 4,
  //   mix: 0
  // }
  // const ringModulator = new Pizzicato.Effects.RingModulator(
  //   ringModulatorInitVals
  // )

  // const pingPongDelayInitVals = {
  //   feedback: 0.2,
  //   time: 0.4,
  //   mix: 0
  // }
  // const pingPongDelay = new Pizzicato.Effects.PingPongDelay(
  //   pingPongDelayInitVals
  // )

  // const delay1 = actx.createDelay(5.0)
  // const delay1Dry = actx.createGain()
  // const delay1Wet = actx.createGain()
  // const delay1Combined = actx.createGain()
  // delay1Dry.gain.value = 1
  // delay1Wet.gain.value = 0

  // const reverb1Wet = actx.createGain()
  // const reverb1Dry = actx.createGain()
  // reverb1Wet.gain.value = 0
  // reverb1Dry.gain.value = 1
  // const reverbJoinGain = actx.createGain()
  // const reverb1 = actx.createConvolver()
  // const impulseBuffer = impulseResponse(4, 4, false, actx)
  // reverb1.buffer = impulseBuffer

  // const reverb2InitVals = {
  //   time: 1,
  //   decay: 0.8,
  //   reverse: true,
  //   mix: 0
  // }
  // const reverb2 = new Pizzicato.Effects.Reverb(reverb2InitVals)

  // const limiter = new Pizzicato.Effects.Compressor({
  //   threshold: -24,
  //   ratio: 12
  // })

  // const lfo1Osc = actx.createOscillator()
  // const lfo1 = actx.createGain()
  // const lowPassFilter = actx.createBiquadFilter()
  // const lfo1Wet = actx.createGain()
  // const lfo1Dry = actx.createGain()

  // lfo1Wet.gain.value = 0
  // lfo1Dry.gain.value = 1
  // const lfo1Combined = actx.createGain()

  // let lfo1Started = false
  // lfo1Osc.connect(lfo1)

  // lfo1.connect(lfo1Wet.gain)

  // const connectorGain = actx.createGain()

  // const masterGain = actx.createGain()

  // const analyzer = actx.createAnalyser()
  // analyzer.fftSize = 2048 // 1024; // 512; // 256; // 32 64 128 256 512 1024 2048 4096 8192 16384 32768
  // const analyzerBufferLength = analyzer.frequencyBinCount
  // const analyzerData = new Uint8Array(analyzerBufferLength)

  // oscGain1.connect(oscMixGain1)
  // oscGain2.connect(oscMixGain2)
  // oscMixGain1.connect(oscMasterGain1)
  // oscMixGain2.connect(oscMasterGain1)
  // oscMasterGain1.connect(sourcesGain)
  // noiseGain.connect(sourcesGain)

  // sourcesGain.connect(distortion1)
  // sourcesGain.connect(dist1DryGain)
  // distortion1.connect(dist1WetGain)
  // dist1WetGain.connect(distortion1MixedGain)
  // dist1DryGain.connect(distortion1MixedGain)
  // distortion1MixedGain.connect(distortion2)

  // distortion2.connect(quadrafuzz1)

  // quadrafuzz1.connect(filter1)
  // quadrafuzz1.connect(filter1DryGain)

  // filter1.connect(filter1WetGain)
  // filter1WetGain.connect(filter1MixedGain)
  // filter1DryGain.connect(filter1MixedGain)
  // filter1MixedGain.connect(flanger1)

  // flanger1.connect(ringModulator)

  // ringModulator.connect(delay1)
  // ringModulator.connect(delay1Dry)

  // delay1.connect(delay1Wet)
  // delay1Wet.connect(delay1Combined)
  // delay1Dry.connect(delay1Combined)
  // delay1Combined.connect(pingPongDelay)

  // pingPongDelay.connect(reverb1)
  // pingPongDelay.connect(reverb1Dry)

  // reverb1.connect(reverb1Wet)
  // reverb1Dry.connect(reverbJoinGain)
  // reverb1Wet.connect(reverbJoinGain)
  // reverbJoinGain.connect(reverb2)
  // reverb2.connect(connectorGain)

  // subGain.connect(subFilter)
  // subFilter.connect(connectorGain)

  // connectorGain.connect(lowPassFilter)
  // connectorGain.connect(lfo1Dry)

  // lowPassFilter.connect(lfo1Wet)
  // lfo1Wet.connect(lfo1Combined)
  // lfo1Dry.connect(lfo1Combined)
  // lfo1Combined.connect(masterGain)
  // masterGain.connect(analyzer)
  // masterGain.connect(limiter)
  // limiter.connect(actx.destination)

  // const changeFilter1Type = (val) => {
  //   filter1.type = val
  // }
  // const changeFilter1Freq = (val) => {
  //   filter1.frequency.setValueAtTime(val, actx.currentTime)
  // }
  // const changeFilter1Q = (val) => {
  //   filter1.Q.setValueAtTime(val, actx.currentTime)
  // }

  // const changeFilter1Mix = (e) => {
  //   const numE = +e
  //   const val = numE.toFixed(2)
  //   const newDryVal = ((100 - val) / 100).toFixed(2)
  //   filter1.dryWet = newDryVal
  //   const newWetVal = (val / 100).toFixed(2)

  //   filter1DryGain.gain.setValueAtTime(newDryVal, actx.currentTime)
  //   filter1WetGain.gain.setValueAtTime(newWetVal, actx.currentTime)
  // }

  // const changeFilter1Gain = (e) => {
  //   const newVal = +e / 20

  //   filter1.gain.setValueAtTime(newVal, actx.currentTime)
  // }

  // const detuneOsc1 = (e) => {
  //   osc1Detune = e
  // }
  // const detuneOsc2 = (e) => {
  //   osc2Detune = e
  // }

  // const mixGain = (e) => {
  //   oscMixGain1.gain.setValueAtTime(
  //     (100 - e.target.value) / 100,
  //     actx.currentTime
  //   )
  //   oscMixGain2.gain.setValueAtTime(e.target.value / 100, actx.currentTime)
  // }

  // const mixReverbGain = (e) => {
  //   let newDryVal
  //   if (e < 100) {
  //     newDryVal = (100 - e) / 100
  //   } else {
  //     newDryVal = 0
  //   }

  //   reverb1Dry.gain.setValueAtTime(newDryVal.toFixed(2), actx.currentTime)
  //   reverb1Wet.gain.linearRampToValueAtTime(e / 100, actx.currentTime)
  // }

  // const changeWaveTable1 = (e) => {
  //   wavetable1 = e.target.value
  // }

  // const changeWaveTable2 = (e) => {
  //   wavetable2 = e.target.value
  // }

  // const changeWaveTableSub = (e) => {
  //   subOscType = e.target.value
  // }

  // const changeNoiseType = (e) => {
  //   noiseType = e
  // }

  // const changeOctaveOsc1 = (e) => {
  //   osc1OctaveOffset = e.target.value
  // }

  // const changeOctaveOsc2 = (e) => {
  //   osc2OctaveOffset = e.target.value
  // }

  // const changeOctaveSub = (e) => {
  //   subOscOctaveOffset = e.target.value
  // }

  // const changeOsc1Gain = (e) => {
  //   oscGain1.gain.value = e
  // }
  // const changeOsc2Gain = (e) => {
  //   oscGain2.gain.value = e
  // }

  // const changeSubGain = (e) => {
  //   subGain.gain.value = e
  // }

  // const changeNoiseGain = (e) => {
  //   noiseOscVol = e
  // }

  // const changeDistortion1Amount = (e) => {
  //   distortion1.curve = makeDistortionCurve(e * 5, actx)
  // }

  // const changeDistortion1Mix = (e) => {
  //   const newWet = e / 100
  //   const newDry = (100 - e) / 100

  //   dist1DryGain.gain.setValueAtTime(newDry, actx.currentTime)
  //   dist1WetGain.gain.setValueAtTime(newWet, actx.currentTime)
  // }

  // const changeReverbDecay = (e) => {
  //   const newVal = e
  //   const { durationVal, reverse } = reverb1.buffer
  //   const newBuffer = impulseResponse(durationVal, newVal, reverse, actx)
  //   reverb1.buffer = newBuffer
  // }

  // const changeReverbDuration = (e) => {
  //   const newVal = e
  //   const { decayVal, reverse } = reverb1.buffer
  //   const newBuffer = impulseResponse(newVal, decayVal, reverse, actx)
  //   reverb1.buffer = newBuffer
  // }

  // const changeDelayTime = (e) => {
  //   delay1.delayTime.setValueAtTime(e.toFixed(1), actx.currentTime)
  // }

  // const changeDelayMix = (e) => {
  //   const numE = +e
  //   const val = numE.toFixed(2)
  //   const newDryVal = ((100 - val) / 100).toFixed(2)
  //   delay1.dryWet = newDryVal
  //   const newWetVal = (val / 100).toFixed(2)
  //   delay1Dry.gain.setValueAtTime(newDryVal, actx.currentTime)
  //   delay1Wet.gain.setValueAtTime(newWetVal, actx.currentTime)
  // }

  // const changeADSR = (newVal, aspect) => {
  //   if (aspect === 'attack') {
  //     attack = newVal
  //   } else if (aspect === 'decay') {
  //     decay = newVal
  //   } else if (aspect === 'sustain') {
  //     sustain = newVal
  //   } else if (aspect === 'release') {
  //     release = newVal
  //   }
  // }

  // const changePizzicatoEffect = (effect, prop, val) => {
  //   if (prop === 'mix') {
  //     effect.dryGainNode.gain.setValueAtTime(1 - val, actx.currentTime)
  //     effect.wetGainNode.gain.setValueAtTime(val, actx.currentTime)
  //   } else {
  //     effect[prop] = val
  //   }
  // }

  // const changeQuadrafuzz = (prop, val) => {
  //   changePizzicatoEffect(quadrafuzz1, prop, val)
  // }

  // const changeFlanger1 = (prop, val) => {
  //   changePizzicatoEffect(flanger1, prop, val)
  // }

  // const changeDistortion2Gain = (prop, val) => {
  //   changePizzicatoEffect(distortion2, prop, val)
  // }

  // const changeRingModulator = (prop, val) => {
  //   changePizzicatoEffect(ringModulator, prop, val)
  // }

  // const changePingPongDelay = (prop, val) => {
  //   changePizzicatoEffect(pingPongDelay, prop, val)
  // }

  // const changeReverb2 = (prop, val) => {
  //   changePizzicatoEffect(reverb2, prop, val)
  // }

  // const changeMouseLfo = (x, y) => {
  //   if (!lfo1Started) {
  //     lfo1Osc.start()
  //     lfo1Started = true
  //   }
  //   lowPassFilter.frequency.linearRampToValueAtTime(
  //     ((1 - y) * 18000).toFixed(2),
  //     actx.currentTime
  //   )
  //   lfo1Osc.frequency.linearRampToValueAtTime(
  //     (x * 12).toFixed(2),
  //     actx.currentTime
  //   )
  // }

  // const toggleLfo1 = (lfoIsActive) => {
  //   const now = actx.currentTime
  //   if (lfoIsActive) {
  //     // TURN OFF
  //     lfo1Dry.gain.exponentialRampToValueAtTime(1, now)
  //     lfo1Wet.gain.exponentialRampToValueAtTime(0.01, now)
  //     lfo1.gain.exponentialRampToValueAtTime(0.01, now)
  //   } else {
  //     // TURN ON
  //     lfo1Dry.gain.exponentialRampToValueAtTime(0.01, now)
  //     lfo1Wet.gain.exponentialRampToValueAtTime(1, now)
  //     lfo1.gain.exponentialRampToValueAtTime(1, now)
  //   }
  // }

  // const changeMasterGain = (newGain) => {
  //   newGain = newGain < 10 ? 10 : newGain
  //   masterGain.gain.exponentialRampToValueAtTime(
  //     newGain / 100,
  //     actx.currentTime
  //   )
  // }

  // // CREATE KEYBOARD
  // useEffect(() => {
  //   if (typeof window === 'undefined') return
  //   const keyboard = new QwertyHancock({
  //     id: 'keyboard',
  //     width: 450,
  //     height: 68,
  //     octaves: 2,
  //     startNote: 'C4',
  //     whiteKeyColour: '#1c1c1c',
  //     blackKeyColour: '#f7f7f7',
  //     activeColour: '#c70c0c',
  //     borderColour: '#1c1c1c'
  //   })
  //   let nodes = []
  //   let notesForChordAnalysis = []
  //   const chordDisplay = document.getElementById('chord-display')

  //   keyboard.keyDown = (note, freq) => {
  //     setGlobalState({ type: 'generateOsc', payload: { value: freq } })
  //     return
  //     const envelope = { attack, decay, sustain, release }

  //     const osc1Freq = calcFreq(freq, osc1OctaveOffset)
  //     const osc2Freq = calcFreq(freq, osc2OctaveOffset)
  //     const subOscFreq = calcFreq(freq, subOscOctaveOffset - 2)

  //     const noiseOsc = new noiseOscClass(
  //       actx,
  //       noiseType,
  //       envelope,
  //       noiseGain,
  //       freq,
  //       noiseOscVol
  //     )
  //
  //     const newOsc1 = new oscClass(
  //       actx,
  //       wavetable1,
  //       osc1Freq,
  //       osc1Detune,
  //       envelope,
  //       oscGain1,
  //       freq
  //     )
  //     const newOsc2 = new oscClass(
  //       actx,
  //       wavetable2,
  //       osc2Freq,
  //       osc2Detune,
  //       envelope,
  //       oscGain2,
  //       freq
  //     )

  //     const subOsc = new oscClass(
  //       actx,
  //       subOscType,
  //       subOscFreq,
  //       0,
  //       envelope,
  //       subGain,
  //       freq
  //     )

  //     nodes.push(newOsc1, newOsc2, subOsc, noiseOsc)

  //     // CHORD ANALYSIS

  //     const noteIndex = findWithAttr(noteFreqs, 'note', note)
  //     // it's minus 48 because the keyboard is set to start on C4 instead of C0
  //     notesForChordAnalysis.push(noteIndex - 48)
  //     const chordName = chordAnalyzer(notesForChordAnalysis)
  //     chordDisplay.innerHTML = chordName
  //     updatePanda(chordName)
  //   }

  //   keyboard.keyUp = (note, freq) => {
  //     setGlobalState({ type: 'killOsc', payload: { value: freq } })
  //     return
  //     var new_nodes = []
  //     for (var i = 0; i < nodes.length; i++) {
  //       if (Math.round(nodes[i].initialFreq) === Math.round(freq)) {
  //         nodes[i].stop(0)
  //       } else {
  //         new_nodes.push(nodes[i])
  //       }
  //     }
  //     nodes = new_nodes

  //     // CHORD ANALYSIS
  //     const noteIndex = findWithAttr(noteFreqs, 'note', note)
  //     const filteredNoteArray = notesForChordAnalysis.filter(
  //       // it's minus 48 because the keyboard is set to start on C4 instead of C0
  //       (item) => item !== noteIndex - 48
  //     )
  //     notesForChordAnalysis = [...filteredNoteArray]
  //     const chordName = chordAnalyzer(notesForChordAnalysis)
  //     if (chordName) {
  //       chordDisplay.innerHTML = chordName
  //       updatePanda(chordName)
  //     } else {
  //       chordDisplay.innerHTML = ''
  //       updatePanda('')
  //     }
  //   }

  //   /////// ANALYZER

  //   const canvas = document.getElementById('canvas')
  //   canvas.width = window.innerWidth
  //   canvas.height = window.innerHeight
  //   const ctx = canvas.getContext('2d')

  //   const WIDTH = canvas.width
  //   const HEIGHT = canvas.height

  //   const barWidth = (WIDTH / analyzerBufferLength) * 13

  //   let barHeight
  //   let x = 0

  //   function renderFrame() {
  //     requestAnimationFrame(renderFrame) // Takes callback function to invoke before rendering

  //     x = 0

  //     analyzer.getByteFrequencyData(analyzerData) // Copies the frequency data into dataArray
  //     // Results in a normalized array of values between 0 and 255
  //     // Before this step, dataArray's values are all zeros (but with length of 8192)

  //     ctx.fillStyle = '#1c1c1c' // Clears canvas before rendering bars (black with opacity 0.2)
  //     ctx.fillRect(0, 0, WIDTH, HEIGHT) // Fade effect, set opacity to 1 for sharper rendering of bars

  //     let r, g, b
  //     let bars = 50 // Set total number of bars you want per frame

  //     for (let i = 0; i < bars; i++) {
  //       barHeight = analyzerData[i] * 2.5

  //       if (analyzerData[i] > 210) {
  //         r = 255
  //         g = 255
  //         b = 255
  //       } else if (analyzerData[i] > 200) {
  //         r = 210
  //         g = 210
  //         b = 210
  //       } else if (analyzerData[i] > 190) {
  //         r = 160
  //         g = 160
  //         b = 160
  //       } else if (analyzerData[i] > 180) {
  //         r = 120
  //         g = 120
  //         b = 120
  //       } else {
  //         r = 80
  //         g = 80
  //         b = 80
  //       }

  //       ctx.fillStyle = `rgb(${r},${g},${b})`
  //       ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
  //       // (x, y, i, j)
  //       // (x, y) Represents start point
  //       // (i, j) Represents end point

  //       x += barWidth + 10 // Gives 10px space between each bar
  //     }
  //   }
  //   renderFrame()
  // }, [])

  return (
    <div className={cn('center', styles.synth)}>
      <div className={styles.mainGrid}>
        <div className={styles.mainGridSection1}>
          <div className={styles.oscillatorsContainer}>
            <div className='flex'>
              {/* <OscController
                name='osc 1'
                changeWaveTable={changeWaveTable1}
                changeOctaveOsc={changeOctaveOsc1}
                detuneOsc={detuneOsc1}
                changeGain={changeOsc1Gain}
                initVals={{
                  wavetable: wavetable1,
                  envelope: initEnvelope,
                  offset: osc1OctaveOffset,
                  gain: oscGainDefaultVal
                }}
              />
              <OscController
                name='osc 2'
                changeWaveTable={changeWaveTable2}
                changeOctaveOsc={changeOctaveOsc2}
                detuneOsc={detuneOsc2}
                changeGain={changeOsc2Gain}
                initVals={{
                  wavetable: wavetable2,
                  envelope: initEnvelope,
                  offset: osc2OctaveOffset,
                  gain: oscGainDefaultVal
                }}
              /> */}
            </div>

            <div className={styles.oscMix}>
              <div className={cn('center', styles.inputContainer)}>
                <span className={styles.oscName}>osc1</span>
                {/* <Range onChange={mixGain} /> */}
                <span className={styles.oscName}>osc2</span>
              </div>
            </div>

            <div className='flex'>
              {/* <OscController
                name='sub osc'
                changeWaveTable={changeWaveTableSub}
                changeOctaveOsc={changeOctaveSub}
                changeGain={changeSubGain}
                initVals={{
                  wavetable: subOscType,
                  envelope: initEnvelope,
                  offset: subOscOctaveOffset,
                  gain: oscGainDefaultVal
                }}
              />
              <NoiseOscController
                changeNoiseGain={changeNoiseGain}
                changeNoiseType={changeNoiseType}
                initGain={noiseOscVol}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.mainGridSection2}>
          <div className={styles.adsrFilterMouse}>
            <div className={styles.section2Grid}>
              <div className={styles.section2Grid1}>
                {/* <FilterController
                  changeFilter1Type={changeFilter1Type}
                  changeFilter1Freq={changeFilter1Freq}
                  changeFilter1Q={changeFilter1Q}
                  changeFilter1Mix={changeFilter1Mix}
                  changeFilter1Gain={changeFilter1Gain}
                  initParams={{
                    type: filter1.type,
                    frequency: filter1.frequency.value,
                    Q: filter1.Q.value,
                    mix: 100 - filter1.dryWet,
                    gain: filter1.gain.value
                  }}
                />

                <ADSRController
                  changeADSR={changeADSR}
                  initEnvelope={initEnvelope}
                /> */}
              </div>

              <div className={styles.section2Grid2}>
                <PandaSection />
                <div>
                  <ChordDisplay />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainGridSection3}>
          <div className={styles.effectRack}>
            {/* <DistortionController
              initVals={{
                amountVal: 0,
                mixVal: dist1WetGain.gain.value * 100
              }}
              changeDistortion1Amount={changeDistortion1Amount}
              changeDistortion1Mix={changeDistortion1Mix}
            />
            <EffectController
              effectName='distortion II'
              changeEffect={changeDistortion2Gain}
              initVals={{ gain: distortion2.gain }}
            />
            <EffectController
              effectName='ring mod'
              initVals={ringModulatorInitVals}
              changeEffect={changeRingModulator}
            />
            <EffectController
              effectName='flanger'
              initVals={flanger1InitVals}
              changeEffect={changeFlanger1}
              minified={true}
            />

            <EffectController
              effectName='quadrafuzz'
              changeEffect={changeQuadrafuzz}
              initVals={quadrafuzzInitVals}
              minified={true}
            /> */}
          </div>

          <div className={cn(styles.effectRack, 'flex')}>
            {/* <DelayController
              changeMix={changeDelayMix}
              changeDelayTime={changeDelayTime}
              initVals={{
                time: delay1.delayTime.value,
                mix: delay1Wet.gain.value
              }}
            />

            <EffectController
              effectName='ping pong'
              initVals={pingPongDelayInitVals}
              changeEffect={changePingPongDelay}
            />
            <ReverbController
              changeReverbDecay={changeReverbDecay}
              changeReverbDuration={changeReverbDuration}
              mixReverbGain={mixReverbGain}
              initVals={{
                ...reverb1.buffer,
                mixGain: reverb1Dry.gain.value
              }}
            />
            <EffectController
              effectName='reverb II'
              initVals={reverb2InitVals}
              changeEffect={changeReverb2}
            />
            <MasterGain changeMasterGain={changeMasterGain} /> */}
          </div>
        </div>

        <div className={styles.mainGridSection4}>
          <div className={styles.keyboardContainer}>
            <Keyboard className={styles.keyboard} />
          </div>
          <Visualizer />
        </div>
      </div>
    </div>
  )
}

export default Basic
