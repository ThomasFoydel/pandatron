import React from 'react'
import Pizzicato from 'pizzicato'
import {
  calcFreq,
  findWithAttr,
  impulseResponse,
  makeDistortionCurve,
  noteFreqs,
} from '../util/util'
import oscClass from '../util/classes/osc'
import noiseOscClass from '../util/classes/noise'
import chordAnalyzer from '../util/chordAnalyzer'

const CTX = React.createContext()
const actx = Pizzicato.context

let analyzer

let nodes = []
let notesForChordAnalysis = []

const initialValues = {
  filter1: {
    type: 'highpass',
    dryWet: 1,
    gain: 1,
    Q: 0,
    frequency: 1000,
  },
  filter1WetGain: 1,
  filter1DryGain: 0,
  distortion2Gain: 0,
  quadrafuzz: {
    lowGain: 0.6,
    midLowGain: 0.8,
    midHighGain: 0.5,
    highGain: 0.6,
    mix: 0,
  },
  quadrafuzzDryGain: 1,
  quadrafuzzWetGain: 0,
  flanger: {
    time: 0.45,
    speed: 0.2,
    depth: 0.1,
    feedback: 0.1,
    mix: 0,
  },
  ringModulator: {
    speed: 10,
    distortion: 4,
    mix: 0,
  },
  pingPongDelay: {
    feedback: 0.2,
    time: 0.4,
    mix: 0,
  },
  delay1: 5.0,
  delay1Dry: 1,
  delay1Wet: 0,
  reverb1Dry: 1,
  reverb1Wet: 0,
  reverb1: {
    duration: 4,
    decay: 4,
    reversed: false,
  },
  reverb2: {
    time: 1,
    decay: 0.8,
    reverse: true,
    mix: 0,
  },
  lfo1Wet: 0,
  lfo1Dry: 1,

  envelope: {
    attack: 0.0,
    decay: 1,
    sustain: 1,
    release: 0.3,
  },

  wavetable1: 'sawtooth',
  wavetable2: 'sine',
  subOscType: 'sine',
  noiseType: 'white',

  osc1Detune: 0,
  osc2Detune: 0,
  osc1OctaveOffset: 0,
  osc2OctaveOffset: 0,
  subOscOctaveOffset: 0,

  noiseGainAmount: 0,

  oscMixGain1: 0.5,
  oscMixGain2: 0.5,

  oscGain1: 0.1,
  oscGain2: 0.1,
  subGain: 0.1,
  distortion1: 0,
  dist1WetGain: 0,
  dist1DryGain: 1,

  lowPassFilter: 0,
  lfo1OscFreq: 0,
  chordName: '',
  masterGain: 1,
}

const oscGain1 = actx.createGain()
const oscGain2 = actx.createGain()
oscGain1.gain.value = initialValues.oscGain1
oscGain2.gain.value = initialValues.oscGain2
const oscMixGain1 = actx.createGain()
const oscMixGain2 = actx.createGain()
oscMixGain1.gain.value = initialValues.oscMixGain1
oscMixGain2.gain.value = initialValues.oscMixGain2

const oscMasterGain1 = actx.createGain()
const noiseGain = actx.createGain()
const subGain = actx.createGain()
subGain.gain.value = initialValues.subGain
const sourcesGain = actx.createGain()

const subFilter = actx.createBiquadFilter()

const distortion1 = actx.createWaveShaper()
distortion1.curve = makeDistortionCurve(initialValues.distortion1, actx)

const dist1WetGain = actx.createGain()
const dist1DryGain = actx.createGain()
dist1WetGain.gain.value = initialValues.dist1WetGain
dist1DryGain.gain.value = initialValues.dist1DryGain
const distortion1MixedGain = actx.createGain()

const filter1 = actx.createBiquadFilter()
filter1.type = initialValues.filter1.type
filter1.dryWet = initialValues.filter1.filter1WetGain
filter1.gain.setValueAtTime(initialValues.filter1.gain, actx.currentTime)

const filter1WetGain = actx.createGain()
const filter1DryGain = actx.createGain()
filter1WetGain.gain.value = initialValues.filter1WetGain
filter1DryGain.gain.value = initialValues.filter1DryGain
const filter1MixedGain = actx.createGain()

