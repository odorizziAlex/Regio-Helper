import React from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.svg";

const Auth = ({ children }) => {
    return (
        <StyledAuth>
            <StyledLogo src={Logo} />
            {children}
            <LinkWrapper>
                <Anchor>Impressum</Anchor>
                <Anchor>Datenschutz</Anchor>
            </LinkWrapper>
        </StyledAuth>
    );
};

export default Auth;

const StyledAuth = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    padding: 60px;
`;

const StyledLogo = styled.img`
    max-width: 280px;
`;

const LinkWrapper = styled.div``;

const Anchor = styled.a`
    color: var(--dark-grey);
    font-weight: 300;
    font-size: 1rem;

    &:first-child {
        margin-right: 20px;
    }
`;
