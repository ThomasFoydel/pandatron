export function makeDistortionCurve(amount, actx) {
  var k = typeof amount === 'number' ? amount : 0,
    n_samples = 256,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

export function impulseResponse(duration, decay, reverse, actx) {
  var sampleRate = actx.sampleRate;
  var length = sampleRate * duration;
  var impulse = actx.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2.0;
  for (var i = 0; i < length; i++) {
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  impulse.decayVal = decay;
  impulse.durationVal = duration;
  impulse.reverse = reverse;

  return impulse;
}

export const noteFreqs = [
  { note: 'C0', freq: 16.35 },
  { note: 'C#0', freq: 17.32 },
  { note: 'D0', freq: 18.35 },
  { note: 'D#0', freq: 19.45 },
  { note: 'E0', freq: 20.6 },
  { note: 'F0', freq: 21.83 },
  { note: 'F#0', freq: 23.12 },
  { note: 'G0', freq: 24.5 },
  { note: 'G#0', freq: 25.96 },
  { note: 'A0', freq: 27.5 },
  { note: 'A#0', freq: 29.14 },
  { note: 'B0', freq: 30.87 },

  { note: 'C1', freq: 32.7 },
  { note: 'C#1', freq: 34.65 },
  { note: 'D1', freq: 36.71 },
  { note: 'D#1', freq: 38.89 },
  { note: 'E1', freq: 41.2 },
  { note: 'F1', freq: 43.65 },
  { note: 'F#1', freq: 46.25 },
  { note: 'G1', freq: 49 },
  { note: 'G#1', freq: 51.91 },
  { note: 'A1', freq: 55 },
  { note: 'A#1', freq: 58.27 },
  { note: 'B1', freq: 61.74 },

  { note: 'C2', freq: 65.41 },
  { note: 'C#2', freq: 69.3 },
  { note: 'D2', freq: 73.42 },
  { note: 'D#2', freq: 77.78 },
  { note: 'E2', freq: 82.41 },
  { note: 'F2', freq: 87.31 },
  { note: 'F#2', freq: 92.5 },
  { note: 'G2', freq: 98 },
  { note: 'G#2', freq: 103.83 },
  { note: 'A2', freq: 110 },
  { note: 'A#2', freq: 116.54 },
  { note: 'B2', freq: 123.47 },

  { note: 'C3', freq: 130.81 },
  { note: 'C#3', freq: 138.59 },
  { note: 'D3', freq: 146.83 },
  { note: 'D#3', freq: 155.56 },
  { note: 'E3', freq: 164.81 },
  { note: 'F3', freq: 174.61 },
  { note: 'F#3', freq: 185 },
  { note: 'G3', freq: 196 },
  { note: 'G#3', freq: 207.65 },
  { note: 'A3', freq: 220 },
  { note: 'A#3', freq: 233.08 },
  { note: 'B3', freq: 246.94 },

  { note: 'C4', freq: 261.63 },
  { note: 'C#4', freq: 277.18 },
  { note: 'D4', freq: 293.66 },
  { note: 'D#4', freq: 311.13 },
  { note: 'E4', freq: 329.63 },
  { note: 'F4', freq: 349.23 },
  { note: 'F#4', freq: 369.99 },
  { note: 'G4', freq: 392 },
  { note: 'G#4', freq: 415.3 },
  { note: 'A4', freq: 440 },
  { note: 'A#4', freq: 466.16 },
  { note: 'B4', freq: 493.884 },

  { note: 'C5', freq: 523.25 },
  { note: 'C#5', freq: 554.37 },
  { note: 'D5', freq: 587.33 },
  { note: 'D#5', freq: 622.25 },
  { note: 'E5', freq: 659.26 },
  { note: 'F5', freq: 698.46 },
  { note: 'F#5', freq: 739.99 },
  { note: 'G5', freq: 783.99 },
  { note: 'G#5', freq: 830.61 },
  { note: 'A5', freq: 880 },
  { note: 'A#5', freq: 932.33 },
  { note: 'B5', freq: 987.77 },

  { note: 'C6', freq: 1046.5 },
  { note: 'C#6', freq: 1108.73 },
  { note: 'D6', freq: 1174.66 },
  { note: 'D#6', freq: 1244.51 },
  { note: 'E6', freq: 1318.51 },
  { note: 'F6', freq: 1396.91 },
  { note: 'F#6', freq: 1479.98 },
  { note: 'G6', freq: 1567.98 },
  { note: 'G#6', freq: 1661.221 },
  { note: 'A6', freq: 1760 },
  { note: 'A#6', freq: 1864.663 },
  { note: 'B6', freq: 1975.53 },

  { note: 'C7', freq: 2093 },
  { note: 'C#7', freq: 2217.46 },
  { note: 'D7', freq: 2349.32 },
  { note: 'D#7', freq: 2489.02 },
  { note: 'E7', freq: 2637.02 },
  { note: 'F7', freq: 2793.83 },
  { note: 'F#7', freq: 2959.96 },
  { note: 'G7', freq: 3135.96 },
  { note: 'G#7', freq: 3322.44 },
  { note: 'A7', freq: 3520 },
  { note: 'A#7', freq: 3729.31 },
  { note: 'B7', freq: 3951.07 },

  { note: 'C8', freq: 4186.01 },
  { note: 'C#8', freq: 4434.92 },
  { note: 'D8', freq: 4698.63 },
  { note: 'D#8', freq: 4978.03 },
  { note: 'E8', freq: 5274.04 },
  { note: 'F8', freq: 5587.65 },
  { note: 'F#8', freq: 5919.91 },
  { note: 'G8', freq: 6271.93 },
  { note: 'G#8', freq: 6644.88 },
  { note: 'A8', freq: 7040 },
  { note: 'A#8', freq: 7458.62 },
  { note: 'B8', freq: 7902.13 },
];

export function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

export const calcFreq = (frequency, offset) => {
  // console.log('freq!: ', frequency);
  let calculatedFrequency = frequency;
  let octaveOffset = offset * 12;

  if (offset !== 0) {
    const unshiftedIndex = noteFreqs.findIndex((note) => {
      return note.freq.toFixed(2) === frequency.toFixed(2);
    });
    const shiftedIndex = unshiftedIndex + octaveOffset;
    calculatedFrequency = noteFreqs[shiftedIndex].freq;
  }
  return calculatedFrequency;
};

var bufferSize = 4096;
export var brownNoise = function (audioContext) {
  var lastOut = 0.0;
  var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
  node.onaudioprocess = function (e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // (roughly) compensate for gain
    }
  };
  return node;
};

export var pinkNoise = function (audioContext) {
  var b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
  node.onaudioprocess = function (e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      var white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // (roughly) compensate for gain
      b6 = white * 0.115926;
    }
  };
  return node;
};