const distortion2 = new Pizzicato.Effects.Distortion()
distortion2.gain = initialValues.distortion2Gain

const quadrafuzz = new Pizzicato.Effects.Quadrafuzz(initialValues.quadrafuzz)
quadrafuzz.dryGainNode.gain.value = initialValues.quadrafuzzDryGain
quadrafuzz.wetGainNode.gain.value = initialValues.quadrafuzzWetGain

const flanger = new Pizzicato.Effects.Flanger(initialValues.flanger)

const ringModulator = new Pizzicato.Effects.RingModulator(initialValues.ringModulator)

const pingPongDelay = new Pizzicato.Effects.PingPongDelay(initialValues.pingPongDelay)

const delay1 = actx.createDelay(initialValues.delay1)
const delay1Dry = actx.createGain()
const delay1Wet = actx.createGain()
const delay1Combined = actx.createGain()
delay1Dry.gain.value = initialValues.delay1Dry
delay1Wet.gain.value = initialValues.delay1Wet

const reverb1Wet = actx.createGain()
const reverb1Dry = actx.createGain()
reverb1Wet.gain.value = initialValues.reverb1Wet
reverb1Dry.gain.value = initialValues.reverb1Dry
const reverbJoinGain = actx.createGain()
const reverb1 = actx.createConvolver()
const impulseBuffer = impulseResponse(
  initialValues.reverb1.duration,
  initialValues.reverb1.decay / 10,
  initialValues.reverb1.reversed,
  actx
)
reverb1.buffer = impulseBuffer

const reverb2 = new Pizzicato.Effects.Reverb({
  ...initialValues.reverb2,
  decay: initialValues.reverb2.decay / 2,
})

const limiter = new Pizzicato.Effects.Compressor({
  threshold: -24,
  ratio: 12,
})

const lfo1Osc = actx.createOscillator()
const lfo1 = actx.createGain()
const lowPassFilter = actx.createBiquadFilter()
const lfo1Wet = actx.createGain()
const lfo1Dry = actx.createGain()

lfo1Wet.gain.value = initialValues.lfo1Wet
lfo1Dry.gain.value = initialValues.lfo1Dry
const lfo1Combined = actx.createGain()

let lfo1Started = false
lfo1Osc.connect(lfo1)
lfo1.connect(lfo1Wet.gain)

const connectorGain = actx.createGain()

const masterGain = actx.createGain()

analyzer = actx.createAnalyser()
analyzer.fftSize = 2048 // 1024; // 512; // 256; // 32 64 128 256 512 1024 2048 4096 8192 16384 32768

oscGain1.connect(oscMixGain1)
oscGain2.connect(oscMixGain2)
oscMixGain1.connect(oscMasterGain1)
oscMixGain2.connect(oscMasterGain1)
oscMasterGain1.connect(sourcesGain)
noiseGain.connect(sourcesGain)

sourcesGain.connect(distortion1)
sourcesGain.connect(dist1DryGain)
distortion1.connect(dist1WetGain)
dist1WetGain.connect(distortion1MixedGain)
dist1DryGain.connect(distortion1MixedGain)
distortion1MixedGain.connect(distortion2)

distortion2.connect(quadrafuzz)

quadrafuzz.connect(filter1)
quadrafuzz.connect(filter1DryGain)

filter1.connect(filter1WetGain)
filter1WetGain.connect(filter1MixedGain)
filter1DryGain.connect(filter1MixedGain)
filter1MixedGain.connect(flanger)

flanger.connect(ringModulator)

ringModulator.connect(delay1)
ringModulator.connect(delay1Dry)

delay1.connect(delay1Wet)
delay1Wet.connect(delay1Combined)
delay1Dry.connect(delay1Combined)
delay1Combined.connect(pingPongDelay)

pingPongDelay.connect(reverb1)
pingPongDelay.connect(reverb1Dry)

reverb1.connect(reverb1Wet)
reverb1Dry.connect(reverbJoinGain)
reverb1Wet.connect(reverbJoinGain)
reverbJoinGain.connect(reverb2)
reverb2.connect(connectorGain)

