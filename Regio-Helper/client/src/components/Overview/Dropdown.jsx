import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ newestFirst, sortByDateAsc, sortByDateDesc }) => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <DropdownWrapper onMouseLeave={() => setIsMouseOver(false)}>
            <Button onMouseEnter={() => setIsMouseOver(true)}>
                {newestFirst ? "Neueste zuerst" : "Älteste zuerst"}
                <ArrowDown
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                    />
                </ArrowDown>
            </Button>
            <MenuWrapper isMouseOver={isMouseOver}>
                <MenuItem
                    onClick={() => {
                        setIsMouseOver(false);
                        sortByDateDesc();
                    }}
                >
                    Neueste zuerst
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setIsMouseOver(false);
                        sortByDateAsc();
                    }}
                >
                    Älteste zuerst
                </MenuItem>
            </MenuWrapper>
        </DropdownWrapper>
    );
};

export default Dropdown;

const DropdownWrapper = styled.div`
    position: relative;
    margin-right: 20px;
`;

const ArrowDown = styled.svg`
    width: 20px;
    margin-left: 10px;
    position: absolute;
    right: 20px;
`;

const Button = styled.button`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    padding: 20px;
    font-size: 18px;
    background: white;
    width: 250px;
    cursor: pointer;
    text-align: left;
`;

const MenuItem = styled(Button)`
    border-radius: 0px;

    &:hover {
        background: #f5f5f5;
    }

    &:first-child {
        border-radius: 6px 6px 0 0;
    }

    &:last-child {
        border-radius: 0 0 6px 6px;
    }

    &:not(:last-child) {
        border-bottom: 2px solid #f5f5f5;
    }
`;

const MenuWrapper = styled.div`
    border-radius: 6px;
    padding-top: 5px;
    position: absolute;
    box-shadow: 0px 10px 20px -10px #d2d2d2;
    z-index: 999;
    transition: all 0.2s;
    opacity: ${(props) => (props.isMouseOver ? "1" : "1")};
    transform-origin: top;
    transform: scaleY(${(props) => (props.isMouseOver ? "1" : "0") + ")"};
`;
