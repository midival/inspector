import { MIDIValInput } from "@midival/core"
import { For, createEffect, createSignal } from "solid-js"
import { MIDIInSelector } from "../components/MIDIInSelector";
import { Layout } from "../components/Layout/Layout";
import { Row } from "../components/Layout/Row";
import style from "./style.module.css";
import midivalLogo from "../assets/midival-logo.svg";
import { MessageType } from "../domain/type";
import { MessageTypeBadge } from "../components/MessageTypeBadge";

interface Message {
    type: MessageType
    readable: string;
    data1: number;
    data2: number;
    channel: number;
}

interface RowProps {
    message: Message
}

const TableRow = ({ message }: RowProps) => {
    return <tr>
        <td><MessageTypeBadge messageType={message.type} /></td>
        <td>{message.data1}</td>
        <td>{message.data2}</td>
        <td>{message.channel}</td>
    </tr>
}


export const Inspector = ({ }) => {

    const [midiIn, setMIDIIn] = createSignal<MIDIValInput | null>(null);

    const [messages, setMessages] = createSignal<Message[]>([])

    const addMessage = (message: Message) => {
        setMessages([message, ...messages()])
    }

    createEffect(() => {
        const midi = midiIn()
        if (!midi) {
            return;
        }

        midi.onAllNoteOn(note => {
            addMessage({
                type: 'noteOn',
                channel: note.channel,
                data1: note.data1,
                data2: note.data2,
                readable: `[NoteOn] ${note.note} ${note.velocity}`
            })
        })

        midi.onAllControlChange(cc => {
            addMessage({
                type: 'CC',
                channel: cc.channel,
                data1: cc.control,
                data2: cc.value,
                readable: `[CC] ${cc.control} (${cc.value})`
            })
        })

        midi.onChannelPressure(message => {
            addMessage({
                type: 'ChannelPressure',
                channel: message.channel,
                data1: message.data1,
                data2: message.data2,
                readable: `[Pressure] ${message.data1} ${message.data2}`
            })
        })

        midi.onAllNoteOff(note => {
            addMessage({
                type: 'noteOff',
                channel: note.channel,
                data1: note.data1,
                data2: note.data2,
                readable: `[NoteOff] ${note.note} ${note.velocity}`
            })
        })


        return () => {
            console.log('Change ?')
        }
    })

    return <Layout direction="column">
        <Layout>
            <Row class={style.logoRow}>
                <img src={midivalLogo} class={style.logo} />
                INSPECT
            </Row>
            <Row>
                <MIDIInSelector onSelect={setMIDIIn} />
            </Row>
        </Layout>
        <Row class={style.mainRow}>
            <table class={style.inspectTable}>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Data 1</th>
                    <th>Data 2</th>
                    <th>Channel</th>
                </tr>
                </thead>
                <tbody>
                <For each={messages()}>
                    {message => <TableRow message={message} />}
                </For>
                </tbody>
            </table>
        </Row>
    </Layout>
}