subGain.connect(subFilter)
subFilter.connect(connectorGain)

connectorGain.connect(lowPassFilter)
connectorGain.connect(lfo1Dry)

lowPassFilter.connect(lfo1Wet)
lfo1Wet.connect(lfo1Combined)
lfo1Dry.connect(lfo1Combined)
lfo1Combined.connect(masterGain)
masterGain.connect(analyzer)
masterGain.connect(limiter)
limiter.connect(actx.destination)

const changePizzicatoEffect = (effect, prop, val) => {
  if (prop === 'mix') {
    effect.dryGainNode.gain.setValueAtTime(1 - val, actx.currentTime)
    effect.wetGainNode.gain.setValueAtTime(val, actx.currentTime)
  } else {
    effect[prop] = val
  }
}

function reducer(state, action) {
  let { payload } = action
  let { prop, value } = payload ? payload : {}
  switch (action.type) {
    case 'changeFilter1Type': {
      filter1.type = value
      return { ...state, filter1: { ...state.filter1, type: value } }
    }

    case 'changeFilter1Freq': {
      filter1.frequency.setValueAtTime(value, actx.currentTime)
      return { ...state, filter1: { ...state.filter1, frequency: value } }
    }
    case 'changeFilter1Q': {
      filter1.Q.setValueAtTime(value, actx.currentTime)
      return { ...state, filter1: { ...state.filter1, Q: value } }
    }

    case 'changeFilter1Mix': {
      const num = +value
      const val = num.toFixed(2)
      const newDryVal = ((100 - val) / 100).toFixed(2)
      filter1.dryWet = newDryVal
      const newWetVal = (val / 100).toFixed(2)
      filter1DryGain.gain.setValueAtTime(newDryVal, actx.currentTime)
      filter1WetGain.gain.setValueAtTime(newWetVal, actx.currentTime)
      return {
        ...state,
        filter1DryGain: newDryVal,
        filter1WetGain: newWetVal,
      }
    }

    case 'changeFilter1Gain': {
      const newVal = +value / 20
      filter1.gain.setValueAtTime(newVal, actx.currentTime)
      return { ...state, filter1: { ...state.filter1, gain: newVal } }
    }

    case 'detuneOsc1': {
      return { ...state, osc1Detune: value }
    }
    case 'detuneOsc2': {
      return { ...state, osc2Detune: value }
    }

    case 'mixGain': {
      const newOsc1Gain = (100 - value) / 100
      const newOsc2Gain = value / 100
      oscMixGain1.gain.setValueAtTime(newOsc1Gain, actx.currentTime)
      oscMixGain2.gain.setValueAtTime(newOsc2Gain, actx.currentTime)
      return {
        ...state,
        oscMixGain1: newOsc1Gain,
        oscMixGain2: newOsc2Gain,
      }
    }

    case 'mixReverbGain': {
      const newDryVal = 1 - value
      const newWetVal = value
      reverb1Dry.gain.setValueAtTime(newDryVal.toFixed(2), actx.currentTime)
      reverb1Wet.gain.linearRampToValueAtTime(newWetVal, actx.currentTime)
      return { ...state, reverb1Dry: newDryVal, reverb1Wet: newWetVal }
    }

    case 'changeWaveTable1': {
      return { ...state, wavetable1: value }
    }

    case 'changeWaveTable2': {
      return { ...state, wavetable2: value }
    }

    case 'changeWaveTableSub': {
      return { ...state, subOscType: value }
    }

    case 'changeNoiseType': {
      return { ...state, noiseType: value }
    }

    case 'changeOctaveOsc1': {
      return { ...state, osc1OctaveOffset: value }
    }

    case 'changeOctaveOsc2': {
      return { ...state, osc2OctaveOffset: value }
    }

    case 'changeOctaveSub': {
      return { ...state, subOscOctaveOffset: value }
    }

    case 'changeOsc1Gain': {
      oscGain1.gain.value = value
      return { ...state, oscGain1: value }
    }
    case 'changeOsc2Gain': {
      oscGain2.gain.value = value
      return { ...state, oscGain2: value }
    }

    case 'changeSubGain': {
      subGain.gain.value = value
      return { ...state, subGain: value }
    }

    case 'changeNoiseGain': {
      return { ...state, noiseGainAmount: value }
    }

    case 'changeDistortion1Amount': {
      distortion1.curve = makeDistortionCurve(value * 5, actx)
      return { ...state, distortion1: value }
    }

    case 'changeDistortion1Mix': {
      const newWet = value / 100
      const newDry = (100 - value) / 100
      dist1DryGain.gain.setValueAtTime(newDry, actx.currentTime)
      dist1WetGain.gain.setValueAtTime(newWet, actx.currentTime)
      return { ...state, dist1DryGain: newDry, dist1WetGain: newWet }
    }

    case 'changeReverbDecay': {
      const { durationVal, reverse } = reverb1.buffer
      const newBuffer = impulseResponse(durationVal, value / 10, reverse, actx)
      reverb1.buffer = newBuffer
      return { ...state, reverb1: { ...state.reverb1, decay: value } }
    }

    case 'changeReverbDuration': {
      const { decayVal, reverse } = reverb1.buffer
      const newBuffer = impulseResponse(value, decayVal, reverse, actx)
      reverb1.buffer = newBuffer
      return { ...state, reverb1: { ...state.reverb1, duration: value } }
    }

    case 'changeReverb1Reverse': {
      const { decayVal, durationVal } = reverb1.buffer
      const newBuffer = impulseResponse(durationVal, decayVal, value, actx)
      reverb1.buffer = newBuffer
      return { ...state, reverb1: { ...state.reverb1, reversed: value } }
    }

    case 'changeDelayTime': {
      delay1.delayTime.setValueAtTime(value.toFixed(1), actx.currentTime)
      return { ...state, delay1: value }
    }

    case 'changeDelayMix': {
      const num = +value
      const val = num.toFixed(2)
      const newDryVal = ((100 - val) / 100).toFixed(2)
      const newWetVal = (val / 100).toFixed(2)
      delay1.dryWet = newDryVal
      delay1Dry.gain.setValueAtTime(newDryVal, actx.currentTime)
      delay1Wet.gain.setValueAtTime(newWetVal, actx.currentTime)
      return { ...state, delay1Dry: newDryVal, delay1Wet: newWetVal }
    }

    case 'changeADSR': {
      const { newVal, aspect } = value
      return { ...state, envelope: { ...state.envelope, [aspect]: newVal } }
    }

    case 'changePizzicatoEffect': {
      const { effect, prop, val } = value
      if (prop === 'mix') {
        effect.dryGainNode.gain.setValueAtTime(1 - val, actx.currentTime)
        effect.wetGainNode.gain.setValueAtTime(val, actx.currentTime)
        return {
          ...state,
          [effect]: { ...state[effect], wet: val, dry: 1 - val },
        }
      } else {
        effect[prop] = val
        return { ...state, [effect]: { ...state[effect], [prop]: val } }
      }
    }

    case 'changeQuadrafuzz': {
      const { prop, val } = value
      changePizzicatoEffect(quadrafuzz, prop, val)
      return { ...state, quadrafuzz: { ...state.quadrafuzz, [prop]: val } }
    }

    case 'changeFlanger': {
      const { prop, val } = value
      changePizzicatoEffect(flanger, prop, val)
      return { ...state, flanger: { ...state.flanger, [prop]: val } }
    }

    case 'changeDistortion2Gain': {
      const { prop, val } = value
      changePizzicatoEffect(distortion2, prop, val)
      return { ...state, distortion2Gain: val }
    }

    case 'changeRingModulator': {
      const { prop, val } = value
      changePizzicatoEffect(ringModulator, prop, val)
      return {
        ...state,
        ringModulator: { ...state.ringModulator, [prop]: val },
      }
    }

    case 'changePingPongDelay': {
      const { prop, val } = value
      changePizzicatoEffect(pingPongDelay, prop, val)
      return {
        ...state,
        pingPongDelay: { ...state.pingPongDelay, [prop]: val },
      }
    }

    case 'changeReverb2': {
      const { prop, val } = value
      changePizzicatoEffect(reverb2, prop, prop === 'decay' ? val / 2 : val)
      return { ...state, reverb2: { ...state.reverb2, [prop]: val } }
    }

    case 'changeMouseLfo': {
      const newLowPassFreq = ((1 - y) * 18000).toFixed(2)
      const newLfo1OscFreq = (x * 12).toFixed(2)
      if (!lfo1Started) {
        lfo1Osc.start()
        lfo1Started = true
      }
      lowPassFilter.frequency.linearRampToValueAtTime(newLowPassFreq, actx.currentTime)
      lfo1Osc.frequency.linearRampToValueAtTime(newLfo1OscFreq, actx.currentTime)
      return {
        ...state,
        lowPassFilter: newLowPassFreq,
        lfo1OscFreq: newLfo1OscFreq,
      }
    }

    case 'toggleLfo1': {
      const now = actx.currentTime
      if (state.lfoIsActive) {
        // TURN OFF
        lfo1Dry.gain.exponentialRampToValueAtTime(1, now)
        lfo1Wet.gain.exponentialRampToValueAtTime(0.01, now)
        lfo1.gain.exponentialRampToValueAtTime(0.01, now)
        return { ...state, lfoIsActive: false }
      } else {
        // TURN ON
        lfo1Dry.gain.exponentialRampToValueAtTime(0.01, now)
        lfo1Wet.gain.exponentialRampToValueAtTime(1, now)
        lfo1.gain.exponentialRampToValueAtTime(1, now)
        return { ...state, lfoIsActive: true }
      }
    }

    case 'changeMasterGain': {
      if (value === 0) masterGain.gain.value = 0
      else masterGain.gain.exponentialRampToValueAtTime(value, actx.currentTime)
      return { ...state, masterGain: value }
    }

    case 'generateOsc': {
      const { freq, note } = value
      const {
        envelope,
        osc1OctaveOffset,
        osc2OctaveOffset,
        subOscOctaveOffset,
        noiseType,
        osc1Detune,
        wavetable1,
        osc2Detune,
        wavetable2,
        subOscType,
        noiseGainAmount,
      } = state

      const osc1Freq = calcFreq(freq, osc1OctaveOffset)
      const osc2Freq = calcFreq(freq, osc2OctaveOffset)
      const subOscFreq = calcFreq(freq, subOscOctaveOffset - 2)

      const noiseOsc = new noiseOscClass(
        actx,
        noiseType,
        envelope,
        noiseGain,
        freq,
        noiseGainAmount
      )

      const newOsc1 = new oscClass(actx, wavetable1, osc1Freq, osc1Detune, envelope, oscGain1, freq)

      const newOsc2 = new oscClass(actx, wavetable2, osc2Freq, osc2Detune, envelope, oscGain2, freq)

      const subOsc = new oscClass(actx, subOscType, subOscFreq, 0, envelope, subGain, freq)

      nodes.push(newOsc1, newOsc2, subOsc, noiseOsc)

      const noteIndex = findWithAttr(noteFreqs, 'note', note)
      // it's minus 48 because the keyboard is set to start on C4 instead of C0
      notesForChordAnalysis.push(noteIndex - 48)
      const chordName = chordAnalyzer(notesForChordAnalysis)
      return { ...state, chordName }
    }

    case 'killOsc': {
      const { freq, note } = value
      let new_nodes = []
      for (let i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].initialFreq) === Math.round(freq)) {
          nodes[i].stop(0)
        } else {
          new_nodes.push(nodes[i])
        }
      }
      nodes = new_nodes

      // CHORD ANALYSIS
      const noteIndex = findWithAttr(noteFreqs, 'note', note)
      const filteredNoteArray = notesForChordAnalysis.filter(
        // it's minus 48 because the keyboard is set to start on C4 instead of C0
        (item) => item !== noteIndex - 48
      )
      notesForChordAnalysis = [...filteredNoteArray]
      const chordName = chordAnalyzer(notesForChordAnalysis) || ''
      return { ...state, chordName }
    }

    default:
      console.error('REDUCER ERROR: action: ', action)
      return { ...state }
  }
}

const Store = ({ children }) => {
  const stateHook = React.useReducer(reducer, initialValues)
  return <CTX.Provider value={stateHook}>{children}</CTX.Provider>
}

export { CTX, analyzer }
export default Store
