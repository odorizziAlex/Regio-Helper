import React, { useState, useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import Standard from "./DefaultTemplate";
import Einkaufen from "./ShoppingTemplate";
import Dropdown from "./Dropdown";
import CancelIcon from "../../assets/x-dark-grey.svg";
import SaveIcon from "../../assets/save-success.svg";
import { zipCodes } from "../../data/zipCodes";
import { UserContext } from "../../contexts/UserContext";


const CreateRequest = ({ loggedInUser }) => {
    const { posts, setPosts } = useContext(PostContext);
    const { addCreatedPostId } = useContext(UserContext);
    const { postId } = useParams();
    
    const history = useHistory();
    
    const templateOptions = ["Standard", "Einkaufen"];

    const [currentItem, setCurrentItem] = useState(
        postId &&
            posts.find((post) => post.id === parseInt(postId)).shoppingItems
                .length > 0
            ? templateOptions[1]
            : templateOptions[0],
    );

    const [requestInfo, setRequestInfo] = useState(
        postId
            ? posts.find((post) => post.id === parseInt(postId))
            : {
                  zipCode: zipCodes[0],
                  title: "",
                  description: "",
                  shoppingItems: [],
              },
    );

    const setLocation = (location) => {
        setRequestInfo({ ...requestInfo, zipCode: location });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postId ? editPost() : createPost();

        history.goBack();
    };

    const createPost = () => {
        if (
            requestInfo.zipCode &&
            requestInfo.title &&
            requestInfo.description
        ) {
            const userId = 2;
            const currentDate = new Date().getTime();
            const id = posts.length + 1;

            const newPost = {
                id,
                userId,
                created_at: currentDate,
                title: requestInfo.title,
                description: requestInfo.description,
                zipCode: requestInfo.zipCode,
                requests: [],
                shoppingItems: [],
            };

            setPosts([...posts, newPost]);
            addCreatedPostId(loggedInUser, id);
        }
    };

    const editPost = () => {
        if (
            requestInfo.zipCode &&
            requestInfo.title &&
            requestInfo.description
        ) {
            setPosts(
                posts.map((prevPost) => {
                    if (prevPost.id !== parseInt(postId)) {
                        return prevPost;
                    }
                    prevPost.zipCode = requestInfo.zipCode;
                    prevPost.title = requestInfo.title;
                    prevPost.description = requestInfo.description;
                    prevPost.shoppingItems = requestInfo.shoppingItems;
                    return prevPost;
                }),
            );
        }
    };

    const renderTemplate = (templateName) => {
        switch (templateName) {
            case "Standard":
                return (
                    <Standard
                        zipCodes={zipCodes}
                        requestInfo={requestInfo}
                        setRequestInfo={setRequestInfo}
                        setCurrentZipCode={setLocation}
                    />
                );
            case "Einkaufen":
                return (
                    <Einkaufen
                        zipCodes={zipCodes}
                        requestInfo={requestInfo}
                        setRequestInfo={setRequestInfo}
                        setCurrentZipCode={setLocation}
                    />
                );
            default:
                break;
        }
    };

    return (
        <StyledArea>
            <div>
                <ArrowLink to="/">Zurück zu Gesuchen</ArrowLink>
            </div>
            <RequestWrapper>
                <RequestHeader>
                    <StyledMainTitle>
                        Gesuch {postId ? "bearbeiten" : "erstellen"}
                    </StyledMainTitle>
                    <TemplateWrapper>
                        <TemplateLabel>Vorlage auswählen</TemplateLabel>
                        <Dropdown
                            currentItem={currentItem}
                            setCurrentItem={setCurrentItem}
                            options={templateOptions}
                            padding="10px 20px"
                            width="175px"
                        />
                    </TemplateWrapper>
                </RequestHeader>
                {renderTemplate(currentItem)}
                <Header>
                    <LeftArea></LeftArea>
                    <RightArea>
                        <ButtonWrapper>
                            <StyledCancelButton to="/">
                                <ButtonIcon src={CancelIcon} />
                                Abbrechen
                            </StyledCancelButton>
                            <StyledSubmitButton
                                type="Submit"
                                onClick={handleSubmit}
                                value="Submit"
                                to="/"
                            >
                                <ButtonIcon src={SaveIcon} />
                                Speichern
                            </StyledSubmitButton>
                        </ButtonWrapper>
                    </RightArea>
                </Header>
            </RequestWrapper>
        </StyledArea>
    );
};

export default CreateRequest;

const StyledArea = styled.div`
    padding: 30px;
`;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const RequestWrapper = styled.div`
    background: white;
    border-radius: 10px;
    margin-top: 30px;
`;

const RequestHeader = styled.div`
    display: flex;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-bottom: 2px solid var(--light-grey);
    padding: 30px;
`;

const StyledMainTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
`;

const TemplateWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const TemplateLabel = styled.p`
    color: var(--dark-grey);
    font-weight: 300;
    font-size: 14px;
    margin-right: 10px;
`;

const Header = styled.div`
    display: flex;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-top: 2px solid var(--light-grey);
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 30px;
`;

const StyledCancelButton = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 20px 40px;
    background: white;
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledSubmitButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 20px 40px;
    background: #def9df;
    color: var(--success);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const ButtonIcon = styled.img`
    width: 20px;
    margin-right: 20px;
    border-radius: 10px;
`;

const LeftArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightArea = styled.div`
    flex-direction: column;
    margin-left: 30px;
`;
