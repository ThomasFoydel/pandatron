export default class oscClass {
  constructor(context, type, frequency, envelope, connection) {
    this.context = context;
    this.osc = this.context.createOscillator();
    this.osc.start();
    this.gateGain = this.context.createGain();
    this.gateGain.gain.value = 0;
    this.osc.type = type;
    this.osc.connect(this.gateGain);
    this.gateGain.connect(connection);
    this.osc.frequency.value = frequency;

    this.envelope = envelope
      ? envelope
      : {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.6,
          release: 0.1,
        };
    this.easing = 0.006;
    this.start();
  }
  start() {
    let { currentTime } = this.context;
    this.gateGain.gain.cancelScheduledValues(currentTime);
    this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
    this.gateGain.gain.linearRampToValueAtTime(
      1,
      currentTime + this.envelope.attack + this.easing
    );
    this.gateGain.gain.linearRampToValueAtTime(
      this.envelope.sustain,
      currentTime + this.envelope.attack + this.envelope.decay + this.easing
    );
  }
  stop() {
    let { currentTime } = this.context;
    this.gateGain.gain.cancelScheduledValues(currentTime);
    this.gateGain.gain.linearRampToValueAtTime(
      0,
      currentTime + this.envelope.release + this.easing
    );
    setTimeout(() => {
      this.osc.disconnect();
    }, 10000);
  }
}
