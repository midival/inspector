import styled from "@emotion/styled";
import React from "react";
import { Message } from "../../types/message";
import { midiNoteToString } from "../../utils/note";
import { extraValue } from "./utils";


const LastMessage = styled.div`
padding: 1em;
width: 500px;
margin: 0 auto 2em auto;
text-align: center;
background: rgba(0,0,0,0.4);
color: #EEE;
`;

const MessageType = styled.h3`
text-transform: uppercase;
`;

const BigValue = styled.div`
font-size: 7em;
font-weight: bold;
`;

const SecondaryValue = styled.div`
font-size: 4em;
`;

const bigValue = (message: Message) => {
    switch (message.type) {
        case "note_on": return midiNoteToString(message.data1);
        default: return message.data1;
    }
}

const ExtraValueComponent = styled.div`
    color: #DDD;
    font-size: 0.8em;
`;

const ExtraValue = ({ value }) => {
    if (!value) {
        return null;
    }

    return <ExtraValueComponent>{value}</ExtraValueComponent>
}

export const MidiMessageBox = ({ message }) => {
    return (
        <LastMessage>
            <MessageType>{message.type}</MessageType>
            <BigValue>{bigValue(message)}</BigValue>
            <ExtraValue value={extraValue(message)} />
            <SecondaryValue>{message.data2}</SecondaryValue>
            <div>Channel: {message.channel}</div>
        </LastMessage>
    )
}