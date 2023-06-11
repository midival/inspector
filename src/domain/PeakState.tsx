import { MIDIValInput } from "@midival/core";
import { Accessor, Setter, Signal, createSignal } from "solid-js";
import { midi } from "../utils/decorator";

const config = {
    cc: [
        { control: 5, parameter: 'glide', setter: 'setGlide'},
        { control: 9, parameter: 'osc1ModEnv2Depth', setter: 'setOsc1ModEnv2Depth'},
        { control: 86, parameter: 'ampEnvelopeAttack', setter: 'setAmpEvelopeAttack'}
    ]
} as const;

export class PeakState {


    public readonly glide: Accessor<number>
    private readonly setGlide: Setter<number>

    public readonly osc1ModEnv2Depth: Accessor<number>
    private readonly setOsc1ModEnv2Depth: Setter<number>

    public readonly ampEnvelopeAttack: Accessor<number>
    private readonly setAmpEvelopeAttack: Setter<number>

    constructor(midiIn: MIDIValInput) {

        const glide = createSignal<number>(0)
        this.glide = glide[0]
        this.setGlide = glide[1]

        const osc1mod2nv2d = createSignal<number>(0)
        this.osc1ModEnv2Depth = osc1mod2nv2d[0]
        this.setOsc1ModEnv2Depth = osc1mod2nv2d[1]

        const ampAt = createSignal<number>(0)
        this.ampEnvelopeAttack = ampAt[0]
        this.setAmpEvelopeAttack = ampAt[1]

        midiIn.onAllControlChange(cc => {
            const cfg = config.cc.find(p => p.control === cc.control)
            if (!cfg) {
                console.log(`[CC] ${cc.control} ${cc.value}`)
                return;
            }
            this[cfg.setter](cc.value)
        })


    }
}