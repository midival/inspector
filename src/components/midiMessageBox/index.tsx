import styled from "@emotion/styled";
import React from "react";
import { Message } from "../../types/message";
import { midiNoteToString } from "../../utils/note";


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

export const MidiMessageBox = ({ message }) => {
    return (
        <LastMessage>
            <MessageType>{message.type}</MessageType>
            <BigValue>{bigValue(message)}</BigValue>
            <SecondaryValue>{message.data2}</SecondaryValue>
            <div>Channel: {message.channel}</div>
        </LastMessage>
    )
}