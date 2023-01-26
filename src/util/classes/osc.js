export default class oscClass {
  constructor(
    context,
    type,
    calculatedFrequency,
    detune,
    envelope,
    connection,
    initialFreq
  ) {
    this.context = context
    this.initialFreq = initialFreq
    this.osc = this.context.createOscillator()
    this.osc.start()
    this.osc.detune.setValueAtTime(detune, this.context.currentTime)
    this.osc.type = type
    this.osc.frequency.value = calculatedFrequency
    this.gateGain = this.context.createGain()
    this.gateGain.gain.value = 0
    this.osc.connect(this.gateGain)
    this.gateGain.connect(connection)

    this.envelope = envelope
      ? envelope
      : {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.6,
          release: 0.1
        }
    this.easing = 0.006
    this.start()
  }
  start() {
    let { currentTime } = this.context
    this.gateGain.gain.cancelScheduledValues(currentTime)
    this.gateGain.gain.setValueAtTime(0, currentTime + this.easing)
    this.gateGain.gain.linearRampToValueAtTime(
      1,
      currentTime + this.envelope.attack + this.easing
    )
    this.gateGain.gain.linearRampToValueAtTime(
      this.envelope.sustain,
      currentTime + this.envelope.attack + this.envelope.decay + this.easing
    )
  }
  stop() {
    let { currentTime } = this.context
    this.gateGain.gain.cancelScheduledValues(currentTime)
    this.gateGain.gain.setTargetAtTime(
      0,
      currentTime,
      this.envelope.release + this.easing
    )
    setTimeout(() => {
      this.osc.disconnect()
    }, 10000)
  }
}
