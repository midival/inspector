import styled from "@emotion/styled";
import { IMIDIInput } from "@midival/core";
import Logo from "url:./logo.png";
import { MidiInputs } from "../midiInputsList";

interface Props {
    onInputChange: (input: IMIDIInput) => void;
    inputs: IMIDIInput[]
}

const HeaderStyled = styled.header`
    margin: 1em 0;
    img {
        width: 200px;
        padding-right: 0.5em;
    }
    display: flex;
    align-content: center;
`;

const HeaderLogo = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 45px;
    margin-right: auto;
    align-self: center;
    align-content: center;
    display: flex;
    > * {
        align-self: center;
    }
`;

const InputList = styled.div`
    align-self: center;
    select {
        padding: 0.5em;
        background: transparent;
        border: 1px solid #FFF;
        color: #FFF;
        font-size: 20px;
        margin-left: 0.5em;
        font-family: "Roboto Condensed";
        border-radius: 4px;
    }
`;

export const Header = ({ onInputChange, inputs }: Props) => {
    return (
        <HeaderStyled>
            <HeaderLogo>
                <img src={Logo} />
                <span>Inspector</span>
            </HeaderLogo>
            <InputList>
            <span>INPUT</span>
            <MidiInputs inputs={inputs} onChange={onInputChange} />
            </InputList>
        </HeaderStyled>
    )
}