import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SingleMessage from "./SingleMessage";
import CancelIcon from "../../assets/x-dark-grey.svg";
import CancelIconPrimary from "../../assets/x-primary.svg";
import DeleteIcon from "../../assets/trash-2-dark-grey.svg";
import SendIcon from "../../assets/send-success.svg";
import RateIcon from "../../assets/star-success.svg";
import StarIcon from "../../assets/star-light-primary.svg";
import ProfileIcon from "../../assets/profile-icon-white.svg";
import StarIconSelected from "../../assets/star-primary.svg";
import ImgDummy from "../../images/dummy-profile-img.jpg";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { ConversationContext } from "../../contexts/ConversationContext";
import moment from "moment";

const Messages = ({ loggedInUser }) => {
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [selectedConversationId, setSelectedConversationId] = useState(0);
    const [selectedConversation, setSelectedConversation] = useState(undefined);
    const [conversationPartner, setConversationPartner] = useState(undefined);

    const [ownConversations, setOwnConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [ratingScale, setRatingScale] = useState([
        StarIcon,
        StarIcon,
        StarIcon,
        StarIcon,
        StarIcon,
    ]);

    const { postId } = useParams();
    const {
        users,
        addAcceptedConversationId,
        removeAcceptedConversationId,
        updateNewMessageList,
        addComment,
        toggleNewMessage,
        removePostFromRequestedPosts
    } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const {
        conversations,
        setRated,
        addMessage,
        rejectConversation,
        deleteConversation,
    } = useContext(ConversationContext);

    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isConversationRated, setIsConversationRated] = useState(false);
    const [isConversationAccepted, setIsConversationAccepted] = useState(false);
    const [isConversationRejected, setIsConversationRejected] = useState(false);
    const [isConversationDeleted, setIsConversationDeleted] = useState(false);
    const [isMessageRead, setIsMessageRead] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);

    async function getConversationsFromContext() {
        let obj = await conversations.filter(
            (conversation) =>
                (conversation.userIds[0].id1 === loggedInUser.id &&
                    conversation.userIds[0].delId1 === 0) ||
                (conversation.userIds[0].id2 === loggedInUser.id &&
                    conversation.userIds[0].delId2 === 0),
        );

        setOwnConversations(sortOwnConversations(obj));
        loadConversationById(obj);
    }

    // on mount
    useEffect(() => {
        resetValues();
        getConversationsFromContext();
    }, [isConversationDeleted, conversations]);

    // on update
    useEffect(() => {
        toggleNewMessage(loggedInUser, selectedConversationId);
        loadConversation(selectedConversation);
        setOwnConversations(sortOwnConversations(ownConversations));
        setIsMessageSent(false);
        setIsConversationRejected(false);
    }, [
        selectedConversationId,
        isConversationAccepted,
        isConversationRejected,
        isMessageRead,
        isMessageSent,
    ]);

    const getTimeByConv = (list, index) => {
        // if (list[index] === undefined) {
        //     return false;
        // }
        // if (list[index].messages.length === 0) {
        //     return false;
        // }
        return moment(
            list[index].messages[list[index].messages.length - 1].timeData,
        );
    };

    const sortOwnConversations = (convs) => {
        // if(true){
        //     return convs;
        // }
        let index = 0;
        let sortedConvs = [];
        let convsCopy = [...convs];
        let best = undefined;
        let newestConv = undefined;
        for (let i = 0; i < convs.length; i++) {
            for (let j = 0; j < convsCopy.length; j++) {
                if (j === 0) {
                    best = getTimeByConv(convsCopy, j);
                    newestConv = convsCopy[j];
                    index = j;
                    continue;
                }
                if (getTimeByConv(convsCopy, j) > best) {
                    best = getTimeByConv(convsCopy, j);
                    newestConv = convsCopy[j];
                    index = j;
                }
            }
            convsCopy.splice(index, 1);
            sortedConvs = sortedConvs.concat(newestConv);
        }
        return sortedConvs;
    };

    const loadConversationById = (ownConvs) => {
        if (postId === 0 || postId === undefined) {
            return;
        }
        let conv = getConversationByPostId(ownConvs);
        if (conv !== undefined && conv.length !== 0) {
            setSelectedConversation(conv);
            setSelectedConversationId(conv.id);
            setConversationPartner(getProfileInfoById(conv.userIds));
            setIsMessageRead(true);
        }
    };

    const getConversationByPostId = (ownConvs) => {
        let selectedConv = undefined;
        for (let i = 0; i < ownConvs.length; i++) {
            if (ownConvs[i].postId === parseInt(postId)) {
                selectedConv = ownConvs[i];
            }
        }
        return selectedConv;
    };

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Update Comment state
        setShowRatingPopup(!showRatingPopup);
        setRated(selectedConversation, isConversationRated);
        addComment(conversationPartner, comment, rating);
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        // Update Message state
        addMessage(selectedConversation, loggedInUser.id, message);
        loadConversation(selectedConversation);
        updateNewMessageList(conversationPartner, selectedConversationId);
        setIsMessageSent(true);
        // Clear Inputfield
        setMessage("");
    };

    const loadConversation = (c) => {
        if (c !== undefined) {
            setIsConversationRated(c.isRated);
            setMessages(c.messages);
            checkAcceptanceState();
        }
    };

    // As useState() is asynchronous, the ownConversations state won't be up to date in time.
    // This function double checks the userIds of each object in ownConversations and enables/disables rendering of a conversation
    const checkRejectionState = (conv) => {
        if (conv.userIds[0].rej === false) {
            return true;
        }
        return false;
    };

    // This function takes an object of two user ids like seen in a conversation object (userIds)
    // It also takes a single id and returns the matching profile
    const getProfileInfoById = (ids) => {
        let id = undefined;
        if (typeof ids === "number") {
            id = ids;
        } else if (typeof ids === "object" && ids[0].id1 !== loggedInUser.id) {
            id = ids[0].id1;
        } else {
            id = ids[0].id2;
        }
        return users.find((user) => user.id === id);
    };

    const getPostInfoById = (id) => {
        let c = ownConversations.find((conversation) => conversation.id === id);
        let p = undefined;
        if (c) {
            p = posts.filter((post) => post.id === c.postId);
            return p[0];
        }
        return "";
    };

    const createConversationSnippet = (msgs) => {
        if (msgs.length !== 0) {
            let lastMsg = msgs[msgs.length - 1].text;
            let maxLength = 40;
            if (lastMsg.length > maxLength) {
                return lastMsg.substr(0, maxLength) + "...";
            }
            return lastMsg;
        }
        return "(Noch keine Nachrichten)";
    };

    const checkAcceptanceState = () => {
        let acceptedConversations = loggedInUser.accepted_conversations;
        for (let i = 0; i < acceptedConversations.length; i++) {
            if (acceptedConversations[i].id === selectedConversationId) {
                setIsConversationAccepted(true);
                return;
            }
        }
        setIsConversationAccepted(false);
        return;
    };

    const onAcceptConversation = () => {
        addAcceptedConversationId(loggedInUser, selectedConversationId);
        setIsConversationAccepted(true);
    };

    const onRejectConversation = () => {
        rejectConversation(selectedConversation, "Konversation abgelehnt");
        setIsConversationRejected(true);
        setSelectedConversation(undefined);
        setSelectedConversationId(0);
    };

    const onRateButtonClicked = () => {
        if (!isConversationRated) {
            setShowRatingPopup(!showRatingPopup);
            let clearScale = [StarIcon, StarIcon, StarIcon, StarIcon, StarIcon];
            setRatingScale(clearScale);
            setComment("");
        }
    };

    const onRatingScaleClicked = (id) => {
        let scale = [...ratingScale];
        for (let i = 0; i < scale.length; i++) {
            if (i <= id) {
                scale[i] = StarIconSelected;
            } else {
                scale[i] = StarIcon;
            }
        }
        setRatingScale(scale);
        setRating(id + 1);
    };

    const onConversationDelete = (conversation) => {
        deleteConversation(conversation, loggedInUser.id);
        removeAcceptedConversationId(loggedInUser, conversation.id);
        removePostFromRequestedPosts(loggedInUser, conversation.postId);
        setIsConversationDeleted(true);
    };

    const resetValues = () => {
        setMessage("");
        setComment("");
        setRating(0);
        setSelectedConversationId(0);
        setSelectedConversation(undefined);
        setConversationPartner(undefined);
        setOwnConversations([]);
        setMessages([]);
        setRatingScale([StarIcon, StarIcon, StarIcon, StarIcon, StarIcon]);
        setShowRatingPopup(false);
        setIsConversationRated(false);
        setIsConversationAccepted(false);
        setIsConversationDeleted(false);
        setIsMessageSent(false);
    };

    const isNewMessage = (conv) => {
        if (
            loggedInUser.new_conversation_message.find(
                (convId) => convId.id === conv.id,
            )
        ) {
            return true;
        }
        return false;
    };

    const checkIsOwnPost = (postId) => {
        let ownPost = loggedInUser.posts.find((post) => post.id === postId);
        if (ownPost === undefined) {
            return false;
        }
        return true;
    };

    const updatedTimestamp = (msg) => {
        let date = msg.timeData.split("T")[0];
        let time = msg.timeData.split("T")[1].split("+")[0].split(":");
        let now = moment().format();

        if (date === now.split("T")[0]) {
            date = "Heute";
        } else if (
            parseInt(date.split("-")[2]) + 1 ===
            parseInt(now.split("T")[0].split("-")[2])
        ) {
            date = "Gestern";
        } else {
            date = date.split("-");
            date = date[2] + "." + date[1] + "." + date[0];
        }
        return date + " um " + time[0] + ":" + time[1] + " Uhr";
    };

    return (
        <StyledArea>
            {showRatingPopup && (
                <>
                    <Overlay onClick={() => setShowRatingPopup(!showRatingPopup)} />
                    <Popup>
                        <PopupTitle>
                            Bewerten Sie die Interaktion mit diesem Nutzer.
                            </PopupTitle>
                        <PopupDescription>
                            ACHTUNG: Ihre Bewertung kann nur ein mal pro
                            Konversation abgegeben werden. Bewerten Sie am
                            besten erst dann andere Benutzer, wenn Ihre
                            Interaktion mit ihnen abgeschlossen ist.
                            </PopupDescription>
                        <RatingPicker>
                            <RatingButton
                                src={ratingScale[0]}
                                onClick={() => {
                                    onRatingScaleClicked(0);
                                }}
                            ></RatingButton>
                            <RatingButton
                                src={ratingScale[1]}
                                onClick={() => {
                                    onRatingScaleClicked(1);
                                }}
                            ></RatingButton>
                            <RatingButton
                                src={ratingScale[2]}
                                onClick={() => {
                                    onRatingScaleClicked(2);
                                }}
                            ></RatingButton>
                            <RatingButton
                                src={ratingScale[3]}
                                onClick={() => {
                                    onRatingScaleClicked(3);
                                }}
                            ></RatingButton>
                            <RatingButton
                                src={ratingScale[4]}
                                onClick={() => {
                                    onRatingScaleClicked(4);
                                }}
                            ></RatingButton>
                        </RatingPicker>
                        <form onSubmit={handleCommentSubmit}>
                            <CommentField
                                type="text"
                                value={comment}
                                onChange={handleComment}
                                placeholder="Bewertung eingeben..."
                            />
                            <PopupButtonWrapper>
                                <CancelButton onClick={onRateButtonClicked}>
                                    <MetaIcon src={CancelIcon} />
                                        Abbrechen
                                    </CancelButton>
                                {rating !== 0 && (
                                    <RateButton
                                        type="submit"
                                        value="Submit"
                                        onClick={() => {
                                            setIsConversationRated(true);
                                        }}
                                    >
                                        <MetaIcon src={SendIcon} />
                                            Absenden
                                    </RateButton>
                                )}
                            </PopupButtonWrapper>
                        </form>
                    </Popup>
                </>
            )}
            {showDeletePopup && (
                <>
                    <Overlay onClick={() => setShowDeletePopup(false)} />
                    <Popup>
                        <PopupTitle>
                            Wollen sie diese Unterhaltung wirklich löschen?
                        </PopupTitle>
                        <PopupDescription>
                            ACHTUNG: Diese Aktion kann nicht wiederrufen werden. Dieser Beitrag wird anschließend automatisch aus "Eigene Hilfsangebote" aus Ihrem Profil entfernt. 
                        </PopupDescription>
                        <PopupButtonWrapper>
                            <CancelButtonPopup
                                onClick={() => setShowDeletePopup(false)}
                            >
                                <MetaIcon src={CancelIconPrimary} />
                                Abbrechen
                            </CancelButtonPopup>
                            <ArrowLink to="/nachrichten">
                                <CancelButton
                                    onClick={() => {
                                        onConversationDelete(
                                            selectedConversation,
                                        );
                                        setShowDeletePopup(false);
                                    }}
                                >
                                    <MetaIcon src={DeleteIcon} />
                                    Löschen
                                </CancelButton>
                            </ArrowLink>
                        </PopupButtonWrapper>
                    </Popup>
                </>
            )}
            <LeftArea>
                <h2>Konversationen</h2>
                <UserList>
                    {ownConversations.map((conversation) => {
                        const selected =
                            conversation.id === selectedConversationId;
                        if (checkRejectionState(conversation)) {
                            return (
                                <ArrowLink
                                    to={`/nachrichten/${conversation.postId}`}
                                >
                                    <UserItem
                                        key={conversation.id}
                                        onClick={() => {
                                            setSelectedConversation(
                                                conversation,
                                            );
                                            setSelectedConversationId(
                                                conversation.id,
                                            );
                                            setConversationPartner(
                                                getProfileInfoById(
                                                    conversation.userIds,
                                                ),
                                            );
                                            setIsMessageRead(true);
                                        }}
                                        selected={selected}
                                    >
                                        <ConversationWrapper>
                                            <ProfileImage
                                                src={
                                                    getProfileInfoById(
                                                        conversation.userIds,
                                                    ).image
                                                }
                                            />
                                            <span>
                                                <h4>
                                                    {
                                                        getPostInfoById(
                                                            conversation.id,
                                                        ).title
                                                    }
                                                </h4>
                                                {isNewMessage(conversation) && (
                                                    <NewMessageIndicator>
                                                        neu
                                                    </NewMessageIndicator>
                                                )}
                                                <MessagePreview>
                                                    {createConversationSnippet(
                                                        conversation.messages,
                                                    )}
                                                </MessagePreview>
                                            </span>
                                        </ConversationWrapper>
                                        {checkIsOwnPost(
                                            conversation.postId,
                                        ) && (
                                                <OwnerNotice>
                                                    <ProfileImageIcon
                                                        src={ProfileIcon}
                                                    />
                                                </OwnerNotice>
                                            )}
                                    </UserItem>
                                </ArrowLink>
                            );
                        } else if (!isConversationDeleted) {
                            return (
                                <UserItem
                                    key={conversation.id}
                                    selected={false}
                                >
                                    <ConversationWrapper>
                                        <ProfileImage src={ImgDummy} />
                                        <span>
                                            <h4>
                                                {
                                                    conversation.postTitle
                                                }
                                            </h4>
                                            <NewMessageIndicator>
                                                {conversation.userIds[0].rejMsg}
                                            </NewMessageIndicator>
                                            <MessagePreview>
                                                {createConversationSnippet(
                                                    conversation.messages,
                                                )}
                                            </MessagePreview>
                                        </span>
                                        <ArrowLink to="/nachrichten">
                                            <CancelButton
                                                onClick={() =>
                                                    onConversationDelete(
                                                        conversation,
                                                    )
                                                }
                                            >
                                                <MetaIcon
                                                    src={DeleteIcon}
                                                ></MetaIcon>
                                            </CancelButton>
                                        </ArrowLink>
                                    </ConversationWrapper>
                                    {checkIsOwnPost(conversation.postId) && (
                                        <OwnerNotice>
                                            <ProfileImageIcon
                                                src={ProfileIcon}
                                            />
                                        </OwnerNotice>
                                    )}
                                </UserItem>
                            );
                        }
                        return <></>
                    })}
                </UserList>
            </LeftArea>
            <RightArea>
                {selectedConversationId === 0 && (
                    <ClearedRightArea>
                        Wählen Sie eine Konversation aus der linken Spalte.
                    </ClearedRightArea>
                )}
                {selectedConversationId !== 0 && (
                    <>
                        <TitleWrapper>
                            <ArrowLink
                                to={`/profil/${getProfileInfoById(
                                    selectedConversation.userIds,
                                ).id
                                    }`}
                            >
                                <Title>
                                    <ProfileImage
                                        src={
                                            getProfileInfoById(
                                                selectedConversation.userIds,
                                            ).image
                                        }
                                    />
                                    {
                                        getProfileInfoById(
                                            selectedConversation.userIds,
                                        ).firstName
                                    }
                                </Title>
                            </ArrowLink>
                            <div>
                                <ButtonWrapper>
                                    <ArrowLink
                                        to={`/gesuche/${selectedConversation.postId}`}
                                    >
                                        <ToPostButton>
                                            Hilfsgesuch anzeigen
                                        </ToPostButton>
                                    </ArrowLink>
                                    {isConversationAccepted &&
                                        !isConversationRated && (
                                            <RateButton
                                                onClick={onRateButtonClicked}
                                            >
                                                <MetaIcon src={RateIcon} />
                                                Abschließen
                                            </RateButton>
                                        )}
                                    {isConversationAccepted && isConversationRated && (
                                        <CancelButton
                                            onClick={() =>
                                                setShowDeletePopup(true)
                                            }
                                        >
                                            <MetaIcon src={DeleteIcon} />
                                        </CancelButton>
                                    )}
                                </ButtonWrapper>
                            </div>
                        </TitleWrapper>
                        <MessageWrapper>
                            {messages.length === 0 && (
                                <ClearedRightArea>
                                    Schreiben Sie eine Nachricht.
                                </ClearedRightArea>
                            )}
                            {messages.map((msg) => {
                                if (msg.id !== 0) {
                                    return (
                                        <SingleMessage
                                            key={msg.id}
                                            message={msg}
                                            userName={
                                                getProfileInfoById(msg.userId)
                                                    .firstName
                                            }
                                            img={
                                                getProfileInfoById(msg.userId)
                                                    .image
                                            }
                                            timestamp={updatedTimestamp(msg)}
                                            link={`/profil/${msg.userId}`}
                                        />
                                    );
                                }
                                return <></>
                            })}
                        </MessageWrapper>
                        {isConversationAccepted && (
                            <InputForm onSubmit={handleMessageSubmit}>
                                <StyledInput
                                    onChange={handleInput}
                                    value={message}
                                    placeholder="Nachricht eingeben..."
                                />
                                {message !== "" && (
                                    <StyledButton>Senden</StyledButton>
                                )}
                            </InputForm>
                        )}
                    </>
                )}
                {!isConversationAccepted && selectedConversationId !== 0 && (
                    <AcceptDeclineButtonWrapper>
                        <StyledButton
                            onClick={() => {
                                onAcceptConversation();
                            }}
                        >
                            Unterhaltung annehmen
                        </StyledButton>
                        <DeclineConversationButton
                            onClick={() => {
                                onRejectConversation();
                            }}
                        >
                            Anfrage ablehnen
                        </DeclineConversationButton>
                    </AcceptDeclineButtonWrapper>
                )}
            </RightArea>
        </StyledArea>
    );
};

