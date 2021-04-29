import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { ConversationContext } from "../../contexts/ConversationContext";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import CancelIcon from "../../assets/x-primary.svg";
import ProfileCard from "../Profile/ProfileCard";
import MetaMapIcon from "../../assets/location-pin-icon.svg";
import MetaClockIcon from "../../assets/clock-icon.svg";
import OfferHelpIcon from "../../assets/message-circle-primary.svg";
import ReportIcon from "../../assets/flag-dark-grey.svg";
import EditPostIcon from "../../assets/edit-primary.svg";
import DeletePostIcon from "../../assets/trash-2-dark-grey.svg";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';


const DetailPost = ({ loggedInUser }) => {
    const { posts, deletePost, setPostReported } = useContext(PostContext);
    const { users, addAcceptedConversationId, updateNewMessageList, removePostFromLists, addRequestedPostId } = useContext(UserContext);
    const { addNewConversation, postDeleted } = useContext(ConversationContext)
    const { postId } = useParams();
    const history = useHistory();

    const [postOwner, setPostOwner] = useState(undefined);

    const [showReportPopup, setShowReportPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const loggedInUserId = loggedInUser.id;
    const currentPost = posts.find((post) => post.id === parseInt(postId));

    async function setInitialValues() {
        let postOwner = await users
            .filter((user) =>
                user.posts.find(
                    (post) => post.id === parseInt(postId),
                ),
            )[0]
        setPostOwner(postOwner);
    };

    useEffect(() => {
        setInitialValues();
    }, [])

    const onDeleteButtonClicked = () => {
        setShowDeletePopup(true);
    };

    const onCancelDeleteClicked = () => {
        setShowDeletePopup(false);
    };

    const onDeleteFinalClicked = () => {
        setShowDeletePopup(false);
        postDeleted(posts.find(post => post.id === parseInt(postId)));
        removePostFromLists(loggedInUser, parseInt(postId));
        deletePost(parseInt(postId));
        history.push("/");
    };

    const onReportButtonClicked = () => {
        setShowReportPopup(true);
    };

    const onCancelReportClicked = () => {
        setShowReportPopup(false);
    };

    const onReportFinalClicked = () => {
        setShowReportPopup(false);
        setPostReported(currentPost, loggedInUserId);
    };

    const onOfferHelpClicked = () => {
        let newConvId = uuidv4();
        let convDoesntExist = addNewConversation(newConvId, loggedInUser.firstName, loggedInUser.id, postOwner.id, posts.find(post => post.id === parseInt(postId)));
        if (convDoesntExist) {
            addAcceptedConversationId(loggedInUser, newConvId);
            addRequestedPostId(loggedInUser, parseInt(postId));
            updateNewMessageList(postOwner, newConvId);
        }
    };

    const isPostReportedByCurrentUser = () => {
        if(currentPost.reported.find((userId) => userId.id === loggedInUserId)){
            return true;
        }
        return false;
    }

    return (
        <>
            {showDeletePopup && (
                <>
                    <Overlay onClick={onCancelDeleteClicked}/>
                    <Popup>
                        <StyledTitle style={{marginBottom: "20px"}}>
                            Sind Sie sicher, dass Sie diesen Beitrag löschen
                            möchten?
                        </StyledTitle>
                        <PopupDescription>
                            Diese Aktion kann nicht wiederrufen werden.
                        </PopupDescription>
                        <ButtonWrapper>
                            <div>
                                <CancelReportButton
                                    onClick={onCancelDeleteClicked}
                                >
                                    <MetaIcon src={CancelIcon} />
                                    Abbrechen
                                </CancelReportButton>
                            </div>
                            <div>
                                <ReportButton
                                    onClick={() => onDeleteFinalClicked()}
                                >
                                    <MetaIcon src={DeletePostIcon} />
                                    Löschen
                                </ReportButton>
                            </div>
                        </ButtonWrapper>
                    </Popup>
                </>
            )}
            {showReportPopup && (
                <>
                    <Overlay onClick={onCancelReportClicked}/>
                    <Popup>
                        <StyledTitle style={{marginBottom: "20px"}}>Beitrag wirklich melden?</StyledTitle>
                        <PopupDescription>
                            Wenn Sie diesen Beitrag melden, wird dieser auf unpassende Inhalte untersucht.
                        </PopupDescription>
                        <ButtonWrapper>
                            <div>
                                <CancelReportButton
                                    onClick={onCancelReportClicked}
                                >
                                    <MetaIcon src={CancelIcon} />
                                    Abbrechen
                                </CancelReportButton>
                            </div>
                            <div>
                                <ReportButton onClick={onReportFinalClicked}>
                                    <MetaIcon src={ReportIcon} />
                                    Melden
                                </ReportButton>
                            </div>
                        </ButtonWrapper>
                    </Popup>
                </>
            )}
            {posts
                .filter((post) => post.id === parseInt(postId))
                .map((post) => (
                    <StyledArea key={post.id}>
                        <div>
                            <ArrowLink to="/">Zurück zu Gesuchen</ArrowLink>
                        </div>
                        <StyledWrapper>
                            <LeftArea>
                                <Header>
                                    <MetaWrapper>
                                        <PostMeta>
                                            <MetaIcon src={MetaMapIcon} />
                                            {post.zipCode}
                                        </PostMeta>
                                        <PostMeta>
                                            <MetaIcon src={MetaClockIcon} />
                                            {`${moment(
                                                parseInt(post.created_at),
                                            ).format("DD.MM.YYYY")}`}
                                        </PostMeta>
                                    </MetaWrapper>
                                    {post.userId !== loggedInUserId && (
                                        <PostOptionsWrapper>

                                            {!isPostReportedByCurrentUser() && 
                                                <ReportButton
                                                    onClick={() => onReportButtonClicked()}
                                                >
                                                    <MetaIcon src={ReportIcon} />
                                                    Melden
                                                </ReportButton>
                                            }
                                            {isPostReportedByCurrentUser() && 
                                                <ReportButton>
                                                    <MetaIcon src={ReportIcon} />
                                                    Gemeldet
                                                </ReportButton>
                                            }
                                            <StyledButton
                                                onClick={() => onOfferHelpClicked()}
                                                to={`/nachrichten/${postId}`}
                                            >
                                                <MetaIcon src={OfferHelpIcon} />
                                                Hilfe anbieten
                                            </StyledButton>
                                        </PostOptionsWrapper>
                                    )}
                                    {post.userId === loggedInUserId && (
                                        <PostOptionsWrapper>
                                            <ReportButton
                                                onClick={onDeleteButtonClicked}
                                            >
                                                <MetaIcon
                                                    src={DeletePostIcon}
                                                />
                                                Löschen
                                            </ReportButton>
                                            <StyledButton
                                                to={`/createRequest/${postId}/edit`}
                                            >
                                                <MetaIcon src={EditPostIcon} />
                                                Bearbeiten
                                            </StyledButton>
                                            <StyledButton
                                                to={`/nachrichten/${postId}`}
                                                style={{ "margin-left": "10px" }}
                                            >
                                                <MetaIcon src={OfferHelpIcon} />
                                                Zu Nachrichten
                                            </StyledButton>
                                        </PostOptionsWrapper>
                                    )}
                                </Header>
                                <StyledTitle>{post.title}</StyledTitle>
                                <StyledP>{post.description}</StyledP>
                                {post.shoppingItems.length > 0 && (
                                    <ShoppingList>
                                        <ShoppingListTitle>
                                            Einkaufsliste
                                        </ShoppingListTitle>
                                        {post.shoppingItems.map((item) => (
                                            <ShoppingItem key={item}>
                                                {item}
                                            </ShoppingItem>
                                        ))}
                                    </ShoppingList>
                                )}
                            </LeftArea>
                            <RightArea>
                                {users
                                    .filter((user) =>
                                        user.posts.find(
                                            (post) => post.id === parseInt(postId),
                                        ),
                                    )
                                    .map((user) => (
                                        <ProfileCard
                                            key={user.id}
                                            user={user}
                                            loggedInUser={loggedInUser}
                                        />
                                    ))}
                            </RightArea>
                        </StyledWrapper>
                    </StyledArea>
                ))}
        </>
    );
};

export default DetailPost;

const StyledArea = styled.div`
    padding: 30px;
`;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    background: white;
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 30px;
`;

const LeftArea = styled.div`
    border-right: 2px solid var(--light-grey);
    padding: 60px;
    padding-top: 40px;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--light-grey);
    padding-bottom: 20px;
`;

const RightArea = styled.div``;

const StyledTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    padding: 0px 0px;
`;

const MetaWrapper = styled.div`
    display: flex;
    // padding: 0px 0px 20px 0px;
`;

const PostMeta = styled.span`
    display: flex;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 5px;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const StyledP = styled.p`
    color: var(--dark-grey);
    font-weight: 200;
    line-height: 2;
    margin-top: 60px;
`;

const PostOptionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledButton = styled(Link)`
    display: flex;
    width: 100%;
    justify-content: center;
    text-decoration: none;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const MetaIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;

const ReportButton = styled.button`
    display: flex;
    width: 100%;
    justify-content: center;
    text-decoration: none;
    padding: 10px 20px;
    background: var(--light-grey);
    // background: transparent;
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    border: 2px solid white;
    transition: all 0.2s;
    z-index: 3;

`;

const PopupDescription = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
    color: var(--dark-grey);
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0px;
`;

const CancelReportButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-top: 10px;
    // margin-right: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const ShoppingList = styled.ul`
    padding-left: 0;
    margin-top: 30px;
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

const ShoppingListTitle = styled.h3``;
