import React, { useState, useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { ConversationContext } from "../../contexts/ConversationContext";
import styled from "styled-components";
import MetaMapIcon from "../../assets/location-pin-icon.svg";
import MetaClockIcon from "../../assets/clock-icon.svg";
import EditPostIcon from "../../assets/edit-primary.svg";
import DeletePostIcon from "../../assets/trash-2-dark-grey.svg";
import ProfileIcon from "../../assets/profile-icon-white.svg";
import CancelIcon from "../../assets/x-primary.svg";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({ loggedInUser, isProfile, post }) => {
    const { deletePost } = useContext(PostContext);
    const { removePostFromLists } = useContext(UserContext);
    const { postDeleted } = useContext(ConversationContext);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const onDeleteClicked = (e) => {
        e.preventDefault();
        setShowDeletePopup(true);
    };

    const onCancelClicked = (e) => {
        e.preventDefault();
        setShowDeletePopup(false);
    };

    const onDeleteFinalClicked = (e) => {
        e.preventDefault();
        setShowDeletePopup(false);
        deletePost(post.id);
        removePostFromLists(loggedInUser, post.id);
        postDeleted(post);
    };

    return (
        <PostWrapper>
            {showDeletePopup && (
                <>
                <Overlay onClick={()=>setShowDeletePopup(false)}/>
                <DeletePopup>
                    <StyledTitle>
                        Sind Sie sicher, dass Sie diesen Post löschen
                        möchten?
                    </StyledTitle>
                    <PopupDescription>
                        Diese Aktion kann nicht widerrufen werden.
                    </PopupDescription>
                    <ButtonWrapper>
                        <CancelDeleteButton onClick={onCancelClicked}>
                            <MetaIcon src={CancelIcon} />
                            Abbrechen
                        </CancelDeleteButton>
                        <DeleteButton onClick={onDeleteFinalClicked}>
                            <MetaIcon src={DeletePostIcon} />
                        </DeleteButton>
                    </ButtonWrapper>
                </DeletePopup>
                </>
            )}
            <StyledPost>
                <ArrowLink
                    key={post.id}
                    to={`/gesuche/${post.id}`}
                >             
                    {loggedInUser.id === post.userId && <OwnerNotice>
                        <ProfileImageIcon src={ProfileIcon} />
                    </OwnerNotice>}
                    <MetaWrapper>
                        <PostMeta>
                            <MetaIcon src={MetaMapIcon} /> {post.zipCode}
                        </PostMeta>
                        <PostMeta>
                            <MetaIcon src={MetaClockIcon} />
                            {`${moment(parseInt(post.created_at)).format(
                                "DD.MM.YYYY",
                            )}`}
                        </PostMeta>
                    </MetaWrapper>
                    <StyledTitle>{post.title}</StyledTitle>
                </ArrowLink>           
                {loggedInUser.id === post.userId && isProfile &&(
                    <ButtonWrapper>
                        <div>
                            <EditButton to={`/createRequest/${post.id}/edit`}>
                                <MetaIcon src={EditPostIcon} />
                                Bearbeiten
                            </EditButton>
                        </div>
                        <div>
                            <DeleteButton onClick={onDeleteClicked}>
                                <MetaIcon src={DeletePostIcon} />
                            </DeleteButton>
                        </div>
                    </ButtonWrapper>
                )}
            </StyledPost>
        </PostWrapper>
    );
};

export default Post;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const OwnerNotice = styled.div`
    background: var(--success);
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 100px;
    transform: rotate(-45deg) translate(50px, -10px);
    display: flex;
    align-items: center;
    padding: 5px;
`;

const ProfileImageIcon = styled.img`
    transform: rotate(45deg);
    width: 25px;
    height: 25px;
`;

const PostWrapper = styled.div`
    box-shadow: 0px 10px 20px -10px #d2d2d2;
    overflow: hidden;
`;

const StyledPost = styled.div`
    position: relative;
    padding: 20px;
    background: white;
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s;
    width: 100%;
    overflow: hidden;

    &:hover {
        border: 2px solid var(--primary);
    }
`;

const DeletePopup = styled.div`
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

const Overlay = styled.div`
    position: fixed;
    // display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    // cursor: pointer;
`;

const PopupDescription = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
    color: var(--dark-grey);
`;

const MetaWrapper = styled.div`
    display: flex;
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

const MetaIcon = styled.img`
    width: 20px;
    margin-right: 5px;
`;

const StyledTitle = styled.h3`
    display: block;
    display: -webkit-box;
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
    height: 60px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0px;
`;

const EditButton = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;
    // margin-left: 20px;
    margin-right: 10px;
    // margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const CancelDeleteButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;
    // margin-left: 20px;
    margin-right: 10px;
    // margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const DeleteButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--black);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;
    // margin-left: 20px;
    //  margin-right: 10px;
    // margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
