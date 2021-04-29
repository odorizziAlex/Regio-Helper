import React, { useState } from "react";
import StarIconLight from "../../assets/star-light-primary.svg";
import StarIcon from "../../assets/star-primary.svg";
import ProfileSettingsIcon from "../../assets/settings-dark-grey.svg";
import MetaMapIcon from "../../assets/location-pin-icon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfileCard = ({ user, loggedInUser }) => {
    const [isShowComments, setShowComments] = useState(false);
    const [showAllQualifications, setShowAllQualifications] = useState(false);

    const showComments = () => {
        return setShowComments(!isShowComments);
    };

    const createRatings = (rating) => {
        let ratings = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                ratings.push(<RatingIcon key={i} src={StarIcon} />);
            } else {
                ratings.push(<RatingIcon key={i} src={StarIconLight} />);
            }
        }
        return ratings;
    };

    const checkUrl = () => {
        let url = window.location.href;
        let pattern = new RegExp("/gesuche");
        if (pattern.test(url)) {
            return false;
        }
        return true;
    };

    const getShortQualificationsList = () => {
        let list = [...user.qualifications];
        return list.splice(0, 3);
    };

    return (
        <>
            {user.id === loggedInUser.id && checkUrl() && (
                <OwnProfileOptionsWrapper>
                    <ToMessagesButton to="/nachrichten">
                        Nachrichten anzeigen
                    </ToMessagesButton>
                    <EditProfileButton to="/editProfile">
                        <EditProfileIcon src={ProfileSettingsIcon} /> Profil
                        Bearbeiten
                    </EditProfileButton>
                </OwnProfileOptionsWrapper>
            )}
            <StyledArea>
                {isShowComments && (
                    <CommentsOverlay>
                        <Username>{user.firstName}</Username>
                        <>
                            {user.comments.map((comment) => (
                                <CommentWrapper key={comment.id}>
                                    <Score>
                                        {createRatings(comment.rating)}
                                    </Score>
                                    <CommentsContent>
                                        {comment.comment}
                                    </CommentsContent>
                                </CommentWrapper>
                            ))}
                        </>
                    </CommentsOverlay>
                )}
                <ArrowLink to={`/profil/${user.id}`}>
                    <ProfileHeader>
                        <Image src={user.image} />
                        <div>
                            <Username>{user.firstName}</Username>
                            <PostalCode>
                                <MetaIcon src={MetaMapIcon} /> {user.zipCode}
                            </PostalCode>
                        </div>
                    </ProfileHeader>
                </ArrowLink>
                <Wrapper>
                    <ProfileDescription>{user.bio}</ProfileDescription>
                </Wrapper>
                <Wrapper>
                    <MembershipTitle>Mitglied seit</MembershipTitle>
                    <MemberDate>{user.created_at}</MemberDate>
                </Wrapper>
                <Wrapper>
                    {user.qualifications.length !== 0 ? (
                        showAllQualifications ? (
                            <>
                                {user.qualifications.map((q) => (
                                    <StyledQualificationItemSmall key={q.id}>
                                        {q.title}
                                    </StyledQualificationItemSmall>
                                ))}

                                {user.qualifications.length > 3 && (
                                    <StyledQualificationItemSmallHint
                                        onClick={() =>
                                            setShowAllQualifications(
                                                !showAllQualifications,
                                            )
                                        }
                                    >
                                        weniger...
                                    </StyledQualificationItemSmallHint>
                                )}
                            </>
                        ) : (
                            <>
                                {getShortQualificationsList().map((q) => (
                                    <StyledQualificationItemSmall key={q.id}>
                                        {q.title}
                                    </StyledQualificationItemSmall>
                                ))}
                                {user.qualifications.length > 3 && (
                                    <StyledQualificationItemSmallHint
                                        onClick={() =>
                                            setShowAllQualifications(
                                                !showAllQualifications,
                                            )
                                        }
                                    >
                                        mehr...
                                    </StyledQualificationItemSmallHint>
                                )}
                            </>
                        )
                    ) : (
                        <StyledPlaceholderInfo>
                            (Keine Qualifikationen eingetragen...)
                        </StyledPlaceholderInfo>
                    )}
                </Wrapper>
                <Wrapper>
                    <HelpedTitle>Abgeschlossene Interaktionen</HelpedTitle>
                    <HelpedCounter>{user.comments.length}</HelpedCounter>
                </Wrapper>
            </StyledArea>
            <RatingWrapper onClick={showComments}>
                <>
                    <RatingTitle>
                        Bewertungen ({user.comments.length})
                    </RatingTitle>
                    <Score>{createRatings(user.rating)}</Score>
                </>
                <Comments>
                    <CommentsHeader>
                        Kommentare {isShowComments ? "verbergen" : "anzeigen"}
                    </CommentsHeader>
                </Comments>
            </RatingWrapper>
        </>
    );
};