export var whiteNoise = function (audioContext) {
  var bufferSize = 2 * audioContext.sampleRate,
    noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    ),
    output = noiseBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  var whiteNoise = audioContext.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;
  whiteNoise.start(0);
  return whiteNoise;
};

/*
C4
 C0
 C#0
 D0
 D#0
 E0
 F0
 F#0
 G0
 G#0
 A0
 A#0
 B0
 C1
 C#1
 D1
 D#1
 E1
 F1
 F#1
 G1
 G#1
 A1
 A#1
 B1
 C2
 C#2
 D2
 D#2
 E2
 F2
 F#2
 G2
 G#2
 A2
 A#2
 B2
 C3
 C#3
 D3
 D#3
 E3
 F3
 F#3
 G3
 G#3
 A3
 A#3
 B3
 C4
 C#4
 D4
 D#4
 E4
 F4
 F#4
 G4
 G#4
 A4
 A#4
 B4
 C5
 C#5
 D5
 D#5
 E5
 F5
 F#5
 G5
 G#5
 A5
 A#5
 B5
 C6
 C#6
 D6
 D#6
 E6
 F6
 F#6
 G6
 G#6
 A6
 A#6
 B6
 C7
 C#7
 D7
 D#7
 E7
 F7
 F#7
 G7
 G#7
 A7
 A#7
 B7
 C8
 C#8
 D8
 D#8
 E8
 F8
 F#8
 G8
 G#8
 A8
 A#8
 B8
*/
