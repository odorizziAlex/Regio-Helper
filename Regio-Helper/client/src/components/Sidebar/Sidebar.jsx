import React, { useState, useContext } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.svg";
import PlusCircleIcon from "../../assets/plus-circle-icon.svg";
import MenuItems from "../Sidebar/MenuItems";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import { UserContext } from "../../contexts/UserContext";

const Sidebar = ({userId}) => {
    const { users } = useContext(UserContext);
    const loggedInUser = users.find((user) => user.id === userId);

    const [isHighContrast, setIsHighContrast] = useState(false);

    return (
        <StyledSidebar>
            <LogoLink to="/">
                <StyledLogo src={Logo} />
            </LogoLink>
            <PrimaryButton to="/createRequest">
                <ButtonIcon src={PlusCircleIcon} />
                Gesuch erstellen
            </PrimaryButton>
            <MenuItems loggedInUser={loggedInUser}/>
            <BottomWrapper>
                <ContrastWrapper>
                    <Label>Kontrast ändern</Label>
                    <ContrastOption isHighContrast={isHighContrast}>
                        Normal
                    </ContrastOption>
                    <Toggle
                        onChange={setIsHighContrast}
                        checked={isHighContrast}
                    />
                    <ContrastOption isHighContrast={isHighContrast}>
                        Stark
                    </ContrastOption>
                </ContrastWrapper>
                <div>
                    <Label>Schriftgröße ändern</Label>
                    <FontButtonWrapper>
                        <FontButton small={true}>A</FontButton>
                        <FontButton small={false}>A</FontButton>
                    </FontButtonWrapper>
                </div>
            </BottomWrapper>
        </StyledSidebar>
    );
};

export default Sidebar;

const LogoLink = styled(Link)`
    margin-bottom: 50px;
`;

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 30px;
    z-index: 10;
`;

const StyledLogo = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;

const PrimaryButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 10px;
    width: 100%;
    background: var(--primary);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-bottom: 50px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

export const ButtonIcon = styled.img`
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 15px;
    margin-right: 15px;
`;

const BottomWrapper = styled.div`
    margin-top: auto;
`;

const Label = styled.p`
    color: var(--dark-grey);
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 5px;
`;

const FontButtonWrapper = styled.div`
    display: flex;
`;

const FontButton = styled.button`
    background: var(--light-grey);
    color: var(--dark-grey);
    border: 0;
    padding: 0px 30px;
    text-align: center;
    line-height: 1;
    height: 35px;
    font-size: ${(props) => (props.small ? "12px" : "18px")};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--dark-grey);
        color: white;
    }

    &:first-child {
        border-radius: 6px 0 0 6px;
        border-right: 2px solid var(--dark-grey);
    }

    &:last-child {
        border-radius: 0 6px 6px 0;
    }
`;

const ContrastWrapper = styled.div`
    margin-bottom: 20px;
`;

const ContrastOption = styled.span`
    display: inline-block;
    font-size: 14px;
    font-weight: 300;

    &:nth-child(2) {
        color: ${(props) =>
            props.isHighContrast ? "var(--dark-grey)" : "var(--black)"};
    }
    &:last-child {
        color: ${(props) =>
            !props.isHighContrast ? "var(--dark-grey)" : "var(--black)"};
    }
`;
