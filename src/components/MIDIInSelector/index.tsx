import { IMIDIInput, MIDIVal, MIDIValInput } from "@midival/core"
import { Accessor, For, Setter, createEffect, createSignal } from "solid-js"

import style from "./style.module.css"

interface Props {
    onSelect: Setter<MIDIValInput>,
}

export const MIDIInSelector = ({ onSelect }: Props) => {
    const [inputs, setInputs] = createSignal<IMIDIInput[]>([])
    
    const [selected, setSelected] = createSignal<IMIDIInput | null>(null)

    MIDIVal.connect().then(access => {
        setTimeout(() => {
            setInputs(access.inputs.reverse())
            access.onInputConnected(() => {
                setInputs(access.inputs)
            })

            access.onInputDisconnected(() => {
                setInputs(access.inputs)
            })
        }, 100)
    })

    const onSelectField = (value: string) => {
        console.log(value);
        const v = inputs().find(inp => inp.id == value)
        if (v) {
            onSelect(new MIDIValInput(v))
            setSelected(v)
        }
    }

    createEffect(() => {
        if (!selected() && inputs().length) {
            onSelectField(inputs()[0].id)
        }
    })

    return <div class={style.selector}>
        <label>MIDI In</label>
        <select value={selected()?.id} onChange={v => onSelectField(v.target.value)}>
            <For each={inputs()}>
                {(input => <option value={input.id}>{input.name}</option>)}
            </For>
        </select>
    </div>
}