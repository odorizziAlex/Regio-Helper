import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import styled from "styled-components";
import SlideInPost from "../Map/SlideInPost";
import { Link } from "react-router-dom";

const MapSlideIn = ({ isVisible, toggleSlideIn, zipCode }) => {
    const { posts } = useContext(PostContext);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        setFilteredPosts(posts.filter((post) => post.zipCode === zipCode))
    }, [zipCode])

    return (
        <SlideIn isVisible={isVisible}>
            <StyledTitle>
                Gesuche im Raum <StyledZip>{zipCode}</StyledZip>
            </StyledTitle>
            <PostWrapper size={filteredPosts.length}>
                {filteredPosts
                    .map((post) => (
                        <Link key={post.id} to={`gesuche/${post.id}`}>
                            <SlideInPost key={post.id} post={post} />
                        </Link>
                    ))}
            </PostWrapper>
            <StyledButton onClick={toggleSlideIn}>
                Zurück zur Karte
            </StyledButton>
        </SlideIn>
    );
};

export default MapSlideIn;

const SlideIn = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    max-width: 750px;
    width: 100%;
    height: 100vh;
    background: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    transform: ${(props) =>
        props.isVisible ? "translateX(0px)" : "translateX(750px)"};
`;

const StyledTitle = styled.h3`
    margin-bottom: 30px;
`;

const StyledZip = styled.span`
    color: var(--primary);
`;

const PostWrapper = styled.div`
    overflow-y: scroll;
    max-height: 750px;
    display: grid;
    grid-template-columns: ${(props) => props.size > 1 ? "1fr 1fr" : "1fr"};
    column-gap: 10px;
    row-gap: 10px;
`;

const StyledButton = styled.button`
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
    margin-top: 30px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
