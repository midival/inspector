import style from './style.module.css';

interface Props {
    title: string;
    value: number;
}
export const EncoderControl = ({  title, value}: Props) => {
    return <span>
        <span>{title}</span>
        <div class={style.encoder} style={{ '--rot-val': value}}><span class={style.value}>{value}</span></div>
    </span>
}