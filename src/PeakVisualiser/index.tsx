import { MIDIValInput, MIDIValOutput } from "@midival/core"
import { ButtonControl } from "../components/Controls/Button"
import { EncoderControl } from "../components/Controls/Encoder"
import { PeakState } from "../domain/PeakState"

interface Props {
    input: MIDIValInput,
    output: MIDIValOutput
}
export const PeakVisualiser = ({ input, output }: Props) => {

    const peak = new PeakState(input);

    return <>
        Glide: {peak.glide()}<br/>
        osc1ModEnv2Depth: {peak.osc1ModEnv2Depth()}<br/>
        AmpEnvelopeAttack: {peak.ampEnvelopeAttack()}<br/>
    </>
}