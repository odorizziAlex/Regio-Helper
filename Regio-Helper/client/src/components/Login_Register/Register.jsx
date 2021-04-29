import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
    const initialState = {
        userType: "help-search",
        firstName: "",
        phoneNumber: "",
    };

    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/verify");
        // TODO: Check if already exists
        // TODO: Send SMS to user with code
        // TODO: Redirect to /verify page
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label>Vorname</label>
            <StyledInput
                name="firstName"
                type="text"
                placeholder="Dein Vorname"
                onChange={handleChange}
            />
            <label>Handy-Nummer</label>
            <StyledInput
                name="phoneNumber"
                type="tel"
                placeholder="Handynummer"
                onChange={handleChange}
            />
            <PrimaryButton>Jetzt kostenlos registrieren</PrimaryButton>
            <InfoText>
                Bereits registiert?{" "}
                <StyledLink to="/login">Jetzt anmelden</StyledLink>
            </InfoText>
        </StyledForm>
    );
};

export default Register;

const StyledInput = styled.input`
    display: block;
    padding: 20px;
    background: var(--light-grey);
    width: 100%;
    color: var(--black);
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-bottom: 30px;
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
    margin-top: 50px;
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

const StyledLink = styled(Link)`
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
