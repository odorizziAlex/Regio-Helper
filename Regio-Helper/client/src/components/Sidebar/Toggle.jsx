import React from "react";
import styled from "styled-components";

const Toggle = ({ checked, onChange }) => (
    <SwitchContainer>
        <HiddenSwitch checked={checked} onChange={() => onChange(!checked)} />
        <StyledSwitch checked={checked}>
            <StyledToggle checked={checked} />
        </StyledSwitch>
    </SwitchContainer>
);

export default Toggle;

/**
 * Styled Checkbox from https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
 */

const SwitchContainer = styled.label`
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin: 0 10px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenSwitch = styled.input.attrs({ type: "checkbox" })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledToggle = styled.div`
    position: absolute;
    top: 50%;
    right: 0px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--black);
    transition: all 150ms;
`;

const StyledSwitch = styled.div`
    display: inline-block;
    width: 50px;
    height: 25px;
    background: ${(props) =>
        props.checked ? "var(--light-grey)" : "var(--light-grey)"};
    border: ${(props) =>
        props.checked ? "2px solid transparent" : "2px solid transparent"};
    border-radius: 3px;
    transition: all 150ms;
    border-radius: 50px;
    position: relative;
    left: 0;
    ${StyledToggle} {
        transform: translate(
            ${(props) =>
                props.checked ? "0px, -50%" : "calc(100% - 46px), -50%"}
        );
    }
`;
