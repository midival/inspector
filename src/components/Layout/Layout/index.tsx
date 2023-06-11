import style from './style.module.css';

interface Props {
    direction?: 'row' | 'column';
    children: any;
}
export const Layout = ({ children, direction }: Props) => {
    return <div class={`${style.layout} ${direction === 'column' ? style.layoutColumn : ''}`}>{children}</div>
}