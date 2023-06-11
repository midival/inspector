import { MessageType } from "../../domain/type"
import style from "./style.module.css";

interface Props {
    messageType: MessageType
}

export const MessageTypeBadge = ({messageType}: Props) => {
    return <span class={style.messageType} data-type={messageType}>{messageType}</span>
}