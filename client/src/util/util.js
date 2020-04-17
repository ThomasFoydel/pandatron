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
  { note: 'c0', freq: 16.35 },
  { note: 'cSharp0', freq: 17.32 },
  { note: 'd0', freq: 18.35 },
  { note: 'dSharp0', freq: 19.45 },
  { note: 'e0', freq: 20.6 },
  { note: 'f0', freq: 21.83 },
  { note: 'fSharp0', freq: 23.12 },
  { note: 'g0', freq: 24.5 },
  { note: 'gSharp0', freq: 25.96 },
  { note: 'a0', freq: 27.5 },
  { note: 'aSharp0', freq: 29.14 },
  { note: 'b0', freq: 30.87 },

  { note: 'c1', freq: 32.7 },
  { note: 'cSharp1', freq: 34.65 },
  { note: 'd1', freq: 36.71 },
  { note: 'dSharp1', freq: 38.89 },
  { note: 'e1', freq: 41.2 },
  { note: 'f1', freq: 43.65 },
  { note: 'fSharp1', freq: 46.25 },
  { note: 'g1', freq: 49 },
  { note: 'gSharp1', freq: 51.91 },
  { note: 'a1', freq: 55 },
  { note: 'aSharp1', freq: 58.27 },
  { note: 'b1', freq: 61.74 },

  { note: 'c2', freq: 65.41 },
  { note: 'cSharp2', freq: 69.3 },
  { note: 'd2', freq: 73.42 },
  { note: 'dSharp2', freq: 77.78 },
  { note: 'e2', freq: 82.41 },
  { note: 'f2', freq: 87.31 },
  { note: 'fSharp2', freq: 92.5 },
  { note: 'g2', freq: 98 },
  { note: 'gSharp2', freq: 103.83 },
  { note: 'a2', freq: 110 },
  { note: 'aSharp2', freq: 116.54 },
  { note: 'b2', freq: 123.47 },

  { note: 'c3', freq: 130.81 },
  { note: 'cSharp3', freq: 138.59 },
  { note: 'd3', freq: 146.83 },
  { note: 'dSharp3', freq: 155.56 },
  { note: 'e3', freq: 164.81 },
  { note: 'f3', freq: 174.61 },
  { note: 'fSharp3', freq: 185 },
  { note: 'g3', freq: 196 },
  { note: 'gSharp3', freq: 207.65 },
  { note: 'a3', freq: 220 },
  { note: 'aSharp3', freq: 233.08 },
  { note: 'b3', freq: 246.94 },

  { note: 'c4', freq: 261.63 },
  { note: 'cSharp4', freq: 277.18 },
  { note: 'd4', freq: 293.66 },
  { note: 'dSharp4', freq: 311.13 },
  { note: 'e4', freq: 329.63 },
  { note: 'f4', freq: 349.23 },
  { note: 'fSharp4', freq: 369.99 },
  { note: 'g4', freq: 392 },
  { note: 'gSharp4', freq: 415.3 },
  { note: 'a4', freq: 440 },
  { note: 'aSharp4', freq: 466.16 },
  { note: 'b4', freq: 493.884 },

  { note: 'c5', freq: 523.25 },
  { note: 'cSharp5', freq: 554.37 },
  { note: 'd5', freq: 587.33 },
  { note: 'dSharp5', freq: 622.25 },
  { note: 'e5', freq: 659.26 },
  { note: 'f5', freq: 698.46 },
  { note: 'fSharp5', freq: 739.99 },
  { note: 'g5', freq: 783.99 },
  { note: 'gSharp5', freq: 830.61 },
  { note: 'a5', freq: 880 },
  { note: 'aSharp5', freq: 932.33 },
  { note: 'b5', freq: 987.77 },

  { note: 'c6', freq: 1046.5 },
  { note: 'cSharp6', freq: 1108.73 },
  { note: 'd6', freq: 1174.66 },
  { note: 'dSharp6', freq: 1244.51 },
  { note: 'e6', freq: 1318.51 },
  { note: 'f6', freq: 1396.91 },
  { note: 'fSharp6', freq: 1479.98 },
  { note: 'g6', freq: 1567.98 },
  { note: 'gSharp6', freq: 1661.221 },
  { note: 'a6', freq: 1760 },
  { note: 'aSharp6', freq: 1864.663 },
  { note: 'b6', freq: 1975.53 },

  { note: 'c7', freq: 2093 },
  { note: 'cSharp7', freq: 2217.46 },
  { note: 'd7', freq: 2349.32 },
  { note: 'dSharp7', freq: 2489.02 },
  { note: 'e7', freq: 2637.02 },
  { note: 'f7', freq: 2793.83 },
  { note: 'fSharp7', freq: 2959.96 },
  { note: 'g7', freq: 3135.96 },
  { note: 'gSharp7', freq: 3322.44 },
  { note: 'a7', freq: 3520 },
  { note: 'aSharp7', freq: 3729.31 },
  { note: 'b7', freq: 3951.07 },

  { note: 'c8', freq: 4186.01 },
  { note: 'cSharp8', freq: 4434.92 },
  { note: 'd8', freq: 4698.63 },
  { note: 'dSharp8', freq: 4978.03 },
  { note: 'e8', freq: 5274.04 },
  { note: 'f8', freq: 5587.65 },
  { note: 'fSharp8', freq: 5919.91 },
  { note: 'g8', freq: 6271.93 },
  { note: 'gSharp8', freq: 6644.88 },
  { note: 'a8', freq: 7040 },
  { note: 'aSharp8', freq: 7458.62 },
  { note: 'b8', freq: 7902.13 },
];

export const calcFreq = (frequency, offset) => {
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
