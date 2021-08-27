import { IMIDIInput } from "@midival/core";
import React, { useEffect } from "react";

interface Props {
    inputs: IMIDIInput[],
    onChange: (input: IMIDIInput) => void
}

export const MidiInputs = ({ inputs, onChange }: Props) => {
    useEffect(() => {
        onChange(inputs[0]);
    }, []);
    
    return (
        <select onChange={(e) => onChange(inputs.find(input => input.id === e.target.value))}>
            {inputs.map((input) => 
            <option key={input.id} value={input.id}>{input.name}</option>
            )}
        </select>
    )
}