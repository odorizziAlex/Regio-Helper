import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import CircleIcon from "../../assets/circle-dark-grey.svg";
import Post from "../Overview/Post";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";

const Profile = ({ loggedInUser }) => {
    const { posts } = useContext(PostContext);
    const { users } = useContext(UserContext);
    const [isAcceptedReqSelected, setAcceptedReq] = useState(false);
    const [isCreatedReqSelected, setCreatedReq] = useState(true);
    const [requestedPostList, setRequestedPostList] = useState([]);
    const { userId } = useParams();

    const loadRequestedPosts = () => {
        let list = [];
        for (let i = 0; i < loggedInUser.requested_posts.length; i++) {
            list.push(
                posts.find(
                    (post) => loggedInUser.requested_posts[i].id === post.id,
                ),
            );
        }
        return list;
    };

    useEffect(() => {
        setRequestedPostList(loadRequestedPosts());
    }, [isAcceptedReqSelected]);

    const hideComponent = (name) => {
        switch (name) {
            case "acceptedReq":
                setAcceptedReq(true);
                setCreatedReq(false);
                break;
            case "createdReq":
                setAcceptedReq(false);
                setCreatedReq(true);
                break;
            default:
                break;
        }
    };

    const isSelectedButtonBorder = (name) => {
        if (name === "acceptedReq") {
            return isAcceptedReqSelected
                ? "2px solid var(--primary)"
                : "2px solid white";
        } else {
            return isCreatedReqSelected
                ? "2px solid var(--primary)"
                : "2px solid white";
        }
    };

    const isSelectedCircleColor = (name) => {
        if (name === "acceptedReq") {
            return isAcceptedReqSelected
                ? "10px solid var(--primary)"
                : "0px solid white";
        } else {
            return isCreatedReqSelected
                ? "10px solid var(--primary)"
                : "0px solid white";
        }
    };

    const isSelectedFontColor = (name) => {
        if (name === "acceptedReq") {
            return isAcceptedReqSelected
                ? "var(--primary)"
                : "var(--dark-grey)";
        } else {
            return isCreatedReqSelected ? "var(--primary)" : "var(--dark-grey)";
        }
    };

    return (
        <StyledArea>
            <StyledWrapper>
                <LeftArea>
                    <StyledTitle>Profil</StyledTitle>
                    {parseInt(userId) === loggedInUser.id && (
                        <NavigationWrapper>
                            <RequestButton
                                onClick={() => hideComponent("acceptedReq")}
                                style={{
                                    border: isSelectedButtonBorder(
                                        "acceptedReq",
                                    ),
                                    color: isSelectedFontColor("acceptedReq"),
                                }}
                            >
                                <NavigationSelectedIcon
                                    src={CircleIcon}
                                    style={{
                                        border: isSelectedCircleColor(
                                            "acceptedReq",
                                        ),
                                    }}
                                />
                                Eigene Hilfsangebote
                            </RequestButton>
                            <RequestButton
                                onClick={() => hideComponent("createdReq")}
                                style={{
                                    border: isSelectedButtonBorder(
                                        "createdReq",
                                    ),
                                    color: isSelectedFontColor("createdReq"),
                                }}
                            >
                                <NavigationSelectedIcon
                                    src={CircleIcon}
                                    style={{
                                        border: isSelectedCircleColor(
                                            "createdReq",
                                        ),
                                    }}
                                />
                                Erstellte Gesuche
                            </RequestButton>
                        </NavigationWrapper>
                    )}

                    {
                        /**
                         * Accepted requests on own profile
                         */
                        parseInt(userId) === loggedInUser.id &&
                            isAcceptedReqSelected && (
                                <PostsWrapper>
                                    {requestedPostList.map((post) => (
                                        <Post
                                            loggedInUser={loggedInUser}
                                            post={post}
                                        />
                                    ))}
                                </PostsWrapper>
                            )
                    }
                    {!isAcceptedReqSelected && (
                        <PostsWrapper>
                            {posts
                                .filter(
                                    (post) => post.userId === parseInt(userId),
                                )
                                .map((post) => (
                                    <>
                                        {parseInt(userId) ===
                                        loggedInUser.id ? (
                                            <Post
                                                loggedInUser={loggedInUser}
                                                isProfile={true}
                                                post={post}
                                            />
                                        ) : (
                                            <Post
                                                loggedInUser={loggedInUser}
                                                post={post}
                                            />
                                        )}
                                    </>
                                ))}
                        </PostsWrapper>
                    )}
                </LeftArea>
                <RightArea>
                    {users
                        .filter((user) => user.id === parseInt(userId))
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
    );
};

export default Profile;

const StyledArea = styled.div`
    padding: 30px;
`;

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
`;

const StyledTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
`;

/**
 * Left Area CSS
 */

const LeftArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const NavigationWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const NavigationSelectedIcon = styled.img`
    width: 20px;
    margin-right: 20px;
    border-radius: 10px;
`;

const RequestButton = styled.button`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 20px 20px;
    background: #ffffff;
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s;

    &:focus {
        outline: none;
    }
    &:hover {
        border: 2px solid var(--primary);
    }
`;

const PostsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    row-gap: 30px;
    margin-top: 50px;

    @media screen and (max-width: 1150px) {
        grid-template-columns: 1fr 1fr;
    }
`;

/**
 * Right Area CSS
 */

const RightArea = styled.div`
    margin-left: 30px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;
