// this part is built with logic from chord-finder by
// matt rice https://github.com/matthrice/chord-finder
// logic from chord-finder extracted, edited to not use
// jquery dom element selection to get note names,
// and put into a function that takes in
// an array of numbers and returns a chord name

var num_notes = 12;
/*
 * Search through given dictionary by property for key
 * Returns empty string if not found
 * Only meant for use on arrays of same length
 */
function searchSet(spacings, chords) {
  let equal;
  for (var property in chords) {
    if (chords.hasOwnProperty(property)) {
      equal = true;
      for (var k = 0; k < spacings.length; k++) {
        if (spacings[k] !== chords[property][k]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        return [property];
      }
    }
  }
  return '';
}

/*
 * Removes octave to avoid redundancy and simplify identification
 * Allows the user to use the whole keyboard but lets the program
 * only deal with 12 keys instead of 24
 */
function removeOctaves(notes) {
  var new_note = 0;
  var exists = false;
  var inversions = 0;
  for (var i = 0; i < notes.length; i++) {
    if (notes[i] > 11) {
      new_note = notes[i] - 12;
      for (var k = 0; k < notes.length; k++) {
        if (new_note === notes[k]) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        notes[i] = new_note;
        if (notes[i] < notes[0]) {
          inversions++;
        }
      } else {
        notes.splice(i, 1);
        i--; // reduce index to account for smaller array
      }
    }
    exists = false;
  }
  // notes sorted to account for out of order formations
  notes.sort(function (a, b) {
    return a - b;
  });
  notes.push(inversions);
  return notes;
}
/*
 * Inverts the chord based on its current inversion
 * Cmaj I -> Cmaj II etc.
 */
function invert(spacings) {
  var base = spacings[0];
  var total = 0;
  for (var i = 0; i < spacings.length; i++) {
    total += spacings[i];
  }
  spacings.shift();
  spacings.push(num_notes - total);
  return spacings;
}

/*
 * Finds chord by first reducing notes to an array of spacings between notes
 */
function findSpacings(positions) {
  var spacings = [];
  for (var i = 1; i < positions.length; i++) {
    spacings.push(positions[i] - positions[i - 1]);
  }
  return spacings;
}

var chords1 = {
  '8': [],
  mi2: [1],
  maj2: [2],
  mi3: [3],
  maj3: [4],
  '4': [5],
  aug4: [6],
  '5': [7],
  mi6: [8],
  maj6: [9],
  mi7: [10],
  maj7: [11],
};
var chords2 = {
  major: [4, 3],
  minor: [3, 4],
  dim: [3, 3],
  sus4: [5, 2],
  maj7: [4, 7],
  aug: [4, 4],
};
var chords3 = {
  '7': [4, 3, 3],
  maj7: [4, 3, 4],
  mi7: [3, 4, 3],
  maj6: [4, 3, 2],
  dim7: [3, 3, 3],
  '7♭5': [4, 2, 10],
  'mi7♭5': [3, 3, 4],
  'dim maj7': [3, 3, 5],
  'mi maj7': [3, 4, 4],
  'aug 7': [4, 4, 3],
  'mi aug7': [4, 4, 2],
  'add 9': [3, 4, 7],
};

const notes = [
  'C',
  'D♭',
  'D',
  'E♭',
  'E',
  'F',
  'G♭',
  'G',
  'A♭',
  'A',
  'B♭',
  'B',
  'C',
  'D♭',
  'D',
  'E♭',
  'E',
  'F',
  'G♭',
  'G',
  'A♭',
  'A',
  'B♭',
  'B',
];

// expects an array of numbers representing notes,
// example: [0, 3, 7] = C Minor
// example: [0, 3, 7, 11] = C mi maj7
// outputs chord name

const chordAnalyzer = (positionsInput) => {
  let positions = [...positionsInput];

  //   let positions = [];
  let spacings = [];
  let root_note = '';
  let key_location = '';
  let formation = [];
  let num_inversions = 0;
  let exists = false;
  let chordName;

  if (positions.length === 1) {
    let root_note = notes[positions[0]];
    return root_note;
  } else if (positions.length > 1) {
    // removes octaves and redundancies and identifies formation
    positions = removeOctaves(positions);
    num_inversions = positions[positions.length - 1];
    positions.pop();
    spacings = findSpacings(positions);
    // if chord is a perfect octave
    if (spacings.length === 0) {
      key_location = positions[0] + 1;
      const root_note = notes[positions[0]];
      chordName = root_note + ' ' + '8';
    }
    // when spacings exist (not an octave)
    // should prioritize initial base note, invert spacings until positions[0] is on bottom
    else {
      for (var k = 0; k < num_inversions; k++) {
        spacings = invert(spacings);
      }
      for (var i = 0; i < spacings.length + 1; i++) {
        switch (spacings.length) {
          case 1:
            formation = searchSet(spacings, chords1);
            break;
          case 2:
            formation = searchSet(spacings, chords2);
            break;
          case 3:
            formation = searchSet(spacings, chords3);
            break;
          default:
            formation = [];
        }
        if (formation.length !== 0) {
          // because of initial inversions, total inversions may be greater than
          // size of the positions array. Because inversions repeat themselves
          // modulo of the array length will give correct key location

          key_location = positions[num_inversions % positions.length];
          const root_note = notes[key_location];
          exists = true;
          chordName = root_note + ' ' + formation[0];
        }
        spacings = invert(spacings);
        num_inversions++;
      }
      // ensures the chord exists before finding root note
      if (!exists) {
        chordName = 'no matches found';
      }
      exists = false;
    }
  }
  formation = [];
  positions.length = 0;
  num_inversions = 0;

  return chordName;
};

export default chordAnalyzer;