export default Messages;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const StyledArea = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 30px;
    height: 100%;
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

const PopupButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0px;
`;

const PopupTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    padding: 0px 0px;
    text-align: center;
`;

const PopupDescription = styled.div`
    font-size: 16px;
    text-align: center;
    color: var(--dark-grey);
    padding: 20px;
`;

const MetaIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;

const RatingButton = styled.img`
    width: 40px;
    margin-right: 5px;
    cursor: pointer;
`;

const ToPostButton = styled.button`
    display: flex;
    text-decoration: none;
    justify-content: center;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const CancelButton = styled.button`
    display: flex;
    text-decoration: none;
    justify-content: center;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const CancelButtonPopup = styled.button`
    display: flex;
    text-decoration: none;
    justify-content: center;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const RateButton = styled.button`
    display: flex;
    justify-content: center;
    text-decoration: none;
    padding: 10px 20px;
    background: #def9df;
    color: var(--success);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    // margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const RatingPicker = styled.div`
    display: flex;
    padding: 40px;
    justify-content: center;
`;

const CommentField = styled.textarea`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    height: 200px;
    margin-bottom: 40px;
    padding: 20px;
    font-size: 18px;
    color: var(--black);
    background: var(--light-grey);
    resize: vertical;
`;

const LeftArea = styled.div``;

const RightArea = styled.div`
    position: relative;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const UserList = styled.ul`
    padding-left: 0;
`;

