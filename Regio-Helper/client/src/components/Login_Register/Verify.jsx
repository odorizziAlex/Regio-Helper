import React, { useState } from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Verify = () => {
    const initialState = {
        userType: "help-search",
        firstName: "",
        phoneNumber: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Check if already exists
        // TODO: Send SMS to user with code
        // TODO: Redirect to /verify page
    };

    return (
        <div>
            <StyledTitle>
                Ein Bestätigungscode wurde Ihnen zugeschickt.
            </StyledTitle>
            <StyledP>
                Geben Sie den Code in das untenstehende Eingabefeld ein.
            </StyledP>
            <StyledForm onSubmit={handleSubmit}>
                <label>8-stelligen Code eingeben</label>
                <StyledInput
                    name="firstName"
                    type="text"
                    placeholder="Dein Vorname"
                    onChange={handleChange}
                />
                <Link to="/dashboard/uebersicht">
                    <PrimaryButton>Jetzt Einloggen</PrimaryButton>
                </Link>
                <InfoText>
                    Code nicht erhalten?
                    <StyledLink to="/login">Erneut senden</StyledLink>
                </InfoText>
            </StyledForm>
        </div>
    );
};

export default Verify;

const StyledTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0;
`;

const StyledP = styled.p`
    color: var(--dark-grey);
    font-weight: 200;
    line-height: 2;
    margin-top: 40px;
    margin-bottom: 70px;
`;

const StyledInput = styled.input`
    display: block;
    padding: 20px;
    background: var(--light-grey);
    width: 100%;
    color: var(--black);
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border: 2px solid transparent;

    &:last-child {
        margin-bottom: 0;
    }

    &:focus {
        outline: none;
        border: 2px solid var(--primary);
    }
`;

const PrimaryButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledForm = styled.form`
    width: 100%;
`;

const InfoText = styled.div`
    color: var(--dark-grey);
    text-align: center;
    font-weight: 300;
`;

const StyledLink = styled(RouterLink)`
    font-weight: 600;
    color: var(--primary);
    text-decoration: none;
    position: relative;
    margin-left: 10px;

    &:after {
        content: "";
        height: 2px;
        width: 100%;
        background: var(--primary);
        position: absolute;
        bottom: -3px;
        left: 0;
    }
`;

const Link = styled(RouterLink)`
    text-decoration: none;
`;
