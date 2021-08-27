const notesOrder = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
];

export const midiNoteToString = (n: number): string => {
    const octave = Math.floor(n / 12);
    return notesOrder[n % 12] + octave.toString();
}