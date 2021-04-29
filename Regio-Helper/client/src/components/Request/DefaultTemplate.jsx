import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const DefaultTemplate = ({
    requestInfo,
    setRequestInfo,
    zipCodes,
    setCurrentZipCode,
}) => {
    const handleTitleChange = (e) => {
        setRequestInfo({ ...requestInfo, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setRequestInfo({ ...requestInfo, description: e.target.value });
    };

    return (
        <StyledForm>
            <Section>
                <LeftArea>
                    <StyledLabel>
                        Postleitzahl
                        <MoreInfoButton
                            description="Die Postleitzahl wird lediglich für die Suche und grobe
                Zuweisung nach Standort benötigt. Eine exakte Adresse
                wird nicht benötigt."
                        />
                    </StyledLabel>
                </LeftArea>
                <RightArea>
                    <Dropdown
                        currentItem={requestInfo.zipCode}
                        setCurrentItem={setCurrentZipCode}
                        options={zipCodes}
                        padding="20px"
                        width="100%"
                    />
                </RightArea>
            </Section>
            <Section>
                <LeftArea>
                    <StyledLabel>
                        Titel
                        <MoreInfoButton
                            description="
                Hier können Sie eine kurze Beschreibung Ihres Gesuches
                erstellen (z.B. Ich benötige Hilde beim Einkaufen.)"
                        />
                    </StyledLabel>
                </LeftArea>
                <RightArea>
                    <StyledInput
                        type="text"
                        value={requestInfo.title}
                        onChange={handleTitleChange}
                        placeholder="z.B. Ich benötige Hilfe beim Einkaufen"
                    />
                </RightArea>
            </Section>
            <Section>
                <LeftArea>
                    <StyledLabel>
                        Beschreibung
                        <MoreInfoButton
                            description="Hier können Sie detailliertere Informationen
                Bereitstellen, um den Helfern weitere Details zur
                Verfügung zu stellen."
                        />
                    </StyledLabel>
                </LeftArea>
                <RightArea>
                    <StyledTextArea
                        value={requestInfo.description}
                        onChange={handleDescriptionChange}
                        placeholder="z.B. Einkaufsliste, Bevorzugtes Geschäft, Form der Vergütung, etc."
                    />
                </RightArea>
            </Section>
        </StyledForm>
    );
};

export default DefaultTemplate;

const LeftArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightArea = styled.div`
    flex-direction: column;
    margin-left: 30px;
`;

const StyledLabel = styled.div`
    font-weight: 400;
    font-size: 18px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    position: relative;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 20px;
    box-sizing: border-box;
    padding: 0 30px 30px 30px;

    &:first-child {
        padding-top: 30px;
    }
`;

const StyledForm = styled.form``;

const StyledInput = styled.input`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    padding: 20px;
    font-size: 18px;
    color: var(--black);
    background: var(--light-grey);
`;

const StyledTextArea = styled.textarea`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    padding: 20px;
    font-size: 18px;
    color: var(--black);
    background: var(--light-grey);
    height: 100px;
    resize: vertical;
`;

const MoreInfoButton = ({ description }) => {
    return (
        <TooltipWrapper>
            <InfoIcon>i</InfoIcon>
            <Tooltip>{description}</Tooltip>
        </TooltipWrapper>
    );
};

const InfoIcon = styled.span`
    height: 20px;
    width: 20px;
    font-family: serif;
    font-weight: 900;
    font-size: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--dark-grey);
    color: white;
    margin-left: 10px;
    cursor: pointer;
`;
const TooltipWrapper = styled.span``;

const Tooltip = styled.div`
    z-index: 999;
    position: absolute;
    display: inline-block;
    left: 0;
    font-size: 14px;
    width: 100%;
    max-width: 300px;
    background: #071331db;
    color: white;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: all 0.2s;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);

    ${TooltipWrapper}:hover & {
        opacity: 1;
        transform: scaleY(1);
    }
`;
