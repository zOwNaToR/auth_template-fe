import styled from 'styled-components'

interface InputProps {
    fullWidth?: boolean;
    isError?: boolean;
}

export const Input = styled.input<InputProps>`
    border: 1px #ddd solid;
    border-radius: 4px;
    padding: 5px 10px;
    height: 40px;

    &:focus,
    &:active {
        outline: none;
    }

    ${(props) => (props.fullWidth ? "width: 100%;" : "")}
    ${(props) => (props.readOnly ? "background-color: transparent;" : "")}

    ${(props) => props.isError && "border-color: #DE1C22;"}
    ${(props) => props.isError && "color: #DE1C22;"}
`;

export default Input
