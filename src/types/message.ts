import { MidiMessage } from "@midival/core/dist/utils/MIDIMessageConvert";

export interface Message extends MidiMessage {
    time: number,
    type: MessageType,
};
export type MessageType = 'program_change' | 'control_change' | 'note_on';
