import { ControlChangeToReadableName } from "@midival/constants";
import { Message } from "../../types/message";
import { midiNoteToString } from "../../utils/note";

export const extraValue = (message: Message) => {
    switch (message.type) {
        case "control_change": return ControlChangeToReadableName[message.data1];
        default: return null;
    }
}

export const extraValueForTable = (message: Message) => {
    switch (message.type) {
        case "control_change": return ControlChangeToReadableName[message.data1];
        case "note_on": return midiNoteToString(message.data1);
        default: return null;
    }
}