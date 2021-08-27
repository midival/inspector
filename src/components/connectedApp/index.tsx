import styled from "@emotion/styled";
import { IMIDIAccess, IMIDIInput, MIDIValInput } from "@midival/core";
import React, { useState } from "react";
import { Header } from "../header";
import { InputLog } from "../inputLog";
import { MidiInputs } from "../midiInputsList";
import { InfoBox } from "../styled/InfoBox";

interface Props {
    connection: IMIDIAccess
};

export const ConnectedApp = ({ connection }: Props) => {

    const [midiInput, setMidiInput] = useState<IMIDIInput>(null);

    return (<div>
            <Header inputs={connection.inputs} onInputChange={setMidiInput} />
            { midiInput ? (<InputLog input={midiInput} />) : <InfoBox>Select input first</InfoBox>}
    </div>)
}