const NewMessageIndicator = styled.div`
    font-size: 13px;
    color: var(--primary);
`;

const UserItem = styled.div`
    // display: flex;
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    list-style-type: none;
    text-decoration: none;
    background: ${(props) => (props.selected ? "white" : "")};
    border-radius: 10px;
    transition: all 0.2s;
    padding: 10px;
    width: 95%;
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const ConversationWrapper = styled.div`
    display: flex;
`;

const OwnerNotice = styled.div`
    background: var(--success);
    align-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    // transform: rotate(-45deg) translate(50px, -10px);
    display: flex;
    align-items: center;
    padding: 5px;
`;

const ProfileImageIcon = styled.img`
    display: inline-block;
    padding-right: 4px;
    width: 25px;
    height: 25px;
`;

const ProfileImage = styled.img`
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
    border: 0px solid var(--primary);
    margin-right: 20px;
    transition: all 0.2s;
    float:left ${UserItem}:hover & {
        border: 3px solid var(--primary);
    }
`;

const MessagePreview = styled.p`
    color: var(--dark-grey);
`;

const TitleWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 3fr;
    padding: 20px;
    border-bottom: 2px solid var(--light-grey);
`;

const Title = styled.h2`
    display: flex;
    align-items: center;
    font-size: 24px;
`;

const MessageWrapper = styled.div`
    padding: 20px;
    height: 100%;
    overflow-y: auto;
`;

const ClearedRightArea = styled.div`
    margin-top: 50%;
    margin-left: 25%;
`;

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

const StyledButton = styled.button`
    display: inline-block;
    text-decoration: none;
    padding: 20px 40px;
    background: #ff3b5526;
    color: var(--primary);
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

const InputForm = styled.form`
    display: flex;
    padding: 20px;
    margin-top: auto;
`;

const AcceptDeclineButtonWrapper = styled.div`
    display: flex;
    padding: 20px;
    margin-top: auto;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: auto;
`;

const DeclineConversationButton = styled.div`
    display: inline-block;
    text-decoration: none;
    padding: 20px 40px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    padding: 20px;
    margin-top: auto;

    &:focus {
        outline: none;
    }
`;
