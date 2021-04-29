import React from "react";
import styled from "styled-components";

const Info = () => {
    return (
        <StyledWrapper>
            <StyledContent>
                <StyledTitle>
                    Portal für Nachbarschaftshilfe in und um Regensburg
                </StyledTitle>
                <StyledP>
                    Die aktuelle Situation stellt die Gesellschaft vor neue
                    Herausforderungen. Das neuartige Coronavirus hat unser
                    Zusammenleben in den vergangenen Wochen zunehmend
                    eingeschränkt. Wir haben das Projekt CoronaHelfer ins Leben
                    gerufen, um gemeinsam die Ausbreitung des Virus zu
                    verlangsamen und einander dort zu unterstützen, wo es
                    möglich ist.
                </StyledP>
            </StyledContent>
        </StyledWrapper>
    );
};

export default Info;

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledContent = styled.div`
    max-width: 500px;
    width: 100%;
`;

const StyledTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0;
`;

const StyledP = styled.p`
    color: var(--dark-grey);
    font-weight: 200;
    line-height: 2;
    margin-top: 60px;
`;
