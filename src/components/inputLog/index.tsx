import styled from "@emotion/styled";
import { IMIDIInput, MIDIValInput } from "@midival/core";
import { MidiMessage } from "@midival/core/dist/utils/MIDIMessageConvert";
import React, { useEffect, useState } from "react";
import { Message, MessageType } from "../../types/message";
import { ArrayWrapper } from "../../utils/arrayWrapper";
import { MidiMessageBox } from "../midiMessageBox";
import { extraValueForTable } from "../midiMessageBox/utils";
import { InfoBox } from "../styled/InfoBox";

interface Props {
    input: IMIDIInput,
}

const Table = styled.table`

    width: 100%;
    tbody tr:nth-child(2n) {
        background: rgba(255,255,255,0.1);
    }
    text-align: center;
    td {
        padding: 0.1em;
    }

`;


export const InputLog = ({ input }: Props) => {
    const [midi, setMidi] = useState<MIDIValInput>();
    const [messages, setMessages] = useState(new ArrayWrapper<Message>(10));
    const [data, setData] = useState<Message[]>([]);
    useEffect(() => {
        if (!input) {
            return;
        }
        let midi = new MIDIValInput(input);
        setMidi(midi);
        setMessages(new ArrayWrapper<Message>(10));
        setData([]);

        const setMessage = (type: MessageType) => (_, message: MidiMessage) => {
            setMessages(messages.push({...message, type, time: performance.now()}));
            setData(messages.data);
        };

        midi.onAllNoteOn(setMessage("note_on"));
        midi.onAllControlChange(setMessage("control_change"));
        midi.onAllProgramChange(setMessage("program_change"));
        return () => {
            midi.disconnect();
        }
    }, [input]);

    if (midi && data.length > 0) {
        return (
        <div>
            <MidiMessageBox message={data[0]} />
        <Table>
            <thead>
                <tr>
                    <th>Command</th>
                    <th>Command Readable</th>
                    <th>Channel</th>
                    <th>Data 1</th>
                    <th>Data 2</th>
                    <th>Extra</th>
                </tr>
            </thead>
            <tbody>
                {data.map(message => <tr key={message.time}>
                    <td>{message.command}</td>
                    <td>{message.type}</td>
                    <td>{message.channel}</td>
                    <td>{message.data1}</td>
                    <td>{message.data2}</td>
                    <td>{extraValueForTable(message)}</td>
                    </tr>)}
            </tbody>
        </Table>
        </div>
        );
    }

    return <InfoBox>Waiting for input</InfoBox>;
}