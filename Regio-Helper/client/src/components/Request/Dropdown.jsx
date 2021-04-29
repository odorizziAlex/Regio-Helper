import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({
    currentItem,
    setCurrentItem,
    options,
    isLight,
    padding,
    width,
}) => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <DropdownWrapper
            width={width}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <Button
                padding={padding}
                isLight={isLight}
                onMouseEnter={() => setIsMouseOver(true)}
            >
                {currentItem}
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
            <MenuWrapper width={width} isMouseOver={isMouseOver}>
                {options.map((item) => (
                    <MenuItem
                        padding={padding}
                        isLight={isLight}
                        key={item}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsMouseOver(false);
                            setCurrentItem(item);
                        }}
                    >
                        {item}
                    </MenuItem>
                ))}
            </MenuWrapper>
        </DropdownWrapper>
    );
};

export default Dropdown;

const DropdownWrapper = styled.div`
    position: relative;
    width: ${(props) => props.width};
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
    padding: ${(props) => props.padding};
    font-size: 18px;
    background: ${(props) => (props.isLight ? "white" : "var(--light-grey)")};
    width: 100%;
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
    opacity: ${(props) => (props.isMouseOver ? "1" : "0")};
    transform-origin: top;
    transform: scaleY(${(props) => (props.isMouseOver ? "1" : "0")});
    max-height: 300px;
    overflow-y: scroll;
    width: ${(props) => props.width};
`;