export default ProfileCard;

const StyledArea = styled.div`
    position: relative;
`;

const ArrowLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;

const CommentsOverlay = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    border-radius: 10px;
    overflow-y: auto;
    padding: 20px;
    z-index: 10;
`;

const ProfileHeader = styled.div`
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 2px solid var(--light-grey);
`;

const Image = styled.img`
    max-width: 75px;
    max-height: 75px;
    border-radius: 10px;
    border: 2px solid white;
    margin-right: 20px;
`;

const Username = styled.h2`
    margin-top: 10px;
    font-size: 24px;
`;

const PostalCode = styled.span`
    display: flex;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 5px;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

//Font size originally 16px
const StyledPlaceholderInfo = styled.div`
    font-size: 13px;
    color: var(--dark-grey);
`;

const ProfileDescription = styled.div`
    font-size: 13px;
    color: var(--dark-grey);
`;

const Wrapper = styled.div`
    border-bottom: 2px solid var(--light-grey);
    color: var(--dark-grey);
    padding: 20px;
`;

const MembershipTitle = styled.div`
    font-size: 13px;
`;

const MemberDate = styled.div``;

const RatingWrapper = styled.div`
    color: var(--dark-grey);
    padding: 20px;
    z-index: 11;
    cursor: pointer;
`;

const OwnProfileOptionsWrapper = styled.div`
    color: var(--dark-grey);
    padding: 20px 20px 0px;
`;

const RatingTitle = styled.div`
    font-size: 13px;
`;
const CommentsHeader = styled.div`
    font-size: 13px;
    text-decoration: underline;
    margin-top: 10px;
    cursor: pointer;
`;

const Comments = styled.div``;

const CommentWrapper = styled.div`
    border-bottom: 2px solid var(--light-grey);
    color: var(--dark-grey);
    position; absolute;
    padding: 20px;
`;

const CommentsContent = styled.div`
    font-size: 13px;
`;

const Score = styled.div`
    display: flex;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 5px;

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const RatingIcon = styled.img`
    margin-top: 5px;
`;

const StyledQualificationItemSmall = styled.button`
    display: inline-block;
    text-align: center;
    text-decoration: none;
    padding: 5px 10px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 0.75rem;
    border: 0;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;

    &:focus {
        outline: none;
    }
`;
const StyledQualificationItemSmallHint = styled.button`
    display: inline-block;
    text-decoration: none;
    text-align: center;
    padding: 5px 10px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 0.75rem;
    border: 0;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;

    &:focus {
        outline: none;
    }
`;

// const Wrapper = styled.div`
//     border-bottom: 2px solid var(--light-grey);
//     padding: 20px;
// `;

const HelpedTitle = styled.div`
    font-size: 13px;
    color: var(--dark-grey);
`;

const HelpedCounter = styled.div``;

const ToMessagesButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 20px 40px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 10px;

    &:focus {
        outline: none;
    }
`;
const EditProfileButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 20px 30px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const EditProfileIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;

const MetaIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;
