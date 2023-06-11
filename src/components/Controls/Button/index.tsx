import style from './style.module.css'
interface Props {
    title: string;
    isActive: boolean; // FIXME: probably change to signal
}
export const ButtonControl = ({ title, isActive }: Props) => {

    return <span class={style.buttonContainer}>
        <span class={style.buttonTitle}>{title}</span>
        <span class={`${style.button} ${isActive ? style.active : ''}`}></span>
    </span>
}