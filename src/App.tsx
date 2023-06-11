import logo from './logo.svg';
import styles from './App.module.css';
import { Show, createSignal } from 'solid-js';
import { MIDIVal, MIDIValInput, MIDIValOutput } from "@midival/core";
import { PeakVisualiser } from './PeakVisualiser';
import { Inspector } from './Inspector';

interface PeakInterfaces {
  midiIn: MIDIValInput;
  midiOut: MIDIValOutput;
}

const getPeakMidiInterfaces = () => {
  const [state, setState] = createSignal<PeakInterfaces | null>(null)


    MIDIVal.connect()
    .then(access => {
      const peakInput = access.inputs.find(inp => inp.name === 'Peak')
      const peakOutput = access.outputs.find(inp => inp.name === 'Peak')

      if (peakInput && peakOutput) {
        setState({
          midiIn: new MIDIValInput(peakInput),
          midiOut: new MIDIValOutput(peakOutput)
        })
      }
    })





  return state
}


function App() {

  const peak = getPeakMidiInterfaces()

  return (
    <div class={styles.App}>
      {/* <header class={styles.header}>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header> */}
      <Inspector />
    </div>
  );
}

export default App;
