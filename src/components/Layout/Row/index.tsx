interface Props {
    class?: string;
    children?: any;
}
export const Row = ({ children, class: classX }: Props) => {
    return <div class={classX}>{ children }</div>
}