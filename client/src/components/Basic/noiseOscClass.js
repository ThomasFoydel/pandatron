import { whiteNoise, pinkNoise, brownNoise } from '../../util/util';

export default class oscClass {
  constructor(context, type, envelope, connection, initialFreq, volume) {
    this.context = context;
    this.initialFreq = initialFreq;
    this.type = type;

    this.gateGain = this.context.createGain();
    this.gateGain.gain.value = 0;

    this.modGain = this.context.createGain();
    this.modGain.gain.value = volume;

    this.gateGain.connect(this.modGain);
    this.modGain.connect(connection);

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
    if (this.type === 'white') {
      this.noise = whiteNoise(this.context);
    } else if (this.type === 'brown') {
      this.noise = brownNoise(this.context);
    } else if (this.type === 'pink') {
      this.noise = pinkNoise(this.context);
    }
    this.noise.connect(this.gateGain);
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
      this.noise.disconnect();
      this.gateGain.disconnect();
    }, 10000);
  }
}
