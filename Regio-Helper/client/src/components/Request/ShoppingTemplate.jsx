import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const ShoppingTemplate = ({
    requestInfo,
    setRequestInfo,
    zipCodes,
    setCurrentZipCode,
}) => {
    const [currentItem, setCurrentItem] = useState("");

    const deleteItem = (itemName) => {
        setRequestInfo({
            ...requestInfo,
            shoppingItems: requestInfo.shoppingItems.filter(
                (item) => item !== itemName.trim(),
            ),
        });
    };

    const handleItemSubmit = (e) => {
        e.preventDefault();
        const item = currentItem.trim();
        if (item && !requestInfo.shoppingItems.includes(item)) {
            setRequestInfo({
                ...requestInfo,
                shoppingItems: [...requestInfo.shoppingItems, currentItem],
            });
            setCurrentItem("");
        }
    };

    const handleItemChange = (e) => {
        setCurrentItem(e.target.value);
    };

    const handleTitleChange = (e) => {
        setRequestInfo({ ...requestInfo, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setRequestInfo({ ...requestInfo, description: e.target.value });
    };

    return (
        <>
            <StyledForm>
                <Section>
                    <LeftArea>
                        <StyledLabel>
                            Postleitzahl
                            <MoreInfoButton
                                description="           Die Postleitzahl wird lediglich für die Suche und grobe
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
            <Section>
                <LeftArea>
                    <StyledLabel>
                        <span>Einkaufsliste</span>
                        <MoreInfoButton
                            description="Hier können Sie alle einzelnen Produkte für Ihren
                        Einkauf auflisten, welche von HelferInnen besorgt werden
                        soll. Einfach ein Produkt eingeben und mit Enter bzw. Return bestätigen. Das Produkt wird dann in der Liste angezeigt."
                        />
                    </StyledLabel>
                </LeftArea>
                <RightArea>
                    <ItemForm onSubmit={handleItemSubmit}>
                        <StyledInput
                            value={currentItem}
                            onChange={handleItemChange}
                            placeholder="Name des Produktes"
                        />
                    </ItemForm>
                    <ShoppingList>
                        {requestInfo.shoppingItems.map((item) => (
                            <ShoppingItem key={item}>
                                {item}
                                <DeleteButton onClick={() => deleteItem(item)}>
                                    Löschen
                                </DeleteButton>
                            </ShoppingItem>
                        ))}
                    </ShoppingList>
                </RightArea>
            </Section>
        </>
    );
};

export default ShoppingTemplate;

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

const ItemForm = styled.form``;

const ShoppingList = styled.ul`
    padding-left: 0;
`;

const ShoppingItem = styled.li`
    list-style-type: none;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
        border-bottom: 1px solid var(--light-grey);
    }
`;

const DeleteButton = styled.button`
    color: var(--primary);
    border: 2px solid var(--primary);
    background: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--primary);
        color: white;
    }
`;
